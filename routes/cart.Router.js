const express = require("express");
const cartModel = require("../models/cart.model");

const cartRouter = express.Router();

// Get cart products
cartRouter.get("/", async (req, res) => {
  try {
    let userId = req.headers.userid;
    if (!userId) {
      return res.status(401).send({ error: "User not logged in" });
    }
    const cartProducts = await cartModel.find({ userId: userId });
    res.json(cartProducts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch cart products", msg: error });
  }
});

// Add product to cart
cartRouter.post("/", async (req, res) => {
  try {
    const product = req.body;

    const existinCart = await cartModel.findOne({
      productId: product.productId,
      userId: product.userId,
    });

    if (existinCart) {
      // If a document with the same productId and userId already exists,
      res.status(409).json({ error: "Product already exists in Cart" });
    } else {
      delete product._id;
      const addedProduct = await cartModel.create(product);
      res.status(201).json(addedProduct);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add product to cart", msg: error });
  }
});

// Delete product from cart
cartRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await cartModel.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete product from cart", msg: error });
  }
});

module.exports = cartRouter;
