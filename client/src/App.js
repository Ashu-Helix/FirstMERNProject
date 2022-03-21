import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './Components/About Component/About';
import Contact from './Components/Contact Component/Contact';
import Home from './Components/Home Component/Home';
import Login from './Components/Login Component/Login';
import Navbar from './Components/Navbar';
import Signup from './Components/SignUP Component/Signup';
import Errorpage from './Components/Errorpage Component/Errorpage';
import './App.css';

const App = () => {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route index element={<Home/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='*' element={<Errorpage/>} />
      </Routes>

    </>
  )
}

export default App;