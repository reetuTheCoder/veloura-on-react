import React from 'react';
import '../styles/LocationSection.css';

const LocationSection = () => {
  return (
    <section className="location-section" id="location">
      <div className="container">
        <h2>Location</h2>
        <p>
          We are tucked into a quiet residential pocket just below the Sunset Strip, balancing access with seclusion.
          Guests remain moments from Los Angeles' most dynamic cultural corridors while feeling entirely removed
          from their performance.
        </p>
        <div className="location-address">
          <p>8822 Cynthia Street, West Hollywood, CA 90069</p>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
