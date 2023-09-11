const express = require("express");
const router = express.Router();
const userController = require("../controller/user");
const { isAuthenticated } = require("../middlewares/auth");

router.post("/login", userController.login);
router.post("/new", userController.register);
router.get("/all", isAuthenticated, userController.getAllUsers);
router.get("/me", isAuthenticated, userController.getMyProfile);
router.get("/logout", userController.logout);

exports.router = router;
