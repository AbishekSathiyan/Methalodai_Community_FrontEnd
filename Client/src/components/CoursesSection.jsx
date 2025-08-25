// src/components/CoursesSection.jsx
import React from 'react';
import { FiBook } from 'react-icons/fi';

const CoursesSection = () => {
  const courses = [
    { title: 'Agriculture Basics', desc: 'Learn modern farming techniques.' },
    { title: 'Digital Literacy', desc: 'Understand how to use smartphones & the internet.' },
    { title: 'Health & Hygiene', desc: 'Improve village sanitation and health.' },
  ];

  return (
    <section id="courses" className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h3 className="text-3xl font-semibold mb-12">Our Courses</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div key={index} className="p-6 bg-blue-50 rounded shadow hover:shadow-md">
              <div className="text-blue-500 mb-4"><FiBook size={24} /></div>
              <h4 className="text-xl font-bold mb-2">{course.title}</h4>
              <p>{course.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
