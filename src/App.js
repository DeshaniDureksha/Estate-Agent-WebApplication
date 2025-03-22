import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import PropertyDetails from "./components/PropertyDetails";
import Favorites from "./components/Favorites";
import propertyData from "./data/properties.json";
import "./styles/App.css";
import Footer from "./components/Footer"; 

/**
 * Main application component.
 */
const App = () => {
  // State to hold filtered properties based on search criteria
  const [filteredProperties, setFilteredProperties] = useState(propertyData.properties);

  // State to hold favorite properties
  const [favoriteProperties, setFavoriteProperties] = useState([]);

  // State to track when no results are found
  const [noResults, setNoResults] = useState(false);

  /**
   * Handle search functionality to filter properties based on user criteria.
   * @param {Object} filters - The search filters provided by the user.
   */
  const handleSearch = (filters) => {
    let results = propertyData.properties;

    // Apply filters
    if (filters.type) {
      results = results.filter((property) => property.type === filters.type);
    }
    if (filters.minPrice) {
      results = results.filter((property) => property.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      results = results.filter((property) => property.price <= parseInt(filters.maxPrice));
    }
    if (filters.minBedrooms) {
      results = results.filter((property) => property.bedrooms >= parseInt(filters.minBedrooms));
    }
    if (filters.maxBedrooms) {
      results = results.filter((property) => property.bedrooms <= parseInt(filters.maxBedrooms));
    }
    if (filters.startDate) {
      results = results.filter((property) => {
        const addedDate = new Date(`${property.added.month} ${property.added.day}, ${property.added.year}`);
        return addedDate >= new Date(filters.startDate);
      });
    }
    if (filters.endDate) {
      results = results.filter((property) => {
        const addedDate = new Date(`${property.added.month} ${property.added.day}, ${property.added.year}`);
        return addedDate <= new Date(filters.endDate);
      });
    }
    if (filters.postcode) {
      results = results.filter((property) => {
        const locationParts = property.location.split(" ");
        const postcode = locationParts[locationParts.length - 1];
        return postcode.startsWith(filters.postcode.toUpperCase());
      });
    }

    // Update filtered properties and no-results state
    setFilteredProperties(results);
    setNoResults(results.length === 0);
  };

  /**
   * Add a property to the favorites list.
   * @param {string} propertyId - The ID of the property to add.
   */
  const addToFavorites = (propertyId) => {
    const property = propertyData.properties.find((p) => p.id === propertyId);
    if (property && !favoriteProperties.some((fav) => fav.id === property.id)) {
      setFavoriteProperties([...favoriteProperties, property]);
    }
  };

  /**
   * Remove a property from the favorites list.
   * @param {string} propertyId - The ID of the property to remove.
   */
  const removeFromFavorites = (propertyId) => {
    setFavoriteProperties(favoriteProperties.filter((fav) => fav.id !== propertyId));
  };

  /**
   * Clear all properties from the favorites list.
   */
  const clearFavorites = () => {
    setFavoriteProperties([]);
  };

  return (
    <Router>
      <Routes>
        {/* Home page with search functionality and property results */}
        <Route
          path="/"
          element={
            <>
              {/* Search form */}
              <SearchForm onSearch={handleSearch} />

              <div className="main-container">
                {/* Display search results */}
                <div className="results-grid">
                  {noResults ? (
                    <p className="no-results-message">No properties match your search criteria.</p>
                  ) : (
                    filteredProperties.map((property) => (
                      <div
                        key={property.id}
                        className="property-card"
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData("propertyId", property.id)}
                      >
                        <img src={property.picture} alt={property.type} />
                        <h3>{property.type}</h3>
                        <p>{property.description.substring(0, 100)}...</p>
                        <p>
                          <strong>Location:</strong> {property.location}
                        </p>
                        <p>Price: £{property.price}</p>
                        <p>Bedrooms: {property.bedrooms}</p>
                        <button onClick={() => addToFavorites(property.id)}>❤️ Favorite</button>
                        <a href={`/property/${property.id}`}>View Details</a>
                      </div>
                    ))
                  )}
                </div>

                {/* Favorites section */}
                <Favorites
                  favorites={favoriteProperties}
                  onAdd={(propertyId) => addToFavorites(propertyId)}
                  onRemove={(propertyId) => removeFromFavorites(propertyId)}
                  onClear={clearFavorites}
                />
              </div>
            </>
          }
        />

        {/* Property details page */}
        <Route path="/property/:id" element={<PropertyDetails properties={propertyData.properties} />} />
      </Routes>

      {/* Footer component */}
      <Footer />
    </Router>
  );
};

export default App;
