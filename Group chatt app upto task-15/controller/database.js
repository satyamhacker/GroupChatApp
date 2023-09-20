const sequelize = require('../models/sequelize');

const User = require('../models/User');

const ChatMessage = require('../models/chatMessage');

const usergroup = require('../models/group');
const multer = require('multer');


const bcrypt = require('bcrypt');


const jwtmiddleware = require('./jwtmiddleware');



// for signup;
const signupcreate = async (req, res) => {
  const { name, email, password } = req.body;

   const phonenumber = req.body.phonenumber.toString(); // Ensure phonenumber is treated as a string


  try {
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'name, email, password are required' });
    }

    // Check if email already exists
    const emailCount = await User.count({ where: { email } });
    if (emailCount > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      phonenumber,
      password: hashedPassword,
    });

    console.log('User created successfully');
    return res.status(201).json({ message: 'User created', insertedId: newUser.id });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Error creating user' });
  }
};

///for login;

// var loginuserid;
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input: Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    // Check if the user was found in the database
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let username = await User.findOne({ where: {email}});

    username = username.name;

    // Compare the provided password with the stored hashed password using bcrypt
    const passwordMatches = await bcrypt.compare(password, user.password);

    // If passwords do not match, return an unauthorized status
    if (!passwordMatches) {
      return res.status(401).json({ message: 'Wrong password' });
    }

    // If login is successful, log a message and return the user's id
    console.log('Login successful');
    const userId = user.id;

    const encoded_jwt_token = jwtmiddleware.jwt_encode(userId);

    return res.status(200).json({ message: 'Login successful', encoded_jwt_token, username });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'Error during login' });
  }
};




const addChatMessage = async (req, res) => {

  try {

    const { jwt_encoded_token, message, username } = req.body;

    // Decode the JWT token
    const jwt_decoded_token = jwtmiddleware.jwt_decode(jwt_encoded_token);

    // Create the chat message
    const createdMessage = await ChatMessage.create({
      messages: username+":--->"+message,
      loginuserid: jwt_decoded_token.userId,
    });

    console.log('Message added to the database');
    return res.status(201).json({ message: 'Message added to the database' });
  } catch (error) {
    console.error('Error adding message:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }

};




// Fetch all expenses for a user

const readmessages = async (req, res) => {
  const {jwt_encoded_token } = req.body;

  try {
    const jwt_decoded_token = jwtmiddleware.jwt_decode(jwt_encoded_token);

    const loginuserid = jwt_decoded_token.userId;

      var  messages = await ChatMessage.findAll({
        where: { loginuserid },
      });
    console.log('Messages fetched successfully');
    return res.status(200).json({ messages });
  } catch (error) {
    console.error('Error during fetching expenses:', error);
    return res.status(500).json({ error: 'Error during fetching expenses' });
  }

};



const allsignupusername = async (req, res) =>{

  const {jwt_encoded_token } = req.body;

  try {

      var  allusernames = await User.findAll({
        attributes: ['name'],
      });
    console.log('All usernames fetched successfully');

    return res.status(200).json({ allusernames });

  } catch (error) {
    console.error('Error during fetching expenses:', error);

    return res.status(500).json({ error: 'Error during fetching all usernames' });

  }


};


const adduseringroup = async(req, res)=>{

      const {jwt_encoded_token, username_to_addin_group, groupname, username} = req.body;

          //  console.log('test', groupname)

          //   console.log('username', username)

          //   console.log(username_to_addin_group,groupname)

          try{

              let  groupowner_name_from_database = await usergroup.findOne({
                where: { groupname:groupname },
                attributes: ['groupowner'],

              });

             if(groupowner_name_from_database==null)
              {
                const adduseringroup = await usergroup.create({
                  groupname: groupname,
                  groupowner:username,
                  username: username_to_addin_group,
                  message: username_to_addin_group+" "+"Added in group",
                });
                console.log('user added in group successfully');
      
                return res.status(200).json({ adduseringroup });
              }

              else if(username==groupowner_name_from_database.groupowner)
              {

                const adduseringroup = await usergroup.create({
                  groupname: groupname,
                  groupowner:username,
                  username: username_to_addin_group,
                  message: username_to_addin_group+" "+"Added in group",
                });
                console.log('user added in group successfully');
      
                return res.status(200).json({ adduseringroup });
              }
              
              else
              {
                return res.status(500).json({ error: 'unauthorized' });
              }

            
          }
          catch(error)
          {

            console.log('its error', error)

            // const adduseringroup = await usergroup.create({
            //   groupname: groupname,
            //   groupowner:username,
            //   username: username_to_addin_group,
            //   message: username_to_addin_group+" "+"Added in group",
            // });
            // console.log('user added in group successfully');
  
            // return res.status(200).json({ adduseringroup });

            
          }




       

}


const fetchallusersofgivengroup = async (req, res)=>{

  const {jwt_encoded_token, groupname} = req.body;

  //console.log(groupname)
        try {

            let  allusernames_from_specific_group = await usergroup.findAll({

              where: { groupname:groupname },
               attributes: ['username'],
            });

          console.log('user added in group successfully');

          //console.log(allusernames_from_specific_group)

          return res.status(200).json({ allusernames_from_specific_group });

        } catch (error) {
          console.error('Error during fetching expenses:', error);

          return res.status(500).json({ error: 'Error during fetching all usernames' });

        }


}

const deletegroup = async (req, res)=>{

  const {jwt_encoded_token, groupname_to_delete, username} = req.body;

  console.log(groupname_to_delete)

      try {

        let  group_owner_name = await usergroup.findOne({

          where: { groupname: groupname_to_delete },
           attributes: ['groupowner'],
        });

        console.log('username', username)

       let  groupowner_name_from_database = group_owner_name.groupowner;

        //console.log('groupownername', group_owner_name.groupowner)
        // console.log(group_owner_name)

        if(username==groupowner_name_from_database)
        {
          //console.log('found');
          
          const deletegroup =  await usergroup.destroy({
            where: {
              groupname: groupname_to_delete, // Specify the condition for deletion
            },
          });

          console.log(' group deleted successfully');

          return res.status(200).json({ deletegroup });

        }
        else
        {
          return res.status(500).json({ error: 'unauthorized' });
        }
        


      } catch (error) {
        console.error('Error deleting group:', error);

        return res.status(500).json({ error: 'Error deleting group' });

      }
}

const fetchAllGroupsCreatedByLoggedinUser = async (req, res)=>{

  const {jwt_encoded_token, groupowner} = req.body;

  //console.log(groupowner)

        try {

          const uniqueGroupNames = await usergroup.findAll({
            attributes: [[sequelize.fn('DISTINCT', sequelize.col('groupname')), 'groupname']],
            //where: { groupowner: groupowner },
          });
          
          //console.log('Unique Group Names:', uniqueGroupNames.map((row) => row.groupname));

          //console.log('test', uniqueGroupNames[0].groupname)

         return res.status(200).json({ uniqueGroupNames });

       } catch (error) {
        console.error('Error fetching group_owner_name:', error);

        return res.status(500).json({ error: 'Error fetching group_owner_name' });

       }




}




const fetchSpecificgroupMessages = async (req, res)=>{

  const {jwt_encoded_token, username, groupname, message, } = req.body;

  //console.log(groupname)

     try{


          

             let  checking_username_ispartof_groupornot = await usergroup.findAll({
                where: { groupname:groupname },
  
              });

              // console.log(checking_username_ispartof_groupornot[0].username)

               for(let i=0;i<checking_username_ispartof_groupornot.length;i++)
               {
                  if(username==checking_username_ispartof_groupornot[i].username)
                  {
                    console.log('found')

                    let  fethcing_allmessages_from_groupname = await usergroup.findAll({

                      where: { groupname:groupname },
                      attributes: ['message'],
                    });

                    //console.log(fethcing_allmessages_from_groupname)

                    return res.status(200).json({ fethcing_allmessages_from_groupname });

                  }
              
               }

               return res.status(500).json({ error: 'unauthorized' });

     } 
  
  
      catch (error) {
        console.error('Error during fetching expenses:', error);

        return res.status(500).json({ error: 'Error during fetching all usernames' });

      }

  
};


const savegroupchatmessages = async(req, res)=>{

  const {jwt_encoded_token, username, groupname, message, } = req.body;

      try{

        let  save_group_message_todatabase = await usergroup.create({

          username: username,
          groupname: groupname,
          groupowner: " ",
          message: username+":--->"+message,
           
        });

        //console.log(fethcing_allmessages_from_groupname)

        return res.status(200).json({ save_group_message_todatabase });

      } catch (error) {
        console.error('Error during  saving group message to database:', error);

        return res.status(500).json({ error: 'Error during  saving group message to database' });

      }




};

const deleteuserfromgroup = async(req, res)=>{

           const {jwt_encoded_token, username, groupname } = req.body;

            try{

                  try{

                    let  checking_username_isadmin = await usergroup.findOne({
                      where: { groupname:groupname },
                      where: { username:username},

                    });

                    console.log(checking_username_isadmin.username)

                      
                        if(username==checking_username_isadmin.username)
                        {

                          const delete_user_from_group =  await usergroup.destroy({
                            where: {
                              username: username, // Specify the condition for deletion
                            },
                          });

                          return res.status(200).json({ delete_user_from_group });
                        }
                        else
                        {
                          return res.status(500).json({ error: 'unauthorized' });
                        }

                  }
                  catch(error){
                    return res.status(500).json({ error: 'unauthorized' });
                  }

            }
            catch (error) {
              console.error('Error deleting user from group:', error);
              
              return res.status(500).json({ error: 'Error deleting user from group' });
              
              }
          
}




 // Set up multer storage and specify where to store uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Rename files with a timestamp
  },
});

const upload = multer({ storage: storage });




const fileupload = (req, res) =>{

  // Access the uploaded file information from req.file
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Process the uploaded file here (e.g., save it to a database or perform other operations)

  res.status(200).send('File uploaded successfully.');
};




module.exports = {
  signupcreate,
  login,
  addChatMessage,
  readmessages,
  allsignupusername,
  adduseringroup,
  fetchallusersofgivengroup,
  deletegroup,
  fetchAllGroupsCreatedByLoggedinUser,
  fetchSpecificgroupMessages,
  savegroupchatmessages,
  deleteuserfromgroup,
  fileupload,
  upload,

};

