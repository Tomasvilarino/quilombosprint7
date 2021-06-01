const path = require ('path')

let productsController = {
detalle: (req, res) => res.render ("products/detalle.ejs"),
create: (req, res) => res.render ("products/create.ejs"),
edit: (req, res) => res.render ("products/edit.ejs"),
}

module.exports = productsController
