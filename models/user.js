var mongoose = require('mongoose')
//var uniqueValidator = require('mongoose-unique-validator');
var jwt = require('jsonwebtoken');
//var secret = require('../config').secret;

// Creating user schema 
const userSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    
    lastname: {
        type: String,
        required: true
    },


    email: {
        required:true,
        type: String,
        match: /.+\@.+\..+/,
        unique: true
    },
    
    password: { 
        type: String 
    },
    
    adress: {
        type: String
    },
    
    phone: {
        unique: true,
        maxlength: 12,
        type: String
    },
    
})

// Exporting module to allow it to be imported in other files 
module.exports = mongoose.model('User', userSchema);


//userSchema.plugin(uniqueValidator, {message: 'is already taken.'});


// // Method to set salt and hash the password for a user 
// UserSchema.methods.setPassword = function(password){
//       this.salt = crypto.randomBytes(16).toString('hex');
//       this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
//     };

// // Method to check the entered password is correct or not  
// UserSchema.methods.validPassword = function(password) {
//      var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
//      return this.hash === hash;
//     };


// Method to generate JWT token
/* UserSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
    }, secret);
};




UserSchema.methods.toAuthJSON = function(){
    return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.image
    };
};
 */