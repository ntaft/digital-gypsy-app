const jwt = require('jsonwebtoken');

// Nick's note: token should not include protected information (i.e. password)
function createToken(tokenPayload) {
  // get private key from .env
  const key = process.env.JWT_SECRET;
  // sign a new encrypted token that expires in 24h
  console.log(tokenPayload);
   const newToken = jwt.sign(tokenPayload, key );
    // returns a shiny new json token
  console.log(newToken);
  return newToken;
}

  function comparePassword() {
    //take password input value(aka req.body.password) and apply compareSync to it
    //if it matches, use jwt.sign (or just createToken)
    //and then respond with jwt + server(200)
  }

module.exports = {
  createToken,
  comparePassword
}
