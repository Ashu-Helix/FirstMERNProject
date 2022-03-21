import React from 'react';
import { Link } from 'react-router-dom';
import './Errorpage.css';

const Errorpage = () => {
  return (
    <div id="notfound">
        <div className="notfound">
            <div className="notfound-404">
                <h1>404</h1>
                <h2>Sorry, Page Not Found</h2>
                <p className="text-center">
                    The page you are looking for might have been removed <br/>
                    had its name changed or is temporarily unavailable.
                </p>
                <Link to="/" style={{ textDecoration:"none"}} >Back To Homepage</Link>
            </div>
        </div>
    </div>
  );
}

export default Errorpage;