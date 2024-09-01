import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar } from '@mui/material';
import LoginPage from '../Admin/LoginPage';
import { openModal } from '../../actions/modalAction';
import './ProfileSection.css';

const ProfileSection = () => {
  const dispatch = useDispatch();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const openModalHandle = () => {
    navigate('/login');  // Redirect to login page
    setDropdownVisible(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownVisible(!dropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="header-container">
      <div className="header">
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1024px-Airbnb_Logo_B%C3%A9lo.svg.png"
            className="header_logo"
            alt="logo"
          />
        </Link>
        <div className="header_center">
          <p>Places to Stay</p>
          <p>Experiences</p>
          <p>Online Experiences</p>
        </div>
        <div className="header_right">
          <p>Become a host</p>
          <LanguageIcon />
          <div className="header_dropdowns">
            <MenuIcon className="menu-icon" />
            <div className={`dropdown ${dropdownVisible ? 'dropdown-visible' : ''}`}>
              <Avatar className='dropbtn' onClick={toggleDropdown} />
              <div className="dropdown-content" ref={dropdownRef}>
                {userInfo ? (
                  <>
                    <span>Account</span>
                    <span>Log out</span>
                  </>
                ) : (
                  <>
                    <span onClick={openModalHandle}>Log in</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;
