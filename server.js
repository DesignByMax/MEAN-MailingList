// MEAN Stack RESTful API 
// Author: Max Sheikhizadeh
// ContactList App 
// Node Server

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

//routes setup
app.use(express.static(__dirname + '/public'));
//bodyPaser on json
app.use(bodyParser.json());

//get requests
app.get('/contactlist', function (req, res) {
  db.contactlist.find(function (err, docs) {
    res.json(docs);
  });
});

//post handling req to api
app.post('/contactlist', function (req, res) {
  //console log for body req content
  console.log("I am getting" + req.body);
  //insert content
  db.contactlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

//removing contact
app.delete('/contactlist/:id', function (req, res) {

  var id = req.params.id;
  //console log for id
  console.log("my id is: " + id);
  //contact removed
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});
//get req for id
app.get('/contactlist/:id', function (req, res) {

  var id = req.params.id;
  console.log(id);

  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

//updating contact
app.put('/contactlist/:id', function (req, res) {

  var id = req.params.id;
  //console log to see name 
  console.log("My name is: " + req.body.name);

  //modify mongo data
  db.contactlist.findAndModify({
    //query by id, name, email, number
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      //response parsing
      res.json(doc);
    }
  );
});
//listening on port 3000
app.listen(3000);


console.log("Max's Server is running on port 3000");