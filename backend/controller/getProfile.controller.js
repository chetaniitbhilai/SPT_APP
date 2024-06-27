import User from '../models/user.model.js';

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log(user);
    res.status(200).json({
      name: user.name,
      position: user.position,
      responsibility: user.responsibility,
    });
  } catch (error) {
    console.error('Error fetching profile:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};