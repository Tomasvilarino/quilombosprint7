const express = require ("express");
const path = require ("path");
const app = express(); 
const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath)); 
const mainRouter = require ("./routes/main");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users")

//Rutas Main
app.use("/",mainRouter);

//Rutas Users
app.use("/users", usersRouter)
app.use("/users", usersRouter)

//Rutas Products
app.use("/products", productsRouter) 


//EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//LocalHost
app.listen(1050, () => {
    console.log("El Servidor esta corriendo en el puerto 1050")
})