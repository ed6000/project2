//movies model

const db = require("../db/index.js");

const movies = {};

movies.findAll = (req, res, next) => {
  db
    .manyOrNone("SELECT * FROM movies")
    .then(data => {
      res.locals.allbData = data;
      next();
    })
    .catch(error => {
      next(error);
    });
};

movies.findById = (req, res, next) => {
  const id = req.params.movieId;
  db
    .one("SELECT * FROM movies WHERE movies.id = ${id}", { id: id })
    .then(data => {
      res.locals.bData = data;
      next();
    })
    .catch(error => {
      next(error);
    });
};

movies.create = (req, res, next) => {
  db
    .one(
      "INSERT INTO movies (title, runtime, imdb ) VALUES ($1, $2, $3) RETURNING *;",
      [
        req.body.title,
        req.body.runtime,
        req.body.imdb
      ]
    )
    .then(data => {
      res.locals.newMovieId = data;
      next();
    })
    .catch(error => {
      next(error);
    });
};

movies.destroy = (req, res, next) => {
  console.log(req.params.id)
  db
    .none("DELETE FROM movies WHERE id = $1", [req.params.movieId])
    .then(() => {
      next();
    })
    .catch(error => {
        console.log(
        "error encountered in restaurantsModel.destroy Error:",
        error
        );  
      next(error);
    });
};

movies.update = (req, res, next) => {
  console.log('UPDATE', req.body)
  db
    .one(
      "UPDATE movies SET title = $1 WHERE id = $2 RETURNING *;",
      [
        req.body.title,
        // req.body.runtime,
        // req.body.imdb,
        req.body.id

      ]
    )
    .then(data => {
      res.locals.updatedbData = data;
      next();
    })
    .catch(error => {
      next(error);
    });
};

module.exports = movies;