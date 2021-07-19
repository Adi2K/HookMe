# HookMe
A service for managing and Triggering Webhooks. 

## How to Run 
You will need a (free) MongoDB account <br>
(https://www.mongodb.com/)

1) Deploy a new Cluster if you dont have one already
2) Click on Connect in your Database 
3) In Connection Method Select Connect To Your Application
4) For Drivers Select Node.js with latest version
5) Copy the connection string which should look like : <br>
      mongodb+srv://<Username>:<password>@<Projectname>.xwplp.mongodb.net/DatabaseName?retryWrites=true&w=majority <br>
      (Replace Username and Password etc. here )
6) Now make a .env file in the project directory with this string as MDB_CONNECT <br>
   example .env file <br>
   MDB_CONNECT=mongodb+srv://User1:Password@123@Projects.xwplp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
7) Now 
  > npm install <br>
  > npm run start <br>
 
### Voila You have your Server Up an Running ! 
