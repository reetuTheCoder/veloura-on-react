import React, { useState } from 'react';
import '../styles/OffersSection.css';

const offers = [
  {
    title: 'Extend Your Pleasure',
    description: 'Created for guests who choose to stay a little longer, Extend Your Pleasure offers preferred rates on stays of three nights or more. The offer invites a slower rhythm.',
    image: '/assets/img/offers/image-3.jpeg',
  },
  {
    title: 'Early Bird',
    description: 'For those certain of their plans, the Early Bird offer rewards intention. Guests who reserve five or more nights in advance enjoy preferred rates of up to 20%.',
    image: '/assets/img/offers/image-2.jpeg',
  },
];

const OffersSection = () => {
  const [currentOffer, setCurrentOffer] = useState(0);

  const handleLearnMore = (title) => {
    alert(`This is a design demo. More details about ${title} would be shown here.`);
  };

  return (
    <section className="section offers-section" id="offers">
      <div className="container">
        <div className="section-subtitle">Featured</div>
        <h2 className="section-title">Offers</h2>
        <p className="section-description">
          Our preferred rates reward guests who choose to extend their pleasure or plan ahead.
          We shape our offers as invitations to settle in and experience the house at its intended pace.
        </p>
        <div className="offers-slider">
          <button className="slider-nav prev" onClick={() => setCurrentOffer((prev) => (prev - 1 + offers.length) % offers.length)}>‹</button>
          <div className="offer-card">
            <div className="offer-image">
              <img src={offers[currentOffer].image} alt={offers[currentOffer].title} />
            </div>
            <div className="offer-info">
              <h3>{offers[currentOffer].title}</h3>
              <p>{offers[currentOffer].description}</p>
              <button onClick={() => handleLearnMore(offers[currentOffer].title)} className="btn btn-dark">LEARN MORE</button>
            </div>
          </div>
          <button className="slider-nav next" onClick={() => setCurrentOffer((prev) => (prev + 1) % offers.length)}>›</button>
        </div>
        <div className="slider-dots">
          {offers.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentOffer ? 'active' : ''}`}
              onClick={() => setCurrentOffer(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
