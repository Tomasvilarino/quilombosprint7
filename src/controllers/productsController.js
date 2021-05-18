const path = require ('path')

let productsController = {
detalle: (req, res) => res.render (path.join (__dirname, '../views/products/detalle.ejs')),
create: (req, res) => res.render (path.join (__dirname, '../views/products/create.ejs')),
edit: (req, res) => res.render (path.join (__dirname, '../views/products/edit.ejs')),
}

module.exports = productsController
