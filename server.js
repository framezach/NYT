// Require Node Modules
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let logger = require('morgan'); // for debugging
// =============================================================================



// Initialize Express for debugging & body parsing
let app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

// =============================================================================
// Serve Static Content
app.use(express.static(process.cwd() + '/public'));

// =============================================================================
mongoose.connect('mongodb://localhost/nytreact');

let db = mongoose.connection;

// Show any Mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// Import Article model
let Article = require('./models/Article.js');

// =============================================================================
let router = require('./controllers/controller.js');
app.use('/', router);

// =============================================================================

let port = process.env.PORT || 8090;
app.listen(port, function(){
  console.log('Running on port: ' + port);
});