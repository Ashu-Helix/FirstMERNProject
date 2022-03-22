import React, { useEffect, useState, useContext } from 'react';
import './Home.css';
import { UserContext } from '../../App';

const Home = () => {
  const { setNavStatus } = useContext(UserContext);
  const [userName, setName] = useState();

  let getUserData = async () =>{
    try{
      let response = await fetch('/getData',{ method:"GET" });
      if(response.status === 401){
        throw new Error;
      }
      let data = await response.json();
      setName(data.name);
    }catch(error){
      setNavStatus({type:"USER", payload:true /*Extra Info with type*/});
      console.log(error);
    }
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