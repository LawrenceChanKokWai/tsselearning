const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const { connect } = require("mongoose");
const { success, error } = require("consola");

//importing the app constants
const { DB, PORT } = require("./config");

//initialize the application
const app = express();

//middleware
app.use(cors());
app.use(bodyParser.json());

// User Router Middleware
app.use("/api/users", require("./routes/users"));

const startApp = async () => {
	try {
		//connection to MongoDB
		await connect(DB);
		success({
			message: `MongoDB has successfully been connected on\n${DB}`,
			badge: true,
		});

		//Start listening for the server on PORT
		app.listen(PORT, () =>
			success({ message: `Server has started in PORT ${PORT}`, badge: true }),
		);
	} catch (err) {
		error({
			message: `Unable to connect with MongoDB \n${err}`,
			badge: true,
		});
		startApp();
	}
};
startApp();
