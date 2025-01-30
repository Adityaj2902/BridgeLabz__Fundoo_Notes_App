import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

// Initialize dotenv for environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
// const mongoUri = process.env.MONGO_URI as string; // Type assertion to ensure it's a string
// if (!mongoUri) {
//   console.error('MONGO_URI is not defined in the environment variables.');
//   process.exit(1); // Exit if no MONGO_URI is provided
// }

// mongoose.connect(mongoUri, {
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true,
// })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch(err => console.error("Failed to connect to MongoDB:", err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
