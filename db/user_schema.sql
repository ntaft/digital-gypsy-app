DROP TABLE IF EXISTS users;

CREATE TABLE users (
  INT PRIMARY KEY,
  username VARCHAR(128),
  email VARCHAR(128),
  password VARCHAR(255)
);
