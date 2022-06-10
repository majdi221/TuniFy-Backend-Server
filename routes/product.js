// Importing modules 
const express = require('express'); 
const router = express.Router();
//const upload = require('../middleware/uploadImage');
const multer = require("multer");

/*
//multer config
var storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
         cb(null, './uploads/');
    },
    filename: (_req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({storage: storage});
*/





// Importing Product Schema 
const Product = require('../models/product'); 

//Getting all products from data base
router.get ('/all', async (req, res) => {
    try {
        const product = await Product.find()
        res.json(product)
    } catch (error) {
        res.status(500).json({reponse: error.message})
    }
}) 

// add product api 
router.post('/addproduct', async(req, res, next) => { 

    let product = new Product({
        name : req.body.name,
        price : req.body.price,
        image : req.body.image,
      });

      product.save()
        .then((result) => {
            console.log(result);
            res.status(200).json({
                success: true,
                document: result
            });
        })
        .catch((err) => next(err));

}); 


//updating an existing product
router.patch ('/update/:id', getProductById, async (req,res) => {
    if (req.body.name != null){
        res.product.name = req.body.name
    }
    if (req.body.price != null){
        res.product.price = req.body.price
    }
    if (req.body.image != null){
        res.product.image = req.body.image
    }
    try {
        const updatedProduct = await res.product.save()
        res.json(updatedProduct)
    } catch (error) {
        res.status(400).json({reponse : error.message})
    }
})

//deleting an existing user
router.delete ('/delete/:id',getProductById,async (req,res) => {
    try {
        await res.product.remove()
        res.json({reponse : "product deleted successfully!"})
    } catch (error) {
        res.json({reponse : error.message})
    }
})


//get product by id
router.get ('/one', async function getProductById(req,res,next){
    let product
    try {
        product = await Product.findById(req.params._id)
        if (product == null){
            return res.status(404).json({reponse : "product not found!"})
        }
    } catch (error) {
        return res.status(500).json({reponse: error.message})
    }
    res.product = product
    next()
})











async function getProductById(req,res,next){
    let product
    try {
        product = await Product.findById(req.params._id)
        if (product == null){
            return res.status(404).json({reponse : "product not found!"})
        }
    } catch (error) {
        return res.status(500).json({reponse: error.message})
    }
    res.product = product
    next()
}

// Export module to allow it to be imported in other files 
module.exports = router; 