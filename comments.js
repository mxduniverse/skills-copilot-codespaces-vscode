// create web server with express
// run with node comments.js
// open browser and go to http://localhost:8080

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comment = require('./models/comment');

var db = 'mongodb://localhost/example';
mongoose.connect(db);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// root route
app.get('/', function(req, res) {
    res.render('home');
});

// index route
app.get('/comments', function(req, res) {
    Comment.find({}, function(err, comments) {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/index', {comments: comments});
        }
    });
});

// new route
app.get('/comments/new', function(req, res) {
    res.render('comments/new');
});

// create route
app.post('/comments', function(req, res) {
    Comment.create(req.body.comment, function(err, newComment) {
        if (err) {
            res.render('comments/new');
        } else {
            res.redirect('/comments');
        }
    });
});

app.listen(8080, function() {
    console.log('server started');
});
