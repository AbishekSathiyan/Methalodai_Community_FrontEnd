// src/components/FeaturesSection.jsx
import React from 'react';
import { FiCalendar, FiUsers, FiAward } from 'react-icons/fi';

const FeaturesSection = () => {
  const features = [
    { icon: <FiCalendar size={24} />, title: 'Events', desc: 'Stay updated with village events.' },
    { icon: <FiUsers size={24} />, title: 'Community', desc: 'Connect with local people.' },
    { icon: <FiAward size={24} />, title: 'Recognition', desc: 'Achievements of our villagers.' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-semibold mb-12">Key Features</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="p-6 bg-gray-100 rounded shadow hover:shadow-lg">
              <div className="text-blue-500 mb-4">{f.icon}</div>
              <h4 className="text-xl font-bold mb-2">{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
