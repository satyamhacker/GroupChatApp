        // Function to fetch and display JSON data

        //accessing input data value;
        
        var nameid = document.getElementById('name');
        var emailid = document.getElementById('email');
        var phonenumberid = document.getElementById('phonenumber')
        var passwordid = document.getElementById('password');

        
        var buttonid = document.getElementById('button');
        
        buttonid.addEventListener('click', save_signup_data);
        
    function save_signup_data(e)
    {
      e.preventDefault(); // Prevent the default form submission
       //saving data to backend;

      async function save_to_database() {
        const userData = {
          name: nameid.value,
          email: emailid.value,
          phonenumber: phonenumberid.value,
          password: passwordid.value,
        };
        try {
          const response = await fetch('/signup-create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
          const data = await response.json();
          console.log(data.message); // Log the response data from the server

          if(data.message=="User created"){
            alert('User created');
            window.location.reload();
          }

          else if(data.message=="Email already exists"){
            alert('Email already exists');
            window.location.reload();

          }


        } catch (error) {
          console.error('Error:', error);
        }
      }
      save_to_database(); 
                 
   }

