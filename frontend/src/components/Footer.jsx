import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/browse'); 
  };

  return (
    <footer className="bg-[#0078AA] text-white">
      {/* CTA Section */}
      <div className="py-12 px-4 bg-[#0078AA]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#FDCB6E]">Ready to Find Your Transfer Match?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of teachers who have successfully found their ideal transfer through our platform.
          </p>
          <button 
            onClick={handleGetStarted}
            className="bg-[#FDCB6E] text-[#0078AA] font-bold py-3 px-8 rounded-lg hover:bg-[#0078AA] hover:text-[#FDCB6E] hover:border hover:border-[#FDCB6E] transition duration-300 shadow-lg"
          >
            Get Started Today
          </button>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-[#FDCB6E] py-6 px-4">
        <div className="max-w-6xl mx-auto text-center text-[#F6F6F6]">
          © 2025 Teacher Transfer Portal - Ministry of Education, Sri Lanka
        </div>
      </div>
    </footer>
  );
};

export default Footer;