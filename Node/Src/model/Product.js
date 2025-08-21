const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  Product_Name: { type: String, required: true },
  Description: { type: String, required: true },
  Meta_Description: String,
  Product_Images: [String],
  Tags: {
    type: [String],
    default: [],
  },
  Created_At: {
    type: Date,
    default: Date.now,
  },
});

const ProductModel = mongoose.model("Product", ProductSchema);
module.exports = ProductModel;
