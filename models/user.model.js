const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String},
  contact: { type: Number},
  password: { type: String, required: true }
});

const userModel = model("user", userSchema);

module.exports = userModel;
