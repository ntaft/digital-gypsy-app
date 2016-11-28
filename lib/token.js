const jwt = require('jasonwebtoken');

// note: make sure token does not include protected information
function createToken (user) {
  // get private key from .env
    var cert = process.env.JWT_SECRET;
    // sign a new encrypted token that expires in 24h
    return jwt.sign(user, cert, {
      algorithm: 'RS256'
      expiresIn: '24h'
    }, (err, token) => {
      if err console.log err;
      console.log(token)
      // returns a json token
      return token;
    });
  }
