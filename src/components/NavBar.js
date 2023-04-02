import React from 'react'
import { NavLink, Link, useNavigate } from "react-router-dom";
const NavBar = () => {
  // Use location is used for making navbar ele active 
  // let location = useLocation();
  // useEffect(() => {
  //   console.log(location.pathname)
  // }, [location]);
  // ${location.pathname === '/about' ? "active" : ""}`} // inside navbar className

  // Instead of useLocation use Nav link tag
  let history = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    history("/login")
  }
  return (

    <div><nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">i Note Book</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={`nav-link `} aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={`nav-link `} to="/about">About</NavLink>
            </li>
          </ul>
          {!localStorage.getItem('token') ? <form className="d-flex">
            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
          </form> : <button onClick={handleLogout} className="btn btn-primary">Log Out</button>}



        </div>
      </div>
    </nav></div>
  )
}

export default NavBar