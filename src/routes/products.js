const express = require("express");
const path = require ("path");
const router = express.Router();
const controller = require("../controllers/productsController");

router.get("/", controller.index)

router.get("/create", controller.create);

router.get("/carrito", controller.carrito);

router.get("/detalledeproducto", controller.detalleDeProducto)

module.exports = router;