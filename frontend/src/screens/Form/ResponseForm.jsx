/* eslint-disable no-unused-vars */
import React, { useRef } from 'react';
import './ResponseForm.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ResponseForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const company = location.state?.company;
    const user = location.state?.user;

    const cnameRef = useRef();
    const hrnameRef = useRef();
    const hrnumRef = useRef();
    const hremailRef = useRef();
    const responseRef = useRef();
    const dateRef = useRef();
    const messageRef = useRef();
    const departmentRef = useRef(); // Define departmentRef using useRef

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
            department: departmentRef.current.value, // Include department in the form data
            userId: user._id, // Assuming user object has _id property
            memMail: user.email // Include user.email in the response
        };

        console.log('Form data:', companyResponse);

        // Placeholder for form submission logic

        // For now, just navigate to the home page
        navigate("/");
    };

    return (
        <div className="response-form-container">
            
          <div className='add'>
                <h2>Add Company Contact</h2>
                </div>
                <div className="form-card">
                <form onSubmit={handleSubmit} className='form-grp-card'>
                    <div className="form-group">
                        <label htmlFor="companyName">Company Name:</label>
                        <input type="text" id="companyName" name="companyName" ref={cnameRef} defaultValue={company?.name || ''} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="hrName">HR Name:</label>
                        <input type="text" id="hrName" name="hrName" ref={hrnameRef} defaultValue={company?.hrname || ''} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="hrNumber">HR Number:</label>
                        <input type="tel" id="hrNumber" name="hrNumber" ref={hrnumRef} defaultValue={company?.hrNumber || ''} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="hrEmail">HR Email:</label>
                        <input type="email" id="hrEmail" name="hrEmail" ref={hremailRef} defaultValue={company?.hremail || ''} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="department">Department:</label>
                        <select id="department" name="department" ref={departmentRef} defaultValue="">
                        <option value="" style={{ backgroundColor: 'white'} }>Select Department</option>
                            <option value="CSE">CSE</option>
                            <option value="Electrical">Electrical</option>
                            <option value="DSAI">DSAI</option>
                            <option value="Mechatronics">Mechatronics</option>
                            <option value="Mechanical">Mechanical</option>
                        </select>
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="message">Message:</label>
                        <textarea id="message" name="message" ref={messageRef}></textarea>
                    </div> */}
                    <button type="submit" className="submit-button">Submit</button>
                </form>
                {/* <Link to="/" className="home-link">Home</Link> */}
            </div>
        </div>
    );
};

export default ResponseForm;
