const express = require("express");
const path = require ("path");
const controller = require("../controllers/mainController");
const router = express.Router();

router.get("/", controller.home)

router.get("/registro", controller.register)

router.get("/login", controller.login)

module.exports = router;