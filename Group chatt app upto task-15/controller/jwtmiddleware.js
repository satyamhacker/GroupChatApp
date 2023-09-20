const jwt = require('jsonwebtoken');


////playing with jwt;

function jwt_encode(userId){

    const secretKey = 'sat'; // Replace this with your secret key
    
    const payload = {
        userId: userId,
    };
    
    const token = jwt.sign(payload, secretKey, { expiresIn: '1200h' }); // You can customize the expiration time
    
    // console.log('Generated JWT:', token);
    return token;
  
  }
  
  function jwt_decode(jwt_encoded_token){
  
      const token = jwt_encoded_token; // Replace this with the actual JWT
      const secretKey = 'sat'; // Replace this with your secret key
  
      try {
          const decoded = jwt.verify(token, secretKey);
          // console.log('Decoded JWT:', decoded);
          return decoded;
      } catch (error) {
          console.error('JWT verification failed:', error.message);
      }
  
  }

  module.exports={
        jwt_encode,
        jwt_decode,
  }