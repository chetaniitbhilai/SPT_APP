/* eslint-disable no-unused-vars */
// import { useState } from "react"
// import { Link } from "react-router-dom"
// import useLogin from "../../hooks/useLogin";

// const Login = () => {
//     const [username,setUsername]=useState("");
//     const [password,setPassword]=useState("");

//     const {loading,login} =useLogin()

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         await login(username,password)
//     }

//   return <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//     <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//         <h1 className="text-3xl font-semibold text-center text-gray-300">
//             Login
//             <span className="text-blue-500">SPT App</span>
//         </h1>
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <label className="label p-2">
//                     <span className="text-base label-text">Username</span>
//                 </label>
//                 <input type="text" placeholder="Enter username" className="w-full input input-bordered h-10"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 /> 
//             </div>
//             <div>
//                 <label className="label p-2">
//                     <span className="text-base label-text">Password</span>
//                 </label>
//                 <input type="password" placeholder="Enter password" className="w-full input input-bordered h-10"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 /> 
//             </div>
//             <Link to="/signup" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
//                 {"Don't"} have an account?
//             </Link>
//             <div>
//                 <button className="btn btn-block btn-sm mt-2"
//                 disabled={loading}
//                 >
//                     {loading ? <span className="loading,loading-spinner"></span> : "Login"}
//                 </button>
//             </div>
//         </form>

//     </div>

//   </div>
  
// }

// export default Login




// src/Login.js
import React from 'react';
import './Login.css';
import companyLogo from '../../assets/CCPS.png'; // Make sure to add your logo image in the src folder
import { useState } from "react"
// import { Link } from "react-router-dom"
import useLogin from "../../hooks/useLogin";

const Login = () => {
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    const {loading,login} =useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(username,password)
    }

  return (
    <div className="login-container">
      <img src={companyLogo} alt="Company Logo" className="company-logo" />
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
