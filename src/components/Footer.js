import React from "react";
import "../styles/Footer.css";

/**
 * Footer Component
 * 
 * This component renders the footer section of the Estate Agent App.
 * It includes:
 * - Current year dynamically fetched using JavaScript.
 * - App branding and designer credit.
 * 
 * Styles for the footer are imported from `Footer.css`.
 * 
 * @returns {JSX.Element} A footer element with branding and credits.
 */
const Footer = () => {
  return (
    <footer className="footer">
      {/* Container for footer content */}
      <div className="footer-container">
        {/* Display current year dynamically */}
        <p>&copy; {new Date().getFullYear()} Estate Agent App. All rights reserved.</p>
        {/* Designer credit */}
        <p>
          Designed by <span>Deshani Dureksha</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
