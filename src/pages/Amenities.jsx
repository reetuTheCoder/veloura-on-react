import React from 'react';
import ReservationWidget from '../components/ReservationWidget';

const amenities = [
  'Grown Alchemist Bath Amenities',
  'Petit Ermitage Terry Robes and Slippers',
  '24-hour Private Gym',
  'Same-day Laundry, Dry Cleaning',
  'Gourmet Mini Bar',
  'Very Fast, Complimentary Wi-Fi',
  'Flexible Relationship With Time'
];

const Amenities = () => {
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: 'url(/assets/img/home/image-10.jpeg)', marginTop: '80px', height: '50vh', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div className="container" style={{ color: 'white' }}>
            <h1 style={{ fontSize: '48px', marginBottom: '15px' }}>Amenities</h1>
            <p style={{ fontSize: '18px' }}>Exclusive Comforts for a Private Lifestyle</p>
          </div>
        </div>
      </section>
      <section className="section" style={{ padding: '60px 0', background: '#fafafa' }}>
        <div className="container">
          <ReservationWidget />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="section-title">Provisions for Living Well</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '900px', margin: '0 auto' }}>
            {amenities.map((amenity, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '15px 20px', background: '#fafafa', border: '1px solid #f0f0f0' }}>
                <span style={{ color: '#b89b6b', fontWeight: 'bold', fontSize: '18px' }}>✓</span>
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Amenities;
