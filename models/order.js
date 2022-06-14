const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ItemSchema = new Schema({
  productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
  },
  quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity can not be less then 1.']
  },
  price: {
      type: Number,
      required: true
  },
  total: {
      type: Number,
      required: true,
  }
}, {
  timestamps: true
})

const orderSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  items: [ItemSchema],

    totalCost: {
      type: Number,
      default: 0,
      required: true,
    },
  

  address: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);