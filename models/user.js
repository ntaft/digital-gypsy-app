// adapted from user management code attributed to Rafa @ GA. Thanks!
// originally using mongo, modified for psql
const psql = require('../lib/psqlConnect.js');
const bcrypt = require('bcryptjs');

function newUserToDB(userObject) {


  // creates a new user object using form input
  function createUser(req, res, next) {
    const SALTROUNDS = 10;
    const userObject = {
      username: req.body.username,
      email: req.body.email,
      // Store hashed password
      password: bcrypt.hashSync(req.body.password, SALTROUNDS)
    };

  psql.none(`INSERT INTO users (username, password, email)
    VALUES ($/username/, $/password/, $/email/);`, userObject)
    .then((userData) => {
      res.user = userData;
      next();
    })
    .catch(error => next(error));
}

function getUserById(id) {
  return getDB().then((psql) => {
    const promise = new Promise((resolve, reject) => {
      psql.one(`SELECT *
        FROM users
        WHERE id = ${ObjectID(id)};`)
      .then(user => resolve(user))
      .catch((error) => {
        reject(error);
        resolve(user);
      });
    });
    return promise;
  });
}


function getUserByUsername(username) {
  return getDB().then((psql) => {
    const promise = new Promise((resolve, reject) => {
      psql.one(`SELECT *
        FROM users
        WHERE username = ${username};`)
      .then(user => resolve(user))
      .catch((error) => {
        reject(error);
        resolve(user);
      });
    });
    return promise;
  });
}

module.exports = {
  newUserToDB,
  getUserById,
  getUserByUsername
};
