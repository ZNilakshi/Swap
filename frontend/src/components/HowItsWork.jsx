import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      title: "Submit Your Request",
      description: "Create and submit your transfer request with your current location and desired destination.",
      icon: (
        <svg className="w-10 h-10 mb-4 text-[#0078AA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      title: "Find Matches",
      description: "Search for teachers looking to transfer to your current location from your preferred destination.",
      icon: (
        <svg className="w-10 h-10 mb-4 text-[#0078AA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      title: "Complete Transfer",
      description: "Communicate directly with potential matches and get your transfer approved through the system.",
      icon: (
        <svg className="w-10 h-10 mb-4 text-[#0078AA]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-[#F6F6F6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-[#0078AA] sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-[#0078AA] mx-auto">
            Simple steps to find your perfect transfer match
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center border-t-4 border-[#FDCB6E]">
              <div className="flex justify-center">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0078AA] mb-4">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;