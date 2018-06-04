/*************************************
Hiking Buddy
*************************************/

const mysql = require('mysql');
const pool = mysql.createPool({
	connectionLimit: 10,
	host: "23.229.155.167",
	user: "hikingbuddy",
	password: "mAOzsWh]h8!p",
	database: "hiking_buddy"
});

module.exports = pool;
