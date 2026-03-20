import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to = '/' className="navbar-brand" href="#">Home</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to = '/about'>About<i className="fa-solid fa-house"></i></Link>
            </li>
            <li className="nav-item">
              <Link to='quotes'className="nav-link">Quotes</Link>
            </li>
            <li className="nav-item">
              <Link to ='/profile'className="nav-link">Profile</Link>
            </li>
          </ul>
          <span className="navbar-text">
          To Do - Manage your day..
          </span>
        </div>
      </div>
    </nav>
      
    </div>
  )
}
