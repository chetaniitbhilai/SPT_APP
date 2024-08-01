import User from '../models/user.model.js'; // Assuming the user model is named user.model.js
import Data from '../models/data.model.js';

export const getCompaniesCoordi = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Fetch the user data using the user ID
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract the username from the user data
    const personName = user.name;
    // console.log(username);
    // Fetch the companies using the username
    const data = await Data.find({ personName, status: 'to assign' });
    console.log(data);

    const companies = data.map(item => ({
      _id: item._id,
      hrName: item.hrName,
      hrEmail: item.hrEmail,
      hrPhone: item.hrNumber,
      companyName: item.companyName
    }));

    res.status(200).json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
