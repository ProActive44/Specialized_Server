const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contact: { type: Number, required: true },
  password: { type: String, required: true }
});

const userModel = model("user", userSchema);

module.exports = userModel;
