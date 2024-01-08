module.exports = {
    accountName: process.env.ACCOUNT_NAME,
    password: process.env.ACCOUNT_PASSWORD,
    sharedSecret: process.env.SHARED_SECRET,
    steamDevKey: process.env.STEAM_DEV_KEY,
    
    lineCommands: [`!line`, `!add`, `!remove`, `!next`, `!commands`, `!need`, `!skip`, `!replace`],
    globalCommands: [`!help`, `!website`, '!demos', `!server`, `!topkills`],
    adminCommands: [`!clearline`, `!front`, `!remove`, `!back`, `!move`],
    admins: [`76561198066211934`, // me
    `76561198003180679`, // bzy
    `76561198256027147`, // chris
    `uniquebadass`, // blade
    `76561198011059931`, // jammin 
    `76561198172314310`, // joker
    `efezeta`, // fz these custon names don't work
    `wowalex`, // al these custon names don't work
    `76561197990284066`, // amorfy
    `76561197989353212`, // bong
    `697917`], // j
    publicUsername: `LINE`,
    inGameName: `LINE`
  };
