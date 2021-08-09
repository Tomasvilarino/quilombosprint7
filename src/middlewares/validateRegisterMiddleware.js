const path = require ("path");
const { body } = require ("express-validator");


module.exports = [
    
    body ("nombre_y_apellido").notEmpty().withMessage("Tenes que escribir tu nombre y apellido."),
    body ("nombre_y_apellido").isLength({ min: 5}).withMessage("El nombre debe tener al menos 5 caracteres."),
    body ("email").notEmpty().withMessage("Tenes que escribir tu email"),
    body ("email").isEmail().withMessage("Formato no valido para correo electronico"),
    body ("contraseña").notEmpty().withMessage("Tenes que escribir una constraseña."), 
    body ("contraseña").isLength({ min: 8}).withMessage('La contraseña debe tener mas de 8 caracteres.'),
    body ("confirmar").notEmpty().withMessage("Tenes que confirmar tu contaseña."),
    body ('imagePerfil').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png'];

        if (!file) {
            throw new Error('Tenés que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }

        return true;
    })



 ]