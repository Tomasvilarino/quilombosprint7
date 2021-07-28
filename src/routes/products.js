const express = require ('express')
const path = require ('path')
const router = express.Router ()

// Multer
const multer = require ('multer')
let multerDiskStorage = multer.diskStorage (
{
destination: (req, file, callback) => {
let folder = path.join (__dirname, '../../public/images')
callback (null, folder)
},
filename: (req, file, callback) => {
let imageName = 'product-' + Date.now() + path.extname (file.originalname)
callback (null, imageName)
},
}
)
let fileUpload = multer({storage: multerDiskStorage})

// Requerimiento del controlador

let productsController = require ('../controllers/productsController')

//Rutas

// Agrego las siguientes dos rutas pertenecientes a buscadores dentro del listado de productos

router.get ('/buscarPorNombre', productsController.buscarPorNombre)

router.get ('/buscarPorCategoria', productsController.buscarPorCategoria)

// Si a las rutas anteriores las pongo a lo último no funcionan y no sé por qué

router.get ('/', productsController.list)

// router.get ('/productos', productsController.productos)

router.get ('/create', productsController.create)

router.get ('/:id', productsController.detalle)

router.post ('/', fileUpload.single ('imagen'), productsController.store)

router.get ('/:id/edit', productsController.edit)

router.put ('/:id', productsController.update)

router.delete ('/:id', productsController.delete)

module.exports = router