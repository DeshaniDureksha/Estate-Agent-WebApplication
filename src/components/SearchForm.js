import React, { useState } from "react";
import Select from "react-select"; 
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import "../styles/SearchForm.css"; 

// Options for the property type dropdown
const propertyTypes = [
  { value: "Any", label: "Any" },
  { value: "House", label: "House" },
  { value: "Flat", label: "Flat" },
];

const SearchForm = ({ onSearch }) => {
  // State for each search criteria
  const [type, setType] = useState({ value: "Any", label: "Any" }); 
  const [minPrice, setMinPrice] = useState(""); 
  const [maxPrice, setMaxPrice] = useState(""); 
  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState(""); 
  const [startDate, setStartDate] = useState(null); 
  const [endDate, setEndDate] = useState(null);
  const [postcode, setPostcode] = useState(""); 

  // Function to handle the search button click
  const handleSearch = (e) => {
    e.preventDefault();

    // Validation: Ensure the minimum price is not greater than the maximum price
    if (minPrice && maxPrice && parseInt(minPrice) > parseInt(maxPrice)) {
      alert("Minimum price cannot exceed maximum price.");
      return;
    }

    // Validation: Ensure the minimum bedrooms is not greater than the maximum bedrooms
    if (minBedrooms && maxBedrooms && parseInt(minBedrooms) > parseInt(maxBedrooms)) {
      alert("Minimum bedrooms cannot exceed maximum bedrooms.");
      return;
    }

    // Validation: Ensure the start date is not after the end date
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      alert("Start date cannot be after the end date.");
      return;
    }

    // Call the onSearch function passed as a prop with the search criteria
    onSearch({
      type: type.value === "Any" ? null : type.value, // Use null if "Any" is selected
      minPrice,
      maxPrice,
      minBedrooms,
      maxBedrooms,
      startDate,
      endDate,
      postcode,
    });
  };

  return (
    <div className="search-section">
      {/* Title and description for the search form */}
      <div className="title-container">
        <h1>Your Dream Property Awaits</h1>
        <p>
          Find your perfect home or investment property. Explore a wide range of
          listings with customized search options for your convenience.
        </p>
      </div>

      {/* Search form */}
      <form className="search-container" onSubmit={handleSearch}>
        {/* Property type dropdown */}
        <div className="form-group">
          <label>Property Type</label>
          <Select
            options={propertyTypes}
            value={type}
            onChange={(selectedOption) => setType(selectedOption)}
          />
        </div>

        {/* Minimum price input */}
        <div className="form-group">
          <label>Min Price (£)</label>
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        {/* Maximum price input */}
        <div className="form-group">
          <label>Max Price (£)</label>
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        {/* Minimum bedrooms input */}
        <div className="form-group">
          <label>Min Bedrooms</label>
          <input
            type="number"
            placeholder="Min Bedrooms"
            value={minBedrooms}
            onChange={(e) => setMinBedrooms(e.target.value)}
          />
        </div>

        {/* Maximum bedrooms input */}
        <div className="form-group">
          <label>Max Bedrooms</label>
          <input
            type="number"
            placeholder="Max Bedrooms"
            value={maxBedrooms}
            onChange={(e) => setMaxBedrooms(e.target.value)}
          />
        </div>

        {/* After date input */}
        <div className="form-group">
          <label>After Date</label>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </div>

        {/* Before date input */}
        <div className="form-group">
          <label>Before Date</label>
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        </div>

        {/* Postcode input */}
        <div className="form-group">
          <label>Postcode</label>
          <input
            type="text"
            placeholder="e.g., BR1"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
        </div>

        {/* Search button */}
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
