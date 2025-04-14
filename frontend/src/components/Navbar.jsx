import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-[#2c3e50]">Teacher Transfer</span>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => navigate('/browse')}
              className="text-[#2c3e50] hover:text-[#e67e22] px-3 py-2 rounded-md text-sm font-medium"
            >
              Browse Transfers
            </button>
            <button 
              onClick={() => navigate('/how-it-works')}
              className="text-[#2c3e50] hover:text-[#e67e22] px-3 py-2 rounded-md text-sm font-medium"
            >
              How It Works
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="text-[#2c3e50] hover:text-[#e67e22] px-3 py-2 rounded-md text-sm font-medium"
            >
              About Us
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu}
              className="text-[#2c3e50] hover:text-[#e67e22] focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button 
            onClick={() => {
              navigate('/browse');
              toggleMenu();
            }}
            className="text-[#2c3e50] hover:text-[#e67e22] block px-3 py-2 rounded-md text-base font-medium w-full text-left"
          >
            Browse Transfers
          </button>
          <button 
            onClick={() => {
              navigate('/how-it-works');
              toggleMenu();
            }}
            className="text-[#2c3e50] hover:text-[#e67e22] block px-3 py-2 rounded-md text-base font-medium w-full text-left"
          >
            How It Works
          </button>
          <button 
            onClick={() => {
              navigate('/about');
              toggleMenu();
            }}
            className="text-[#2c3e50] hover:text-[#e67e22] block px-3 py-2 rounded-md text-base font-medium w-full text-left"
          >
            About Us
          </button>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;