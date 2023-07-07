const express = require("express");
const cors = require("cors");
require("dotenv").config();

const signupRouter = require("./routes/signup.Router");
const loginRouter = require("./routes/login.Router");
const productsRouter = require("./routes/products.Router");
const cartRouter = require("./routes/cart.Router");
const wishlistRouter = require("./routes/wishlist.Router");
const authMiddleware = require("./middlewares/authMiddleware");
const connection = require("./config/db");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(
    '<h1>Welcome to the Server</h1><h2>Navigation</h2><ul><li><a href="/signup">Signup</a></li><li><a href="/login">Login</a></li><li><a href="/products">Products</a></li><li><a href="/cart">Cart</a></li><li><a href="/wishlist">Wishlist</a></li></ul>'
  );
});

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/products", productsRouter);

// app.use(authMiddleware);

app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Server has started on ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});

