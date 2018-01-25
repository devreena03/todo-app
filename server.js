var express = require("express");
var app = express();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

var database;
var url = process.env.MONGOLAB_URI;

MongoClient.connect(url, function(err, db) {
   if (err) throw err;
   console.log("Database connected!");
   database = db;
   db.createCollection("todo-app", function (err, res) {
       app.listen(8080,function(){
	   console.error('server started at 8080');
    });
  });
});
//app.listen(8080);
app.use(express.static(__dirname + '/public')); 

app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", '*');
	res.setHeader("Access-Control-Allow-Methods", "GET, POST,PUT,DELETE,OPTIONS");
	next();
});

app.get("/", function(req, res){
	res.sendFile(__dirname + '/public/home.html');
});

app.get("/items", function(req, res){
	database.collection("todo-app").find().toArray(function(err, result) {
       res.send(result);
  });
});

app.post("/add/:item", function(req, res){
	var value = {task: req.params.item, completed: false};
	database.collection("todo-app").insertOne(value,function(err,result){
		res.status(200);
	    res.send(result.ops[0]);
	});
});

app.put("/task/:id/:newTask", function(req, res){
	database.collection("todo-app").update({_id : new mongodb.ObjectId(req.params.id)}, {$set: {task : req.params.newTask}});
	res.status(200);
	res.send("success");
	
});

app.put("/status/:id/:completed", function(req, res){
	var completed = req.params.completed==="true";
	database.collection("todo-app").update({_id : new mongodb.ObjectId(req.params.id)},  {$set: {completed : completed}});
	res.status(200);
	res.send("success");
	
});

app.delete("/remove/:id", function(req,res){
	database.collection("todo-app").remove({_id : new mongodb.ObjectId(req.params.id)});
	res.status(200);
	res.send("success");
});

app.delete("/completed", function(req,res){
	database.collection("todo-app").remove({completed :true});
	res.status(200);
	res.send("success");
});


