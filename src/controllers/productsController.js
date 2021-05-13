const path = require("path")

let controller = {
    carrito:(req,res) =>{
        return res.render("carrito")
    },
    
    detalleDeProducto:(req,res) =>{
        return res.render("desc-product")
    }
}

module.exports = controller;


