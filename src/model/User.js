/*************************************
 * CS 361 - Hiking Buddy
 *************************************/

const db = require('../dbcon');

function User(){}

User.prototype.register = function(newUser, callback) {
    // WARNING: unique constraints need to be set on username.
    var query = "INSERT INTO users SET ?";
    db.query(query, newUser, function(err, results) {
        if(err) {
            console.log("Error inserting new user: " + err);
            return callback(err);
        }
        callback(null, results.insertId);
    });
};

/////////////////////////////////////////////////////////////////////////////////////
//	PRETTY BIG ERROR HERE
/////////////////////////////////////////////////////////////////////////////////////
// this function is intended to update the appropriate trek's public attribute. There
// seems to be an error with the value parameter as it doesn't retain the info that
// I initially give it
User.prototype.toggle = function(value, callback) {

// print statement to compare the value's contents here vs. the value's contents in the
// privacy_page.js file
//console.log("VALUE IN User.js: " + JSON.stringify(value));

    // query that should update the appropriate hike	
    var query = "UPDATE trek SET public = ? WHERE id = ?";

    // should hold the corresponding parameters; currently empty as the value var does
    // not hold the values I expect it to
    var params = [value.val, value.id];

//console.log("PARAMS IN User.js (toggle): " + params);
console.log("User.prototype.toggle query:");
console.log("UPDATE trek SET public = " + params[0] + " WHERE id = " + params[1]);

    // makes the query and logs any errors that come up
    db.query(query, params, function(err, results) {
        if(err) {
            console.log("Error updating privacy settings: " + err);
            return callback(err);
        }

/////////////////////////////////////////////////////////////////////////////////////
//	POTENTIAL ERROR HERE (not positive what to pass the callback)
/////////////////////////////////////////////////////////////////////////////////////
console.log("RESULTS FROM UPDATE trek SET public = " + params[0] + ": " + JSON.stringify(results));
        callback(null, results);
    });
};

// this function is intended to retrieve the appropriate trek's public attribute. I 
// believe it's working correctly, though I am not 100% certain
User.prototype.privacySettings = function(id, callback) {

    // query that should select the appropriate hike
    var query = "SELECT public FROM trek WHERE id = ?";
    var params = [id];

//console.log("PARAMS IN User.js (privacySettings): " + params);
console.log("User.prototype.privacySettings query:");
console.log("SELECT public FROM trek WHERE id = " + params);

    // makes the query and logs any errors that come up
    db.query(query, id, function(err, results) {
        if(err) {
            console.log("Error getting current privacy settings: " + err);
            return callback(err);
        }

/////////////////////////////////////////////////////////////////////////////////////
//	POTENTIAL ERROR HERE (not positive what to pass the callback)
/////////////////////////////////////////////////////////////////////////////////////
//console.log("RESULTS FROM SELECT public FROM trek WHERE id = " + params[0] + ": " + JSON.stringify(results[0].public));
	var privacy = results[0].public;
console.log("RESULTS FROM SELECT public FROM trek WHERE id = " + params[0] + ": " + JSON.stringify(privacy));
        callback(null, privacy);
    });
};

module.exports = new User();
