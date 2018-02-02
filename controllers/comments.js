const router = require("express").Router();
const comments = require("../models/comments.js");

router.get("/", comments.findAll, (req, res, next) => {
    // res.render({ commentsData: res.locals.allData });
    res.render("comments", res.locals.allData);
});

router.get("/:commentsId", comments.findById, (req, res, next) => {
    res.json(res.locals.bData);
});

router.post("/", comments.create, (req, res, next) => {
  console.log('hereeeeeeee')
    res.json(res.locals.newcommentsId);
    // res.json({ id: res.locals.newcommentsId, body: req.body });
});

router.delete("/:commentsId", comments.destroy, (req, res, next) => {
    res.json({ id: req.params.commentsId });
});

router.put("/:commentsId", comments.update, (req, res, next) => {
    res.json(res.locals.updatedbData);
});

module.exports = router;
