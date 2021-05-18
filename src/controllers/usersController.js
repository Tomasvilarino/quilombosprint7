const path = require ('path')

let usersController = {
carrito: (req, res) => res.render (path.join (__dirname, '../views/users/carrito.ejs')),
register:(req, res) => res.render (path.join (__dirname, '../views/users/register.ejs')),
login:(req, res) => res.render (path.join (__dirname, '../views/users/login.ejs')),
}

module.exports = usersController
