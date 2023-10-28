module.exports = {
    accountName: process.env.ACCOUNT_NAME,
    password: process.env.ACCOUNT_PASSWORD,
    sharedSecret: process.env.SHARED_SECRET,
    steamDevKey: process.env.STEAM_DEV_KEY,
    
    commands: [`!line`, `!add`, `!remove`, `!next`, `!commands`, `!need`, `!skip`, `!replace`],
    adminCommands: [`!clearline`, `!front`, `!kick`, `!back`],
    admins: [`76561198066211934`, // me
    `76561198003180679`], // bzy
    publicUsername: `LINE`,
    inGameName: `LINE`
  };
  