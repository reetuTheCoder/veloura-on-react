import React from 'react';
import RoomsSection from '../components/RoomsSection';
import ReservationWidget from '../components/ReservationWidget';

const Rooms = () => {
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: 'url(/assets/img/rooms-and-suites/image-2.jpeg)', marginTop: '80px', height: '50vh', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div className="container" style={{ color: 'white' }}>
            <h1 style={{ fontSize: '48px', marginBottom: '15px' }}>Rooms & Suites</h1>
            <p style={{ fontSize: '18px' }}>An Oasis Above the City</p>
          </div>
        </div>
      </section>
      <section className="section" style={{ padding: '60px 0', background: '#fafafa' }}>
        <div className="container">
          <ReservationWidget />
        </div>
      </section>
      <RoomsSection />
    </>
  );
};

export default Rooms;
