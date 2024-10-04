// Repository/userData.repository.js

import User from '../models/user.model.js';
import Data from '../models/data.model.js';

// Function to find a user by their ID
export const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId);
        return user;
    } catch (error) {
        throw new Error("Error finding user: " + error.message);
    }
};

// Function to find companies by personName and status
export const findCompaniesByPersonName = async (personName) => {
    try {
        const data = await Data.find({ personName, status: 'assigned' });
        return data;
    } catch (error) {
        throw new Error("Error finding companies: " + error.message);
    }
};

// Function to map company data
export const mapCompanies = (data) => {
    return data.map(item => ({
        _id: item._id,
        hrName: item.hrName,
        hrEmail: item.hrEmail,
        hrPhone: item.hrNumber,
        companyName: item.companyName
    }));
};
