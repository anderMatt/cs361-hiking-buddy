/***********************
Hiking Buddy
5/29/18
***********************/

const express = require('express');
const handlebars = require('express-handlebars').create({defaultLayout: 'main'});
const routes = require ('./routes');
const bodyParser = require('body-parser');

// Initial configuration
var app = express();
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2] || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/public'));

/******************************
Hook up routes.
******************************/
routes.init(app);


/******************************
Error Handler

Add me!
******************************/



/******************************
Spin up server
******************************/
app.listen(app.get('port'), function(){
	console.log('Express listening on port ' + app.get('port'));
});