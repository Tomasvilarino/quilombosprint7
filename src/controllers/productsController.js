const path = require("path")

let controller = {

    index:(req,res) =>{
        return res.render("products")
    },

    carrito:(req,res) =>{
        return res.render("carrito")
    },
    
    detalleDeProducto:(req,res) =>{
        return res.render("desc-product")
    },

    create:(req,res) =>{
        return res.render("create")
    },

 

}   

module.exports = controller;


