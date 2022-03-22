import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Logout = () => {
    const navigate = useNavigate();
    const { setNavStatus } = useContext(UserContext);

    useEffect(()=>{
        fetch('/logout',{ method:"GET" })
        .then((res)=>{ 
            navigate('/login', { replace:true }) 
            setNavStatus({type:"USER", payload:true /*Extra Info with type*/});
            if(res.status !== 200){
                throw new Error(res.error);
            }
        })
        .catch((err)=>{ console.log(err) })
    });

    return (
        <div>Logout Page</div>
    );
}

export default Logout;