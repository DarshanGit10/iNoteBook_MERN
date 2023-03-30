// DB Connection File
const mongoose = require('mongoose');
require('dotenv').config();
// .env has connection url
async function connectToMongo() {
  try {
    await mongoose.connect(String(process.env.MONGO_URL) , { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  }
}

module.exports = connectToMongo;