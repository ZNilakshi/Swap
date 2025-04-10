import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      {/* Call to Action Section */}
      <div className="bg-blue-700 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Transfer Match?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of teachers who have successfully found their ideal transfer through our platform.
          </p>
          <button className="bg-white text-blue-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
            Get Started Today
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">Teacher Transfer Portal</h3>
            <p className="text-gray-300">
              Facilitating mutual transfers for Sri Lankan teachers across the nation.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-8 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Browse Transfers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">How It Works</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact</h4>
            <address className="text-gray-300 not-italic">
              <p className="mb-2">Ministry of Education</p>
              <p className="mb-2">Isurupaya, Battaramulla</p>
              <p className="mb-2">Sri Lanka</p>
              <p className="mb-2">
                Email: <a href="mailto:info@teachertransfer.gov.lk" className="hover:text-white transition">
                  info@teachertransfer.gov.lk
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-900 py-6 px-4">
        <div className="max-w-6xl mx-auto text-center text-gray-400">
          © 2025 Teacher Transfer Portal - Ministry of Education, Sri Lanka
        </div>
      </div>
    </footer>
  );
};

export default Footer;