# socal pug LINE bot
This Steam group chat bot is used to track the line of players for the Socal Pug 66.165.238.178:27018  

Line commands:
- **!line** Show the current line
- **!add** Add yourself to the back of the line
- **!remove** Remove yourself from the line 
- **!next** Alert the next player that it's their turn to join - this will start a 70 second timer.  If they join the server, the bot will automatically remove them fron the front of the line  
- **!skip** *Don't abuse this* - Remove whoever is in front of the line. This is only to be used on people who are AFK when it's their turn or they're already in the server
- **!replace** This is an "undo" for !skip. Put whoever was last skipped back in front of the line
- **!server** This will send a link (http://www.socalpug.com/join) to join the pug server using Steam browser protocol (https://developer.valvesoftware.com/wiki/Steam_browser_protocol). Your browser will ask for permission to use Steam Client Bootstrapper.  If you allow it, cs will launch and join the server
  
    

TODO:
- !add should check the playerCalledNext map to see if anyone is about to join.  If not, don't allow adding to line if server slots are open, just prompt to join instead
- More admin commands (rearrange the line, add anyone to any spot in the line, remove anyone from any spot in the line)
