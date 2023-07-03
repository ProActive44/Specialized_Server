const mongoose = require('mongoose');
require('dotenv').config();

const connection = mongoose.connect(process.env.MONGO_URL, {
    bufferCommands: false,
    serverSelectionTimeoutMS: 30000, // Increase to 30 seconds
  })
.then((res)=> console.log("Database connected."))
.catch((err)=>console.log("Failed to connect database", err))

module.exports = connection;
