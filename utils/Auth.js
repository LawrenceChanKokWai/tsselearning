const User = require("../models/User");
const bcrypt = require("bcryptjs");

/**
 * @DESC To register the user (SUPER_ADMIN, ADMIN, USER)
 */
const userRegister = async (userDets, role, response) => {
	try {
		//validate the user
		let avaliableUsername = await validateUsername(userDets.username);
		if (!avaliableUsername) {
			return response.status(400).json({
				message: `Username is already taken by others.`,
				success: false,
			});
		}
		//validate the email
		let availableEmail = await validateEmail(userDets.email);
		if (!availableEmail) {
			return response.status(400).json({
				message: `Email is already registered with us.`,
				success: false,
			});
		}

		//hashing the password
		const password = await bcrypt.hash(userDets.password, 12);
		//create a new user
		const newUser = new User({
			...userDets,
			password,
			role,
		});

		//save the newUser and return response
		await newUser.save();
		return response.status(201).json({
			message: "You have successfully registered! You may now Login.",
			success: true,
		});
	} catch (error) {
		//implement something
		return response.status(500).json({
			message: "Unable to create an account!",
			success: false,
		});
	}
};

const validateUsername = async (username) => {
	let user = await User.findOne({ username });
	return user ? false : true;
	// if (user) {
	// 	return false;
	// } else {
	// 	return true;
	// }
};
const validateEmail = async (email) => {
	let user = await User.findOne({ email });
	return user ? false : true;
};

module.exports = { userRegister };
