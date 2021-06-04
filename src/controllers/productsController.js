//Crear link para crear producto desde la vista de la lista de los productos
//Tendría que haber un link para editar un producto desde la vista del detalle (sólo para usuarios administradores)
//Al editar un producto tendría que estar seleccionada la categoría actual del mismo y aparecer la imagen actual del mismo
//Eliminar la imagen junto con el producto (método unlink del FileSystem creo que dijo Uri)

const path = require ('path')
const fs = require ('fs')

let productsJSON = fs.readFileSync (path.join (__dirname, '../database/products.json'), {encoding: 'utf-8'})
let products = JSON.parse (productsJSON)

let productsController = {    

create: (req, res) => res.render (path.join (__dirname, '../views/products/create.ejs')),

store: (req, res, next) => {
if (req.file != undefined) {
let product = {
nombre:req.body.nombre,
descripcion: req.body.descripcion,
categoria: req.body.categoria,
imagenes: req.file.filename,
precio: req.body.precio,
stock: req.body.stock,
id: products.length
}
products.push (product)
productsJSON = JSON.stringify (products)
fs.writeFileSync (path.join (__dirname, '../database/products.json'), productsJSON)
res.redirect ('/products')
}
else {  
res.render (path.join (__dirname, '../views/products/create.ejs'))
//Acá faltaría mostrarle el mensaje de que no puede Enviar sin cargar imagen
}
}, 

edit: (req, res) => {
res.render (path.join (__dirname, '../views/products/edit.ejs'), {products: products.find (product => product.id == req.params.id)})
},

update: (req, res) => {  
products.forEach (function (product) {
if (req.params.id == product.id ) {
product.nombre = req.body.nombre
product.descripcion = req.body.descripcion
product.categoria = req.body.categoria
product.precio = req.body.precioDelProducto
product.stock = req.body.stock
}
}
)
productsJSON = JSON.stringify (products)
fs.writeFileSync (path.join (__dirname, '../database/products.json'), productsJSON)
res.redirect ('/products')
},

delete: (req, res) => {
products = products.filter (function (product) {
return product.id != req.params.id
}
)
for (let i = 0; i < products.length; i++) {
products[i].id = i
}
productsJSON = JSON.stringify (products)
fs.writeFileSync (path.join (__dirname, '../database/products.json'), productsJSON)
res.redirect ('/products')
},

list: (req, res) => {
res.render (path.join (__dirname, '../views/products/list.ejs'), {products: products})
},
productos: (req, res) => {
    res.render (path.join (__dirname, '../views/products/products.ejs'), {products: products})
    },

detalle: (req, res) => {
let productsJSON = fs.readFileSync (path.join (__dirname, '../database/products.json'), {encoding: 'utf-8'})
let products = JSON.parse (productsJSON)
res.render (path.join (__dirname, '../views/products/detalle.ejs'), {products: products.find (product => product.id == req.params.id)})
},

buscarPorId: (req, res) => {
res.render (path.join (__dirname, '../views/products/detalle.ejs'), {products: products.find (product => product.id == req.query.id)})
},

buscarPorCategoria: (req, res) => {
let productsResult = []
for (let i = 0; i < products.length; i++) {
if (products[i].categoria == req.query.categoria) {
productsResult.push (products[i])
}
}    
res.render (path.join (__dirname, '../views/products/buscarPorCategoria.ejs'), {productsResult: productsResult})
},

}

module.exports = productsController