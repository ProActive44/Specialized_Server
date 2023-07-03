const express = require('express');
const cartModel = require('../models/cart.model');

const cartRouter = express.Router();

// Get cart products
cartRouter.get("/", async (req, res) => {
  try {
    const cartProducts = await cartModel.find();
    res.json(cartProducts);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Failed to fetch cart products" });
  }
});

// Add product to cart
cartRouter.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    const addedProduct = await cartModel.create(newProduct);
    res.status(201).json(addedProduct);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Failed to add product to cart" });
  }
});

// Delete product from cart
cartRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await cartModel.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    // console.error(error);
    res.status(500).json({ error: "Failed to delete product from cart" });
  }
});

module.exports = cartRouter;

