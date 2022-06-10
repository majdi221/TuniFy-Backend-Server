var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var multer  = require('multer');
var fs = require('fs');
require('dotenv/config');


// Initialize express app
var app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('img'))
app.use('/img', express.static('img'))

// Connect to MongoDB
mongoose.connect('mongodb+srv://shopify:shopify@cluster0.ybejy.mongodb.net/shopify?retryWrites=true&w=majority',
  {
    useNewUrlParser: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});



/*
// checking file type
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
      cb(null, true);
  } else {
      cb(new Error('Not an image! Please upload an image.', 400), false);
  }
};

exports.upload = multer({
  storage: storage,
  limits: {
      fileSize: 1024 * 1024 * 6
  },
  fileFilter: fileFilter
});

*/

//app.use('/images-files', express.static("uploads/images"));




app.use(express.json());



// Using bodyparser to parse json data
app.use(bodyParser.json());
  
// Importing routes
const user = require('./routes/user');
const product = require('./routes/product');
const cart = require('./routes/cart');
//const order = require('./routes/order');

// Use route when url matches /api/*/
app.use('/api/user', user);
app.use('/api/product', product);
app.use('/api/cart', cart);
//app.use('/api/order', order);

// Creating server
app.listen(3000, () => {
  console.log("Server is running at port 3000");
});