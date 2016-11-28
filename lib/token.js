const jwt = require('jsonwebtoken');

// Nick's note: token should not include protected information (i.e. password)
module.exports = function createToken(user) {
  // get private key from .env
    const key = process.env.JWT_SECRET;
    // sign a new encrypted token that expires in 24h
    return jwt.sign(user, key, {
      algorithm: 'RS256',
      expiresIn: '24h',
    }, (err, token) => {
      if (err) console.log(err);
      console.log(token)
      // returns a shiny new json token
      return token;
    });
  }
