import React, { useState } from "react";
import "./CreateListings.css";

const CreateListings = () => {
  const [formData, setFormData] = useState({
    listingName: "",
    location: "",
    description: "",
    rooms: "",
    bath: "",
    type: "",
    additionalInfo: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Your form has been submitted!", formData);
    setFormData({
      listingName: "",
      location: "",
      description: "",
      rooms: "",
      bath: "",
      type: "",
      additionalInfo: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="create-listing-container">
      <h2>Create Listing</h2>
      <form onSubmit={handleSubmit} className="create-listing-form">
        <div className="left-column">
          <label htmlFor="listingName">Listing Name</label>
          <input
            type="text"
            id="listingName"
            name="listingName"
            value={formData.listingName}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={10}
            required
          ></textarea>
        </div>

        <div className="right-column">
          <div className="form-selections">
            <div className="input-group">
            <label htmlFor="rooms" >Rooms</label>
            <input
              type="text"
              className="input-label"
              id="rooms"
              name="rooms"
              value={formData.rooms}
              onChange={handleInputChange}
              required
            />
            </div>
            

             <div className="input-group">
             <label htmlFor="bath" >Bath</label>
            <input
              type="text"
              className="input-label"
              id="bath"
              name="bath"
              value={formData.bath}
              onChange={handleInputChange}
              required
            />
            </div>
            

            <div className="input-group">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              className="input-type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            >
              <option value="">Select type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Condo">Condo</option>
              <option value="Studio">Studio</option>
            </select>
            </div>
          </div>

          <div className="amenities">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />

          
            <label htmlFor="amenities">Amenities</label>
            <input
              type="text"
              id="amenities"
              name="amenities"
              value={formData.amenities}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      </form>

      <div className="bottom-form">
        <div className="images-button">
          <label>Images</label>
          <button type="button">Upload Image</button>
        </div>

        <label htmlFor="additionalInfo"></label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          rows="4"
          cols="50"
          value={formData.additionalInfo}
          onChange={handleInputChange}
        ></textarea>

        {/* Listing buttons */}
        <div className="listing-buttons-container">
          <button type="submit">Create</button>
          <button type="button" className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateListings;
