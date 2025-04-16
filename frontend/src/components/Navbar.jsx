import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { authContext } from '../store/AuthProvider';

export default function Navbar() {
  const [showAccount, setShowAccount] = useState(false);

  let handleAccountClick = () => {
    setShowAccount(!showAccount);
  }
  const handleClick = () => {
    setShowAccount(!showAccount);
  }
  const isLogin = localStorage.getItem("userId")
  const role = localStorage.getItem("role")
  const auth = useContext(authContext);
  const handleLogout = () => {
    auth.handleLogout()
    setShowAccount(!showAccount);
    navigate("/", { state: { message: " You have been logged out!" } })
    window.location.reload()
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow mt-5 px-5">
      <div className="container-fluid">
        <Link to={"/"}>
          <span className='hotel-color'>AK Hotel </span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to={"/browse"} >Browse all rooms</NavLink>
            </li>
            {isLogin && role === 'ROLE_ADMIN' && (
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to={"/admin"} >Admin</NavLink>
              </li>
            )}
          </ul>
          <ul className='d-flex navbar-nav'>
            <li className='nav-item'>
              <NavLink className="nav-link" aria-current="page" to={"/my-bookings"}>Find My Bookings</NavLink>
            </li>
            <li className='nav-item dropdown'>
              <a className="nav-link dropdown-toggle" role='button' id='navbarDropdown' onClick={handleAccountClick}>
                Account
              </a>
              <ul className={`dropdown-menu ${showAccount ? "show" : ""}`} aria-labelledby="navbarDropdown">
                {!isLogin &&
                  <li>
                    <Link to={"/login"} className='dropdown-item' onClick={handleClick}>Login</Link>
                  </li>
                }
                {isLogin && (<>
                  <li>
                    <Link to={"/profile"} className='dropdown-item' onClick={handleClick}>Profile</Link>
                  </li>

                  <li>
                    <button className='dropdown-item' onClick={handleLogout}>Logout</button>
                  </li>
                </>
                )
                }
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}
