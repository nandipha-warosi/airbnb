import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Filter.css';
import { useLocation, useNavigate } from 'react-router-dom'; 
import SearchIcon from "@mui/icons-material/Search";


const Filter = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const filterBackground = location.pathname === '/locations' ? 'white' : 'black';
  const [showGuestOptions, setShowGuestOptions] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

   // Fetch location names in our dropdown
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:3001/locations');
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations', error);
      }
    };

    fetchLocations();
  }, []);

// Update selectedLocation based on URL changes
useEffect(() => {
  const searchParams = new URLSearchParams(location.search);
  const locationName = searchParams.get('locationName') || "";
  setSelectedLocation(locationName);
}, [location]);

  
  //Fetch all locations page 
  const handleLocationChange = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === "local") {
    navigate ('/locations');
    } else if (selectedValue) {
      navigate(`/listings?locationName=${encodeURIComponent(selectedValue)}`);
    }
  };

  const handleChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const guestDropdownRef = useRef(null);
 
  const handleSearch = () => {
   
  };

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (guestDropdownRef.current && !guestDropdownRef.current.contains(event.target)) {
        setShowGuestOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const totalGuests = adults + children;
  return (
    <div className="filter-container" >
      <div className="search-bar">
        <div className="search-section">
          <label>Hotels</label>
          <select
            name="location"
            className="select-style"
            onChange={handleLocationChange}
          >
            <option value="">Select Hotel</option>
            <option value="local">All Locations</option>
            {locations.map((location) => (
          <option key={location._id} value={location.locationName}>
            {location.locationName}
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
            onChange={handleChange}
          />
        </div>
        <div className="search-section">
          <label>Check out</label>
          <input
            type="text"
            name="checkOutDate"
            placeholder='Add dates'
            onChange={handleChange}
          />
        </div>
        <div className="search-section " ref={guestDropdownRef}>
          <label >Guests</label>
          <span onClick={toggleGuestOptions} className="total-guests">{totalGuests} Guests</span>
          {showGuestOptions && (
            <div className="guests-dropdown">
              <div className="guests-counter">
                <div className="counter-section">
                  <label>Adults</label>
                  <div className="counter">
                    <button onClick={() => handleGuestsChange('adults', 'decrement')}>-</button>
                    <span>{adults}</span>
                    <button onClick={() => handleGuestsChange('adults', 'increment')}>+</button>
                  </div>
                </div>
                <div className="counter-section">
                  <label>Children</label>
                  <div className="counter">
                    <button onClick={() => handleGuestsChange('children', 'decrement')}>-</button>
                    <span>{children}</span>
                    <button onClick={() => handleGuestsChange('children', 'increment')}>+</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='search_button' onClick={handleSearch}>
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}

export default Filter;
