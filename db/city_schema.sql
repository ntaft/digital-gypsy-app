DROP TABLE IF EXISTS savedCities;

CREATE TABLE savedCities (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR REFERENCES users(id),
  city VARCHAR NOT NULL,
  country VARCHAR NOT NULL,
  nomadScore NUMERIC(3, 2),
  wifi NUMERIC(3, 2),
  fun NUMERIC(3, 2),
  safety NUMERIC(3, 2),
  lat NUMERIC(10, 7),
  lng NUMERIC(10, 7),
  cost INT,
  img VARCHAR (64),
);
