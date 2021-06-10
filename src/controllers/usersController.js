const path = require ('path');
const User = require ("../models/Users");
const {validationResult, body} = require ("express-validator");
const fs = require("fs")
const bcryptjs = require('bcryptjs');


const hasErrorGetMessage = (field, errors) => {
	if(typeof errors != 'undefined') {
		for (const oneError in errors) {
			if (oneError == field) {
				return errors[oneError].msg;
			}
		}
	}
	return false;
};



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
carrito: (req, res) => res.render ("users/carrito"),

register:(req, res) => {
    
    return res.render ("users/register")
},

login:(req, res) => res.render ("users/login"),

list: (req, res) => {
res.render ("users/list", {users: users})
},



processRegister : (req, res) =>{
const resultValidation = validationResult(req);

if (resultValidation.errors.length >0){
    return res.render ("users/register", {
        errors: resultValidation.mapped(),
        oldData: req.body
    });
}

    let userInData = User.findByField("email", req.body.email);
    if(userInData){
        return res.render("users/register", {
        errors: {
            email: {
                msg: "Este email ya se encuentra registrado"
            }
        },
        oldData: req.body
        })
    }

    let userToCreate = {
        ...req.body,
        contraseña: bcryptjs.hashSync(req.body.contraseña, 10),
    }

    let usureCreated = User.create(userToCreate);
    return res.redirect("login")
},
    loginProcess: (req, res) =>{
       let userToLogin = User.findByField("email", req.body.email)
       if (userToLogin){
        let contraseñaOk = bcryptjs.compareSync(req.body.contraseña, userToLogin.contraseña) 
        if(contraseñaOk){
            delete userToLogin.contraseña;
            req.session.userLogged = userToLogin;

            if(req.body.recordame){
                res.cookie("userEmail", req.body.email, {maxAge: (1000 * 60) * 2})
            }

            return res.redirect("perfilDeusuario")
        }
        return res.render("users/login", {
            errors: {
                email: {
                    msg: " Credenciales invalidas"
                }
            }
        });
       }
       return res.render("users/login", {
           errors: {
               email: {
                   msg: "Email invalido"
               }
           }
       });
    },
    profile: (req, res) => {
        console.log(req.cookies.userEmail)
		res.render('users/perfilDeusuario', { 
            user: req.session.userLogged
         }); 
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect("/")
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
