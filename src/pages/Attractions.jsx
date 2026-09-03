import React, { useState } from 'react';
import ReservationWidget from '../components/ReservationWidget';

const attractions = [
  { name: 'The Getty Center', description: 'Perched high above the city, this architectural landmark pairs world-class art with sculpted gardens.', image: '/assets/img/attractions/getty-center.jpg', address: '1200 Getty Center Dr, Los Angeles, CA 90049', distance: '15 min drive', hours: 'Tue-Sun 10am-5:30pm' },
  { name: 'Sunset Strip', description: 'A storied stretch of neon, music history, legendary hotels, and late-night energy.', image: '/assets/img/attractions/sunset-strip.jpg', address: 'Sunset Blvd, West Hollywood, CA 90069', distance: '5 min walk', hours: '24/7' },
  { name: 'Melrose Arts District', description: 'Independent galleries, design studios, and eclectic boutiques line this creative corridor.', image: '/assets/img/attractions/melrose-district.jpg', address: 'Melrose Ave, Los Angeles, CA 90069', distance: '10 min drive', hours: 'Varies by store' },
  { name: 'Hollywood Bowl', description: 'An open-air amphitheater set in the hills, where summer evenings are scored by orchestras.', image: '/assets/img/attractions/hollywood-bowl.jpg', address: '2301 N Highland Ave, Los Angeles, CA 90068', distance: '20 min drive', hours: 'Seasonal (June-September)' },
  { name: 'Griffith Observatory', description: 'A hilltop icon that blends astronomy and Art Deco elegance.', image: '/assets/img/attractions/griffith-observatory.jpg', address: '2800 E Observatory Rd, Los Angeles, CA 90027', distance: '25 min drive', hours: 'Tue-Fri 12pm-10pm' },
  { name: 'Rodeo Drive', description: 'World-renowned luxury shopping destination featuring flagship boutiques.', image: '/assets/img/attractions/rodeo-drive.jpg', address: 'Rodeo Dr, Beverly Hills, CA 90210', distance: '15 min drive', hours: '10am-7pm daily' },
];

const Attractions = () => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section className="page-hero" style={{ backgroundImage: 'url(/assets/img/attractions/getty-center.jpg)', marginTop: '80px', height: '50vh', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div className="container" style={{ color: 'white' }}>
            <h1 style={{ fontSize: '48px', marginBottom: '15px' }}>Local Attractions</h1>
            <p style={{ fontSize: '18px' }}>Explore West Hollywood Like A Local</p>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
            {attractions.map((a, index) => (
              <div
                key={index}
                style={{ background: 'white', boxShadow: '0 5px 20px rgba(0,0,0,0.08)', overflow: 'hidden', transition: 'transform 0.3s', cursor: 'pointer' }}
                onClick={() => setSelected(a)}
              >
                <img src={a.image} alt={a.name} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                <div style={{ padding: '25px' }}>
                  <h3 style={{ fontSize: '22px', marginBottom: '10px' }}>{a.name}</h3>
                  <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '15px' }}>{a.description}</p>
                  <div style={{ display: 'flex', gap: '15px', fontSize: '13px', color: '#888' }}>
                    <span>📍 {a.distance}</span>
                    <span>🕒 {a.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', overflowY: 'auto' }} onClick={() => setSelected(null)}>
          <div style={{ background: 'white', maxWidth: '900px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative', borderRadius: '8px' }} onClick={(e) => e.stopPropagation()}>
            <button style={{ position: 'sticky', top: '15px', right: '20px', float: 'right', background: 'rgba(0,0,0,0.7)', border: 'none', color: 'white', fontSize: '30px', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 10, margin: '15px 15px 0 0' }}>&times;</button>
            <img src={selected.image} alt={selected.name} style={{ width: '100%', height: '350px', objectFit: 'cover', marginTop: '-55px' }} />
            <div style={{ padding: '40px' }}>
              <h2 style={{ fontSize: '32px', marginBottom: '25px' }}>{selected.name}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px', paddingBottom: '25px', borderBottom: '1px solid #e0e0e0' }}>
                <div>📍 {selected.address}</div>
                <div>🚗 {selected.distance}</div>
                <div>🕒 {selected.hours}</div>
              </div>
              <p style={{ color: '#444', lineHeight: '1.8', marginBottom: '25px' }}>{selected.description}</p>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <button className="btn btn-dark" onClick={() => alert(`Demo: Get directions to ${selected.name}`)}>GET DIRECTIONS</button>
                <button className="btn" onClick={() => alert(`Demo: More info about ${selected.name}`)}>VISIT WEBSITE</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Attractions;
