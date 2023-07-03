const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

const signupRouter = express.Router();

signupRouter.post("/", async (req, res) => {
  try {
    const { email, firstName, lastName, contact, password } = req.body;
    const hashed_Password = bcrypt.hashSync(password, 8);
    const new_user = new userModel({
      email,
      firstName,
      lastName,
      contact,
      password: hashed_Password,
    });
    await new_user.save();
    res.status(200).send({ msg: "Signup Successful" });
  } catch (error) {
    res.status(500).send({ msg: "Failed to Signup" });
  }
});

module.exports = signupRouter;
