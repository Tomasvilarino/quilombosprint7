const express = require ('express')
const {check, body} = require("express-validator");
const router = express.Router();
const guestMiddleware = require("../middlewares/guestMiddleware")
const authMiddleware = require("../middlewares/authMiddleware")
const path = require ('path')

// Requerimiento del controlador 

let usersController = require ('../controllers/usersController')

// Rutas

router.get ('/carrito', usersController.carrito)

router.get ('/register',guestMiddleware,usersController.register)

router.get ('/login',guestMiddleware,usersController.login)

router.post("/login", usersController.loginProcess)

router.get("/perfilDeusuario",authMiddleware,usersController.profile)

router.get("/logout", usersController.logout)

router.get ('/list', usersController.list)

router.post("/register", [
    check("email").isEmail().withMessage("Email invalido"),
    check("contraseña").isLength({min : 8}).withMessage("La constraseña debe tener al menos 8 caracteres")
],usersController.processRegister);

module.exports = router