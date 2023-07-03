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
      const colorValues = Array.isArray(color_like) ? color_like : [color_like];
      let colorQuery = { color: { $in: colorValues } };
      filter.color = { $in: colorQuery };
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
        { rating: { $regex: q, $options: "i" } },
        { price: { $regex: q, $options: "i" } },
        { type: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { color: { $regex: q, $options: "i" } },
      ];
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
    res.status(500).json({ error: "Failed to fetch products" });
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
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

module.exports = productsRouter;
