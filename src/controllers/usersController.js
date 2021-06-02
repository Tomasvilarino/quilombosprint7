const path = require ('path')

let users = [
{
id: 0,
nombreYApellido: "Nombre y Apellido Usuario 0",
email: "Email Usuario 0",
contraseña: "Contraseña Usuario 0"
},
{
id: 1,
nombreYApellido: "Nombre y Apellido Usuario 1",
email: "Email Usuario 1",
contraseña: "Contraseña Usuario 1"
},
{
id: 2,
nombreYApellido: "Nombre y Apellido Usuario 2",
email: "Email Usuario 2",
contraseña: "Contraseña Usuario 2"
}
]

let usersController = {
carrito: (req, res) => res.render (path.join (__dirname, '../views/users/carrito.ejs')),

register:(req, res) => res.render (path.join (__dirname, '../views/users/register.ejs')),

login:(req, res) => res.render (path.join (__dirname, '../views/users/login.ejs')),

list: (req, res) => {
res.render (path.join (__dirname, '../views/users/list.ejs'), {users: users})
},

buscarPorNombreYApellido: (req, res) => {
let usersResult = []
for (let i = 0; i < users.length; i++) {
if (users[i].nombreYApellido == req.query.nombreYApellido) {
usersResult.push (users[i])
}
}
res.render (path.join (__dirname, '../views/users/buscarPorNombreYApellido.ejs'), {usersResult: usersResult})
},

}


module.exports = usersController
