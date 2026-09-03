import React from 'react';
import DiningSection from '../components/DiningSection';
import ReservationWidget from '../components/ReservationWidget';

const Dining = () => {
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: 'url(/assets/img/dining/image-4.jpeg)', marginTop: '80px', height: '50vh', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div className="container" style={{ color: 'white' }}>
            <h1 style={{ fontSize: '48px', marginBottom: '15px' }}>Dining</h1>
            <p style={{ fontSize: '18px' }}>Rooftop dining with Mediterranean influences</p>
          </div>
        </div>
      </section>
      <section className="section" style={{ padding: '60px 0', background: '#fafafa' }}>
        <div className="container">
          <ReservationWidget />
        </div>
      </section>
      <DiningSection />
    </>
  );
};

export default Dining;
