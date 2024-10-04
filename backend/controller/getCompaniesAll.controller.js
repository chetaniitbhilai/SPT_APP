// controller/company.controller.js

import { findAllHRData, mapHRData } from "../Repository/companyData.repository.js";

export const getCompaniesAll = async (req, res) => {
    try {
        // Retrieve all HR data from the database
        const hrData = await findAllHRData();

        // Map the necessary HR fields to a new array
        const filteredHRs = mapHRData(hrData);

        // Send the filtered data to the frontend
        res.status(200).json(filteredHRs);
    } catch (error) {
        console.error("Error in getting HRs: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
