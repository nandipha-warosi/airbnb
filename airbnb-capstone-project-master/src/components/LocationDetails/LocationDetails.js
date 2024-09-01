import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate} from "react-router-dom";
import { useSelector } from "react-redux";
import "./LocationDetails.css";
import StarRateIcon from "@mui/icons-material/StarRate";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocalFloristOutlinedIcon from "@mui/icons-material/LocalFloristOutlined";
import WifiOutlinedIcon from "@mui/icons-material/WifiOutlined";
import AdjustOutlinedIcon from "@mui/icons-material/AdjustOutlined";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";
import DiningOutlinedIcon from "@mui/icons-material/DiningOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import LocalLaundryServiceOutlinedIcon from "@mui/icons-material/LocalLaundryServiceOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PedalBikeOutlinedIcon from "@mui/icons-material/PedalBikeOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import DoorFrontOutlinedIcon from "@mui/icons-material/DoorFrontOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import ListingImage from "../../assets/locationDetails/listing.png";
import WhereYouSleep from "../../assets/locationDetails/Sleep.png";

const LocationDetails = () => {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const history = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [guests, setGuests] = useState(1);
  const [total, setTotal] = useState(0);

  const weeklyDiscount = 28;
  const discount = 28;
  const cleaningFee = 62;
  const serviceFee = 83;
  const taxesAndFees = 29;

  const calculateTotalPrice = () => {
    if (!listing || !listing.price || !checkInDate || !checkOutDate) {
      return 0;
    }

    const pricePerNight = parseFloat(listing.price);
    const nights =
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24);

    if (isNaN(nights) || nights <= 0) return 0;

    const basePrice = pricePerNight * nights;
    const total =
      (basePrice - discount + cleaningFee + serviceFee + taxesAndFees) *
      parseInt(guests, 10);

    return total;
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [guests, checkInDate, checkOutDate, listing]);

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/location-details/${id}`
        );
        setListing(response.data); // Update state with fetched data
        setLoading(false);
      } catch (error) {
        setError("Error fetching location details");
        setLoading(false);
      }
    };

    fetchListingDetails();
  }, [id]);

  useEffect(() => {
    setTotal(calculateTotalPrice());
  }, [checkInDate, checkOutDate, guests, listing]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!listing) return <p>No listing found</p>;

  //Reservation
  const handleReserve = () => {
    // Check if user is logged in
    if (!userInfo) {
      alert("Please log in to make a reservation.");
      return;
    }
  
    // Check if all fields are filled
    if (checkInDate && checkOutDate && guests) {
      // Proceed with reservation
      alert("Reservation successful!");
    } else {
      alert("Please fill in all fields to make a reservation.");
    }
  };
  
  return (
    <div className="location-details-container">
      <div className="location-details">
        <div className="details-header">
          <h1>{listing.title}</h1>
          <p>
            <StarRateIcon /> {listing.rating} {listing.reviews} -{" "}
            {listing.locationName}
          </p>
        </div>
        <div className="image-section-container">
          <div className="main-image">
            <img src={listing.img} alt="Main Image" />
          </div>
          <div className="small-images">
            <div className="small-images-row">
              <img src={listing.img} alt="Small Image 1" />
              <img src={listing.img} alt="Small Image 2" />
            </div>
            <div className="small-images-row">
              <img src={listing.img} alt="Small Image 3" />
              <img src={listing.img} alt="Small Image 4" />
            </div>
          </div>
        </div>
      </div>

      <div className="content-container">
        <div className="left-column">
          <div className="listing-highlights">
            <div className="highlight-container">
              <div className="highlight-heading">
                <p className="hosted-by"> Entire Rental Hosted by Ghazel</p>
                <p className="details">{listing.rooms}</p>
              </div>
              <div className="highlight-details-container">
                <div className="highlight">
                  <HomeOutlinedIcon className="highlight-icon" />
                  <div>
                    <h3>{listing.title}</h3>
                    <p>You might share the room with other people.</p>
                  </div>
                </div>

                <div className="highlight">
                  <AutoAwesomeOutlinedIcon className="highlight-icon" />
                  <div>
                    <h3>Enhanced Clean</h3>
                    <p>
                      This host is committed to Airbnb's 5-step enhanced
                      cleaning process.
                    </p>
                  </div>
                </div>
                <div className="highlight">
                  <DoorFrontOutlinedIcon className="highlight-icon" />
                  <div>
                    <h3>Self check-in</h3>
                    <p>Check yourself in with the keypad.</p>
                  </div>
                </div>
                <div className="highlight">
                  <CalendarTodayOutlinedIcon className="highlight-icon" />
                  <div>
                    <h3>Free cancellation before 3:00 PM on Jul 14</h3>
                    <p>Get a full refund if you change your mind.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="listing-overview">
            <p>{listing.description}</p>
            <p className="show-more-button">
              Show more <ArrowForwardIosIcon />
            </p>
          </div>

          <div className="sleeping-arrangements">
            <h2>Where you'll sleep</h2>
            <img
              src={WhereYouSleep}
              alt="Bedroom"
              className="sleeping-arrangements__image"
            />
            <div className="sleeping-arrangements__details">
              <h3>Bedroom</h3>
              <p>1 queen bed</p>
            </div>
          </div>

          <div className="amenities-section">
            <h2>What this place offers</h2>
            <div className="amenities-grid-container">
              <div className="amenities-grid">
                <div className="amenity-item">
                  <LocalFloristOutlinedIcon />
                  <p>Garden view</p>
                </div>
                <div className="amenity-item">
                  <WifiOutlinedIcon />
                  <p>Free wifi</p>
                </div>
                <div className="amenity-item">
                  <AdjustOutlinedIcon />
                  <p> Free washer - in building</p>
                </div>
                <div className="amenity-item">
                  <AirOutlinedIcon />
                  <p>Central air conditioning</p>
                </div>
                <div className="amenity-item">
                  <KitchenOutlinedIcon />
                  <p>Refrigerator</p>
                </div>
              </div>
              <div className="amenities-grid">
                <div className="amenity-item">
                  <DiningOutlinedIcon />
                  <p>Kitchen</p>
                </div>
                <div className="amenity-item">
                  <PetsOutlinedIcon />
                  <p>Pets allowed</p>
                </div>
                <div className="amenity-item">
                  <LocalLaundryServiceOutlinedIcon />
                  <p>Dryer</p>
                </div>
                <div className="amenity-item">
                  <SecurityOutlinedIcon />
                  <p>Security cameras on property</p>
                </div>
                <div className="amenity-item">
                  <PedalBikeOutlinedIcon />
                  <p>Bicycles</p>
                </div>
              </div>
            </div>
            <button className="show-all-button">Show all 37 amenities</button>
          </div>

          <div className="booking-calendar-section">
            {/* Booking Calendar Content  */}
            <h2>7 nights in New York</h2>
            <p>Feb 19, 2022 - Feb 26, 2022</p>
            <div className="booking-calendar">
              <div className="month">
                <h3>February 2022</h3>
                <div className="weekdays">
                  <span>Su</span>
                  <span>Mo</span>
                  <span>Tu</span>
                  <span>We</span>
                  <span>Th</span>
                  <span>Fr</span>
                  <span>Sa</span>
                </div>
                <div className="days">
                  {Array.from({ length: 28 }, (_, i) => (
                    <span key={i} className={i >= 10 ? "active" : ""}>
                      {i + 1}
                    </span>
                  ))}
                </div>
              </div>
              <div className="month">
                <h3>March 2022</h3>
                <div className="weekdays">
                  <span>Su</span>
                  <span>Mo</span>
                  <span>Tu</span>
                  <span>We</span>
                  <span>Th</span>
                  <span>Fr</span>
                  <span>Sa</span>
                </div>
                <div className="days">
                  {Array.from({ length: 31 }, (_, i) => (
                    <span key={i} className={i < 5 ? "active" : ""}>
                      {i + 1}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button className="clear-dates-button">Clear dates</button>
          </div>
        </div>

        <div className="right-column">
          <div className="reservation-card">
            <div className="price-info">
              <h2>R{listing.price} / night</h2>
              <p>
                <StarRateIcon /> {listing.rating} · {listing.reviews}
              </p>
            </div>
            <div className="booking-info">
              <div className="date-picker">
                <label>Check-in</label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                />
                <label>Check-out</label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                />
              </div>
              <div className="guests-picker">
                <label>Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                >
                  <option>1 guest</option>
                  <option>2 guests</option>
                  <option>3 guests</option>
                  <option>4 guests</option>
                </select>
              </div>
            </div>
            <button className="reserve-button" onClick={handleReserve}>
              Reserve
            </button>
            <div className="price-breakdown">
              <div class="fees">
                <p>
                  <span class="rate">
                    R{listing.price} x
                    {(new Date(checkOutDate) - new Date(checkInDate)) /
                      (1000 * 60 * 60 * 24) || 0}{" "}
                    nights
                  </span>
                  <span class="total">
                    R{" "}
                    {listing.price *
                      ((new Date(checkOutDate) - new Date(checkInDate)) /
                        (1000 * 60 * 60 * 24)) || 0}
                  </span>
                </p>
                <p>
                  <span class="label">Weekly discount:</span>{" "}
                  <span class="amount">-R{weeklyDiscount}</span>
                </p>
                <p>
                  <span class="label">Cleaning fee:</span>{" "}
                  <span class="amount">R{cleaningFee}</span>
                </p>
                <p>
                  <span class="label">Service fee:</span>{" "}
                  <span class="amount">R{serviceFee}</span>
                </p>
                <p>
                  <span class="label">Occupancy taxes and fees:</span>{" "}
                  <span class="amount">R{taxesAndFees}</span>
                </p>
              </div>
            </div>
            <hr />
            <h3 className="total">Total: R{total} </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDetails;
