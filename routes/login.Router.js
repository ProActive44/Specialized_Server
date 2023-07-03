const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).send({ msg: "Please enter right credentials" });
    }

    const hash = user.password;
    const correct_pass = bcrypt.compareSync(password, hash);
    if (correct_pass) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.status(200).send({ msg: "Login Successful", token });
    } else {
      res.status(400).send({ msg: "Login Failed" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Login Failed" });
  }
});

module.exports = loginRouter;
