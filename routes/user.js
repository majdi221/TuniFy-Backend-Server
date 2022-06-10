// Importing modules 
const express = require('express'); 
const router = express.Router(); 
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
//const multer = require('../Middleware/multer-config')

// Importing User Schema 
const User = require('../models/user'); 

//Getting all users from data base
router.get ('/', async (req,res) => {
    try {
        const user = await User.find()
        res.json(user)
    } catch (error) {
        res.status(500).json({reponse: error.message})
    }
}) 

/*
// User login api 
router.post('/login', (req, res) => { 

    // Find user with requested email 
    User.findOne({ email : req.body.email }, function(err, user) { 
        if (user === null) { 
            return res.status(400).send({ 
                message : "User not found."
            }); 
        } 
        else { 
            if (user.password == req.body.password) { 
                return res.status(201).send({ 
                    message : "User Logged In", 
                }) 
            } 
            else { 
                return res.status(400).send({ 
                    message : "Wrong Password"
                }); 
            } 
        } 
    }); 
}); 
*/


router.post('/login', async (req, res) => {
    const { email, password } = req.body
  
    const user = await User.findOne({ email })
  
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).send({ message: "logged in successfully" })
    } else {
      res.status(403).send({ message: "mot de passe ou email incorrect" })
    }
})

// User signup api 
router.post('/signup', async (req, res, next) => { 

// Creating empty user object 
    let user = await new User({
        
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


//updating an existing user
router.put ('/update/:id', async (req, res) => {
    const { name, lastname, email, password, adress, phone } = req.body
  
    let user = await User.findOneAndUpdate(
      { email: email },
      {
        $set: {
          name,
          lastname,
          email,
          password,
          adress,
          phone
        },
      }
    )
  
    return res.send({ message: "Profile updated successfully", user })
  })


//deleting an existing user

router.delete ('/delete/:id', async (req, res) => {
    let user = await User.findById(req.body._id)
    if (user) {
      await user.remove()
      return res.send({ message: "Users" + user._id + " have been deleted" })
    } else {
      return res.status(404).send({ message: "User does not exist" })
    }
  })


async function getUserById(req,res,next){
    let user
    try {
        user = await User.findById(req.body._id)
        if (user == null){
            return res.status(404).json({reponse : "User not found!"})
        }
    } catch (error) {
        return res.status(500).json({reponse: error.message})
    }
    res.user = user
    next()
}

// Export module to allow it to be imported in other files 
module.exports = router; 