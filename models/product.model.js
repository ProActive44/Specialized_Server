  const { Schema, model } = require("mongoose");

  const productSchema = new Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    discount: { type, Number, required: true},
    price: { type: Number, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    images: [{ type: String }],
    color: [{ type: String }],
  });

  const productModel = model("product", productSchema);

  module.exports = productModel;
