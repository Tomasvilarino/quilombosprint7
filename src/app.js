const express = require ("express")

const path = require ("path")

const app = express(); 

app.use (express.static (path.join (__dirname, '../public'))) 

app.set ('view engine', 'ejs')

app.listen (1050, () => console.log ("El Servidor esta corriendo en el puerto 1050"))

const routesMain = require ('./routes/main')

app.use ("/", routesMain)

const routesProducts = require ('./routes/products')

app.use ("/products", routesProducts)

const routesUsers = require ('./routes/users')

app.use ("/users", routesUsers)



