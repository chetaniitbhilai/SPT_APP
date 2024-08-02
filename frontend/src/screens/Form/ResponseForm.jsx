import React, { useRef, useState } from 'react';
import './ResponseForm.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from "../../assets/CCPS.png";


const ResponseForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const company = location.state?.company || {};
    const user = location.state?.user || { _id: '', email: '' };

    const [isDarkMode, setIsDarkMode] = useState(false);

    const cnameRef = useRef();
    const hrnameRef = useRef();
    const hrnumRef = useRef();
    const hremailRef = useRef();
    const responseRef = useRef();
    const dateRef = useRef();
    const messageRef = useRef();
    const departmentRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const companyResponse = {
            name: cnameRef.current.value,
            hrname: hrnameRef.current.value,
            hrNumber: hrnumRef.current.value,
            hremail: hremailRef.current.value,
            response: responseRef.current.value,
            date: dateRef.current.value,
            message: messageRef.current.value,
            department: departmentRef.current.value,
            userId: user._id,
            memMail: user.email
        };

        console.log('Form data:', companyResponse);

        // Placeholder for form submission logic

        // For now, just navigate to the home page
        navigate("/");
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={`container1 ${isDarkMode ? 'dark-mode_R' : 'light-mode_R'}`}>
             <div className="sidebar">
        <img className="logo" src={logo} alt="Logo" />
        <nav className="nav">
            <a href="#central-database" className="nav-link">Central Database</a>
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
                            <input type="text" id="companyName" name="companyName" ref={cnameRef} defaultValue={company.name} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hrName">HR Name:</label>
                            <input type="text" id="hrName" name="hrName" ref={hrnameRef} defaultValue={company.hrname} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hrNumber">HR Number:</label>
                            <input type="tel" id="hrNumber" name="hrNumber" ref={hrnumRef} defaultValue={company.hrNumber} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hrEmail">HR Email:</label>
                            <input type="email" id="hrEmail" name="hrEmail" ref={hremailRef} defaultValue={company.hremail} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="department">Department:</label>
                            <select id="department" name="department" ref={departmentRef} defaultValue="">
                                <option value="" style={{ backgroundColor: 'white' }}>Select Department</option>
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
