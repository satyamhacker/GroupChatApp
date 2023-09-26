const express = require('express');
const app = express();
const database = require('./database');
const showleaderboard = require('./showleaderboard');
const forgetpassword = require('./sendEmail');
const password = require('./passwordreset');
const expensedownload = require('./expensedownload');
const path = require('path');
const cors = require('cors');

var currentDirPath = __dirname;

app.use(cors({ origin: '*' }));

app.use(express.json());

app.use(express.static(path.join(__dirname,'../', 'views')));

app.get('/', (req, res) => {
  const indexfile = path.join(currentDirPath,'../views', 'signup.html');
  res.sendFile(indexfile);
});


app.post('/signup-create', database.signupcreate);

app.post('/login-create', database.login);

app.post('/add-chatmessages', database.addChatMessage);


 app.post('/readmessages', database.readmessages);
// app.delete('/deleteuserexpense/:id', database.deleteuserexpense);
// app.post('/createorder', database.createorder);
// app.post('/update-order-status', database.updateorderstatus);
// app.post('/ispremium', database.check_user_is_premium);
// app.post('/showleaderboard', showleaderboard.showleaderboard);
// app.post('/password/forgotpassword', forgetpassword.sendemail);
// app.get('/password/resetpassword/:id', password.passwordreset);
// app.post('/password/updatepassword/', password.updatepassword);
// app.get('/user/download', expensedownload.expensedownload);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
