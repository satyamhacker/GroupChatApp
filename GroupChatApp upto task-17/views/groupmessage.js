
var messageInputBoxid = document.getElementById('inputmessage');

var sendmessagebuttonid = document.getElementById('sendmessage');


// sendmessagebuttonid.addEventListener('click', showMessage);

var username = localStorage.getItem('username');
var jwttoken = localStorage.getItem('jwt_token');


////websocket codes;


const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', (event) => {
  console.log('Connected to the server via WebSocket');
});

socket.addEventListener('message', (event) => {
  const message = event.data;

  console.error('test', message)

  displayMessage(message);
});

sendmessagebuttonid.addEventListener('click', () => {
  
  const message = messageInputBoxid.value;

  // Send the message to the server
  socket.send(username+":--->"+message);

  // Clear the input field
  // messageInput.value = '';
});




function displayMessage(message) {

   // Create a new list item
   var listItem = document.createElement("li");

   // Add content to the list item
   listItem.textContent = message;

   // Get the ul element by its id
   var ulElement = document.getElementById("allMessagesofgroup");

   // Append the new list item to the ul
   ulElement.appendChild(listItem);

   saveChatMessagesToDatabase();



}



// function showMessage(){
   
//     // Create a new list item
//     var listItem = document.createElement("li");

//     // Add content to the list item
//     listItem.textContent = username+":--->"+messageInputBoxid.value;

//     // Get the ul element by its id
//     var ulElement = document.getElementById("allMessagesofgroup");

//     // Append the new list item to the ul
//     ulElement.appendChild(listItem);

// }

function saveChatMessagesToDatabase() {

  let groupname = Accessinggroupname_fromurl_tofetch_allmessages()

  fetch('/savegroupchatmessages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jwt_encoded_token: jwttoken,
      groupname: groupname,
      message: messageInputBoxid.value,
      username: username,
    }),
  })
    .then(response => response.json())
    .then(data => {
      //console.log('Message saved to database:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


function Accessinggroupname_fromurl_tofetch_allmessages(){

                // Get the URLSearchParams object from the URL
            const urlSearchParams = new URLSearchParams(window.location.search);

            // Get the value of the 'groupname' query parameter
            const groupname = urlSearchParams.get('groupname');

            // Check if 'groupname' exists and do something with it
            if (groupname) {
          //  console.log('Group Name:', groupname);

            return groupname;

            // fetch_And_Display_group_Messages(groupname);

            // // You can now use the 'groupname' value in your page
            // } 
      }
}


function fetch_And_Display_group_Messages(){

    let groupname = Accessinggroupname_fromurl_tofetch_allmessages() 


    fetch('/fetchSpecificgroupMessages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jwt_encoded_token: jwttoken,
          username:username,
          groupname: groupname,
        }),
      })
        .then(response => response.json())
        .then(data => {
         // console.log('all specific Group Messages fetched from database:');

         // console.log(data)

          if(data.error=='unauthorized')
          {
            alert("you are not the member of this group you can't see this group messages")
          }

          else
          {
            for(let i=0;i<data.fethcing_allmessages_from_groupname.length;i++)
            {
             // Create a new list item
             let listItem = document.createElement("li");
 
             // Get the ul element by its id
             let ulElement = document.getElementById("allMessagesofgroup");
 
             listItem.textContent = data.fethcing_allmessages_from_groupname[i].message;
 
             // Append the new list item to the ul
             ulElement.appendChild(listItem);
 
             }

          }

        })
        .catch(error => {
          console.error('Error:', error);
        });

        

}





window.onload =  function() {
        Accessinggroupname_fromurl_tofetch_allmessages();
        fetch_And_Display_group_Messages()
}

