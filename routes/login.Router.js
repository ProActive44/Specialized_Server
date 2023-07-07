const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
require("dotenv").config();

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(200).send({ msg: "Please enter right credentials" });
    }
    // console.log(email, password)
    const hash = user.password;
    const correct_pass = await bcrypt.compare(password, hash);
    if (correct_pass) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      res.status(200).send({ msg: "Login Successful", token });
    } else {
      res.status(200).send({ msg: "Please enter right credentials"})
    }
  } catch (error) {
    res.status(500).send({ msg: "Login Failed" });
  }
});

module.exports = loginRouter;
