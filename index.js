require('dotenv').config({ path: 'variables.env' });
const config = require('./config');
const fetch = require("node-fetch");
const SteamUser = require('steam-user');
const SteamAPI = require('steamapi');
const steam = new SteamAPI(config.steamDevKey);
const SteamTotp = require('steam-totp');
const { AdminLogListenRequest } = require('steam-user/enums/EMsg');
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

const client = new SteamUser();

//server.on('error', (err) => {
 // console.log(`server error:\n${err.stack}`);
 // server.close();
//});

/*
server.on('message', (msg, rinfo) => {
  if (msg.includes('say "!line"')) {
    if (list.isEmpty()) {
      msgToServer("Line is empty - use !need to request players from the chat");
    } else {
      msgToServer(list.getListString());
    }
  } else if (msg.includes('say "!next"')) {
    if (list.isEmpty()) {
      msgToServer("Line is empty - use !need to request players from the chat");
    } else {
      const next = list.peek();
      msgToServer("Now calling the next player in line: "+next);
      customOutput(14783195, 50975794, "!next", null, null, null, null);
    }
  } else if (msg.includes('say "!need"')) {
    msgToServer("Requesting players from the group chat");
    customOutput(14783195, 50975794, "!need", null, null, null, null);
  } else if (msg.includes('say "!topkills"')) {
    customOutput(14783195, 50975794, "!topkills", null, null, null, null);
  } else if (msg.includes('say "!skip"')) {
    customOutput(14783195, 50975794, "!skip", null, null, null, null);
  } else if (msg.includes('say "!replace"')) {
    customOutput(14783195, 50975794, "!replace", null, null, null, null);
  }
});
*/
<<<<<<< HEAD
/*
=======
>>>>>>> a16a9d1b65711a8a0d7b980e223ab636f039e573
setInterval(async () => {
 // const uptimeKuma = await fetch('http://socalpug.com:3001/api/push/ofIK26OXwM?status=up&msg=OK&ping=');
}, 55000);]
*/


setInterval(async () => {
  var d = new Date(); 
  if (list.isEmpty() && (d.getHours() >= 17 || d.getHours() < 2)) {
    const re = await fetch('http://127.0.0.1:5000/restartChatBot');
  }
}, 1800000);

<<<<<<< HEAD

=======
>>>>>>> a16a9d1b65711a8a0d7b980e223ab636f039e573
/*
server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(27500);
*/

const nameToSteamIdObj = new Map();

var playerCalledNext = new Map();

var executing = false;

// every 2 mins check for top killa
/*
var killerInterval = setInterval(async () => {
  var killer = await getLastTopFragger(); 
  if (killer && killer.length > 15 && killer != list.getLastKillerStr()) {
    if (!killer.includes('No recent pug found') && !killer.includes('Still processing the latest demo')) {
      let removedQuotes = killer.replace(/["]+/g, '');
      let toDecode = removedQuotes.replace(/\\\\x/g, '%');
      sendMsg(14783195, 50975794, decodeURIComponent(toDecode));
      list.setLastKillerStr(killer);
    //  let statsLink = await getLastPugStats();
    //  need to fix this for when a new pug starts right away
      setTimeout(() => {
        populatePugDemoLinks();
    //    sendMsg(14783195, 50975794, statsLink.replace(/["]+/g, ''));
      }, 10000);
    }
  }
}, 600000);
*/

async function getNickName(id) {
  const nick = await steam.getUserSummary(id).then(summary => {
    return summary.nickname;
  });
  return nick;
}


var globalGroupId = 14783195;
var globalChatId = 50975794;

const logInOptions = {
  accountName: config.accountName,
  password: config.password,
  twoFactorCode: SteamTotp.generateAuthCode(config.sharedSecret)
};
<<<<<<< HEAD

client.setOption("webCompatibilityMode", true);

=======
console.log(client);
>>>>>>> a16a9d1b65711a8a0d7b980e223ab636f039e573
client.logOn(logInOptions);
console.log('logged on?');
console.log(client);
client.on('loggedOn', async () => {
  console.log('Bot logged on');
  
  client.setPersona(SteamUser.EPersonaState.Online, config.publicUsername);
  var d = new Date(); 

  if (d.getHours() >= 16 || d.getHours() < 2) {
    var currentPlayers = await getCurrentPlayers();
    if (currentPlayers != "") {
      client.chat.sendChatMessage(globalGroupId, globalChatId, currentPlayers + " players in the server! Join 162.248.93.11:27015", function(err, result){ 
      if(err){ 
          console.log(' caught at init') 
    //      var exec = require('child_process').exec;
      }});
    } else {
      client.chat.sendChatMessage(globalGroupId, globalChatId, "Game server is down.", function(err, result){ 
        if(err){ 
            console.log(' caught at init') 
      //      var exec = require('child_process').exec;
        }});
    }
  }
});

function includes(message, arr) {
  if (!message)
    return false;
  cmds = message.split(" ");

  for (let i = 0; i < arr.length; i++) {
    if (cmds[0].toLowerCase() == arr[i]) {
      return cmds;
    }
  }
  return false;
}

function hasClipLink(message) {
  if (!message)
    return false;
  var words = message.split(" ");
  for (let i = 0; i < words.length; i++) {
    if (words[i].startsWith('url="')) {
      const arr = words[i].split('"');
      const clipLink = arr[1];
      return clipLink;
    }
    if (words[i].startsWith("[youtube=")) {
      const ytarr = words[i].split("[youtube=");
      const link = ytarr[1];
      return link;
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


process.on('uncaughtException', function (err) {
  console.log('UNCAUGHT EXCEPTION - staying alive - '+ err.message); 
  process.nextTick(() => {sendMsg(14783195, 50975794, "Execution failed, try again")});
}); 

client.chat.on('chatMessage', function(msgObj) {
  let steamidObj = msgObj.steamid_sender,
      message = msgObj.message,
      accountid = msgObj.accountid,
      mentions = msgObj.mentions;
    // 50975893 = cs film study

  //    console.log('message from '+steamidObj.getSteamID64());
  let groupId = msgObj.chat_group_id,
      chatId = msgObj.chat_id,
      serverTimestamp = msgObj.server_timestamp,
      ordinal = msgObj.ordinal;
  globalGroupId = groupId;
  globalChatId = chatId;
  let lineCommand = includes(message, config.lineCommands);
  let adminCommand = includes(message, config.adminCommands);
  let globalCommand = includes(message, config.globalCommands);
  
    if (message) {
//      if (mentions) {
 //       if (mentions.mention_steamids.length > 0) {
 //         const taggedId = mentions.mention_steamids[0]['accountid'];
  //      }
  //    }
      if (ordinal > 0) {
     //   sendMsg(groupId, chatId, "Stop spamming commands, what's wrong with you?");
      } else {
        if (chatId == 50975893) {
          let link = hasClipLink(message)
          if (link) {
            console.log("downloading a clip");
            customOutputClipDownload(groupId, chatId, steamidObj, link);
          }
          //var sender = await getNickName(steamidObj.getSteamID64());
        }
        if (lineCommand || adminCommand) {
          if (chatId == 50975794) { // SERVER LINE channel //if (chatId == 50975794) { 
              if (lineCommand && lineCommand.length == 1) {
                  output(steamidObj, groupId, chatId, lineCommand, serverTimestamp, ordinal);
              } else if (adminCommand) {
                  const id = steamidObj.getSteamID64();
                  if (isAdmin(id, config.admins)) {
                      if (adminCommand[0].toLowerCase() === '!clearline') { 
                          list.reset();
                          sendMsg(groupId, chatId, "Line cleared by an admin: "+list.getListString());      
                      } else if (adminCommand[0].toLowerCase() === '!move') {
                          if (!list.isInLine(adminCommand[1])) {
                            sendMsg(groupId, chatId, "Player is not in line");
                          } else if (isNaN(adminCommand[2])) {
                            sendMsg(groupId, chatId, adminCommand[2] + " is not a number. Specify position in line to move the player to (ex: Move someone to second in line would be !move playerName 2)");
                          } else if (adminCommand[2] < 1) {
                            sendMsg(groupId, chatId, adminCommand[2] + "Specify a positive number for the position in line to move the player to (ex: Move someone to second in line would be !move playerName 2)");
                          }else {
                            list.move(adminCommand[1], adminCommand[2]);
                            sendMsg(groupId, chatId, list.getListString());
                          }
                          
                      } else if (adminCommand[0].toLowerCase() === '!remove') {
                          if (list.dequeue(adminCommand[1])) {
                            setTimeout(() => {
                                client.chat.sendChatMessage(groupId, chatId, adminCommand[1] + ' removed by an admin.\n'+ list.getListString());
                            }, 600);
                          } else {
                            setTimeout(() => {
                                client.chat.sendChatMessage(groupId, chatId, 'Player is not in line');
                            }, 600);
                          }
                      }
                   //   setTimeout(() => {
                    //      client.chat.deleteChatMessages(groupId, chatId, [{ server_timestamp: serverTimestamp, ordinal: ordinal }]); 
                    //  }, 500);
                  }
              }
          } else {
            sendMsg(groupId, chatId, "Use the SERVER LINE channel for line commands.");
          }
        } else if (globalCommand) {
          output(steamidObj, groupId, chatId, globalCommand, serverTimestamp, ordinal);
        } else if (message.length > 1 && message.charAt(0) == "!") {
          sendMsg(groupId, chatId, "Unknown command: "+message+". Use !line or !add");
        }
      }
    }

});


function sendMsg(groupId, chatId, msgToSend) {
    if (msgToSend.length < 1)
      return;
    if (!executing) {
      executing = true;
      setTimeout(() => {
          client.chat.sendChatMessage(groupId, chatId, msgToSend);
          executing = false;
      }, 1400);
    }  else {
      console.log('skipping '+msgToSend);
      console.log('already executing'); 
    }
}

async function customOutputClipDownload(groupId, chatId, steamidObj, link) {
  if (steamidObj != null) {
    var sender = await getNickName(steamidObj.getSteamID64());
      if (link.includes("streamable")) {
        console.log('saving streamable');
        await postClip(link, sender, 'true');
      } else if (link.includes("yout")) {
        console.log('saving youtube');
        await postClip(link, sender, 'false');
      }
    }
}

async function customOutput(groupId, chatId, command, serverTimestamp, ordinal, senderSteamId, senderAlias) {
  if (command === '!next') { 
    const next = list.peek();
    if (next) {
        var alreadyConnected = await isInServer((nameToSteamIdObj.get(next)).getSteamID64()); 
        if (alreadyConnected) {
            list.dequeue(next);  
            msgToServer(next + " is already in the server and has been removed from the line.  "+list.getListString());
            sendMsg(groupId, chatId, next + " is already in the server and has been removed from the front of the line.\n"+list.getListString());
        } else {
          if (playerCalledNext.get(next) == false) {
            playerCalledNext.set(next, true);
            var full = await isServerFull();
            var msg = '';
            if (full.startsWith('\"false\"')) { 
                msg = 'Your slot is open - join the server! https://www.socalpug.com/join 60 second timer starts now';
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
                    sendMsg(groupId, chatId, next + ' joined the server and has been removed from the front of the line.\n'+list.getListString());
                    msgToServer(next + ' joined the server and has been removed from the line.   '+list.getListString())
                  }
                }
              }, 10000);
                          
              // after 70 seconds, check if they're finally in, prompt to remove from line if not
              if (playerCalledNext.get(next) == true) {
                const timeoutID = setTimeout(async () => {
                  alreadyConnected = await isInServer((nameToSteamIdObj.get(next)).getSteamID64()); 
                  var stillInLine = list.isInLine(next);
                  if (!alreadyConnected && stillInLine) {
                    sendMsg(groupId, chatId, next + ' did not join the server or is set to invisible/offline.\nType !skip if he should be removed from the front of the line.');
                  } else if (alreadyConnected && stillInLine) {
                    list.dequeue(next);
                    sendMsg(groupId, chatId, next + ' joined the server and has been removed from the front of the line.\n'+list.getListString());
                    msgToServer(next + ' joined the server and has been removed from the front of the line.   '+list.getListString());
                  }
                  clearInterval(intervalID);
                  playerCalledNext.set(next, false);
                }, 70000);
              }
            } else {
              msgToServer("Timer is running for "+next+".  Wait a minute or type !skip to skip him immediately\n"+list.getListString());
            }
        }  
    }
  } else if (command === '!need') { 
    var currentPlayers = await getCurrentPlayers();
    sendMsg(groupId, chatId, currentPlayers + ' players in the server! Join up! connect 162.248.93.11:27015');
  } else if (command === '!topkills') {
    return;
    var lastKiller = list.getLastKillerStr();
    var killer = await getLastTopFragger(); 
    if (!killer) {
      killer = lastKiller;
    }
    if (killer && killer.length > 15) {
      let removedQuotes = killer.replace(/["]+/g, '');
      let toDecode = removedQuotes.replace(/\\\\x/g, '%');
      msgToServer(decodeURIComponent(toDecode));
    } 
  } else if (command === '!skip') {
    const next = list.peek();
    if (next) { 
      list.dequeue(next);
      list.setLastSkipped(next);
      playerCalledNext.set(next, false);
      msgToServer(next + ' removed from the front of the line. If this was a mistake, use !replace to put him back');
      sendMsg(groupId, chatId,'Command from in-game: '+ next + ' removed from the front of the line. If this was a mistake, use !replace to put him back');
    }
  } else if (command === '!replace') {
    if (list.replace()) {
      sendMsg(groupId, chatId, 'Command from in-game: Placing '+list.getLastSkipped()+' at the front of the line\n'+list.getListString());
      msgToServer('Placing '+list.getLastSkipped()+' at the front of the line\n'+list.getListString());
      list.setLastSkipped('');
    } else {
      msgToServer('No one has been recently skipped');
    }
  }
}


async function output(steamidObj, groupId, chatId, cmds, serverTimestamp, ordinal) {
  if (steamidObj != null) {
    var sender = await getNickName(steamidObj.getSteamID64());
  }
  var command = cmds[0].toLowerCase();
  if (command === '!add') {
    var alreadyConnected = await isInServer(steamidObj.getSteamID64()); 
    if (alreadyConnected) {
      list.dequeue(sender);  
      sendMsg(groupId, chatId, 'You are already in the game server.');
    } else {
      var full = await isServerFull();
      if (full.startsWith('\"false\"') && list.isEmpty()) {
        var currentPlayers = await getCurrentPlayers();
        sendMsg(groupId, chatId, "NO LINE! "+currentPlayers + " players in the server! and slots are open in the server: 162.248.93.11:27015");
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
          var currentPlayers = await getCurrentPlayers();
          sendMsg(groupId, chatId, "NO LINE! "+currentPlayers + " players in the server! and slots are open in the server: 162.248.93.11:27015");
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
  } else if (command === '!score') {
    return;
    var matchData = await getMatchStatus();
    sendMsg(groupId, chatId, matchData);
  } else if (command === '!next') { 
    const next = list.peek();
    if (next) {
        var alreadyConnected = await isInServer((nameToSteamIdObj.get(next)).getSteamID64()); 
        if (alreadyConnected) {
            list.dequeue(next);  
            sendMsg(groupId, chatId, next + " is already in the server and has been removed from the front of the line.\n"+list.getListString());
        } else {
          if (playerCalledNext.get(next) == false) {
            playerCalledNext.set(next, true);
            var full = await isServerFull();
            var msg = '';
            if (full.startsWith('\"false\"')) { 
                msg = 'Your slot is open - join the server! https://www.socalpug.com/join 60 second timer starts now';
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
                    sendMsg(groupId, chatId, next + ' joined the server and has been removed from the front of the line.\n'+list.getListString());
                  }
                }
              }, 10000);
                          
              // after 70 seconds, check if they're finally in, prompt to remove from line if not
              if (playerCalledNext.get(next) == true) {
                const timeoutID = setTimeout(async () => {
                  alreadyConnected = await isInServer((nameToSteamIdObj.get(next)).getSteamID64()); 
                  var stillInLine = list.isInLine(next);
                  if (!alreadyConnected && stillInLine) {
                    sendMsg(groupId, chatId, next + ' did not join the server or is set to invisible/offline.\nType !skip if he should be removed from the front of the line.');
                  } else if (alreadyConnected && stillInLine) {
                    list.dequeue(next);
                    sendMsg(groupId, chatId, next + ' joined the server and has been removed from the front of the line.\n'+list.getListString());
                  }
                  clearInterval(intervalID);
                  playerCalledNext.set(next, false);
                }, 70000);
              }
            } else {
              sendMsg(groupId, chatId, "Timer is running for "+next+".  Wait a minute or type !skip to skip him immediately\n"+list.getListString());
            }
        }  
    } else { // Line is empty
        sendMsg(groupId, chatId, list.getListString());
    }
  } else if (command === '!commands') {
    return;
    sendMsg(groupId, chatId, 'Commands: '+'!line Show the current line, !add Add yourself, '+
    '!remove Remove yourself, !next Alert the next player that it\'s their turn,'+' !replace Put whoever was skipped back in front of the line, ' + '!server Create a link to automatically join the server, !topkills Show who got top kills last pug');
  } else if (command === '!need') { 
    var currentPlayers = await getCurrentPlayers();
    sendMsg(groupId, chatId, currentPlayers + ' players in the server! Join up! connect 162.248.93.11:27015');
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
    return;
    sendMsg(groupId, chatId, 'http://www.socalpug.com/');
  } else if (command === '!help') {
    return;
    sendMsg(groupId, chatId, "https://github.com/socal-pug/chatbot/blob/main/README.md");
  } else if (command === '!stats') {
    return;
    sendMsg(groupId, chatId, "https://www.socalpug.com/ranks");
  } else if (command === '!topkills') {
    return;
    var lastKiller = list.getLastKillerStr();
    var killer = await getLastTopFragger(); 
    if (!killer) {
      killer = lastKiller;
    }
    if (killer && killer.length > 15) {
      let removedQuotes = killer.replace(/["]+/g, '');
      let toDecode = removedQuotes.replace(/\\\\x/g, '%');
      sendMsg(groupId, chatId, decodeURIComponent(toDecode));
    } 
  }
 // setTimeout(() => {
 //   client.chat.deleteChatMessages(groupId, chatId, [{ server_timestamp: serverTimestamp, ordinal: ordinal }]); 
 // }, 6000);
}


async function getMatchStatus() {
  const mapResponse = await fetch('http://127.0.0.1:5000/currentMap/');
  const mapName = await mapResponse.text();
  const response = await fetch('http://127.0.0.1:5000/matchData/');
  const body = await response.text();
  const r = await fetch('http://127.0.0.1:5000/liveScores/');
  const b = await r.text();
  if (body) {
    const arr = body.replace(/["()\n ]+/g, '').split(',');
    const scores = b.replace(/["()\n ]+/g, '').split(',');
    var liveScoresFirstHalf = mapName.replace(/["()\n ]+/g, '')+" - First Half - TEAM 1: "+scores[0]+" | TEAM 2: "+scores[1];
    if (arr[0] == 'False') {
      return "Pug is not live.";
    } else {
      if (arr[1] == 'True') { // second half
          liveScoresFirstHalf += '\nSecond Half - TEAM 1: '+scores[2]+' | TEAM 2: '+scores[3];
      }
      return liveScoresFirstHalf
    }
  }
  return body;
}

async function isServerFull() {
  const response = await fetch('http://127.0.0.1:5000/isServerFull/');
  const body = await response.text();
  return body;
}


async function postClip(link, poster, download) {
  let url = 'http://127.0.0.1:5000/downloadClip?url=';
  url += link;
  url += '&download=';
  url += download;
  url += '&poster=';
  url += poster;
  const response = await fetch(url);
}

function msgToServer(toSay) {
  fetch('http://127.0.0.1:5000/rconSay?say=' + toSay);
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


async function getLastTopFragger() {
  const response = await fetch('http://127.0.0.1:5000/latestTopFragger/');
  const body = await response.text();
  return body;
}

async function getInGamePlayerStats(steamId) {
  let url = 'http://127.0.0.1:5000/inGamePlayerStats?playerId=';
  url += steamId;
  const response = await fetch(url);
  const body = await response.text();
  return body;
}

async function getLastPugStats() {
  const response = await fetch('http://127.0.0.1:5000/latestPugStats/');
  const body = await response.text();
  return body;
}

async function populatePugDemoLinks() {
  const response = await fetch('http://127.0.0.1:5000/populatePugDemoLinks/');
}


async function isInServer(player) {
    const playerName = await getNickName(player);
    const response = await fetch('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='+config.steamDevKey+'&steamids='+player);
    const body = await response.json();
    if (body) {  
        const currentIp = body.response.players[0]['gameserverip'];
        if (currentIp) {
          if (currentIp === '162.248.93.11:27015') {
            return true;
          } else {      
            return false;
          }
        } else { // * this should use the new method of checking server status - too many false positives checking name
        //  var playerNamesList = await getPlayerNameList();
        //    for (let i = 0; i < playerNamesList.length; i++) {
        //      let name = playerNamesList[i].toLowerCase();
         //     if (name == '') {
        //        continue;
        //      }
        //      if (name.includes(playerName) || playerName.includes(name)) {
        //        console.log('matched '+name+' and '+playerName+' for is in server check');
        //        return true;
        //      }
        //    }
       //     return false;
        }
    }
    return false;
  }


class Queue {
  constructor() {
    this.list = [];
    this.lastSkipped = '';
    this.lastKillerStr = '';
  }


// this needs to check steam id rather than name to prevent duplicate issues
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

  setLastKillerStr(killer) {
    this.lastKillerStr = killer;
  }

  getLastKillerStr() {
    return this.lastKillerStr;
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
    if (this.isEmpty()) { 
        return "LINE IS EMPTY, type !add to join";
    } else if (this.list.length == 1) {
        return this.list[0] + " > ";
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

  move(player, slot) {
    var old_index = this.list.findIndex((element) => element == player);
    this.list.splice(slot-1, 0, this.list.splice(old_index, 1)[0]);
  }

  insert(player) { // add to end of line

  }

  insert(player, slot) { // add to slot position
    
  }

  remove(player) {

  }

}

var list = new Queue();