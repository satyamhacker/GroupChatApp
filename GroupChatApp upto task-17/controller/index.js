const express = require('express');
const app = express();
const database = require('./database');
const showleaderboard = require('./showleaderboard');
const forgetpassword = require('./sendEmail');
const password = require('./passwordreset');
const expensedownload = require('./expensedownload');


////for websockets
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const cors = require('cors');
app.use(cors({ origin: '*' }));

app.use(express.json());


const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const clients = new Set(); // Maintain a set of connected clients

var currentDirPath = __dirname;

app.use(express.static(path.join(__dirname,'../', 'views')));


// WebSocket server code
wss.on('connection', (ws) => {
  console.log('Client connected');
  clients.add(ws);

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    
    // Send a response back to the client
    ws.send(`${message}`);
    
    // Broadcast the received message to all connected clients
    broadcast(message, ws);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });
});

function broadcast(message, sender) {
  for (const client of clients) {
    // Don't send the message back to the sender
    if (client !== sender) {
      client.send(`${message}`);
    }
  }
}




// Express server code
app.get('/', (req, res) => {
  //res.send('Hello, Express!');

  const indexfile = path.join(currentDirPath,'../views', 'signup.html');
  console.log('test')
  res.sendFile(indexfile)
});




app.post('/signup-create', database.signupcreate);

app.post('/login-create', database.login);

app.post('/add-chatmessages', database.addChatMessage);


app.post('/readmessages', database.readmessages);

app.post('/fetchallsignupusername', database.allsignupusername)

app.post('/adduseringroup', database.adduseringroup)

app.post('/fetchallusersofgivengroup', database.fetchallusersofgivengroup)

app.post('/deletegroup', database.deletegroup);

app.post('/fetchAllGroupsCreatedByLoggedinUser', database.fetchAllGroupsCreatedByLoggedinUser);

app.post('/fetchSpecificgroupMessages', database.fetchSpecificgroupMessages);

app.post('/savegroupchatmessages', database.savegroupchatmessages)

app.post('/deleteuserfromgroup', database.deleteuserfromgroup)

// Set up a route for file uploads
app.post('/upload', database.upload.single('file'), database.fileupload);




// //Start the server on port 80
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
