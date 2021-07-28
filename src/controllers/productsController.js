//Al editar un producto tendría aparecer la imagen actual del mismo

const path = require ('path')

let db = require ('../database/models')

let productsController = {    

create: (req, res) => {
    db.Categories.findAll()
        .then(function(categories) {
            return res.render (path.join (__dirname, '../views/products/create.ejs'), {categories:categories})
        })
},

store: (req, res) => {

    db.Products.create({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imagen: req.file.filename,
        precio: req.body.precio,
        stock: req.body.stock, 
        category_id: req.body.categoria
    })
        .then (() => res.redirect('/products'))
},

edit: (req, res) => {
    Promise.all([db.Products.findByPk(req.params.id), db.Categories.findAll()])
            .then(([product, categories]) => {
                res.render (path.join (__dirname, '../views/products/edit.ejs'), {product: product, categories: categories})
            })
},

update: (req, res) => {
    db.Products.update({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock, 
        category_id: req.body.categoria
    }, {
        where: {
            id: req.params.id
        }
    })
        .then (() => res.redirect('/products'))
},

delete: (req, res) => {
    db.Products.destroy({
        where: {
            id: req.params.id
        }
    })
     .then(() => res.redirect('/products'))
},

list: (req, res) => {
    db.Products.findAll({
        order: [['nombre', 'ASC']]
    })
        .then((products) => {
            res.render (path.join (__dirname, '../views/products/list.ejs'), {products: products})
        })
},

detalle: (req, res) => {
    db.Products.findByPk(req.params.id)
        .then((product) => {
            res.render (path.join (__dirname, '../views/products/detalle.ejs'), {product: product})
        })
},

buscarPorNombre: (req, res) => {
    db.Products.findOne({
        where: {
            nombre: req.query.nombre
        }
    })
        .then((product) => {
            res.render (path.join (__dirname, '../views/products/detalle.ejs'), {product: product})
        })
},

buscarPorCategoria: (req, res) => {
    let categoria
    db.Categories.findAll()
        .then(function(categories) {
            for (let i = 0; i < categories.length; i++) {
                if (categories[i].nombre == req.query.categoria) {
                    categoria = i + 1
                } 
            }
        })

    let productsResult = []
    db.Products.findAll()
        .then(function(products) {
            for (let i = 0; i < products.length; i++) {
                if (products[i].category_id == categoria) {
                    productsResult.push(products[i])        
                }
            }
            res.render (path.join (__dirname, '../views/products/buscarPorCategoria.ejs'), {productsResult: productsResult})
        })  
},
}

module.exports = productsController