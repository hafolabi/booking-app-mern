import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import './navbar.css'
import {axiosInstance} from "../../config"

function Navbar() {
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = async () => {
    dispatch({ type: "LOGOUT" });
    await axiosInstance.get('/auth/logout')
  };

  return (
    <div className='navbar'>
      <div className="navContainer">
        <Link to="/" className='link'>
          <span className="logo">theinsights</span>
        </Link>
        {user ?
          <div>
            {user.username} <button className="navButton" onClick={handleLogout}>Logout</button>
          </div>
          :
          <div className="navItems">
            <button className="navButton">Register</button>
            <Link to="/login" className='link'>
              <button className="navButton">Login</button>
            </Link>
          </div>}
      </div>
    </div>
  )
}

export default Navbar