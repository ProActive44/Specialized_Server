const express = require("express");
const productModel = require("../models/product.model");

const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  try {
    const {
      _page,
      _limit,
      _sort,
      _order,
      price_gte,
      price_lte,
      id_gte,
      id_lte,
      color_like,
    } = req.query;
    const { category, price, color, _id, q } = req.query;

    const page = parseInt(_page) || 1;
    const limit = parseInt(_limit) || 9;
    const skip = (page - 1) * limit;

    const sortOptions = {};
    const filter = {};

    if (_sort) {
      sortOptions[_sort] = _order === "desc" ? -1 : 1;
    }

    if (price_gte && price_lte) {
      filter.price = { $gte: parseInt(price_gte), $lte: parseInt(price_lte) };
    }

    if (id_gte && id_lte) {
      filter.discount = { $gte: parseInt(id_gte), $lte: parseInt(id_lte) };
    }

    if (color_like) {
      let colorValues;
      if (Array.isArray(color_like)) {
        colorValues = color_like;
      } else {
        colorValues = color_like.split(",");
      }
      filter.color = { $in: colorValues };
    }

    if (category) {
      filter.category = category;
    }
    if (price) {
      filter.price = price;
    }
    if (color) {
      filter.color = color;
    }
    if (_id) {
      filter._id = _id;
    }

    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { type: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { color: { $regex: q, $options: "i" } },
      ];

      // Check if q can be parsed as a number for "rating" and "price"
      const numericValue = parseFloat(q);
      if (!isNaN(numericValue)) {
        filter.$or.push({ rating: numericValue }, { price: numericValue });
      }
    }

    const totalCount = await productModel.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    const data = await productModel
      .find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    res.json({ data, totalPages });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products", msg: error });
  }
});

productsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product", msg: error });
  }
});

module.exports = productsRouter;
