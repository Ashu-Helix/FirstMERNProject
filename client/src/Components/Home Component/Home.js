import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [userName, setName] = useState();

  let getUserData = async () =>{
    let response = await fetch('/getData',{ method:"GET" });
    let data = await response.json();
    setName(data.name);
  };

  useEffect(()=>{
    getUserData();
  },[]);

  return (
    <>
        <div className="home-page">
            <div className="home-div">
              <p className="pt-5">Welcome</p>
              {
                userName ? <><h1>{userName}</h1><h3>Happy to see you back</h3> </> : <h1>We are The MERN Developer</h1>
              }
            </div>
        </div>
    </>
  );
}

export default Home;