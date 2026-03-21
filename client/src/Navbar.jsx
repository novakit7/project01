import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '/navIcon.png'

export default function Navbar() {
  return (
    <nav 
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "rgba(0, 15, 49, 0.9)" }}
    >
      <div className="container-fluid">

        {/* LEFT LOGO */}
        <NavLink to="/" className="navbar-brand">
          <img src={logo} style={{ height: '50px' }} />
        </NavLink>

        {/* TOGGLE */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          {/* CENTER MESSAGE */}
          <span className="navbar-text mx-auto d-none d-lg-block">
            To Do - Manage your day..
          </span>
          {/* RIGHT LINKS */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 flex-lg-row flex-column gap-lg-3">
            <li className="nav-item">
              <NavLink to="/about" className="nav-link text-light nav-hover"><i class="fa-solid fa-circle-info"></i>About Us</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}