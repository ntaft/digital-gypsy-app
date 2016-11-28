// adapted from user management code attributed to Rafa @ GA. Thanks!
// originally using mongo, modified for psql
const psql = require('../db/db.js');
const bcrypt = require('bcryptjs');

  // creates a new user object using form input
  function createUser(req, res, next) {
    const SALTROUNDS = 10;
    console.log(req.body);
    const userObject = {
      username: req.body.username,
      // email: req.body.email,
      // Store hashed password
      password: bcrypt.hashSync(req.body.password, SALTROUNDS)
      // password: req.body.password
    };

  psql.none(`INSERT INTO users ( username, password )
    VALUES ('${userObject.username}', '${userObject.password}');`)
    .then((psqlUser) => {
      res.user = psqlUser;
      next();
    })
    .catch(error => next(error));
}

function getUserById(id) {
  const promise = new Promise((resolve, reject) => {
    psql.one(`SELECT *
        FROM users
        WHERE id = '${id}';`)
      .then(user => resolve(user))
      .catch((error) => {
        reject(error);
      });
    })
      return promise;
  };

function getUserByUsername(name){
    const promise = new Promise((resolve, reject) => {
      psql.one(`SELECT *
        FROM users
        WHERE username = '${name}';`)
      .then(user => resolve(user))
      .catch((error) => {
        reject(error);
      });
    });
    return promise;
  };

module.exports = {
  createUser,
  getUserById,
  getUserByUsername
};
