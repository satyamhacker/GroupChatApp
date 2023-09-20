        // Function to fetch and display JSON data

        //accessing input data value;
        
        var emailid = document.getElementById('email');
        var passwordid = document.getElementById('password');
        
        var buttonid = document.getElementById('button');

        
        buttonid.addEventListener('click', login);
        
    function login(e)
    {
      e.preventDefault(); // Prevent the default form submission
       //saving data to backend;

      async function save_to_database() {
        const userData = {
          email: emailid.value,
          password: passwordid.value,
        };
        try {
          const response = await fetch('/login-create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
          const data = await response.json();
          console.log(data); // Log the response data from the server

          //saving jwt token in localstorage;
          localStorage.setItem('jwt_token', data.encoded_jwt_token);
          localStorage.setItem('username', data.username);
         //console.log(data.encoded_jwt_token);

          if(data.message=="User not found"){
            alert('User not found');

          }

          if(data.message=="Login successful"){
            alert('Login successful');
            window.location.href = "chat.html";
          }

          if(data.message=="Wrong password"){
            alert('Wrong password');

          }

        } catch (error) {
          console.error('Error:', error);
        }
      }
      save_to_database();        
   }

