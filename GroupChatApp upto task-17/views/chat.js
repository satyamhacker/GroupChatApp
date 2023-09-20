
var allMessagesShowLiid = document.getElementById('allMessagesShow');

var messageInputBoxid = document.getElementById('inputmessage');

var sendmessagebuttonid = document.getElementById('sendmessage');

var groupname_input_boxid = document.getElementById('Groupname');

var groupnamebuttonid = document.getElementById('Groupnamebutton')

var allgroupnameshowid = document.getElementById('allGroupnameShow');

groupnamebuttonid.addEventListener('click', create_group);

sendmessagebuttonid.addEventListener('click', showMessage);

var username = localStorage.getItem('username');
var jwttoken = localStorage.getItem('jwt_token');


function showMessage(){


        
            // Create a new list item
            var listItem = document.createElement("li");
    
            // Add content to the list item
            listItem.textContent = username+":--->"+messageInputBoxid.value;
    
            // Get the ul element by its id
            var ulElement = document.getElementById("allMessagesShow");
    
            // Append the new list item to the ul
            ulElement.appendChild(listItem);
        
             
        saveChatMessagesToDatabase();

}

function create_group(){

              // Create a new list item
              let listItem = document.createElement("li");

              // Create a Show_users_button element
              let Show_users_button = document.createElement("button");

              let enter_group_chat_button = document.createElement('button');

              let delete_group_button = document.createElement('button');

              let add_users_button = document.createElement('button');

              add_users_button.textContent = "Add-users"

              delete_group_button.textContent = "Delete Group";

              enter_group_chat_button.textContent = "Enter Chat";

              Show_users_button.textContent = "Show Users of group"; 

              Show_users_button.id = 'showUSersButtonId';
              enter_group_chat_button.id = 'enterGroupChatButtonId';
              delete_group_button.id = 'deleteGroup';
              add_users_button.id = 'addUsers';

              Show_users_button.addEventListener("click", function (event) {

                let listItem = event.target.closest('li');

                let groupname = listItem.firstChild.textContent.trim()

                //console.log(groupname)

                show_user_of_group(groupname)
                
              });

              enter_group_chat_button.addEventListener('click', function (event){

                let listItem = event.target.closest('li');

                let groupname = listItem.firstChild.textContent.trim()

                console.log(groupname)

                //window.location.href = 'groupmessage.html';


              });

              delete_group_button.addEventListener('click', function(event){

                let listItem = event.target.closest('li');

                let groupname = listItem.firstChild.textContent.trim()

                delete_group(groupname)


              });

              add_users_button.addEventListener('click', function(event){

                let listItem = event.target.closest('li');

                let groupname = listItem.firstChild.textContent.trim()

                //console.log(groupname)

                show_users_to_addin_group(groupname);


              });

              // Add content to the list item
              listItem.textContent = groupname_input_boxid.value;

              // Get the ul element by its id
              let ulElement = document.getElementById("allGroupnameShow");

              // Append the new list item to the ul
              ulElement.appendChild(listItem);

              listItem.appendChild(Show_users_button);

              listItem.appendChild(enter_group_chat_button);

              listItem.appendChild(delete_group_button);

              listItem.appendChild(add_users_button)    

}



function delete_group(groupname){

  console.log(groupname)

  fetch('/deletegroup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jwt_encoded_token: jwttoken,
      groupname_to_delete: groupname,
      username: username,
    }),
  })
    .then(response => response.json())
    .then(data => {
      // console.log('group deleted successfully:');

      //console.log(data)

      //console.log(data.error=='unauthorized')

      if(data.error=='unauthorized')
      {
        alert("sorry you are not a admin")

      }
      else
      {
        
        window.location.reload()
      }



    })
    .catch(error => {
      console.error('Error:', error);
    });



}



function showing_all_groups_createdby_loggedin_user(){

  fetch('/fetchAllGroupsCreatedByLoggedinUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
       jwt_encoded_token: jwttoken,
       groupowner: username,
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(' all group fetched successfully:');

      //console.log(data.uniqueGroupNames)

      for(let i=0;i<data.uniqueGroupNames.length;i++)
      {

        
        // Create a new list item
        let listItem = document.createElement("li");

        // Create a Show_users_button element
        let Show_users_button = document.createElement("button");

        let enter_group_chat_button = document.createElement('button');

        let delete_group_button = document.createElement('button');

        let add_users_button = document.createElement('button');

        add_users_button.textContent = "Add-users"

        delete_group_button.textContent = "Delete Group";

        enter_group_chat_button.textContent = "Enter Chat";

        Show_users_button.textContent = "Show Users of group"; 

        Show_users_button.id = 'showUSersButtonId';
        enter_group_chat_button.id = 'enterGroupChatButtonId';
        delete_group_button.id = 'deleteGroup';
        add_users_button.id = 'addUsers';

        Show_users_button.addEventListener("click", function (event) {

          let listItem = event.target.closest('li');

          let groupname = listItem.firstChild.textContent.trim()

          console.log(groupname)

          show_user_of_group(groupname)
          
        });

        enter_group_chat_button.addEventListener('click', function (event){

          let listItem = event.target.closest('li');
          let groupname = listItem.firstChild.textContent.trim();
          const queryParams = `?groupname=${encodeURIComponent(groupname)}`; // Ensure proper URL encoding
      
          // Use the correct URL, including the query parameter
          window.location.href = '/groupmessage.html' + queryParams;


        });

        delete_group_button.addEventListener('click', function(event){

          let listItem = event.target.closest('li');

          let groupname = listItem.firstChild.textContent.trim()

          delete_group(groupname)


        });

        add_users_button.addEventListener('click', function(event){

          let listItem = event.target.closest('li');

          let groupname = listItem.firstChild.textContent.trim()

          show_users_to_addin_group(groupname);


        });

        // Add content to the list item
        listItem.textContent = data.uniqueGroupNames[i].groupname;

        // Get the ul element by its id
        let ulElement = document.getElementById("allGroupnameShow");

        // Append the new list item to the ul
        ulElement.appendChild(listItem);

        listItem.appendChild(Show_users_button);

        listItem.appendChild(enter_group_chat_button);

        listItem.appendChild(delete_group_button);

        listItem.appendChild(add_users_button)  

      }


    })
    .catch(error => {
      console.error('Error:', error);
    });

}



function show_user_of_group(groupname){

  console.log(groupname)

  fetch('/fetchallusersofgivengroup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jwt_encoded_token: jwttoken,
      groupname: groupname,
    }),
  })
    .then(response => response.json())
    .then(data => {

      console.log(data)

      for(let i=0;i<data.allusernames_from_specific_group.length;i++)
      {
            // Create a new list item
            var listItem = document.createElement("li");

            let delete_user_from_group_button = document.createElement('button');

            delete_user_from_group_button.textContent = "Delete user from this group";

            delete_user_from_group_button.addEventListener('click', function(event){

              let listItem = event.target.closest('li');

              let groupname = listItem.firstChild.textContent.trim()

              delete_user_from_group(groupname)

            });

            // Add content to the list item
            listItem.textContent = data.allusernames_from_specific_group[i].username;

            // Get the ul element by its id
            var ulElement = document.getElementById("showAllusersOfGroup");

            // Append the new list item to the ul
            ulElement.appendChild(listItem);

            listItem.appendChild(delete_user_from_group_button);

          }

    })
    .catch(error => {
      console.error('Error:', error);
    });



}

function delete_user_from_group(groupname){

          fetch('/deleteuserfromgroup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              jwt_encoded_token: jwttoken,
              groupname_to_delete: groupname,
              username: username,
            }),
          })
            .then(response => response.json())
            .then(data => {
              // console.log('group deleted successfully:');

              //console.log(data)

              //console.log(data.error=='unauthorized')

              if(data.error=='unauthorized')
              {
                alert("sorry you are not a admin")

              }
              else
              {
                alert('user deleted successfully');
                window.location.reload()
              }

            })
            .catch(error => {
              console.error('Error:', error);
            });

}


function show_users_to_addin_group(groupname){

  //console.log(groupname)

  fetch('/fetchallsignupusername', {
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

      //console.log(data.allusernames.length)

      for(let i=0;i<data.allusernames.length;i++)
      {
            // Create a new list item
            var listItem = document.createElement("li");

            let add_user_ingroup_button = document.createElement("button");

            add_user_ingroup_button.textContent = "Add-user in group"

            add_user_ingroup_button.id = 'adduseringroupbutton'

              
            // Add content to the list item
            listItem.textContent = data.allusernames[i].name;

            add_user_ingroup_button.addEventListener('click', function(event){

             // Get the ID of the clicked button

              // Get the parent <li> element of the clicked button
             let listItem = event.target.closest('li');

             

             //console.log(listItem)

              let username_to_addin_group = listItem.firstChild.textContent.trim()

              add_user_ingroup(username_to_addin_group, groupname); 

            });
            // Get the ul element by its id
            var ulElement = document.getElementById("showAllSignupUsers");
            // Append the new list item to the ul
            ulElement.appendChild(listItem);
            listItem.appendChild(add_user_ingroup_button)
      }
     
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function add_user_ingroup(username_to_addin_group, groupname){

  //console.log(username_to_addin_group)

      fetch('/adduseringroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jwt_encoded_token: jwttoken,
          username: username,
          groupname: groupname,
          username_to_addin_group: username_to_addin_group,
         
        }),
      })
        .then(response => response.json())
        .then(data => {

          if(data.error=='unauthorized')
          {
            alert("sorry you are not a admin")
    
          }
          else
          {
            
            window.location.reload()
          }

        })
        .catch(error => {
          console.error('Error:', error);
        });

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


window.onload = function() {
  fetchAndDisplayMessages();
  showing_all_groups_createdby_loggedin_user();
};






