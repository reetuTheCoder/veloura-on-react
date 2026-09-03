import React from 'react';
import '../styles/SplitLayout.css';

const DiningSection = () => {
  const handleExploreMenu = () => {
    alert('This is a design demo. The dining menu would be shown here.');
  };

  return (
    <section className="split-layout" id="dining">
      <div className="split-image">
        <img src="/assets/img/dining/image-4.jpeg" alt="Rooftop Dining" />
      </div>
      <div className="split-content">
        <h2>Dining</h2>
        <p>
          Our rooftop dining unfolds within a secluded, garden-like setting where Mediterranean influences
          meet seasonal ingredients and shared plates. We create an atmosphere that feels intimate and
          immersive, offering elevated views without ever feeling exposed.
        </p>
        <button onClick={handleExploreMenu} className="btn btn-dark">EXPLORE MENU</button>
      </div>
    </section>
  );
};

export default DiningSection;
