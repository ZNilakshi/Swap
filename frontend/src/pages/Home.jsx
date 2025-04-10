import React from 'react';
import { useNavigate } from 'react-router-dom';
import HowItsWork from '../components/HowItsWork';
import StatsSection from '../components/Statistics';
import Review from '../components/Review';
const HeroSection = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register'); 
  };
  const handleBrowseClick = () => {
    navigate('/browse'); 
  };

  return (
    <div>
      <div className="relative h-screen bg-cover bg-center flex items-center justify-center">
        {/* Background image with overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Sri Lankan Teacher Transfer Portal
          </h1>
          <p className="text-xl md:text-2xl mb-10">
            Find and request mutual transfers easily. Connect with teachers across Sri Lanka to simplify your transfer process.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleRegisterClick}
              className="bg-white text-blue-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300"
            >
              Register Now
            </button>
            <button 
             onClick={handleBrowseClick}
            className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-blue-800 transition duration-300">
              Browse Transfers
            </button>
          </div>
        </div>
      </div>
      <HowItsWork />
      <StatsSection />
      <Review />
    </div>
  );
};

export default HeroSection;