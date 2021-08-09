const path = require("path");
const { body } = require("express-validator");


module.exports = [

    body("nombre_producto").notEmpty().withMessage("Tenes que escribir el nombre del producto."),
    body("nombre_producto").isLength({min:5}).withMessage("El nombre debe tener al menos 5 caracteres."),
    body("descripcion").notEmpty().withMessage("Tenes que escribir una descripcion."),
    body("descripcion").isLength({min:20}).withMessage("La descripcion debe tener al menos 20 caracteres."),
    body("precio").notEmpty().withMessage("Debes ponerle un precio a tu producto."),
    body("stock").notEmpty().withMessage("Ingresa el stock de tu producto"),
    body("imagenProducto").custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png'];

        if (!file) {
            throw new Error('Tenés que subir una imagen para tu producto');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }

        return true;
    })
 

]