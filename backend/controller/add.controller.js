// controller/data.controller.js

import { saveData } from "../Repository/data.repository.js";

export const addData = async (req, res) => {
    try {
        const { personName, companyName, hrName, hrNumber, hrEmail, responsePhone, responsePhoneText, responseEmail, responseEmailText, dateTime, department, status } = req.body;

        const newQuery = await saveData({
            personName,
            companyName,
            hrName,
            hrNumber,   
            hrEmail,
            responsePhone,
            responsePhoneText,
            responseEmail,
            responseEmailText,
            dateTime,
            department,
            status
        });

        if(newQuery) {
            res.status(201).json({
                _id: newQuery._id,
                personName: newQuery.personName,
            });
        }

    } catch (error) {
        console.log("Error in data addition controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
