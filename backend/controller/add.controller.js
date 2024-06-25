import Data from "../models/data.model.js";

export const addData = async (req, res) => {
    try {
        const { personName,companyName,hrName,hrNumber, hrEmail,responsePhone,responsePhoneText,responseEmail,responseEmailText,dateTime,department,status }  = req.body;

        
        const newQuery = new Data({
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

        await newQuery.save();

        if(newQuery){
            res.status(201).json({
                _id: newQuery._id,
                personName: newQuery.personName,
            });
        }

    } catch (error) {
        console.log("Error in data addition controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}