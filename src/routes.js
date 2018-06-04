
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




    app.get("/profile/:id", function(req, res, next) {
        return res.type("text/html").render("profile");
    });





	app.get("/registration", function(req, res, next) {
		var context = {};
		context.name = "Test Name";
		return res.type("text/html").render("registration", context);
	});

	app.get("/changepassword", function(req, res, next) {
	    return res.type("text/html").render("change_password");
    });

	app.get("/privacy/:id", function(req, res, next) {
		var context = {};
		context.name = "Test Name";
		return res.type("text/html").render("privacy", context);
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
//         console.log('Inside user registration endpoint');
         var newUser = req.body;
         User.register(newUser, function(err, insertId) {
             if(err) {
                 return next(err);
             }
             return res.status(200)
                 .json(insertId);
         });
     });

// this route is intended to switch the treks from public to private and vice versa
     apiRoutes.put('/users/privacy', function(req, res, next) {
//        console.log('Inside privacy toggle endpoint');
//console.log(req.body);
          var value = req.body;
          User.toggle(value, function(err, value) {
               if(err) {
                    return next(err);
               }
               return res.status(200)
                    .json(value);
          });
     });

     apiRoutes.post('/users/password/update', function(req, res, next) {
         console.log('Inside password change endpoint.');
         return res.status(200).json({success: true});
     });

// this route is intended to get the current value stored in the public attribute of the trek table
     apiRoutes.get('/treks/privacy', function(req, res, next) {
          console.log('getting the current privacy settings');
	  User.privacySettings(req.query.id[0], function(err, value) {
	       if(err) {
	            return next(err);
	       }
	       return res.status(200)
	            .json(value);
	  });
     });

    /**************************************************
    * Hook up API endpoints
 	**************************************************/

 	app.use("/api", apiRoutes);
}
