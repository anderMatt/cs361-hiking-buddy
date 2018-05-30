
// Add routes to the app.

const express = require("express");

module.exports.init = function(app) {
	console.log("Initializing routes");


    /**************************************************
     * View endpoints
     **************************************************/
	app.get("/registration", function(req, res, next) {
		var context = {};
		context.name = "Test Name";
		return res.type("text/html").render("registration", context);
	});

	app.get("/profile/:id", function(req, res, next) {
		var context = {};
		context.name = "John Smith";
		context.weight = 160;
		context.height = 72;
		context.experience = "novice";
		return res.type("text/html").render("profile", context);
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


    /**************************************************
    * Hook up API endpoints
 	**************************************************/

 	app.use("/api", apiRoutes);
}
