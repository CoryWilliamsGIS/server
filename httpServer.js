// Code adapted from: https://github.com/claireellul/cegeg077-week5server/blob/master/httpServer.js

// Express is the server that forms part of the nodejs program
var express = require('express');
var path = require("path");
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


// Adding functionality to allow cross-domain queries when PhoneGap is running a server
app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
	res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	next();
});

//Uploading data from web application	
app.post('/uploadData',function(req,res){
       console.dir(req.body);
       pool.connect(function(err,client,done) {
             if(err){
             console.log("not able to get connection "+ err);
             res.status(400).send(err);
             }
            // Pull the geometry component together
var geometrystring = "st_geomfromtext('POINT(" + req.body.lng + " " + req.body.lat + ")'";
		   
var querystring = "INSERT into app_questions (location_name,question,answer_1,answer_2,answer_3,answer_4,answer_correct,question_location) values ('";
querystring = querystring + req.body.location_name + "','" + req.body.question + "','" + req.body.answer_1+"','" + req.body.answer_2+"','" + req.body.answer_3+"','" + req.body.answer_4+"','" + req.body.answer_correct+"'," + geometrystring +"))";
		console.log(querystring);
		client.query( querystring,function(err,result) {
			done();
			if(err){
				console.log(err);
				res.status(400).send(err);
			}
			res.status(200).send("Question uploaded");
		});
	}); 
});

// Uploading answer from mobile application
app.post('/uploadAnswer',function(req,res){
       console.dir(req.body);
       pool.connect(function(err,client,done) {
             if(err){
             console.log("not able to get connection "+ err);
             res.status(400).send(err);
             }
var querystring = "INSERT into app_answers (question,answer,answer_correct) values ('";
querystring = querystring + req.body.question + "','" + req.body.answer +"','" + req.body.cAnswer+"')";
		console.log(querystring);
        client.query( querystring,function(err,result) {
			done();
			if(err){
               console.log(err);
               res.status(400).send(err);
          }
          res.status(200).send("Answer uploaded!");
       });
	}); 
});




// Adding functionality to log the requests
app.use(function (req, res, next) {
	var filename = path.basename(req.url);
	var extension = path.extname(filename);
		console.log("The file " + filename + " was requested.");
		next();
});
	

// Use a http server to serve files to the Edge browser 
var http = require('http');
var httpServer = http.createServer(app); 
httpServer.listen(4480);

app.get('/',function (req,res) {
		res.send("hello world from the HTTP server");
});


// Require fs to ensure file sync works
var fs = require('fs');
var configtext = ""+fs.readFileSync("/home/studentuser/certs/postGISConnection.js");
// Now convert the configuration file into the correct format -i.e. a name/value pair array
var configarray = configtext.split(",");
var config = {};
for (var i = 0; i < configarray.length; i++) {
    var split = configarray[i].split(':');
    config[split[0].trim()] = split[1].trim();
}

var pg = require('pg'); 
var pool = new pg.Pool(config); 
console.log(config);

// Retrieve question data from database
// Used in both web and mobile applications
app.get('/getQuestions', function (req,res) {
     pool.connect(function(err,client,done) {
       if(err){
           console.log("not able to get connection "+ err);
           res.status(400).send(err);
       } 
        // Use the inbuilt geoJSON functionality
        /* Create the required geoJSON format using a query adapted from here:
		http://www.postgresonline.com/journal/archives/267-Creating-GeoJSON-Feature-Collections-with-JSON-and-PostGIS-functions.html, accessed 4th January 2018 */

        	var querystring = " SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features  FROM ";
        	querystring = querystring + "(SELECT 'Feature' As type     , ST_AsGeoJSON(lg.question_location)::json As geometry, ";
        	querystring = querystring + "row_to_json((SELECT l FROM (SELECT location_name, question, answer_1, answer_2, answer_3, answer_4, answer_correct) As l      )) As properties";
        	querystring = querystring + "   FROM app_questions  As lg limit 100  ) As f ";
        	console.log(querystring);
        	client.query(querystring,function(err,result){

          //call `done()` to release the client back to the pool
           done(); 
           if(err){
               console.log(err);
               res.status(400).send(err);
           }
           res.status(200).send(result.rows);
       });
    });
});


// The / indicates the path that you type into the server - in this case, what happens when you type in:  http://developer.cege.ucl.ac.uk:32560/xxxxx/xxxxx
app.get('/:name1', function (req, res) {
	// Run some server-side code
	// The console is the command line of your server - you will see the console.log values in the terminal window
	console.log('request '+req.params.name1);
	// The res is the response that the server sends back to the browser - you will see this text in your browser window
	res.sendFile(__dirname + '/'+req.params.name1);
});

// Adding an additional path
// The / indicates the path that you type into the server - in this case, what happens when you type in:  http://developer.cege.ucl.ac.uk:32560/xxxxx/xxxxx
app.get('/:name1/:name2', function (req, res) {
	console.log('request '+req.params.name1+"/"+req.params.name2);
	res.sendFile(__dirname + '/'+req.params.name1+'/'+req.params.name2);
});

// Adding an additional path
// The / indicates the path that you type into the server - in this case, what happens when you type in:  http://developer.cege.ucl.ac.uk:32560/xxxxx/xxxxx/xxxx
app.get('/:name1/:name2/:name3', function (req, res) {
	console.log('request '+req.params.name1+"/"+req.params.name2+"/"+req.params.name3); 
	res.sendFile(__dirname + '/'+req.params.name1+'/'+req.params.name2+ '/'+req.params.name3);
});

// Adding an additional path
// The / indicates the path that you type into the server - in this case, what happens when you type in:  http://developer.cege.ucl.ac.uk:32560/xxxxx/xxxxx/xxxx
app.get('/:name1/:name2/:name3/:name4', function (req, res) {
	console.log('request '+req.params.name1+"/"+req.params.name2+"/"+req.params.name3+"/"+req.params.name4); 
	res.sendFile(__dirname + '/'+req.params.name1+'/'+req.params.name2+ '/'+req.params.name3+"/"+req.params.name4);
});