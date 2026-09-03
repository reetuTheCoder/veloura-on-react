import React from 'react';
import '../styles/SplitLayout.css';

const EventsSection = () => {
  const handleInquire = () => {
    alert('This is a design demo. Event inquiry form would be shown here.');
  };

  return (
    <section className="split-layout" id="events">
      <div className="split-content">
        <h2>Weddings and Events</h2>
        <p>
          We host gatherings with a focus on privacy, flexibility, and a distinctly residential tone.
          From rooftop celebrations to focused leadership retreats, each event is designed to feel like
          a private world temporarily opened to invited guests.
        </p>
        <button onClick={handleInquire} className="btn btn-dark">INQUIRE NOW</button>
      </div>
      <div className="split-image">
        <img src="/assets/img/gallery/image-50.jpeg" alt="Event Space" />
      </div>
    </section>
  );
};

export default EventsSection;
