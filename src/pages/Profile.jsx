import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await api.get('/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container" style={{ marginTop: '80px' }}>
      <div className="profile-header">
        <h1>My Profile</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="profile-card">
        <h3>Account Information</h3>
        <p><strong>Name:</strong> {user.full_name || user.email}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role || 'Guest'}</p>
      </div>

      <div className="bookings-section">
        <h3>My Bookings</h3>
        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="no-bookings">No bookings yet. Start planning your stay!</p>
        ) : (
          <div className="bookings-table-wrapper">
            <table className="bookings-table">
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Total Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.room_number} ({booking.room_type})</td>
                    <td>{new Date(booking.check_in).toLocaleDateString()}</td>
                    <td>{new Date(booking.check_out).toLocaleDateString()}</td>
                    <td>${booking.total_price}</td>
                    <td>
                      <span className={`status-${booking.status}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
