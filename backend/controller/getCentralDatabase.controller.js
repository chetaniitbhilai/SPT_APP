// controller/hr.controller.js

import { getAllHRData, filterHRData } from "../Repository/hr.repository.js";

export const getCentralDatabase = async (req, res) => {
    try {
        // Retrieve all HR data from the database
        const hrData = await getAllHRData();

        // Map the necessary HR fields to a new array
        const filteredHRs = filterHRData(hrData);

        // Send the filtered data to the frontend
        res.status(200).json(filteredHRs);
    } catch (error) {
        console.error("Error in getting HRs: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
