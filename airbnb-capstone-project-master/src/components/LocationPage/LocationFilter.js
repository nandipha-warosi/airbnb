import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './LocationFilter.css';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar } from '@mui/material';

const LocationFilter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showGuestOptions, setShowGuestOptions] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const guestDropdownRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const totalGuests = adults + children;
  const [locations, setLocations] = useState([]);

  // Fetch location names in our dropdown
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:3001/location-names');
        setLocations(response.data);
      } catch (err) {
        console.error('Error fetching location names:', err);
      }
    };

    fetchLocations();
  }, []);

  const handleAllLocationsChange = (e) => {
    const { name, value } = e.target;
    if (name === "location" && value === "local") {
      navigate('/locations');
    }
  };

  const handleLocationChange = (e) => {
    const locationName = e.target.value;
    if (locationName) {
      navigate(`/listings?locationName=${encodeURIComponent(locationName)}`);
    }
  };

  const openModalHandle = () => {
    navigate('/login'); // Redirect to login page
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

  const handleClickOutsideGuestDropdown = (event) => {
    if (guestDropdownRef.current && !guestDropdownRef.current.contains(event.target)) {
      setShowGuestOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('mousedown', handleClickOutsideGuestDropdown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('mousedown', handleClickOutsideGuestDropdown);
    };
  }, []);

  const toggleGuestOptions = () => {
    setShowGuestOptions(!showGuestOptions);
  };

  const handleGuestsChange = (type, operation) => {
    if (type === 'adults') {
      if (operation === 'increment') {
        setAdults(adults + 1);
      } else if (operation === 'decrement' && adults > 0) {
        setAdults(adults - 1);
      }
    } else if (type === 'children') {
      if (operation === 'increment') {
        setChildren(children + 1);
      } else if (operation === 'decrement' && children > 0) {
        setChildren(children - 1);
      }
    }
  };

  return (
    <div className="parent-container">
      <div className="locations-filter-container">
        <div className="header-logo-container">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1024px-Airbnb_Logo_B%C3%A9lo.svg.png"
              className="header-logo"
              alt="Airbnb logo"
            />
          </Link>
        </div>
        <div className="search-bar">
          <div className="search-section">
            <label>Hotels</label>
            <select
              name="location"
              className="select-style"
              onChange={handleAllLocationsChange}
            >
              <option value="">Select Hotel</option>
              <option value="local">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div className="search-section">
            <label>Check in</label>
            <input
              type="text"
              name="checkInDate"
              placeholder="Add dates"
              onChange={() => {}}
            />
          </div>
          <div className="search-section">
            <label>Check out</label>
            <input
              type="text"
              name="checkOutDate"
              placeholder="Add dates"
              onChange={() => {}}
            />
          </div>
          <div className="search-section" ref={guestDropdownRef}>
            <label>Guests</label>
            <span onClick={toggleGuestOptions} className="total-guests">
              {totalGuests} Guests
            </span>
            {showGuestOptions && (
              <div className="guests-dropdown">
                <div className="guests-counter">
                  <div className="counter-section">
                    <label>Adults</label>
                    <div className="counter">
                      <button
                        onClick={() => handleGuestsChange('adults', 'decrement')}
                      >
                        -
                      </button>
                      <span>{adults}</span>
                      <button
                        onClick={() => handleGuestsChange('adults', 'increment')}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="counter-section">
                    <label>Children</label>
                    <div className="counter">
                      <button
                        onClick={() => handleGuestsChange('children', 'decrement')}
                      >
                        -
                      </button>
                      <span>{children}</span>
                      <button
                        onClick={() => handleGuestsChange('children', 'increment')}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="search_button">
            <SearchIcon />
          </div>
        </div>
        <div className="header-right-container">
        <p>{userInfo ? `Welcome ${userInfo.name}` : "Become a host" }</p>
          <LanguageIcon />
          <div className="header-dropdowns">
            <MenuIcon className="menu-icon" />
            <div className={`dropdown ${dropdownVisible ? 'dropdown-visible' : ''}`}>
              <Avatar className="avatar-button" onClick={toggleDropdown} />
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
};

export default LocationFilter;
