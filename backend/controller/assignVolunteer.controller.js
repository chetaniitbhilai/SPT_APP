// controller/company.controller.js

import { findCompanyById, updateCompany } from "../Repository/company.repository.js";

export const assignVolunteer = async (req, res) => {
    const { volunteerName, selectedContact, status, dateTime } = req.body;

    try {
        const company = await findCompanyById(selectedContact);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        company.personName = volunteerName;
        company.status = status;
        company.dateTime = dateTime;

        const updatedCompany = await updateCompany(company);

        res.status(200).json({ message: 'Company updated successfully', company: updatedCompany });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update company', error: error.message });
    }
};
