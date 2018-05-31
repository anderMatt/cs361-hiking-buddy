
// Add routes to the app.

const express = require("express");
const User = require('./model/User');

module.exports.init = function(app) {
	console.log("Initializing routes");


    /**************************************************
     * View endpoints
     **************************************************/
    app.get("/", function(req, res, next) {
        return res.type("text/html").render("welcome");
    });

	app.get("/registration", function(req, res, next) {
		var context = {};
		context.name = "Test Name";
		return res.type("text/html").render("registration", context);
	});



    /**************************************************
     * API methods for altering tables and getting dynamic
     * values.
     **************************************************/

     var apiRoutes = express.Router();

     apiRoutes.get('/users/:id', function(req, res, next) {
     	// Retrieve user from DB
     	const id = req.params.id;

     	var user = {firstName: "John", lastName: "Smith", id: id};
     	return res.status(200).json(user);
     });

     apiRoutes.post('/users/register', function(req, res, next) {
         console.log('Inside user registration endpoint');
         var newUser = req.body;
         User.register(newUser, function(err, insertId) {
             if(err) {
                 return next(err);
             }
             return res.status(200)
                 .json(insertId);
         });
     });


    /**************************************************
    * Hook up API endpoints
 	**************************************************/

 	app.use("/api", apiRoutes);
}
