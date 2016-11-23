// adapted from user management code attributed to Rafa @ GA. Thanks!
// originally using mongo, modified for psql
const psql = require('../lib/dbConnect.js');
const bcrypt = require('bcryptjs');

const SALTROUNDS = 10;

// creates a new user object using form input
function createUser(req, res, next) {
  const userObject = {
    username: req.body.user.username,
    email: req.body.user.email,

    // Store hashed password
    password: bcrypt.hashSync(req.body.user.password, SALTROUNDS),
  };

// insert a new user into the database
  psql.none(`INSERT INTO users (username, password, email)
    VALUES ($/username/, $/password/, $/email/);`, userObject)
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
      WHERE id = ${id};`)
    .then(user => resolve(user))
    .catch((error) => {
      reject(error);
    });
  });
  return promise;
}


function getUserByUsername(username) {
  const promise = new Promise((resolve, reject) => {
    psql.one(`SELECT *
      FROM users
      WHERE username = ${username};`)
    .then(user => resolve(user))
    .catch((error) => {
      reject(error);
    });
  });
  return promise;
}

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
};
