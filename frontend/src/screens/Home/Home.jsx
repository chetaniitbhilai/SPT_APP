/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logo from "../../assets/CCPS.png";

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const tableData = [
    {
      company: "Company A",
      hrName: "John Doe",
      contactNo: "123-456-7890",
      email: "john@companya.com",
      emailStatus: "Sent",
      emailRemarksText: "koi bhi text ",
      callRemarks: "Interested",
      CallRemarksText: "koi bhi call text",
      dateOfContact: "2024-08-01",
      personAssigned: "Alice",
      department: "Sales"
    },
    {
      company: "Company B",
      hrName: "Jane Smith",
      contactNo: "987-654-3210",
      email: "jane@companyb.com",
      emailStatus: "Pending",
      emailRemarksText: "koi bhi text",
      callRemarks: "Follow up needed",
      CallRemarksText: "koi bhi call text",
      dateOfContact: "2024-08-02",
      personAssigned: "Bob",
      department: "Marketing"
    }
  ];

  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="sidebar">
        <img className="logo" src={logo} alt="Logo" />
        <nav className="nav">
          <a href="#central-database" className="nav-link">Central Database</a>
          <Link to="/response-form" className="nav-link">Add Data</Link>
        </nav>
        <button className="logout-button">Logout</button>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className="main-content">
        <h1>Home</h1>
        <table className="data-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>HR Name</th>
              <th>Contact No.</th>
              <th>Email</th>
              <th>Email Status</th>
              <th>Call Remarks</th>
              <th>Date of Contact</th>
              <th>Person Assigned</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.company}</td>
                <td>{row.hrName}</td>
                <td>{row.contactNo}</td>
                <td>{row.email}</td>
                <td className="tooltip-container">
                  {row.emailStatus}
                  <span className="tooltip">{row.emailRemarksText}</span>
                </td>
                <td className="tooltip-container">
                  {row.callRemarks}
                  <span className="tooltip">{row.CallRemarksText}</span>
                </td>
                <td>{row.dateOfContact}</td>
                <td>{row.personAssigned}</td>
                <td>{row.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <Link to="/response-form">Go to Response Form</Link> */}
    </div>
  );
};

export default Home;