import User from '../models/user.model.js';

export const getVolunteer = async (req, res) => {
  try {
    // Find the user by the provided user ID in the request
    const user = await User.findById(req.userId);

    // If the user is not found, return a 404 error response
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Log the user object to the console (for debugging purposes)
    console.log(user);

    // Find all users in the same department with the position of 'volunteer'
    const volunteers = await User.find({
      department: user.department,
      position: 'volunteer',
    });

    // Return the volunteers in the response with a 200 status code
    res.status(200).json({
      volunteers,
    });
  } catch (error) {
    // Log any errors that occur to the console (for debugging purposes)
    console.error('Error fetching profile:', error.message);
    
    // Return a 500 error response in case of an internal server error
    res.status(500).json({ error: 'Internal server error' });
  }
};
  