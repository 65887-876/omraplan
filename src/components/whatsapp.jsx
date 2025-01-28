// src/components/Whatsapp.jsx
import React from 'react';

const Whatsapp = () => {
  return (
    <div className="fixed bottom-4 right-10 z-50 flex items-center cursor-pointer group">
      <a href="https://wa.me/+213792560720" target="_blank" rel="noopener noreferrer" className="flex items-center relative">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl transition-transform duration-300 group-hover:scale-110 shadow-lg">
          <i className="fab fa-whatsapp"></i>
        </div>
        <div className="absolute right-full mr-3 hidden group-hover:flex items-center bg-white text-lg text-black rounded shadow-lg p-3 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <span className="ml-2">+213792560720</span>
        </div>
      </a>
    </div>
  );
};

export default Whatsapp;