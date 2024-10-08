// Repository/companyData.repository.js

import Data from '../models/data.model.js';

// Function to retrieve all HR data from the database
export const findAllHRData = async () => {
    try {
        const hrData = await Data.find({});
        return hrData;
    } catch (error) {
        throw new Error("Error retrieving HR data: " + error.message);
    }
};

// Function to map the HR data to the required format
export const mapHRData = (hrData) => {
    return hrData.map(hr => ({
        HRname: hr.hrName,
        HRphone: hr.hrNumber,
        HRemail: hr.hrEmail,
        HRcompany: hr.companyName,
        PersonName: hr.personName,
        ResponsePhone: hr.responsePhone,
        ResponsePhoneText: hr.responsePhoneText,
        ResponseEmail: hr.responseEmail,
        ResponseEmailText: hr.responseEmailText,
        DateTime: hr.dateTime,
        Department: hr.department,
        Status: hr.status
    }));
};
