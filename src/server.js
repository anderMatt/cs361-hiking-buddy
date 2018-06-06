/***********************
Hiking Buddy
5/29/18
***********************/

const express = require('express');
const handlebars = require('express-handlebars').create({defaultLayout: 'main'});
const routes = require ('./routes');
const bodyParser = require('body-parser');
const mysql = require('./dbcon.js');

const session = require('express-session');

// Initial configuration
var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2] || 3000);
app.set('mysql', mysql);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/public'));
app.use(session({
    cookie: "_hikingbuddy",
    secret: process.env.SESSION_SECRET || "mysecret123",
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));

/******************************
Hook up routes.
******************************/
routes.init(app);


/******************************
Error Handler
******************************/
app.use(function(req,res){
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});


/******************************
Spin up server
******************************/
app.listen(app.get('port'), function(){
	console.log('Express listening on port ' + app.get('port'));
});
