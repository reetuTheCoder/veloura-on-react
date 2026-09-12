import React, { useState } from 'react';
import '../styles/ReservationWidget.css';

const ReservationWidget = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const handleBookNow = () => {
    alert(`This is a design demo. Booking functionality is not active.\n\n📅 Check-in: ${checkIn || 'Not selected'}\n📅 Check-out: ${checkOut || 'Not selected'}\n🛏️ Rooms: ${rooms}\n👥 Guests: ${guests}\n🎫 Promo Code: ${promoCode || 'None'}\n\nThis is a demo website. No actual booking will be processed.`);
  };

  return (
    <div className="reservation-widget">
      <div className="widget-top-bar">
        <span className="widget-title">Make a Reservation</span>
      </div>
      <div className="widget-details">
        <div className="date-wrapper">
          <div className="date-input-wrapper">

            <div className="date-info">
              <div className="calendar-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <label>Check In</label>
              </div>
              <input
                type="date"
                className="date-input"
                value={checkIn}
                min={today}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="date-wrapper">
          <div className="date-input-wrapper">

            <div className="date-info">
              <div className="calendar-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <label>Check Out</label>
              </div>
              <input
                type="date"
                className="date-input"
                value={checkOut}
                min={checkIn || tomorrowStr}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="rooms-guests-wrapper">
          <div className="rooms-guests-trigger" onClick={() => setShowPicker(!showPicker)}>
            <div className="guest-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <label>No of Guests</label>
            </div>
            <div className="rooms-guests-info">
              <span className="rooms-count">{rooms} Room{rooms !== 1 ? 's' : ''}</span>
              <span className="guests-count">{guests} Guest{guests !== 1 ? 's' : ''}</span>
            </div>
          </div>
          {showPicker && (
            <div className="room-guest-picker">
              <div className="picker-item">
                <label>Rooms</label>
                <div className="picker-controls">
                  <button onClick={() => setRooms(Math.max(1, rooms - 1))}>-</button>
                  <span>{rooms}</span>
                  <button onClick={() => setRooms(Math.min(5, rooms + 1))}>+</button>
                </div>
              </div>
              <div className="picker-item">
                <label>Guests</label>
                <div className="picker-controls">
                  <button onClick={() => setGuests(Math.max(1, guests - 1))}>-</button>
                  <span>{guests}</span>
                  <button onClick={() => setGuests(Math.min(10, guests + 1))}>+</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="widget-submit">
        <input
          type="text"
          placeholder="Promo Code"
          className="promo-input"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <button onClick={handleBookNow} className="book-now-btn">Book Now</button>
      </div>
    </div>
  );
};

export default ReservationWidget;
