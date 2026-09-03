import React from 'react';
import '../styles/TermsSection.css';

const TermsSection = () => {
  return (
    <section className="section" id="terms">
      <div className="container">
        <h2 className="section-title">Terms and Conditions</h2>
        <div className="terms-content">
          <p>All material found in the pages of this Website is protected under the copyright laws of Usa. Certain names, words, titles, phrases, logos, icons, graphics or designs in the pages of this Website may constitute trade-names, trade-marks or service marks of Veloura or its affiliates.</p>
          <h3>DISCLAIMER OF WARRANTIES</h3>
          <p>Veloura has compiled the information on this Website for the use of guests, prospective guests, and travel professionals. The information, material and software algorithms contained in this Website or which may be downloaded from this Website, including text, graphics, and hyperlinks, are provided 'as is' and 'as available'.</p>
          <h3>EXCLUSION OF LIABILITY</h3>
          <p>In no event will Veloura be liable for any damages, including without limitation, direct or indirect, special, incidental, moral or consequential damages, loss of profits, opportunities or information or for expenses arising in connection with this Website.</p>
          <h3>CANCELLATION POLICY OF CONFIRMED BOOKINGS</h3>
          <ul>
            <li>If canceled or modified 30 Days in advance from the date of arrival, no fee will be charged.</li>
            <li>If canceled or modified between 30-15 days in advance, one-night retention will be charged.</li>
            <li>If canceled or modified less than 15 days in advance, full price will be charged.</li>
            <li>100% Cancellation may be applicable in High Season and Long weekend Dates.</li>
            <li>Once refund is approved, it will be credited within 7 business days.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TermsSection;
