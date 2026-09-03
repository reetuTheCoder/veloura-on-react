import React, { useState, useEffect } from 'react';
import ReservationWidget from './ReservationWidget';
import '../styles/Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    '/assets/img/home/image-10.jpeg',
    '/assets/img/home/image-11.jpeg',
    '/assets/img/home/image-12.jpeg',
    '/assets/img/home/image-13.jpeg',
    '/assets/img/home/image-14.jpeg',
    '/assets/img/home/image-15.jpeg',
    '/assets/img/home/image-16.jpeg',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleReservation = () => {
    document.querySelector('.reservation-widget')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>It's A Pleasure Doing<br />Pleasure With You</h1>
        <button onClick={handleReservation} className="btn hero-reservation-btn">
          MAKE A RESERVATION
        </button>
        <ReservationWidget />
      </div>
      <div className="slide-controls">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`slide-dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
