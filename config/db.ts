import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Get the MongoDB URI from the environment variables
const DB = process.env.MONGODB_URI;

if (!DB) {
  console.error('MongoDB URI is not defined in the .env file!');
  process.exit(1);  // Exit the app if DB URI is not found
}

// Mongoose v6+ connection (no need for useNewUrlParser, useUnifiedTopology)
mongoose.connect(DB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
