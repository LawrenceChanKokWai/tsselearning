const router = require("express").Router();

// User Register Route
router.post("/register-user", async (request, response) => {});

// Admin Register Route
router.post("/register-admin", async (request, response) => {});

// Super Admin Register Route
router.post("/register-super-admin", async (request, response) => {});

// User Login Route
router.post("/login-user", async (request, response) => {});

// Admin Login Route
router.post("/login-admin", async (request, response) => {});

// Super Admin Login Route
router.post("/login-super-admin", async (request, response) => {});

// User Protected Route
router.post("/user-profile", async (request, response) => {});

// Admin Protected Route
router.post("/admin-profile", async (request, response) => {});

// Super Protected Login Route
router.post("/super-admin-profile", async (request, response) => {});

module.exports = router;
