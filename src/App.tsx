import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import './css/main.min.css';
import logo from './images/logos/alive-logo-transparent-png.png';
import Navbar from './Navbars/global_navbar';
import SignUp from './SignUpSignIn/SignUp';
import Profile from './Profiles/Profile';
import GoogleOneTapTest from './SignUpSignIn/GoogleSignUpTest';
import GoogleAuthHandler from './SignUpSignIn/GoogleMount';
import GoogleSignInButton from './SignUpSignIn/GoogleSignInButton';
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleAuthButton from './SignUpSignIn/GoogleSignInButton';
import AuthCallback from './SignUpSignIn/AuthCallBack';
import Dashboard from './Dashboard/Dashboard';
import { UserProvider } from './Contexts/UserContext';





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
   <UserProvider>
     
    
      <Router>
            <header>
                <Navbar openModal={() => setIsModalOpen(true)} />
                {isModalOpen && <SignUp isModal={isModalOpen} closeModal={closeModal} />}
            </header>

            <Routes>
            <Route path="/google" element={<GoogleOneTapTest />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/google-auth" element={<GoogleAuthHandler />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path='/userdashboard' element={<Dashboard />} />
         
         
           
                <Route path="/" element={
                    <div className='container d-flex justify-content-center my-4'>
                        <div className='main-header'>Welcome to Alive!    </div>
                    </div>
                } />
              
            </Routes>
          
        </Router>
     </UserProvider>
    </>
  );
 
}

export default App;
