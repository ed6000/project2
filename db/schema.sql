-- \c movies

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR NOT NULL UNIQUE,
  password_digest VARCHAR NOT NULL,
  counter INTEGER -- totally optional, just here to demonstrate that we can have other columns in users
);

DROP TABLE IF EXISTS movies;

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  runtime VARCHAR(255),
  imdb VARCHAR(255) NOT NULL UNIQUE


);


DROP TABLE IF EXISTS comments;

CREATE TABLE comments (
  id BIGSERIAL PRIMARY KEY,
  comments VARCHAR NOT NULL,
  movieid VARCHAR(255) REFERENCES movies(imdb) ON DELETE CASCADE ON UPDATE CASCADE
);