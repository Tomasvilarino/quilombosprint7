const { json } = require("express");
const express = require ("express");
const path = require ("path");
const app = express(); 
const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath)); 
const mainRouter = require ("./routes/main");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users")

//Procesamiento por PUT y DELETE (ponerlo arriba de las rutas)
const methodOverride = require ('method-override')
app.use (methodOverride ('_method')) 

//Procesamiento por POST (ponerlo arriba de las rutas)
app.use (express.urlencoded ({extended: false}))
app.use (express.json())

//Rutas Main
app.use("/",mainRouter);

//Rutas Users
app.use("/users", usersRouter)

//Rutas Products
app.use("/products", productsRouter) 

//EJS
app.set ("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//LocalHost
app.listen(1050, () => {
    console.log("El Servidor esta corriendo en el puerto 1050")
})

//Error 404 (Habría que hacer la vista correspondiente (not-found))
/*
app.use ((req, res, next) => {
res.status(404).render(path.join (__dirname, './views/not-found'))
}
)
*/
