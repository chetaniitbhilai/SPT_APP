// Repository/data.repository.js

import Data from "../models/data.model.js";

export const saveData = async (data) => {
    try {
        const newQuery = new Data(data);
        await newQuery.save();
        return newQuery;
    } catch (error) {
        throw new Error("Error saving data: " + error.message);
    }
};
