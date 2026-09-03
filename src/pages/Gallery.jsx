import React, { useState } from 'react';
import ReservationWidget from '../components/ReservationWidget';

const galleryImages = [
  { src: '/assets/img/gallery/image-50.jpeg', category: 'rooms', title: 'Luxury Suite' },
  { src: '/assets/img/gallery/image-51.jpeg', category: 'rooms', title: 'Grand Suite' },
  { src: '/assets/img/gallery/image-52.jpeg', category: 'dining', title: 'Rooftop Dining' },
  { src: '/assets/img/gallery/image-53.jpeg', category: 'amenities', title: 'Infinity Pool' },
  { src: '/assets/img/gallery/image-54.jpeg', category: 'rooms', title: 'Executive Suite' },
  { src: '/assets/img/gallery/image-55.jpeg', category: 'dining', title: 'Gourmet Restaurant' },
  { src: '/assets/img/gallery/image-56.jpeg', category: 'amenities', title: 'Spa & Wellness' },
  { src: '/assets/img/gallery/image-57.jpeg', category: 'rooms', title: 'Deluxe King' },
  { src: '/assets/img/gallery/image-58.jpeg', category: 'dining', title: 'Wine Cellar' },
  { src: '/assets/img/gallery/image-59.jpeg', category: 'amenities', title: 'Fitness Center' },
  { src: '/assets/img/gallery/image-60.jpeg', category: 'rooms', title: 'Penthouse View' },
  { src: '/assets/img/gallery/image-61.jpeg', category: 'dining', title: 'Private Dining' },
];

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ['all', ...new Set(galleryImages.map(g => g.category))];
  const filteredImages = filter === 'all' ? galleryImages : galleryImages.filter(g => g.category === filter);

  return (
    <>
      <section className="page-hero" style={{ backgroundImage: 'url(/assets/img/gallery/image-50.jpeg)', marginTop: '80px', height: '50vh', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div className="hero-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <div className="container" style={{ color: 'white' }}>
            <h1 style={{ fontSize: '48px', marginBottom: '15px' }}>Photo Gallery</h1>
            <p style={{ fontSize: '18px' }}>View Our Modern Spaces</p>
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
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginBottom: '30px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`btn ${filter === cat ? 'btn-dark' : ''}`}
                onClick={() => setFilter(cat)}
                style={{ padding: '8px 24px', fontSize: '13px' }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {filteredImages.map((img, index) => (
              <div
                key={index}
                style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '8px' }}
                onClick={() => setSelectedImage(img)}
              >
                <img src={img.src} alt={img.title} style={{ width: '100%', height: '250px', objectFit: 'cover', transition: 'transform 0.3s' }} />
              </div>
            ))}
          </div>
        </div>
      </section>
      {selectedImage && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => setSelectedImage(null)}>
          <div style={{ position: 'relative', maxWidth: '90%', maxHeight: '90%' }}>
            <button style={{ position: 'absolute', top: '-40px', right: 0, background: 'none', border: 'none', color: 'white', fontSize: '40px', cursor: 'pointer' }}>&times;</button>
            <img src={selectedImage.src} alt={selectedImage.title} style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }} />
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
