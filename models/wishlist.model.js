const { Schema, model } = require("mongoose");

const wishlistSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "product", required: true },
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  discount: { type, Number, required: true},
  price: { type: Number, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  images: [{ type: String }],
  color: [{ type: String }],
});

const wishlistModel = model("wishlist", wishlistSchema);

module.exports = wishlistModel;
