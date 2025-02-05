const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Import the User model to fetch user from DB

const authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token and decode the payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // The payload contains user._id, so we can fetch the user using that _id
        const user = await User.findById(decoded.user);  // Use decoded.user to fetch the user

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Attach user to request object
        req.user = user;

        // Log the user to verify the correct user is being attached
        console.log("Authenticated User:", req.user);

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log("JWT verification error:", error);
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authenticateUser;
