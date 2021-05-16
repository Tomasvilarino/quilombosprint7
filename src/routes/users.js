const express = require("express");
const path = require ("path");
const controller = require("../controllers/usersController");
const router = express.Router();

router.get("/registro", controller.register)

router.get("/login", controller.login)

module.exports = router;