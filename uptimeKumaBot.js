require('dotenv').config({ path: 'variables.env' });
const config = require('./config');
const fetch = require("node-fetch");
const SteamUser = require('steam-user');
const SteamAPI = require('steamapi');
const steam = new SteamAPI(config.steamDevKey);
const SteamTotp = require('steam-totp');

const client = new SteamUser();
var backendFailure = false;
var statsFailure = false;
var chatBotFailure = false;
var gameServerFailure = false;
var websiteFailure = false;

process.on('uncaughtException', function (err) {
  console.log('UNCAUGHT EXCEPTION - staying alive - '+ err.message); 
  process.nextTick(() => {sendMsg(globalGroupId, globalChatId, "Execution failed, try again")});
}); 

process.on('error', function (err) {
  console.log('CAUGHT error  - staying alive - '+ err.message); 
  process.nextTick(() => {sendMsg(globalGroupId, globalChatId, "Execution failed, try again")});
}); 

const nameToSteamIdObj = new Map();

var playerCalledNext = new Map();

var executing = false;

var globalGroupId = 15910469;
var globalChatId = 52667214;

const logInOptions = {
  accountName: config.uptimeKumaAccountName,
  password: config.password,
  twoFactorCode: SteamTotp.generateAuthCode(config.uptimeKumaSharedSecret)
};

client.logOn(logInOptions);

client.on('loggedOn', () => {
  console.log('Uptime Kuma Bot logged on');

  client.setPersona(SteamUser.EPersonaState.Online, config.uptimeKamaUsername);
  client.chat.sendChatMessage(globalGroupId, globalChatId, "Service Bot Online", function(err, result){ 
    if(err){ 
        console.log(' caught at init') 
  //      var exec = require('child_process').exec;
    }});
});


setInterval(async () => {
  let headers = new fetch.Headers();
    headers.set('Authorization', 'Basic ' + Buffer.from(":" + "uk1_19OetFX1JkN2H8YGPIqjO7cY6Q0Y9Yx3U0e7InlD").toString('base64'));
    const metrics = await fetch('http://socalpug.com:3001/metrics', {method:'GET', headers: headers});
    const m = await metrics.text();
    const blocks = m.split("# TYPE monitor_status gauge");
    const data = blocks[1].split('\n');
    for (const s of data) {
        if (s.length == 0) {
            continue;
        } else {
            const chunks = s.split(' ');
            if (chunks.length < 2) {
                continue;
            } else {
                var monitor = chunks[0];
                var nameBlock = monitor.split("monitor_status{monitor_name=");
                if (nameBlock.length < 2) {
                    continue;
                } else {
                    if (nameBlock.length < 2) {
                        continue;
                    } else {
                        var name = nameBlock[1].split('"');
                        var trueName = name[1];
                    }
                    var status = chunks[1];
                    if (status == '1') {
                      if (trueName == 'Stats_Recorder') {
                        if (statsFailure == true) {
                          statsFailure = false;
                          sendMsg(globalGroupId, globalChatId, "*** In-Game Stats Recorder is back up ***");
                        }
                      } else if (trueName == 'Backend_API') {
                          if (backendFailure == true) {
                            backendFailure = false;
                            sendMsg(globalGroupId, globalChatId, "*** Backend API is back up ***");
                          }
                      } else if (trueName == 'Steam_Chatbot') {
                          if (chatBotFailure == true) {
                            chatBotFailure = false;
                            sendMsg(globalGroupId, globalChatId, "*** Steam Chat Line Bot is back up ***");
                          }
                      } else if (trueName == 'Game_Server') {
                          if (gameServerFailure == true) {
                            gameServerFailure = false;
                            sendMsg(globalGroupId, globalChatId, "*** 1.6 Game Server is back up ***");
                          }
                      } else if (trueName == 'Website') {
                        if (websiteFailure == true) {
                          websiteFailure = false;
                          sendMsg(globalGroupId, globalChatId, "*** www.socalpug.com is back up ***");
                        }
                      }
                    } else if (status == '0') {
                      if (trueName == 'Stats_Recorder') {
                          if (statsFailure == false) {
                            statsFailure = true;
                            const response = await fetch('http://127.0.0.1:5000/matchData/');
                            const body = await response.text();
                            if (body) {
                              const arr = body.replace(/["()\n ]+/g, '').split(',');
                              if (arr[0] == 'False') {
                                sendMsg(globalGroupId, globalChatId, "*** In-Game Stats Recorder is DOWN - to reset it use !restart stats ***");
                              } else {
                                sendMsg(globalGroupId, globalChatId, "*** In-Game Stats Recorder is DOWN and a pug is currently LIVE - to resume recording the current pug, use !restart livestats ***");
                              }
                            } else {
                              sendMsg(globalGroupId, globalChatId, "*** In-Game Stats Recorder is DOWN - to reset it use !restart stats ***");
                            }
                          }
                      } else if (trueName == 'Backend_API') {
                          if (backendFailure == false) {
                            backendFailure = true;
                            sendMsg(globalGroupId, globalChatId, "*** Backend API is DOWN - to reset it use !restart backend ***");
                          }
                      } else if (trueName == 'Steam_Chatbot') {
                          if (chatBotFailure == false) {
                            chatBotFailure = true;
                            sendMsg(globalGroupId, globalChatId, "*** Steam Chat Line Bot is DOWN  - to reset it use !restart chatbot  ***");
                          }
                      } else if (trueName == 'Game_Server') {
                          if (gameServerFailure == false) {
                            gameServerFailure = true;
                            sendMsg(globalGroupId, globalChatId, "*** 1.6 Game Server is DOWN ***");
                          }
                      } else if (trueName == 'Website') {
                        if (websiteFailure == false) {
                          websiteFailure = true;
                          sendMsg(globalGroupId, globalChatId, "*** www.socalpug.com is DOWN - to reset it use !restart website ***");
                        }
                      }
                    }
                }
            }
        }
    }
}, 30000);

function includes(message, arr) {
  if (!message)
    return false;
  cmds = message.split(" ");
  // debugging:
  //console.log('cmds:');
  //for (let i = 0; i < cmds.length; i++) {
  //  console.log(cmds[i]);
 // }
  //
  for (let i = 0; i < arr.length; i++) {
    if (cmds[0].toLowerCase() == arr[i]) {
      return cmds;
    }
  }
  return false;
}


client.chat.on('chatMessage', function(msgObj) {

  try {
      let steamidObj = msgObj.steamid_sender,
        message = msgObj.message,
        accountid = msgObj.accountid,
        mentions = msgObj.mentions;
      let groupId = msgObj.chat_group_id,
        chatId = msgObj.chat_id,
        serverTimestamp = msgObj.server_timestamp,
        ordinal = msgObj.ordinal;

    
  let uptimeKumaCommand = includes(message, config.uptimeKumaCommands);
  
    if (message) {
      if (ordinal > 0) {

      } else {
        if (uptimeKumaCommand) {
            output(steamidObj, groupId, chatId, uptimeKumaCommand, serverTimestamp, ordinal);
        } else if (message.length > 1 && message.charAt(0) == "!") {
          sendMsg(groupId, chatId, "Unknown command: "+message+". Use !link to get a link to the services dashboard.");
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
});


async function sendMsg(groupId, chatId, msgToSend) {
    if (msgToSend.length < 1)
      return;
    if (!executing) {
      executing = true;
      setTimeout(() => {
           client.chat.sendChatMessage(groupId, chatId, msgToSend, function(err, result){ 
            if(err){ 
                console.log('finally caught this') 
                var exec = require('child_process').exec;

                exec('pm2 restart uptimeKumaBot --time',
                function (error, stdout, stderr) {
                    console.log('stdout: ' + stdout);
                    console.log('stderr: ' + stderr);
                    if (error !== null) {
                        sendMsg(groupId, chatId, "Error: "+error);
                    } else {
                      console.log('Restarted bot upon error');
                    }
                });
            }
        });
          executing = false;
      }, 1700);
    }  else {
      console.log('skipping '+msgToSend);
      console.log('already executing'); 
    }
}

// maybe make a !restart service command to just restart from here
async function output(steamidObj, groupId, chatId, cmds, serverTimestamp, ordinal) {

    var command = cmds[0].toLowerCase();
    if (command === '!link') {
      try {
        sendMsg(groupId, chatId, "http://www.socalpug.com:3001/status/services");
      } catch (error) {
        console.log('do we catch??')
        sendMsg(groupId, chatId, "Try again");
      }
    } else if (command === '!restart') {
        var exec = require('child_process').exec;
        if (cmds[1].toLowerCase() == 'backend') {
          if (backendFailure == true) {
            exec('pm2 restart backend --time',
            function (error, stdout, stderr) {
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                    sendMsg(groupId, chatId, "Error: "+error);
                } else {
                  sendMsg(groupId, chatId, "Restarted backend API");
                }
            });
          } else {
            sendMsg(groupId, chatId, "Backend is not currently down. Skipping restart");
          }
        } else if (cmds[1].toLowerCase() == 'website') {
            if (websiteFailure == true) {
              exec('pm2 restart backend --time; pm2 restart frontend --time',
              function (error, stdout, stderr) {
                  console.log('stdout: ' + stdout);
                  console.log('stderr: ' + stderr);
                  if (error !== null) {
                      sendMsg(groupId, chatId, "Error: "+error);
                  } else {
                    sendMsg(groupId, chatId, "Restarted website");
                  }
              });
            } else {
              sendMsg(groupId, chatId, "Website is not currently down. Skipping restart");
            }
        } else if (cmds[1].toLowerCase() == 'chatbot') {
            if (chatBotFailure == true) {
              exec('pm2 restart chatbot --time',
              function (error, stdout, stderr) {
                  console.log('stdout: ' + stdout);
                  console.log('stderr: ' + stderr);
                  if (error !== null) {
                      sendMsg(groupId, chatId, "Error: "+error);
                  } else {
                    sendMsg(groupId, chatId, "Restarted line bot");
                  }
              });
            } else {
              sendMsg(groupId, chatId, "Chatbot is not currently down. Skipping restart");
            }
        } else if (cmds[1].toLowerCase() == 'stats') {
          if (statsFailure == true) {
            exec('pm2 restart serverStatsListener --time -- -1',
            function (error, stdout, stderr) {
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                  sendMsg(groupId, chatId, "Error: "+error);
                } else {
                  sendMsg(groupId, chatId, "Restarted stats listener");
                }
            });
          } else {
            sendMsg(groupId, chatId, "Stats listener is not currently down. Skipping restart");
          }
        } else if (cmds[1].toLowerCase() == 'livestats') {
          const response = await fetch('http://127.0.0.1:5000/matchData/');
          const body = await response.text();
          if (body) {
            const arr = body.replace(/["()\n ]+/g, '').split(',');
            if (arr[0] == 'False') {
              sendMsg(globalGroupId, globalChatId, "*** Pug is not live.  !restart livestats should only be used when the stats listener crashes during a pug and the game is still live ***");
            } else {
              const pugIdResponse = await fetch('http://127.0.0.1:5000/livePugId/');
              const pugId = await pugIdResponse.text();
              pugId = pugId.replace(/["]+/g, '')
              exec('pm2 restart serverStatsListener --time -- '+pugId,
              function (error, stdout, stderr) {
                  console.log('stdout: ' + stdout);
                  console.log('stderr: ' + stderr);
                  if (error !== null) {
                    sendMsg(groupId, chatId, "Error: "+error);
                  } else {
                    sendMsg(groupId, chatId, "Restarted stats listener for live pug id "+pugId);
                  }
              });
            }
          } 
        }
    }
   
 }