import React from 'react';
import './Login.css';
import { useRef } from 'react';
import useLogin from '../../hooks/useLogin';

// const Login = ({verifyLogin}) => {
const Login = () => {
  const [activeTab, setActiveTab] = React.useState('login');
  const {loading,login} =useLogin()
  const emailref=useRef();
  const passwordref=useRef();
  const handlesubmit= async(e)=>{
    e.preventDefault;
    const email=emailref.current.value;
    const password=passwordref.current.value;
    // const details={
    //   email:email,
    //   password:password
    // };
    // verifyLogin(details);
    await login(email,password)
    
    emailref.current.value="";
    passwordref.current.value="";
  }

  return (
    <div>
    <div className="container">
      <div className="form-wrapper">
        <img className="profile-image" src="../../public/vite.svg" alt="Profile" />
        <div className="tab">
          <button className={`tab-button ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>Login</button>
          <button className={`tab-button ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => setActiveTab('signup')}>Sign Up</button>
        </div>
        <input ref={emailref} className="input" type="email" placeholder="Email"  />
        <input ref={passwordref} className="input" type="password" placeholder="Password" />
        <button  onClick={handlesubmit} className="button">Submit</button>
        <a className="link" href="#">FORGET YOUR PASSWORD?</a>
      </div>
    </div>
    </div>
  );
};

export default Login