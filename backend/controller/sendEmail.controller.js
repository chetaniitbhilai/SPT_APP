// sendEmail.controller.js

import nodemailer from 'nodemailer';
import User from '../models/user.model.js'; // Import your User model

export const sendEmail = async (req, res) => {
  const { recipientEmail, subject, body } = req.body;
  
  try {
    // Fetch user details from database (assuming you have middleware to populate req.user)
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('Recipient Email:', recipientEmail);
    console.log('Subject:', subject);
    console.log('Body:', body);
    console.log('User Email:', user.email);
    console.log('User Email2:', user.email_2);
    // Create a transporter using Gmail SMTP (or your preferred email service)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user.email_2, // Sender's email address (email_2 from user document)
        pass: process.env.EMAIL_PASSWORD, // Password for email_2 (not recommended to hardcode passwords)
      },
    });

    // Email options
    const mailOptions = {
      from: user.email_2, // Sender's email address (email_2)
      to: recipientEmail,
      cc: user.email, // CC email address (email from user document)
      subject: subject,
      text: body,
    };

    // Send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully.', info: info.response });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email.', error: error.message });
  }
};
