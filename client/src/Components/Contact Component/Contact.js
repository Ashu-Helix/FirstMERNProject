import React, { useEffect, useState, useContext } from 'react';
import './Contact.css';
import { UserContext } from '../../App';

const Contact = () => {
  const { setNavStatus } = useContext(UserContext);
  const [ userData, setUserData ] = useState({ name:"", email:"", phno:"", message:""});
  let getUserData = async() =>{
    try{
      const response = await fetch('/getData', { method:"GET" });
      let userData = await response.json();
      setUserData({ name: userData.name, email: userData.email, phno: userData.phno});
    }catch(err){
      setNavStatus({type:"USER", payload:true /*Extra Info with type*/});
      console.log(err);
    }
  };

  useEffect(()=>{
    getUserData();
  }, []);

  let inputHandler = (event) =>{
    const { name, value } = event.target;

    setUserData({...userData, [name]:value});
  };

  let sendMessage = async (event) =>{
    event.preventDefault(); 
    
    const response = await fetch('/contact', {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify({name: userData.name, email: userData.email, phno: userData.phno, message: userData.message})
    });

    let data = await response.json();
    if(response.status === 200){
      alert(data.msg);
    }else{
      alert(data.error);
    }
  };

  return (
    <>
        <div className="contact-info">
            <div className="container-fluid my-5">
              <div className="row py-3 px-5">
                <div className="contact_info_item col-sm d-flex justify-content-start align-items-center px-3 py-2">
                    <i className="zmdi zmdi-smartphone zmdi-hc-2x px-3"></i>
                    <div className="contact_info_content">
                      <div className="contact_info_title">
                        Phone
                      </div>
                      <div className="contact_info_text">
                        +91 1111 543 2198
                      </div>
                    </div>
                </div>
                <div className="contact_info_item offset-md-1 col-sm d-flex justify-content-start align-items-center px-3 py-2">
                    <i className="zmdi zmdi-email zmdi-hc-2x px-3"></i>
                    <div className="contact_info_content">
                      <div className="contact_info_title">
                        Email
                      </div>
                      <div className="contact_info_text">
                        assignment3@gmail.com
                      </div>
                    </div>
                </div>
                <div className="contact_info_item offset-md-1 col-sm d-flex justify-content-start align-items-center px-3 py-2">
                    <i className="zmdi zmdi-home zmdi-hc-2x px-3"></i>
                    <div className="contact_info_content">
                      <div className="contact_info_title">
                        Address
                      </div>
                      <div className="contact_info_text">
                        Pune, MH, India
                      </div>
                    </div>
                </div>
              </div>
            </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          <div className="container">
            <div className="contact_form_container">
              <div className="contact_form_title">
                <h2>Get in Touch</h2>
              </div>
              <form>
                <div className="row">
                  <div className="col">
                    <input type="text" id="contact_form_name" className="contact_form_name input_field" name="name" onChange={ inputHandler } value={userData.name} placeholder="Your Name" required={true}/>
                  </div>
                  <div className="col">
                    <input type="email" id="contact_form_email" className="contact_form_email input_field" name="email" onChange={ inputHandler } value={userData.email} placeholder="Your Email" required={true}/>
                  </div>
                  <div className="col">
                    <input type="number" id="contact_form_phone" className="contact_form_phone input_field" name="phno" onChange={ inputHandler } value={userData.phno} placeholder="Your Phone Number" required={true}/>
                  </div>
                </div>
                <div className="contact_form_text mt-3">
                  <textarea className="text_field contact_form_message" id="" name="message" onChange={ inputHandler } value={userData.message} placeholder="Message" cols="30" rows="10"></textarea>
                </div>
                <div className="contact_form_button">
                  <button type="submit" onClick={sendMessage} value={userData.message} className="button contact_submit_button">Send Message</button>
                </div>
              </form>
            </div> 
          </div>
        </div>
    </>
  );
}

export default Contact;