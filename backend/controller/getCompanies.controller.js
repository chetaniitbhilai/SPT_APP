// controller/company.controller.js

import { findUserById, findCompaniesByPersonName, mapCompanies } from "../Repository/userData.repository.js";

export const getCompanies = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Fetch the user data using the user ID
        const user = await findUserById(req.userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Extract the personName from the user data
        const personName = user.name;

        // Fetch the companies using the personName
        const data = await findCompaniesByPersonName(personName);

        // Map the data to the required company format
        const companies = mapCompanies(data);

        res.status(200).json(companies);
    } catch (error) {
        console.error('Error fetching companies:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
