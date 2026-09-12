import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleBookNow = () => {
    if (isAuthenticated) {
      // Scroll to reservation widget or navigate to booking
      document.querySelector('.reservation-widget')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">Veloura111</Link>
        <nav className="nav-links">
          <Link to="/rooms">Rooms</Link>
          <Link to="/offers">Offers</Link>
          <Link to="/dining">Dining</Link>
          <Link to="/amenities">Amenities</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/attractions">Attractions</Link>
          <Link to="/about">About</Link>
          {isAuthenticated ? (
            <div className="user-dropdown">
              <button className="user-dropdown-btn">
                👋 {user?.full_name || user?.email}
              </button>
              <div className="user-dropdown-content">
                <Link to="/profile">My Profile</Link>
                <button onClick={handleLogout} className="dropdown-logout">Logout</button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="auth-link">Login</Link>
              <Link to="/signup" className="auth-link signup-link">Sign Up</Link>
            </>
          )}
          <button onClick={handleBookNow} className="book-btn">BOOK NOW</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
