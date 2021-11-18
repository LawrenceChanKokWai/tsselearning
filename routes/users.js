const router = require("express").Router();
//import User Registeration function
const { userRegister, userLogin } = require("../utils/Auth");

// User Register Route
router.post("/register-user", async (request, response) => {
	await userRegister(request.body, "user", response);
});

// Admin Register Route
router.post("/register-admin", async (request, response) => {
	await userRegister(request.body, "admin", response);
});

// Super Admin Register Route
router.post("/register-super-admin", async (request, response) => {
	await userRegister(request.body, "superadmin", response);
});

// User Login Route
router.post("/login-user", async (request, response) => {
	await userLogin(request.body, "user", response);
});

// Admin Login Route
router.post("/login-admin", async (request, response) => {
	await userLogin(request.body, "admin", response);
});

// Super Admin Login Route
router.post("/login-super-admin", async (request, response) => {
	await userLogin(request.body, "superadmin", response);
});

//Common Profile Route
router.post("/profile", async (request, response) => {});

// User Protected Route
router.post("/user-protected", async (request, response) => {});

// Admin Protected Route
router.post("/admin-protected", async (request, response) => {});

// Super Protected Login Route
router.post("/super-admin-protected", async (request, response) => {});

module.exports = router;
