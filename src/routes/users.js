const express = require ('express')

const router = express.Router ()

const path = require ('path')

let usersController = require ('../controllers/usersController')

router.get ('/carrito', usersController.carrito)

router.get ('/register', usersController.register)

router.get ('/login', usersController.login)

module.exports = router