import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginPic from './login-img.jpg';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [ loginObj , setFields ] = useState({ email:"", password: ""});

  let inputEvent = (event) =>{
    const { name, value } = event.target;
    
    setFields({...loginObj, [name]: value});
  };

  let loginFun = async (event) =>{
    event.preventDefault();
    const response = await fetch('/login', {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }, 
        body: JSON.stringify(loginObj)
    });

    // console.log(response);
    let getResData = await response.json();
    if(response.status === 422){
        alert("Plzzz enter details properly");
    }else if(response.status === 400 || !getResData){
        alert("Login Denied");
    }else{
        alert("Login Successful");
        navigate('/');
    }
  };

  return (
    <>
        <section className="sign-in">
            <div className="container mt-5">
                <div className="signin-content">
                    <div className="signin-image">
                       <figure>
                            <img src={loginPic} alt="registration pic"/>
                        </figure>
                        <Link to="/signup" className="signin-image-link">Create an Account</Link>
                    </div>
                    <div className="signin-form">
                        <h2 className="form-title">Sign in</h2>
                        <form className="register-form" id="register-form">
                            <div className="form-group">
                                <label htmlFor="email">
                                    <i className="zmdi zmdi-email material-icons-name"></i>
                                </label>
                                <input type="email" name="email" id="email" onChange={inputEvent}  value={loginObj.email} placeholder="Your Email" autoComplete="off"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">
                                    <i className="zmdi zmdi-lock material-icons-name"></i>
                                </label>
                                <input type="password" name="password" id="password" onChange={inputEvent} value={loginObj.password} placeholder="Your Password" autoComplete="off"/>
                            </div>
                            <div className="form-group form-button">
                                <input type="submit" onClick={ loginFun } className="form-submit" name="signin" id="signin" value="Login"/>
                            </div>
                        </form>
                    </div>
                   
                </div>
            </div>
        </section>
    </>
  );
}

export default Login;