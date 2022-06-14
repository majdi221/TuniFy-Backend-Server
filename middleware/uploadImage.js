const multer = require("multer")
var path = require('path')

//image upload
var storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
         cb(null, './uploads/');
    },
    filename: (_req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
  });
  
  module.exports = multer({storage: storage});