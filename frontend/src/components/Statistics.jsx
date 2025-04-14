import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';

const StatsSection = () => {
  const [startAnimation, setStartAnimation] = useState(false);
  const stats = [
    { number: 2500, label: "Active Teachers" },
    { number: 1200, label: "Transfer Requests" },
    { number: 800, label: "Successful Transfers" },
    { number: 25, label: "Districts Covered" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('stats-section');
      if (element) {
        const top = element.getBoundingClientRect().top;
        if (top < window.innerHeight - 100) {
          setStartAnimation(true);
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="stats-section" className="py-16 bg-[#0078AA] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold sm:text-4xl text-[#FDCB6E]">
            Connecting Teachers Nationwide
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-white/10 p-6 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl font-bold mb-2 text-[#FDCB6E]">
                {startAnimation && (
                  <CountUp
                    end={stat.number}
                    duration={2.5}
                    separator=","
                    suffix={index !== 3 ? "+" : ""}
                  />
                )}
                {!startAnimation && "0"}
              </div>
              <p className="text-lg font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;