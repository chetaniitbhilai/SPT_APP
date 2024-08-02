/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logo from "../../assets/CCPS.png";
import toast from "react-hot-toast";

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/getcdbweb");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const mappedData = data.map((item) => ({
          company: item.HRcompany,
          hrName: item.HRname,
          contactNo: item.HRphone,
          email: item.HRemail,
          emailStatus: item.ResponseEmail,
          emailRemarksText: item.ResponseEmailText,
          callRemarks: item.ResponsePhone,
          CallRemarksText: item.ResponsePhoneText,
          dateOfContact: item.DateTime,
          personAssigned: item.PersonName,
          department: item.Department,
          status: item.Status // Adding the status field
        }));

        setTableData(mappedData);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        toast.error("Error fetching central database data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="sidebar">
        <img className="logo" src={logo} alt="Logo" />
        <nav className="nav">
          <Link to="/" className="nav-link">Central Database</Link>
          <Link to="/response-form" className="nav-link">Add Data</Link>
        </nav>
        <button className="logout-button">Logout</button>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className="main-content">
        <div id="central-database">
          <h1>Central Database</h1>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {!loading && !error && (
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
                  <th>Status</th> {/* Added Status column */}
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
                    <td>{row.status}</td> {/* Displaying Status */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
