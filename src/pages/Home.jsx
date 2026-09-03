import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import RoomsSection from '../components/RoomsSection';
import OffersSection from '../components/OffersSection';
import DiningSection from '../components/DiningSection';
import EventsSection from '../components/EventsSection';
import LocationSection from '../components/LocationSection';
import TermsSection from '../components/TermsSection';

const Home = () => {
  return (
    <>
      <Hero />
      <RoomsSection />
      <OffersSection />
      <DiningSection />
      <EventsSection />
      <LocationSection />
      <TermsSection />
    </>
  );
};

export default Home;
