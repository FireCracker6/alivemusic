import React, { useState } from 'react';

import './App.css';
import './css/main.min.css';
import logo from './images/logos/alive-logo-transparent-png.png';
import Navbar from './Navbars/global_navbar';


function App() {
  return (
    <>
      <header>
     
        
        <Navbar />  
      </header>
      
      <div className='container d-flex justify-content-center my-4'>
        <div className='main-header'>Welcome to Alive! </div>
      </div>
    </>
  );
}

export default App;
