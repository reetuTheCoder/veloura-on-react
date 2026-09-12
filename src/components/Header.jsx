import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import styles from './Header.module.css';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleBookNow = () => {
    closeMenu();
    if (isAuthenticated) {
      document
        .querySelector('.reservation-widget')
        ?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    closeMenu();
    setDropdownOpen(false);
    logout();
    navigate('/');
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`${styles.backdrop} ${menuOpen ? styles.backdropOpen : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo} onClick={closeMenu}>
            Veloura
          </Link>

          <nav
            className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ''}`}
          >
            <Link to="/rooms" onClick={closeMenu}>Rooms</Link>
            <Link to="/offers" onClick={closeMenu}>Offers</Link>
            <Link to="/dining" onClick={closeMenu}>Dining</Link>
            <Link to="/amenities" onClick={closeMenu}>Amenities</Link>
            <Link to="/gallery" onClick={closeMenu}>Gallery</Link>
            <Link to="/attractions" onClick={closeMenu}>Attractions</Link>
            <Link to="/about" onClick={closeMenu}>About</Link>

            {isAuthenticated ? (
              <div className={styles.userDropdown}>
                <button
                  className={styles.userDropdownBtn}
                  onClick={toggleDropdown}
                  aria-expanded={dropdownOpen}
                >
                  <span>👋 {user?.full_name || user?.email}</span>
                  <FiChevronDown
                    className={`${styles.chevron} ${
                      dropdownOpen ? styles.chevronOpen : ''
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className={styles.userDropdownContent}>
                    <Link to="/profile" onClick={closeMenu}>
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className={styles.dropdownLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className={styles.authLink} onClick={closeMenu}>
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`${styles.authLink} ${styles.signupLink}`}
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </>
            )}

            <button onClick={handleBookNow} className={styles.bookBtn}>
              BOOK NOW
            </button>
          </nav>

          {/* Burger / Close icon */}
          <button
            className={styles.burger}
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;