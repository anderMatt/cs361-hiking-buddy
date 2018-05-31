/*************************************
Hiking Buddy
*************************************/

const mysql = require('mysql');
const pool = mysql.createPool({
	connectionLimit: 10,
	host: "23.229.155.167",
	database: "hiking_buddy",
	user: "hikingbuddy",
	password: "mAOzsWh]h8!p"
});

module.exports = pool;
