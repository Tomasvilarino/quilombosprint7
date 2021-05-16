const path = require("path")

let controller = {

    register:(req,res) =>{
        return res.render("register")
    },
    
    login: (req,res) =>{
        return res.render("login")
        
    }
        
    }


module.exports = controller;