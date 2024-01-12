const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, process.env.subCategoryImageURL);
    },
    filename: (req, file, cb) => {
      const ext = file.originalname;
      //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, ext);
    },
});
  
const subCategoryUpload = multer({
    storage: storage,
    limits: { fileSize: "1000000" },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpg|jpeg|svg|WEBP|png/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(file.originalname);
    
        if (mimeType && extname) {
        return cb(null, true);
        }
        cb("Give proper file formate to upload");
    },
    }).single("image");

module.exports = subCategoryUpload;