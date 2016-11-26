BEGIN;

DROP TABLE IF EXISTS savedcities;

CREATE TABLE savedcities (
  id SERIAL PRIMARY KEY,
  user_id INT,
  city VARCHAR NOT NULL,
  country VARCHAR NOT NULL,
  slug VARCHAR NOT NULL,
  nomadScore NUMERIC(3, 2),
  wifi NUMERIC(3, 2),
  fun NUMERIC(3, 2),
  safety NUMERIC(3, 2),
  lat NUMERIC(10, 7),
  lng NUMERIC(10, 7),
  cost INT,
  img VARCHAR (64),
  notes TEXT
);

COMMIT;
