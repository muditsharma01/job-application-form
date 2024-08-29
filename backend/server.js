const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve your HTML file
app.use(express.static(path.join(__dirname, "public")));

// Database connection
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root", // replace with your actual password
	database: "job_application",
	port: 3306, // Ensure this matches where MySQL is running
});

db.connect((err) => {
	if (err) throw err;
	console.log("Connected to MySQL Database!");
});

app.post("/add-user", (req, res) => {
	const { firstName, lastName, email, jobType } = req.body;

	const sql =
		"INSERT INTO users (first_name, last_name, email, job_type) VALUES (?, ?, ?, ?)";
	db.query(sql, [firstName, lastName, email, jobType], (err, result) => {
		if (err) {
			console.error("Error inserting data: ", err);
			res.status(500).send("Server error");
		} else {
			res.send("User data added successfully!");
		}
	});
});

app.post("/search-user", (req, res) => {
	const { jobType } = req.body;

	const sql = "SELECT * FROM users WHERE job_type = ?";
	db.query(sql, [jobType], (err, results) => {
		if (err) {
			console.error("Error retrieving data: ", err);
			res.status(500).send("Server error");
		} else {
			res.json(results);
		}
	});
});

// Start the server
app.listen(3301, () => {
	console.log("Server running on http://localhost:3301");
});
