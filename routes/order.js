// Importing modules 
const express = require('express'); 
const router = express.Router();

// Importing User Schema 
const Order = require('../models/order');



// save order api 
router.post('/myorders', async (req, res, next) => { 

    // Creating empty user object 
        let order = await new Order({
            
            name : req.body.name,
            lastname : req.body.lastname,
            email : req.body.email,
            password : bcrypt.hashSync(req.body.password, 8),
            adress : req.body.adress,
            phone : req.body.phone, 
        }); 
    
        
        // Save newUser object to database 
        user.save()
        .then((result) => {
            console.log(result);
            res.status(200).json({
                success: true,
                document: result
            });
        })
        .catch((err) => next(err)); 
    }); 