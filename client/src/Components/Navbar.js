import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import logo from '../Images/react-logo1.png';
import { UserContext } from '../App';

const Navbar = () => {
  const { navStatus } = useContext(UserContext);

  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-2">
        <Link className="navbar-brand" to="#">
            <img src={logo} className="logo" alt="logo here"/>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item mx-2">
                    <Link className="nav-link routelink" to="/">Home</Link>
                </li>
                <li className="nav-item mx-2">
                    <Link className="nav-link routelink" to="/about">About</Link>
                </li>
                <li className="nav-item mx-2">
                    <Link className="nav-link routelink" to="/contact">Contact</Link>
                </li>
                {
                    navStatus ? 
                    <>
                        <li className="nav-item mx-2">
                        <Link className="nav-link routelink" to="/login">Login</Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link routelink" to="/signup">Register</Link>
                        </li>
                    </>
                    :
                    <li className="nav-item mx-2">
                        <Link className="nav-link routelink" to="/logout">Logout</Link>
                    </li>
                }
            </ul>
        </div>
        </nav>
    </>
  );
}

export default Navbar;