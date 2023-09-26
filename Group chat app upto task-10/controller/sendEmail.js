const Sib = require('sib-api-v3-sdk');
const jwtmiddleware = require('./jwtmiddleware');
const {v4 : uuidv4} = require('uuid');


const ForgetPasswordRequest = require('../models/ForgetPasswordRequest');





const sendemail = async (req, res) => {

    const { email, jwttoken } = req.body;

    const randomuuid = uuidv4();
    
    const decodedjwttoken = jwtmiddleware.jwt_decode(jwttoken);
    const userid = decodedjwttoken.userId;

    // Create a forget password request using Sequelize
    await ForgetPasswordRequest.create({
      uuid: randomuuid,
      userid: userid,
      isactive: true,
    });



      try {
        const client = Sib.ApiClient.instance;
        const apiKey = client.authentications['api-key'];
        apiKey.apiKey =
          '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';

        const tranEmailApi = new Sib.TransactionalEmailsApi();
        const sender = {
          email: 'sharpner@gmail.com',
          name: 'Expense Tracker',
        };
        const receivers = [
          {
            email: email,
          },
        ];

        const result = await tranEmailApi.sendTransacEmail({
          sender,
          to: receivers,
          subject: 'Sharpner Project',
          textContent: `
                from expenseTracker
            `,
            htmlContent: `
            <p>Your expenseTracker Reset password email</p>
            <p>Click <a href="http://localhost:3000/password/resetpassword/${randomuuid}">here</a> to reset your password.</p>
          `,
          params: {
            role: 'Frontend',
          },
        });

        //console.log(result);
        // You might want to send a response to the client indicating the success or completion.
        res.status(200).json({ message: 'Email sent successfully.' });
      } catch (error) {
        console.error(error);
        // Handle the error appropriately and send an error response to the client.
        res.status(500).json({ error: 'An error occurred while sending the email.' });
      }


};

module.exports = {
  sendemail,
};
