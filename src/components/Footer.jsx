import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h4>Veloura</h4>
            <p>West Hollywood's most secluded luxury retreat, where privacy meets pleasure.</p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>123 Sunset Strip<br />West Hollywood, CA 90069<br />+1 (555) 123-4567<br />info@luxuryhotel.com</p>
          </div>
          <div>
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#">Instagram</a>
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>© 2026 Veloura. All rights reserved. Demo website - No actual booking functionality.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
