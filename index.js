// ============================================================
// Setup

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 3000;


const mustacheExpress = require('mustache-express');

// registers the template engine for use in res.render
app.engine('html', mustacheExpress());
// sets the file extension to use for views when the file extension is omitted
app.set('view engine', 'html');
// sets the the directory that will contain our mustache template files, or "views"
app.set('views', __dirname + '/views');
// sets the directory that will contain our static (not generated on the fly) resources, such as css, client-side Javascript files, and images
app.use(express.static(__dirname + '/public'));

// morgan setup
app.use(morgan('dev'));


// body-parser setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => { console.log("Server started on " + port); });


// get the beers router (the export of the beers controller file)
const moviesRouter = require('./controllers/router.js');
const commentsRouter = require('./controllers/comments.js');

// hook it up to the app
app.use('/', moviesRouter);
app.use('/comments', commentsRouter);

// Set up error handling middleware (notice that this is the LAST thing we do)
app.use((err, req, res, next) => {
  console.log('Error encountered:', err);
  res.status(500);
  res.send(err);
});
