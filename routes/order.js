// Importing modules 
const express = require('express'); 
const order = require('../models/order');
const router = express.Router();

// Importing User Schema 
const Order = require('../models/order');


// get user orders api
router.post ('/myorders', async (req, res) => {

    res.send({ 
        order: await Order.find({ user: req.body._id }) 
    })
    console.log(req.headers);

    console.log(req.body._id);
    console.log(await Order.find({ user: req.body._id }));
})


// save order api 
router.post('/addorder', async (req, res) => { 
const order = new Order (req.body).save((error, data )=>{
    if (data != null){
        console.log(req.headers);
        return res.status(200).json({reponse : data})
    }
    if (error != null){
        return res.status(503).json({reponse : error})
    }
})
})

module.exports = router; 