# socal pug LINE bot
This Steam group chat bot is used to track the line of players for the Socal Pug 66.165.238.178:27018  

Line commands:
- **!line** Show the current line
- **!add** Add yourself to the back of the line
- **!remove** Remove yourself from the line 
- **!next** Alert the next player that it's their turn to join - this will start a 70 second timer.  If they join the server, the bot will automatically remove them fron the front of the line  
- **!skip** *Don't abuse this* - Remove whoever is in front of the line. This is only to be used on people who are AFK when it's their turn or they're already in the server
- **!replace** This is an "undo" for !skip. Put whoever was last skipped back in front of the line
  
    

TODO:
- Attempt to detect player in server even if they are on invisible / offline mode
- More admin commands (rearrange the line, add anyone to any spot in the line, remove anyone from any spot in the line)
