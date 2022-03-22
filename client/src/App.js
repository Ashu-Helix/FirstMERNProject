import React, { createContext, useReducer } from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './Components/About Component/About';
import Contact from './Components/Contact Component/Contact';
import Home from './Components/Home Component/Home';
import Login from './Components/Login Component/Login';
import Navbar from './Components/Navbar';
import Signup from './Components/SignUP Component/Signup';
import Errorpage from './Components/Errorpage Component/Errorpage';
import Logout from './Components/Logout';
import './App.css';
import { initialState, reducer } from './Components/reducer/UseReducer';


const RoutingComp = () =>{
  return(
    <>
      <Routes>
        <Route index element={<Home/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='*' element={<Errorpage/>} />
      </Routes>
    </>
  );
};

const UserContext = createContext();

const App = () => {
  const [navStatus, setNavStatus] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{navStatus, setNavStatus}}>
        <Navbar/>
        <RoutingComp/>
      </UserContext.Provider>
    </>
  )
}

export default App;
export { UserContext };