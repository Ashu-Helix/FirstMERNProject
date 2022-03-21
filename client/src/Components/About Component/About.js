import React, { useEffect, useState } from 'react';
import personImg from './user.png';
import { useNavigate } from 'react-router-dom';
import './About.css';
// import axios from 'axios';

const About = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  let callAboutRoute = async () =>{
    try{
        // const response = await axios.get('/about');
        const response = await fetch('/about',{
          method:"GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials:"include"
        });
        console.log(response);
        const data = await response.json();
        console.log(data);

        if(response.status !== 200){
          throw new Error(response.error);
        }else{
          setUserData({id: data._id, name: data.name, email: data.email, work: data.work, phno: data.phno});
        }

        }catch(err){
          console.log(err);
          navigate('/login');
        }
  };

  useEffect(()=>{
    callAboutRoute();
  }, []);
  
  return (
    <>
        <div className="about_container">
          {/* <div className="conatainer d-flex flex-column align-items-center mt-5">
             <h2>User Infromation</h2>
             <ul className="mt-3" style={{ listStyle:"none" }}>
                <li><span className="subTitle">ID:</span> {userData.id}</li>
                <li><span className="subTitle">Name:</span> {userData.name}</li>
                <li><span className="subTitle">Email:</span> {userData.email}</li>
                <li><span className="subTitle">Work:</span>  {userData.work}</li>
                <li><span className="subTitle">Phone:</span> {userData.phno}</li>
              </ul>

          </div> */}
          <div className='container'>
            <div className="card_layout d-flex justify-content-center mt-5 p-4">
                <div className="row w-100">
                  <div className="col text-center">
                    <img src={personImg} alt="Person pic here" width="200" height="250" />
                  </div>
                  <div className="col">
                    <h1 className="name_title">{userData.name}</h1>
                    <p className="work_title">{userData.work}</p>
                    <div className="row w-100">
                      <div className="col-3 subTitle">
                        <p>ID</p>
                        <p>Email</p>
                        <p>Phone</p>
                        <input className="btn btn-primary w-100" type="submit" value="Edit"/>
                      </div>
                      <div className="col subTitle_info">
                        <p>{userData.id}</p>
                        <p>{userData.email}</p>
                        <p>{userData.phno}</p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default About;