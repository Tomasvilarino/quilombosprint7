const path = require ('path');
const User = require ("../models/Users");
const {validationResult, body} = require ("express-validator");
const fs = require("fs")
const bcryptjs = require('bcryptjs')
let db = require ('../database/models')


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

let usersController = {

carrito: (req, res) => res.render ("users/carrito"),

register:(req, res) => {    
    return res.render ("users/register")
},

login:(req, res) => res.render ("users/login"),

list: (req, res) => {
    db.Users.findAll({
        order: [['nombre_y_apellido', 'ASC']]
    })
        .then((users) => {
            res.render (path.join (__dirname, '../views/users/list.ejs'), {users: users})
        })
},

//Proceso de Register

processRegister: (req, res) => {

    const resultValidation = validationResult (req);

    if (resultValidation.errors.length > 0) {
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
        avatar: req.file != undefined ? req.file.filename : null,
    }

    User.create(userToCreate)

    db.Users.create({
        nombre_y_apellido: req.body.nombre_y_apellido,
        email: req.body.email,
        contraseña: req.body.contraseña
    })
    
    res.redirect('/users/login')
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
                    msg: "Credenciales invalidas"
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
        let user =  req.session.userLogged
		res.render('users/perfilDeusuario', { 
            user: req.session.userLogged
         }); 
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect("/")
    },
}


module.exports = usersController