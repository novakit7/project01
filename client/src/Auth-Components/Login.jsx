import React from 'react'
import "./Auth.css"

export default function Login() {
  return (
      <div className="s-container">
     <div className="signup-box loginbox">
      <h2>🔐 Login</h2>

      <form>
        <input type="email" placeholder="Enter Email" required />

        <input type="password" placeholder="Enter Password" required />

        
        <button type="submit">Login</button>

        <p className="switch-text">
          Don't have an account? <a href="#">Sign Up</a>
        </p>
      </form>
    </div>
    </div>
  )
}
