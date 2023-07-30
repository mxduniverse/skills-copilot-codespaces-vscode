//Create web server
 //Create web server with Node.js
//Receives data from the client side and saves it to the database
//The server is listening on port 3000
//Database name: comments
//Collection name: comments
//The server is connected to the database

//Import modules
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/comments';

//Create a web server
app.listen(3000, function () {
    console.log('Server is running on port 3000');
});

//Connect to the database
MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Failed to connect to the server');
    } else {
        console.log('Connected to the server');
    }

    //Parse the request body
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    //Create a route for sending data to the database
    app.post('/comments', function (req, res) {
        var comment = {
            name: req.body.name,
            comment: req.body.comment
        };

        //Save data to the database
        db.collection('comments').save(comment, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Saved to the database');
            }
        });
    });
});
