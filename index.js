require('dotenv').config({ path: 'variables.env' });
const config = require('./config');
const fetch = require("node-fetch");
const SteamUser = require('steam-user');
const SteamAPI = require('steamapi');
const steam = new SteamAPI(config.steamDevKey);
const SteamTotp = require('steam-totp');
const { AdminLogListenRequest } = require('steam-user/enums/EMsg');

const client = new SteamUser();

const nameToSteamIdObj = new Map();

var playerCalledNext = new Map();

var executing = false;

async function getNickName(id) {
  const nick = await steam.getUserSummary(id).then(summary => {
    return summary.nickname;
  });
  return nick;
}

const logInOptions = {
  accountName: config.accountName,
  password: config.password,
  twoFactorCode: SteamTotp.generateAuthCode(config.sharedSecret)
};

client.logOn(logInOptions);

client.on('loggedOn', () => {
  console.log('Bot logged on');
  
  client.setPersona(SteamUser.EPersonaState.Online, config.publicUsername);
});

function includes(message, arr) {
  if (!message)
    return false;
  for (let i = 0; i < arr.length; i++) {
    if (message.toLowerCase() == arr[i]) {
      return message;
    }
  }
  return false;
}

function isAdmin(id, admins) {
    for (let i = 0; i < admins.length; i++) {
        if (id == admins[i]) {
          return true;
        }
    }
    return false;
}

client.chat.on('chatMessage', function(msgObj) {
  let steamidObj = msgObj.steamid_sender,
      message = msgObj.message,
      accountid = msgObj.accountid,
      mentions = msgObj.mentions;


  let groupId = msgObj.chat_group_id,
      chatId = msgObj.chat_id,
      serverTimestamp = msgObj.server_timestamp,
      ordinal = msgObj.ordinal;
  let lineCommand = includes(message, config.lineCommands);
  let adminCommand = includes(message, config.adminCommands);
  let globalCommand = includes(message, config.globalCommands);
  
    if (message) {
    //  if (mentions) {
    //    if (mentions.mention_steamids.length > 0) {
    //      const taggedId = mentions.mention_steamids[0]['accountid'];
    //    }
    //  }
      if (ordinal > 0) {
     //   sendMsg(groupId, chatId, "Stop spamming commands, what's wrong with you?");
      } else {
        if (lineCommand || adminCommand) {
          if (chatId) { // SERVER LINE channel //if (chatId == 50975794) { 
              if (lineCommand) {
                  output(steamidObj, groupId, chatId, lineCommand, serverTimestamp, ordinal);
              } else if (adminCommand) {
                  const id = steamidObj.getSteamID64();
                  if (isAdmin(id, config.admins)) {
                      if (adminCommand.toLowerCase() === '!clearline') { 
                          list.reset();
                          sendMsg(groupId, chatId, "Line cleared by an admin: "+list.getListString());      
                      }
                      setTimeout(() => {
                          client.chat.deleteChatMessages(groupId, chatId, [{ server_timestamp: serverTimestamp, ordinal: ordinal }]); 
                      }, 500);
                  }
              }
          } else {
            sendMsg(groupId, chatId, "Use the SERVER LINE channel for line commands.");
          }
      } else if (globalCommand) {
         output(steamidObj, groupId, chatId, globalCommand, serverTimestamp, ordinal);
      } else if (message.length > 1 && message.charAt(0) == "!") {
        sendMsg(groupId, chatId, "Unknown command: "+message+"\Use !commands or !help to see options.");
      } else if (message.includes("<") || message.includes(">")) {
        sendMsg(groupId, chatId, "This bot can be used to track the line.\n"+
        "Type !add in the SERVER LINE channel to be added to the line.");
      }
      }
    }

});


function sendMsg(groupId, chatId, msgToSend) {
    if (!executing) {
      executing = true;
      setTimeout(() => {
          client.chat.sendChatMessage(groupId, chatId, msgToSend);
          executing = false;
      }, 1000);
    } 
}


async function output(steamidObj, groupId, chatId, command, serverTimestamp, ordinal) {
  const sender = await getNickName(steamidObj.getSteamID64());
  command = command.toLowerCase();
  if (command === '!add') {
    var alreadyConnected = await isInServer(steamidObj.getSteamID64()); 
    if (alreadyConnected) {
      list.dequeue(sender);  
      sendMsg(groupId, chatId, 'You are already in the game server.');
    } else {
      var full = await isServerFull();
      if (full.startsWith('\"false\"') && list.isEmpty()) { 
        sendMsg(groupId, chatId, "NO LINE and slots are open in the server - join up!");
      }
      else {
        if (list.enqueue(sender)) {
          if (!nameToSteamIdObj.has(sender)) {
            nameToSteamIdObj.set(sender, steamidObj);
          }
          if (!playerCalledNext.has(sender)) {
            playerCalledNext.set(sender, false);
          }
          sendMsg(groupId, chatId, list.getListString());
        } else {
          sendMsg(groupId, chatId, "You are already in line.");
        }
      }
    }
  } else if (command === '!line') {
      var full = await isServerFull();
      if (full.startsWith('\"false\"')) { // not full
        if (list.isEmpty()) {
          sendMsg(groupId, chatId, "NO LINE and slots are open in the server - join up!");
        } else {
          sendMsg(groupId, chatId, list.getListString());
        }
      } else {
        sendMsg(groupId, chatId, list.getListString());
      } 
  } else if (command === '!remove') {
    if (list.dequeue(sender)) {
        setTimeout(() => {
            client.chat.sendChatMessage(groupId, chatId, list.getListString());
        }, 600);
    } else {
        setTimeout(() => {
            client.chat.sendChatMessage(groupId, chatId, 'You are not in line, type !add to join');
        }, 600);
    }
  } else if (command === '!next') { 
    const next = list.peek();
    if (next) {
        var alreadyConnected = await isInServer((nameToSteamIdObj.get(next)).getSteamID64()); 
        if (alreadyConnected) {
            list.dequeue(next);  
            sendMsg(groupId, chatId, next + " is already in the server.");
        } else {
          if (playerCalledNext.get(next) == false) {
            playerCalledNext.set(next, true);
            var full = await isServerFull();
            var msg = '';
            if (full.startsWith('\"false\"')) { 
                msg = 'Your slot is open - join the server! 60 second timer starts now';
            } else {
                msg = 'The server is still full.  Get on auto-join';
            }
            sendMsg(groupId, chatId, next + ' is next in line.\n[mention='+(nameToSteamIdObj.get(next)).accountid+
            ']@'+next+'[/mention] '+msg);
            // every 10 seconds check if they've connected
              var intervalID = setInterval(async () => {
                if (playerCalledNext.get(next) == true) {
                  var alreadyConnected = await isInServer((nameToSteamIdObj.get(next)).getSteamID64());
                  if (alreadyConnected) {
                    list.dequeue(next);
                    playerCalledNext.set(next, false);
                    clearInterval(intervalID);
                    sendMsg(groupId, chatId, next + ' has joined the server.');
                  }
                }
              }, 10000);
                          
              // after 70 seconds, check if they're finally in, prompt to remove from line if not
              if (playerCalledNext.get(next) == true) {
                const timeoutID = setTimeout(async () => {
                  alreadyConnected = await isInServer((nameToSteamIdObj.get(next)).getSteamID64()); 
                  var stillInLine = list.isInLine(next);
                  if (!alreadyConnected && stillInLine) {
                    sendMsg(groupId, chatId, next + ' did not join the server.\nType !skip if he should be removed from the front of the line.');
                  }
                  clearInterval(intervalID);
                  playerCalledNext.set(next, false);
                }, 70000);
              }
            }
        }  
    } else { // Line is empty
        sendMsg(groupId, chatId, list.getListString());
    }
  } else if (command === '!commands') {
    sendMsg(groupId, chatId, 'Commands: '+'!line Show the current line, !add Add yourself, '+
    '!remove Remove yourself, !next Alert the next player that it\'s their turn,'+' !replace Put whoever was skipped back in front of the line');
  } else if (command === '!need') { // show server stats; ping @all is impossible because bbcode is retarded
    var currentPlayers = await getCurrentPlayers();
    sendMsg(groupId, chatId, currentPlayers + ' players in the server! Join up! 66.165.238.178:27018');
  } else if (command === '!skip') {
    const next = list.peek();
    if (next) { 
      list.dequeue(next);
      list.setLastSkipped(next);
      playerCalledNext.set(next, false);
      sendMsg(groupId, chatId, next + ' removed from the front of the line. If this was a mistake, use !replace to put him back');
    }
  } else if (command === '!replace') {
    if (list.replace()) {
      sendMsg(groupId, chatId, 'Placing '+list.getLastSkipped()+' at the front of the line\n'+list.getListString());
      list.setLastSkipped('');
    } else {
      sendMsg(groupId, chatId, 'No one has been recently skipped');
    }
  } else if (command === '!website') {
    sendMsg(groupId, chatId, 'http://www.socalpug.com/underconstruction');
  } else if (command === '!help') {
    sendMsg(groupId, chatId, "https://github.com/socal-pug/chatbot/blob/main/README.md");
  }
  setTimeout(() => {
    client.chat.deleteChatMessages(groupId, chatId, [{ server_timestamp: serverTimestamp, ordinal: ordinal }]); 
  }, 6000);
}


async function isServerFull() {
    const response = await fetch('http://127.0.0.1:5000/isServerFull/');
    const body = await response.text();
    return body;
}

async function getCurrentPlayers() {
     const response = await fetch('http://127.0.0.1:5000/numberOfPlayers/');
     const body = await response.text();
     if (body) {
        const num = body.split('\"');
        return num[1];
     }
     return body;
}

async function getPlayerNameList() {
  const response = await fetch('http://127.0.0.1:5000/playersList/');
  const body = await response.text();
  if (body) {
     const arr = body.replace(/["\n]+/g, '').split('MYSECRETDIVIDER');
     return arr;
  }
  return body;
}


async function isInServer(player) {
    const playerName = await getNickName(player);
    const response = await fetch('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='+config.steamDevKey+'&steamids='+player);
    const body = await response.json();
    if (body) {  
        const currentIp = body.response.players[0]['gameserverip'];
        console.log('current ip is '+currentIp);
        if (currentIp) {
          if (currentIp === '66.165.238.178:27018') {
            return true;
          } else {      
            return false;
          }
        } else { // invisible or offline on friends - search by name
          var playerNamesList = await getPlayerNameList();
            for (let i = 0; i < playerNamesList.length; i++) {
              let name = playerNamesList[i].toLowerCase();
              if (name == '') {
                continue;
              }
              if (name.includes(playerName) || playerName.includes(name)) {
                return true;
              }
            }
            return false;
        }
    }
    return false;
  }


class Queue {
  constructor() {
    this.list = [];
    this.lastSkipped = '';
  }

  enqueue = (sender) => {
    const index = this.list.indexOf(sender);
    if (index > -1) { 
      return false;
    } else {
      this.list.push(sender);
      return true; 
    }
  }

  dequeue(sender) {
    const index = this.list.indexOf(sender);
    if (index > -1) { 
      this.list.splice(index, 1);
      return true; 
    } else {
      return false;
    }
  }

  replace() {
    if (this.lastSkipped == '') {
      return false;
    } else {
      var newList = this.list.slice();
      newList.unshift(this.lastSkipped);
      this.list = newList;
      return true;
    }
  }

  setLastSkipped(player) {
    this.lastSkipped = player;
  }

  getLastSkipped() {
    return this.lastSkipped;
  }

  isInLine(player) {
    return this.list.includes(player);
  }
  
  peek() {
    if (this.isEmpty()) {
        return false;
    } else {
        return this.list[0];
    }
  }
  

  isEmpty = () => this.list.length === 0;

  getListString() {
    if (this.isEmpty()) { // CHECK IF SERVER HAS SLOTS AVAILABLE!  IF SO THEN SAY JOIN THE SERVER!
        return "LINE IS EMPTY, type !add to join";
    } else {
        return this.list.join(" > ");
    }
  }

  getList() {
    return this.list;
  }

  reset() {
    this.list = [];
  }

}

var list = new Queue();