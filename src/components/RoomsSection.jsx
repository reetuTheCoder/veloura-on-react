import React, { useState } from 'react';
import '../styles/RoomsSection.css';

const rooms = [
  {
    name: 'Grand Belle Bleue',
    description: 'In the Grand Belle Bleue, time and texture converge. Rare compositions, marble and bronze detailing, and richly layered textiles shape a 550-square-foot environment that feels curated rather than styled. French doors, a marble bathroom, walk-in closet, and carefully considered views.',
    image: '/assets/img/rooms-and-suites/image-2.jpeg',
  },
  {
    name: 'Demi Suite',
    description: 'The 350-square-foot Demi Suite offers a private, art-filled retreat designed for those who prefer to disappear rather than perform. A queen bed, writing desk, and glowing fireplace create a residential rhythm.',
    image: '/assets/img/rooms-and-suites/image-3.jpeg',
  },
  {
    name: 'Grand Belle Terrace',
    description: 'The 550-square-foot Grand Belle Terrace is a maximalist, art-forward suite conceived by Dana Hollister. French doors open to a private terrace with an outdoor fireplace.',
    image: '/assets/img/rooms-and-suites/image-4.jpeg',
  },
];

const RoomsSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleViewDetails = (roomName) => {
    alert(`This is a design demo. Details for ${roomName} would be shown here.`);
  };

  return (
    <section className="section" id="rooms">
      <div className="container">
        <div className="section-subtitle">Featured</div>
        <h2 className="section-title">Rooms &amp; Suites</h2>
        <p className="section-description">
          Our 80 suites are each composed with a certain disregard for uniformity—layered with original artwork, fireplaces, rich textiles, and the comforts of a life well-lived.
          <br /><br />
          They feel like private residences suspended just far enough above West Hollywood to forget what you came from.
        </p>
        <div className="room-tabs">
          {rooms.map((room, index) => (
            <button
              key={index}
              className={`btn ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {room.name}
            </button>
          ))}
        </div>
        <div className="room-card">
          <div className="room-image">
            <img src={rooms[activeTab].image} alt={rooms[activeTab].name} />
          </div>
          <div className="room-info">
            <h3>{rooms[activeTab].name}</h3>
            <p>{rooms[activeTab].description}</p>
            <button onClick={() => handleViewDetails(rooms[activeTab].name)} className="btn btn-dark">
              VIEW DETAILS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;
