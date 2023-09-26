
var allMessagesShowLiid = document.getElementById('allMessagesShow');

var messageInputBoxid = document.getElementById('inputmessage');

var sendmessagebuttonid = document.getElementById('sendmessage');

sendmessagebuttonid.addEventListener('click', message);

var username = localStorage.getItem('username');
var jwttoken = localStorage.getItem('jwt_token');


function message(){


        function showMessage(){
            // Create a new list item
            var listItem = document.createElement("li");
    
            // Add content to the list item
            listItem.textContent = username+":--->"+messageInputBoxid.value;
    
            // Get the ul element by its id
            var ulElement = document.getElementById("allMessagesShow");
    
            // Append the new list item to the ul
            ulElement.appendChild(listItem);
        
        }
        showMessage();      
        saveChatMessagesToDatabase();

}


function saveChatMessagesToDatabase() {

  fetch('/add-chatmessages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jwt_encoded_token: jwttoken,
      message: messageInputBoxid.value,
      username: username,
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Message saved to database:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


function fetchAndDisplayMessages() {
  fetch('/readmessages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jwt_encoded_token: jwttoken,
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Messages fetched from database:');

      const messages_converted_to_json = JSON.stringify(data.messages);

       localStorage.setItem('chat_messages', messages_converted_to_json);

       let locastorage_saved_messages = localStorage.getItem('chat_messages');

       // Parse the JSON string back to an object
       const parsedMessages = JSON.parse(locastorage_saved_messages);

       //console.log(parsedMessages.length)
      


      // Clear the existing messages in the list
      var ulElement = document.getElementById("allMessagesShow");
      ulElement.innerHTML = '';

      for (let i = 0; i < parsedMessages.length; i++) {
        // Create a new list item
        var listItem = document.createElement("li");

        // Add content to the list item
        listItem.textContent = parsedMessages[i].messages;

        // Get the ul element by its id
        ulElement.appendChild(listItem);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


window.onload = fetchAndDisplayMessages;







