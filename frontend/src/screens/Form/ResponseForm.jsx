/* eslint-disable no-unused-vars */
import React, { useRef, useState, useEffect } from 'react';
/* eslint-disable no-unused-vars */
import './ResponseForm.css';
// eslint-disable-next-line no-unused-vars
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "../../assets/CCPS.png";
import toast from "react-hot-toast"; // Import toast for error notifications

const ResponseForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const company = location.state?.company || {};
    const user = location.state?.user || { _id: '', email: '' };

    const [isDarkMode, setIsDarkMode] = useState(false);
    const [dateTime, setDateTime] = useState('');

    useEffect(() => {
        // Function to get the current date and time
        const getCurrentDateTime = () => {
            const now = new Date();
            const formattedDateTime = now.toISOString().slice(0, 16); // Format as YYYY-MM-DDTHH:MM
            setDateTime(formattedDateTime);
        };

        getCurrentDateTime();
    }, []);

    const cnameRef = useRef();
    const hrnameRef = useRef();
    const hrnumRef = useRef();
    const hremailRef = useRef();
    const departmentRef = useRef();

    const resetForm = () => {
        cnameRef.current.value = '';
        hrnameRef.current.value = '';
        hrnumRef.current.value = '';
        hremailRef.current.value = '';
        departmentRef.current.value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const companyResponse = {
            personName: 'Chetan',
            companyName: cnameRef.current.value, // Assuming companyName is already provided in state
            hrName: hrnameRef.current.value,
            hrNumber: hrnumRef.current.value,
            hrEmail: hremailRef.current.value,
            responsePhone: 'to be called',
            responsePhoneText: 'to be called',
            responseEmail: 'to be mailed',
            responseEmailText: 'to be mailed',
            dateTime: dateTime,
            department: departmentRef.current.value,
            status: 'to assign',
        };
        
        try {
            const response = await fetch("http://localhost:5000/api/query/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(companyResponse)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to submit data");
            }

            toast.success("Company data added successfully");
            resetForm();
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`container1 ${isDarkMode ? 'dark-mode_R' : 'light-mode_R'}`}>
            <div className="sidebar_R">
                <img className="logo" src={logo} alt="Logo" />
                <nav className="nav">
                    <Link to="/" className="nav-link">Central Database</Link>
                    <Link to="/response-form" className="nav-link">Add Data</Link>
                </nav>
                <div className='red'>
                    <button className="logout-button_R">Logout</button>
                    <button className="dark-mode-toggle_R" onClick={toggleDarkMode}>
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </div>
            </div>

            <div className="response-form-container">
                <div className='add'>
                    <h2>Add Company Contact</h2>
                </div>
                <div className="form-card">
                    <form onSubmit={handleSubmit} className='form-grp-card'>
                        <div className="form-group">
                            <label htmlFor="companyName">Company Name:</label>
                            <input 
                                type="text" 
                                id="companyName" 
                                name="companyName" 
                                ref={cnameRef} 
                                placeholder="Enter Company Name" 
                                // defaultValue={company.name} 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hrName">HR Name:</label>
                            <input 
                                type="text" 
                                id="hrName" 
                                name="hrName" 
                                ref={hrnameRef} 
                                placeholder="Enter HR Name" 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hrNumber">HR Number:</label>
                            <input 
                                type="tel" 
                                id="hrNumber" 
                                name="hrNumber" 
                                ref={hrnumRef} 
                                placeholder="Enter HR Number" 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hrEmail">HR Email:</label>
                            <input 
                                type="email" 
                                id="hrEmail" 
                                name="hrEmail" 
                                ref={hremailRef} 
                                placeholder="Enter HR Email" 
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="department">Department:</label>
                            <select 
                                id="department" 
                                name="department" 
                                ref={departmentRef} 
                                placeholder="Select Department"
                            >
                                <option value="">Select Department</option>
                                <option value="CSE">CSE</option>
                                <option value="Electrical">Electrical</option>
                                <option value="DSAI">DSAI</option>
                                <option value="Mechatronics">Mechatronics</option>
                                <option value="Mechanical">Mechanical</option>
                            </select>
                        </div>
                        
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResponseForm;
