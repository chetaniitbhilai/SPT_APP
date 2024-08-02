import Data from "../models/data.model.js";

export const getCentralDatabase = async (req, res) => {
	try {
		// Retrieve all HR data from the database
		const hrData = await Data.find({});

		// Map the necessary HR fields to a new array
		const filteredHRs = hrData.map(hr => ({
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

		// Send the filtered data to the frontend
		res.status(200).json(filteredHRs);
	} catch (error) {
		console.error("Error in getting HRs: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
