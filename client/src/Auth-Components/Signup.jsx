import React from 'react'
import "./Auth.css"

export default function Signup() {
  return (
    <div className="s-container">
    <div className="signup-box">
      <h2>🚀 Create Account</h2>

      <form>
        <input type="text" placeholder="Enter Name" required />

        <input type="email" placeholder="Enter Email" required />
         
        <input type="password" placeholder="Enter Password" required /> 

        <button type="button" className="otp-btn">
          Send OTP
        </button>

        <input type="text" placeholder="Enter OTP" required />

         <button type="submit">Sign Up</button>
       <a href="#login">Log In</a>
       
      </form>
    </div>
    </div>
  );
}