import React, { useState } from 'react';
import signUpPic from './registration-image.jpg';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
// import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
      name:"", email:"", phno:"", work:"", password:"", conPassword:""
  }); 
  
  let handleInputs = (event) => {
    let { name, value } = event.target;
    
    setUser((previosObjState)=>{
        return { ...previosObjState, [name]: value };
    });
  };

  const postData = async (event) =>{
    event.preventDefault();
    const { name, email, phno, work, password, conPassword } = user;
    // let response = await axios.post("/register", user);
    const response = await fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({ name, email, phno, work, password, conPassword })
    });
    
    // console.log(response.status);
    let resData = await response.json();
    
    // console.log(resData.error);
    alert(resData.error);
    
    if(response.status !== 422){
        navigate('/login');
    }
  };

  return (
    <>
        <section className="signup">
            <div className="container mt-5">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign up</h2>
                        <form method="POST" className="register-form" id="register-form">
                            <div className="form-group">
                                <label htmlFor="name">
                                    <i className="zmdi zmdi-account material-icons-name"></i>
                                </label>
                                <input type="text" name="name" id="name" placeholder="Your Name" autoComplete="off" value={ user.name } onChange={ handleInputs }/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">
                                    <i className="zmdi zmdi-email material-icons-name"></i>
                                </label>
                                <input type="email" name="email" id="email" placeholder="Your Email" autoComplete="off" value={ user.email } onChange={ handleInputs }/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">
                                    <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                                </label>
                                <input type="number" name="phno" id="phno" placeholder="Your Phone" autoComplete="off" value={ user.phno } onChange={ handleInputs }/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="work">
                                    <i className="zmdi zmdi-slideshow material-icons-name"></i>
                                </label>
                                <input type="text" name="work" id="work" placeholder="Your Profession" autoComplete="off" value={ user.work } onChange={ handleInputs }/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">
                                    <i className="zmdi zmdi-lock material-icons-name"></i>
                                </label>
                                <input type="password" name="password" id="password" placeholder="Your Password" autoComplete="off" value={ user.password } onChange={ handleInputs }/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="conPassword">
                                    <i className="zmdi zmdi-lock material-icons-name"></i>
                                </label>
                                <input type="password" name="conPassword" id="conPassword" placeholder="Confirm Your Password" autoComplete="off" value={ user.conPassword } onChange={ handleInputs }/>
                            </div>
                            <div className="form-group form-button">
                                <input type="submit" onClick={ postData } className="form-submit" name="signup" id="signup" value="Register"/>
                            </div>
                        </form>
                    </div>


                    <div className="signup-image">
                       <figure>
                            <img src={signUpPic} alt="registration pic"/>
                        </figure>
                        <Link to="/login" className="signup-image-link">I am already registered</Link>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
}

export default Signup;