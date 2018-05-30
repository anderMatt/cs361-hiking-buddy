/*************************************
Hiking Buddy
*************************************/

const mysql = require('mysql');
const pool = mysql.createPool({
	connectionLimit: 10,
	host: "oniddb.cws.oregonstate.edu",
	user: "gibsojen-db",
	password: "inISvRniuW1dxVmB",
	database: "gibsojen-db"
});

module.exports = pool;
