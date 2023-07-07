const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");

const signupRouter = express.Router();

signupRouter.post("/", async (req, res) => {
  try {
    const { email, firstName, lastName, contact, password } = req.body;
    
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "UserAlreadyExists" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new userModel({
      email,
      firstName,
      lastName,
      contact,
      password: hashedPassword,
    });
    
    await newUser.save();
    res.status(200).send({ message: "Signup successful" });
  } catch (error) {
    res.status(500).send({ error: "SignupFailed" });
  }
});

signupRouter.post("/getuser", async (req, res) => {
  try {
    const { email } = req.body;
    // Find the user based on the email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "UserNotFound" });
    }

    res.status(200).send({msg:"User Found",user});
  } catch (error) {
    res.status(500).send({ error: "GetUserFailed" });
  }
});

module.exports = signupRouter;
