const path = require ("path");
const multer = require ("multer");

const storage = multer.diskStorage({
    destination: (req, res, cb) =>{
        cb(null, "../public/images");
    },
    filename: (req, file, cb) =>{
        const fileName = 'image-' + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
         }
    })    

    const uploadFile = multer ({ storage });

    module.exports = uploadFile;