const express = require('express');
const wishlistModel = require('../models/wishlist.model');

const wishlistRouter = express.Router();

// Get wishlist products
wishlistRouter.get("/", async (req, res) => {
  try {
    const wishlistProducts = await wishlistModel.find();
    res.json(wishlistProducts);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Failed to fetch wishlist products" });
  }
});

// Add product to wishlist
wishlistRouter.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    const addedProduct = await wishlistModel.create(newProduct);
    res.status(201).json(addedProduct);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Failed to add product to wishlist" });
  }
});

// Delete product from wishlist
wishlistRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await wishlistModel.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Failed to delete product from wishlist" });
  }
});



module.exports = wishlistRouter