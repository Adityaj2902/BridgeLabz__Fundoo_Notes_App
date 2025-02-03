const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/UserRoutes');
const noteRoutes = require('./routes/notesRoutes');


// Initialize dotenv for environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/', noteRoutes); // Set up routes
// app.get('/protected', verifyToken, (req, res) => {
//   res.json({ message: 'Protected data', user: req.user });
// });



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Failed to connect to MongoDB:", err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

