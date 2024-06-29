import Data from "../models/data.model.js";

export const updateCompany = async (req, res) => {
  // const { id } = req.params;
  const { companyId,callRemark, mailRemark, callTextRemark, emailTextRemark, status, dateTime } = req.body;
  console.log(companyId);

  try {
    const company = await Data.findById(companyId);
    // console.log(company);
    console.log(companyId+" "+callRemark+" "+  mailRemark+ " "+callTextRemark+ " "+  emailTextRemark+ " " +status+ " "+  dateTime)

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    company.responsePhone = callRemark;
    company.responseEmail = mailRemark;
    company.responsePhoneText = callTextRemark;
    company.responseEmailText = emailTextRemark;
    company.status = status;
    company.dateTime = dateTime;

    await company.save();

    res.status(200).json({ message: 'Company updated successfully', company });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update company', error: error.message });
  }
  };