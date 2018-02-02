const router = require("express").Router();
const movies = require("../models/model.js");
const comments = require("../models/comments.js");
var moment = require('moment');

router.get("/", (req, res, next) => {
  var currentTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    res.render("main", {time: currentTime});
});

router.get("/movies", movies.findAll, (req, res, next) => {
  // console.log(res.locals.allbData);
    res.render('allmovies', { moviesData: res.locals.allbData });
});

router.get("/:movieId", movies.findById, (req, res, next) => {
  // console.log(res.locals.bData);
    res.render('show', res.locals.bData);
});

router.post("/", movies.create, (req, res, next) => {
console.log('POSTED!')
    res.render('main', res.locals.newMovieId);
    // res.json({ id: res.locals.newmovieId, body: req.body });
});


router.delete("/:movieId", movies.destroy, (req, res, next) => {
  console.log(req.params.movieId)
    res.json({ id: req.params.movieId });
});

router.put("/:movieId", movies.update, (req, res, next) => {
  console.log(req.params.movieId)
  res.json({ id: req.params.movieId });
});

module.exports = router;
