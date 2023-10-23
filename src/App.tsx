import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './css/main.min.css';
import logo from './images/logos/alive-logo-transparent-png.png';
import Navbar from './Navbars/global_navbar';
import SignUp from './SignUpSignIn/SignUp';
import Profile from './Profiles/Profile';



function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

    {isModalOpen && <SignUp isModal={isModalOpen} closeModal={closeModal} />}
  return (
    <>
      <Router>
            <header>
                <Navbar openModal={() => setIsModalOpen(true)} />
                {isModalOpen && <SignUp isModal={isModalOpen} closeModal={closeModal} />}
            </header>

            <Routes>
            <Route path="/profile/:userId" element={<Profile />} />


                <Route path="/" element={
                    <div className='container d-flex justify-content-center my-4'>
                        <div className='main-header'>Welcome to Alive! </div>
                    </div>
                } />
                {/* You can add more Route components here for other views */}
            </Routes>
        </Router>
    </>
  );
}

export default App;
