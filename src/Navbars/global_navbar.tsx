import React, { useState } from 'react';
import logo from '../images/logos/alive-logo-transparent-png.png';
import SignUp from '../SignUpSignIn/SignUp';


interface NavbarProps {
  openModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ openModal }) => {
  const [menuOpen, setMenuOpen] = useState(false);
const [isModalOpen, setIsModalOpen] = useState(false);


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
};

  return (
<nav className="navbar">
    <div className="container">
      <div className='logo'>
        <img src={logo} alt="" />
      </div>
        <button title='navbar' className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}></button>
        <div className={`menu-groups ${menuOpen ? 'open' : ''}`}>
            <ul className="menu-group center">
                <li><a href="#">Who We Are</a></li>
                <li><a href="#">Our Vision</a></li>
            </ul>
            <ul className="menu-group right">
                <li><a href="#">Login</a></li>
                <li><a href="#" onClick={openModal}>Create Account</a></li>
                <li><a href="#">For Artists</a></li>
            </ul>
        </div>
    </div>
</nav>




  );
}

export default Navbar;