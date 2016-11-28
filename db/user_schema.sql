DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(128) NOT NULL,
  password VARCHAR(255) NOT NULL,
  createDate TIMESTAMP,
  accessedDate TIMESTAMP
);

