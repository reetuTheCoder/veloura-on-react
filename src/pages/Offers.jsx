import React from 'react';
import OffersSection from '../components/OffersSection';
import ReservationWidget from '../components/ReservationWidget';

const Offers = () => {
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: 'url(/assets/img/offers/image-3.jpeg)', marginTop: '80px', height: '50vh', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div className="container" style={{ color: 'white' }}>
            <h1 style={{ fontSize: '48px', marginBottom: '15px' }}>Special Offers</h1>
            <p style={{ fontSize: '18px' }}>Exclusive rates and packages for your perfect stay</p>
          </div>
        </div>
      </section>
      <section className="section" style={{ padding: '60px 0', background: '#fafafa' }}>
        <div className="container">
          <ReservationWidget />
        </div>
      </section>
      <OffersSection />
    </>
  );
};

export default Offers;
