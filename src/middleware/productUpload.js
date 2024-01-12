const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/productImage');
    },
    filename: (req, file, cb) => {
      const ext = file.originalname;
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, ext);
    },
});
  
const productUpload = multer({
    storage: storage,
    limits: { fileSize: "1000000" },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|jpeg|svg|png/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(file.originalname);
    
        if (mimeType && extname) {
        return cb(null, true);
        }
        cb("Give proper file formate to upload");
    },
    }).single("productImage");

module.exports = productUpload;