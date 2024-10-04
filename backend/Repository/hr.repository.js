// Repository/hr.repository.js

import Data from "../models/data.model.js";

// Function to retrieve all HR data from the database
export const getAllHRData = async () => {
    try {
        const hrData = await Data.find({});
        return hrData;
    } catch (error) {
        throw new Error("Error retrieving HR data: " + error.message);
    }
};

// Function to filter and map the HR data
export const filterHRData = (hrData) => {
    return hrData.map(hr => ({
        HRname: hr.hrName,
        HRphone: hr.hrNumber,
        HRemail: hr.hrEmail,
        HRcompany: hr.companyName
    }));
};
