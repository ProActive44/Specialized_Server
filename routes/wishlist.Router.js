const express = require("express");
const wishlistModel = require("../models/wishlist.model");

const wishlistRouter = express.Router();

// Get wishlist products
wishlistRouter.get("/", async (req, res) => {
  try {
    let userId = req.headers.userid;
    if (!userId) {
      return res.status(401).send({ error: "User not logged in" });
    }
    const wishlistProducts = await wishlistModel.find({ userId: userId });
    res.json(wishlistProducts);
  } catch (error) {
    // console.error(error);
    res
      .status(500)
      .json({ error: "Failed to fetch wishlist products", msg: error });
  }
});

// Add product to wishlist
wishlistRouter.post("/", async (req, res) => {
  try {
    const newWish = req.body;
    const existingWish = await wishlistModel.findOne({
      productId: newWish.productId,
      userId: newWish.userId,
    });
   
    if (existingWish) {
      // If a document with the same productId and userId already exists,
      res.status(409).json({ error: "Product already exists in wishlist" });
    } else {
      delete newWish._id;
      const addedProduct = await wishlistModel.create(newWish);
      res.status(201).json(addedProduct);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add product to wishlist", msg: error });
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
    res
      .status(500)
      .json({ error: "Failed to delete product from wishlist", msg: error });
  }
});

module.exports = wishlistRouter;
