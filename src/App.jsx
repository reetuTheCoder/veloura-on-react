import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MagicChatWrapper from './components/MagicChatWrapper';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Offers from './pages/Offers';
import Dining from './pages/Dining';
import Amenities from './pages/Amenities';
import Gallery from './pages/Gallery';
import Attractions from './pages/Attractions';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <MagicChatWrapper>
        <Router>
          <div className="App">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rooms" element={<Rooms />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/dining" element={<Dining />} />
                <Route path="/amenities" element={<Amenities />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/attractions" element={<Attractions />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </MagicChatWrapper>
    </AuthProvider>
  );
}

export default App;
