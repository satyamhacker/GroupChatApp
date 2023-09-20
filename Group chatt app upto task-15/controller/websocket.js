////////server side websocket code

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const clients = new Set(); // Maintain a set of connected clients




wss.on('connection', (ws) => {
  console.log('Client connected');
  clients.add(ws);

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    
    // Send a response back to the client
    ws.send(`Server received: ${message}`);
    
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
      client.send(`Broadcast: ${message}`);
    }
  }
}









//////client side code 










const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', (event) => {
  console.log('Connected to the server via WebSocket');
});

socket.addEventListener('message', (event) => {
  const message = event.data;
  displayMessage(message);
});

document.getElementById('sendMessageButton').addEventListener('click', () => {
  const messageInput = document.getElementById('messageInput');
  const message = messageInput.value;

  // Send the message to the server
  socket.send(message);

  // Clear the input field
  messageInput.value = '';
});

function displayMessage(message) {
  const messageList = document.getElementById('messageList');
  const listItem = document.createElement('li');
  listItem.textContent = message;
  messageList.appendChild(listItem);
}
