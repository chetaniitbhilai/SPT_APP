import User from '../models/user.model.js';

export const getEmail = async (req, res) => {
  try {
    // Fetch the user by ID from the request (assumes authentication middleware sets req.user)
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Destructure email_1 and email_2 from the user document
    const { email, email_2 } = user;

    // Respond with the emails
    res.json({ email, email_2 });
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
