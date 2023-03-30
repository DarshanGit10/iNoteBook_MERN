const mongoose = require('mongoose');
require('dotenv').config();


async function connectToMongo() {
  try {
    await mongoose.connect(String(process.env.MONGO_URL) , { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
  }
}

module.exports = connectToMongo;