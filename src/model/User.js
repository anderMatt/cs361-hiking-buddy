/*************************************
 * CS 361 - Hiking Buddy
 *************************************/

const db = require('../dbcon');

function User(){}

User.prototype.register = function(newUser, callback) {
    // WARNING: unique constraints need to be set on username.
    var query = "INSERT INTO Users SET ?";
    db.query(query, newUser, function(err, results) {
        if(err) {
            console.log("Error inserting new user: " + err);
            return callback(err);
        }
        callback(null, results.insertId);
    });
};

module.exports = new User();