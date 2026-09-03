import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const handleBookNow = () => {
    alert("This is a demo. Booking functionality is not available.");
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">Veloura</Link>
        <nav className="nav-links">
          <Link to="/rooms">Rooms &amp; Suites</Link>
          <Link to="/offers">Offers</Link>
          <Link to="/dining">Dining</Link>
          <Link to="/amenities">Amenities</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/attractions">Attractions</Link>
          <Link to="/about">About Us</Link>
          <button onClick={handleBookNow} className="book-btn">BOOK NOW</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
