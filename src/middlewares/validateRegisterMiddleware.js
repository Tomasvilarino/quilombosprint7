const path = require ("path");
const { body } = require ("express-validator");


module.exports = [
    body ("nombreYApellido").notEmpty().withMessage("Tenes que escribir tu nombre y apellido"),
    body ("email").notEmpty().withMessage("Tenes que escribir tu email").bail().isEmail().withMessage("Formato no valido para correo electronico"),
    body ("contraseña").notEmpty().withMessage("Tenes que escribir una constraseña con al menos 8 caracteres")
]