import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.cookie; // Assuming the token is passed in the Cookie header
    console.log(token);

    if (!token) {
      return res.status(401).json({ error: 'Authentication token missing' });
    }

    const sessionCookie = token.split('=')[1]; // Extract session cookie value
    const decoded = jwt.verify(sessionCookie, process.env.JWT_SECRET);
    req.userId = decoded.userID;
    console.log(decoded);
    // console.log(req.userId);

    // Optionally, you can fetch the user details here to attach to the request
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    req.user = user;
    console.log(req.user);

    next();
  } catch (error) {
    console.error('Error verifying token:', error.message);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};