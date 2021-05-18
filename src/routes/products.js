const express = require ('express')

const router = express.Router ()

let productsController = require ('../controllers/productsController')

router.get ('/detalle', productsController.detalle) 

router.get ('/create', productsController.create)

router.get ('/edit', productsController.edit)

module.exports = router