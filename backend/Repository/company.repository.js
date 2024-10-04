// Repository/company.repository.js

import Data from "../models/data.model.js";

// Function to find a company by ID
export const findCompanyById = async (id) => {
    try {
        const company = await Data.findById(id);
        return company;
    } catch (error) {
        throw new Error("Error finding company: " + error.message);
    }
};

// Function to save the updated company data
export const updateCompany = async (company) => {
    try {
        await company.save();
        return company;
    } catch (error) {
        throw new Error("Error updating company: " + error.message);
    }
};
