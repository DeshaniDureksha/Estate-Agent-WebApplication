import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "../styles/PropertyDetails.css";

const PropertyDetails = ({ properties }) => {
  // Extract the property ID from the URL parameters
  const { id } = useParams();

  // Find the property that matches the ID
  const property = properties.find((p) => p.id === id);

  // Set an initial image for the main display (fallback to an empty string if no image is found)
  const initialImage = property?.picture || "";
  const [mainImage, setMainImage] = useState(initialImage);

  // Handle the case where no property matches the provided ID
  if (!property) {
    return <div>Property not found.</div>;
  }

  // Dynamically define image paths for the property
  const images = [
    `/images/${property.id}/main.jpg`,
    `/images/${property.id}/thumb1.jpg`,
    `/images/${property.id}/thumb2.jpg`,
    `/images/${property.id}/thumb3.jpg`,
    `/images/${property.id}/thumb4.jpg`,
    `/images/${property.id}/thumb5.jpg`,
    `/images/${property.id}/thumb6.jpg`,
    `/images/${property.id}/thumb7.jpg`,
  ];

  // Handle thumbnail clicks to update the main image
  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  return (
    <div className="property-details">
      {/* Display the main property information */}
      <h1>{property.type}</h1>
      <h3>Price: £{property.price}</h3>
      <h4>Location: {property.location}</h4>

      {/* Image gallery section */}
      <div className="image-gallery">
        {/* Main image display */}
        <img src={mainImage} alt="Main View" className="main-image" />
        <div className="thumbnail-container">
          {/* Render thumbnails */}
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="thumbnail"
              onClick={() => handleThumbnailClick(img)} // Update main image on click
              style={{
                border: mainImage === img ? "2px solid #007bff" : "2px solid transparent", // Highlight selected thumbnail
              }}
            />
          ))}
        </div>
      </div>

      {/* Tabs for Description, Floor Plan, and Map */}
      <Tabs className="tabs">
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        {/* Tab panel for property description */}
        <TabPanel>
          <h2>Description</h2>
          <p>{property.description}</p>
        </TabPanel>

        {/* Tab panel for floor plan */}
        <TabPanel>
          <h2>Floor Plan</h2>
          <div className="floor-plan">
            {/* Display the floor plan image */}
            <img src={`/images/${property.id}/floorplan.jpg`} alt="Floor Plan" />
          </div>
        </TabPanel>

        {/* Tab panel for property location */}
        <TabPanel>
          <h2>Location</h2>
          {/* Embed Google Maps for the property location */}
          <iframe
            title="Google Map"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              property.location 
            )}&output=embed`}
            width="600"
            height="450"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertyDetails;
