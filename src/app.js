const { json } = require("express");
const express = require ("express");
const path = require ("path");
const app = express(); 
const session = require ("express-session");
const cookieParser = require("cookie-parser");
const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath)); 
const usuarioLogueado = require ("./middlewares/usuarioLogeado")
const mainRouter = require ("./routes/main");
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");

//Procesamiento por PUT y DELETE (ponerlo arriba de las rutas)
const methodOverride = require ('method-override')
app.use (methodOverride ('_method')) 

//Configuracion de la app
//Procesamiento por POST (ponerlo arriba de las rutas)
app.use (express.urlencoded ({extended: false}));
app.use (express.json());
app.use(session({secret: "Secreto", resave: false, saveUninitialized: false}));
app.use(cookieParser());
app.use(usuarioLogueado);


//Rutas Main
app.use("/",mainRouter);

//Rutas Users
app.use("/users", usersRouter)

//Rutas Products
app.use("/products", productsRouter) 

//EJS
app.set ("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//Configuracion de app

//LocalHost
app.listen(1050, () => {
    console.log("El Servidor esta corriendo en el puerto 1050")
})



