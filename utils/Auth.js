const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET } = require("../config");

{
	/* =================REGISTER FUNCTION============================= */
}
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

{
	/* =================LOG-IN FUNCTION============================= */
}
/**
 * @DESC To login the user (SUPER_ADMIN, ADMIN, USER)
 */
const userLogin = async (userCreds, role, response) => {
	let { username, password } = userCreds;
	//check if username is in the database
	const user = await User.findOne({ username });
	if (!user) {
		return response.status(404).json({
			message: "Username is not found, Invalid login credentials!",
			success: false,
		});
	}
	//check username on the role
	if (user.role !== role) {
		return response.status(403).json({
			message: "Please make sure you are logging in from the right portal",
			success: false,
		});
	}
	//above passed -> user exist, now check the password
	let isMatch = await bcrypt.compare(password, user.password);
	if (isMatch) {
		//sign in the token , issue to the user.
		let token = jwt.sign(
			{
				user_id: user._id,
				role: user.role,
				username: user.username,
				email: user.email,
			},
			SECRET,
			{ expiresIn: "7 days" },
		);
		let result = {
			username: user.username,
			role: user.role,
			email: user.email,
			token: `Bearer ${token}`,
			expiresIn: 168,
		};
		return response.status(200).json({
			...result,
			message: "You are now logged in!",
			success: true,
		});
	} else {
		return response.status(403).json({
			message: "INCORRECT Password!",
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

module.exports = { userRegister, userLogin };
