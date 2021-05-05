const express = require ("express");
const path = require ("path");
const app = express(); 

const publicPath = path.resolve(__dirname, "./public")
app.use(express.static(publicPath)); 

app.listen(1050, () => {
    console.log("El Servidor esta corriendo en el puerto 1050")
})

app.get("/", (req,res) =>{
    res.sendFile(path.resolve(__dirname, "./views/home.html"))
})

app.get("/registro", (req,res) =>{
    res.sendFile(path.resolve(__dirname, "./views/register.html"))
})

app.get("/login", (req,res) =>{
    res.sendFile(path.resolve(__dirname, "./views/login.html"))
})

app.get("/carrito", (req,res) =>{
    res.sendFile(path.resolve(__dirname, "./views/carrito.html"))
})

app.get("/detalledeproducto", (req,res) =>{
    res.sendFile(path.resolve(__dirname, "./views/desc-product.html"))
})
