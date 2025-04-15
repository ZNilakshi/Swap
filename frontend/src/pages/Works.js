import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      title: "Submit Your Transfer Request",
      description: "Fill out your transfer application with your current school details and preferred transfer locations. Your request will be visible to other teachers in the system.",
      icon: (
        <svg className="w-10 h-10 mb-4 text-[#0078AA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      action: "Submit your details"
    },
    {
      title: "Search for Matching Requests",
      description: "Use our search filters to find teachers who want to transfer from your preferred location to your current school. You can filter by subject, grade level, and other criteria.",
      icon: (
        <svg className="w-10 h-10 mb-4 text-[#0078AA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      action: "Browse transfer requests"
    },
    {
      title: "Connect and Arrange Transfer",
      description: "Contact potential matches directly through our messaging system. Once you find a match, we'll guide you through the official transfer process with your school administration.",
      icon: (
        <svg className="w-10 h-10 mb-4 text-[#0078AA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      action: "Initiate transfer process"
    }
  ];

  return (
    <section className="py-16 bg-[#F6F6F6]" id="how-it-works">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-[#0078AA] sm:text-4xl">
            Teacher Transfer Process
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-[#0078AA] mx-auto">
            You control the matching process - search and connect directly
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center border-t-4 border-[#FDCB6E] relative">
              {/* Step number indicator */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#0078AA] text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">
                {index + 1}
              </div>
              
              <div className="flex justify-center">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0078AA] mb-4">{step.title}</h3>
              <p className="text-gray-600 mb-6">{step.description}</p>
              <button className="text-sm font-medium text-[#0078AA] hover:text-[#005f8a] transition-colors border-b border-[#0078AA] hover:border-[#005f8a] pb-1">
                {step.action} →
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Our platform facilitates direct connections between teachers - you maintain full control over your transfer process.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-6 py-3 bg-[#0078AA] text-white rounded-lg font-medium hover:bg-[#005f8a] transition-colors">
              Submit Your Transfer Request
            </button>
            <button className="px-6 py-3 bg-white text-[#0078AA] border border-[#0078AA] rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Browse Available Transfers
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;