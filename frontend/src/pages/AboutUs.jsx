import React from 'react';
import { FaChalkboardTeacher, FaHandsHelping, FaUsers, FaGlobeAsia } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      {/* Hero Section */}
      <div className="relative py-32 bg-[#0078AA] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#FDCB6E] mb-6">
            About Our Teacher Transfer Platform
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Connecting educators across Sri Lanka to create seamless transfer opportunities
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0078AA] mb-4">
            Our Story
          </h2>
          <div className="w-24 h-1 bg-[#FDCB6E] mx-auto mb-8"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Founded in 2023, the Sri Lankan Teacher Transfer Portal was born from a simple idea: 
            to make teacher transfers fair, transparent, and efficient. What started as a small 
            initiative to help a few colleagues has grown into a national platform connecting 
            thousands of educators across all provinces.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#0078AA]">
            <div className="text-[#0078AA] text-4xl mb-4">
              <FaChalkboardTeacher />
            </div>
            <h3 className="text-2xl font-bold text-[#0078AA] mb-4">Our Mission</h3>
            <p className="text-gray-700">
              To empower Sri Lankan teachers by creating a transparent, efficient transfer system 
              that values merit, personal circumstances, and professional growth equally.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#FDCB6E]">
            <div className="text-[#FDCB6E] text-4xl mb-4">
              <FaGlobeAsia />
            </div>
            <h3 className="text-2xl font-bold text-[#0078AA] mb-4">Our Vision</h3>
            <p className="text-gray-700">
              A Sri Lankan education system where every teacher can work in an environment 
              that maximizes their potential and contributes to national educational excellence.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0078AA] mb-4">
            Our Core Values
          </h2>
          <div className="w-24 h-1 bg-[#FDCB6E] mx-auto mb-12"></div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <FaHandsHelping className="text-4xl mb-4 text-[#0078AA]" />,
                title: "Collaboration",
                desc: "We believe in the power of teachers helping teachers"
              },
              { 
                icon: <FaUsers className="text-4xl mb-4 text-[#FDCB6E]" />,
                title: "Community",
                desc: "Building connections across Sri Lanka's education system"
              },
              { 
                icon: <FaChalkboardTeacher className="text-4xl mb-4 text-[#0078AA]" />,
                title: "Fairness",
                desc: "Equal opportunity for all educators regardless of location"
              },
              { 
                icon: <FaGlobeAsia className="text-4xl mb-4 text-[#FDCB6E]" />,
                title: "Transparency",
                desc: "Clear processes you can trust"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                {item.icon}
                <h4 className="text-xl font-semibold text-[#0078AA] mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0078AA] mb-4">
            Meet The Team
          </h2>
          <div className="w-24 h-1 bg-[#FDCB6E] mx-auto mb-12"></div>
          
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Anil Perera",
                role: "Founder & CEO",
                bio: "Former educator with 15+ years experience in Sri Lankan schools"
              },
              {
                name: "Nayana Silva",
                role: "Technical Lead",
                bio: "Education technology specialist passionate about equitable access"
              },
              {
                name: "Prof. Rajiv Fernando",
                role: "Advisory Board",
                bio: "Expert in national education policy and teacher welfare"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-[#0078AA] flex items-center justify-center text-4xl text-white font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h4 className="text-xl font-semibold text-[#0078AA]">{member.name}</h4>
                <p className="text-[#FDCB6E] mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;