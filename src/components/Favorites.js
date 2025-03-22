import React from "react";
import "../styles/Favorites.css";

/**
 * Favorites Component
 *
 * Props:
 * - `favorites` (Array): List of favorite properties.
 * - `onAdd` (Function): Function to handle adding a property to the favorites list.
 * - `onRemove` (Function): Function to handle removing a property from the favorites list.
 * - `onClear` (Function): Function to clear the entire favorites list.
 */

const Favorites = ({ favorites, onAdd, onRemove, onClear }) => {
  /**
   * Handles the drop event when a property is dragged and dropped into the favorites section.
   * It retrieves the property ID from the drag event and triggers the `onAdd` function.
   * 
   * @param {Object} e - The drag event.
   */
  const handleDrop = (e) => {
    e.preventDefault();
    const propertyId = e.dataTransfer.getData("propertyId");
    onAdd(propertyId);
  };

  return (
    <div
      className="favorites-section"
      onDragOver={(e) => e.preventDefault()} // Prevent default behavior to allow dropping
      onDrop={handleDrop} // Handle drop event
    >
      {/* Section heading */}
      <h2>Favorites</h2>
      {/* Button to clear all favorites */}
      <button onClick={onClear}>Clear Favorites</button>

      {/* List of favorite properties */}
      <div className="favorites-list">
        {favorites.map((fav) => (
          <div key={fav.id} className="favorite-card">
            {/* Property image */}
            <img src={fav.picture} alt={fav.type} />
            {/* Property type */}
            <h3>{fav.type}</h3>
            {/* Property price */}
            <p>Price: £{fav.price}</p>
            {/* Button to remove property from favorites */}
            <button onClick={() => onRemove(fav.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
