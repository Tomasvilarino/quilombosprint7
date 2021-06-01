const express = require ('express')

const router = express.Router ()

const path = require ('path')

let usersController = require ('../controllers/usersController')

router.get ('/carrito', usersController.carrito)

router.get ('/register', usersController.register)

router.get ('/login', usersController.login)

router.get ('/list', usersController.list)

router.get ('/buscarPorNombreYApellido', usersController.buscarPorNombreYApellido)

module.exports = router
