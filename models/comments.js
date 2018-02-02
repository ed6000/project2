//comments model

const db = require("../db/index.js");

const comments = {};

comments.findAll = (req, res, next) => {
  db
    .manyOrNone("SELECT * FROM comments")
    .then(data => {
      res.locals.allData = data;
      next();
    })
    .catch(error => {
      next(error);
    });
};

comments.findById = (req, res, next) => {
  const id = req.params.bookId;
  db
    .one("SELECT * FROM comments WHERE comments.id = ${id}", { id: id })
    .then(data => {
      res.locals.bData = data;
      next();
    })
    .catch(error => {
      next(error);
    });
};

comments.create = (req, res, next) => {
  db
    .one(
      "INSERT INTO comments (comments, movieid) VALUES ($1, $2) RETURNING *;",
      [
        req.body.comments,
        req.body.movieid
      ]
    )
    .then(data => {
      res.locals.newMovieId = data;
      next();
    }).catch(error =>{
      next(error);
    });
};

comments.destroy = (req, res, next) => {
  db
    .none("DELETE FROM comments WHERE id = $1", [req.params.bookId])
    .then(() => {
      next();
    })
    .catch(error => {
      next(error);
    });   
};

comments.update = (req, res, next) => {
  db
    .one(
      "UPDATE comments SET title = $1, runtime = $2, imdb = $3, image = $4, WHERE id = $5 RETURNING id;",
      [
        req.body.title,
        req.body.runtime,
        req.body.imdb
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

module.exports = comments;