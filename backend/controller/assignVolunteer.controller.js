import Data from "../models/data.model.js";

export const assignVolunteer = async (req, res) => {
  // const { id } = req.params;
  const {  volunteerName, selectedContact,status, dateTime } = req.body;
  console.log(selectedContact);

  try {
    const company = await Data.findById(selectedContact);
    console.log(company);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    company.personName=volunteerName;
    company.status = status;
    company.dateTime = dateTime;

    await company.save();
    console.log(company);

    res.status(200).json({ message: 'Company updated successfully', company });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update company', error: error.message });
  }
  };