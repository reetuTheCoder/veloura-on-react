import React from 'react';
import ReservationWidget from '../components/ReservationWidget';

const About = () => {
  return (
    <>
      <section className="page-hero" style={{ backgroundImage: 'url(/assets/img/home/image-11.jpeg)', marginTop: '80px', height: '50vh', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div className="container" style={{ color: 'white' }}>
            <h1 style={{ fontSize: '48px', marginBottom: '15px' }}>About Us</h1>
            <p style={{ fontSize: '18px' }}>Elegance, comfort, and personalized hospitality</p>
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
          <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px', fontSize: '18px', lineHeight: '1.8' }}>
            Welcome to our luxury hotel experience, where elegance, comfort, and
            personalized hospitality come together in the heart of West Hollywood.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'center' }}>
            <div style={{ padding: '30px', background: '#fafafa' }}>
              <h4 style={{ marginBottom: '10px' }}>Owner</h4>
              <p style={{ color: '#666' }}>Peter Niel</p>
            </div>
            <div style={{ padding: '30px', background: '#fafafa' }}>
              <h4 style={{ marginBottom: '10px' }}>Headquarters</h4>
              <p style={{ color: '#666' }}>350 5th Avenue, New York, NY 10118</p>
            </div>
            <div style={{ padding: '30px', background: '#fafafa' }}>
              <h4 style={{ marginBottom: '10px' }}>Hotel Address</h4>
              <p style={{ color: '#666' }}>8822 Cynthia Street, West Hollywood, CA 90069</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
