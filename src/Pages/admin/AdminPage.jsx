import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { FaBuilding, FaBlog, FaStore, FaUtensils } from 'react-icons/fa';

import AssociationsForm from './forms/associations';
import BlogForm from './forms/blog';
import EspacesVentesForm from './forms/ecpacesventes'; // Updated import
import RestaurantsForm from './forms/restaurants';
import ClientPage from './ClientPage'; // Import the client page component

const adminCategories = [
  { label: 'Associations', value: 'associations', icon: <FaBuilding className="w-6 h-6" /> },
  { label: 'Blog', value: 'blog', icon: <FaBlog className="w-6 h-6" /> },
  { label: 'Espaces Ventes', value: 'espaces-ventes', icon: <FaStore className="w-6 h-6" /> },
  { label: 'Restaurants', value: 'restaurants', icon: <FaUtensils className="w-6 h-6" /> },
];

const AdminPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleNext = () => {
    if (selectedCategory) {
      navigate(`${selectedCategory}`);
    }
  };

  const handleClientButtonClick = () => {
    navigate('/client');
  };

  const headerHeight = 72;
  const bottomBarHeight = 0;
  
  return (
    <div className="flex flex-col bg-[#FAF8ED]" style={{ minHeight: `calc(100vh - ${headerHeight + bottomBarHeight}px)` }}>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-2xl font-bold mb-4">Que souhaitez-vous gérer ?</h1>
              <p className="text-lg mb-6">Choisissez une catégorie</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {adminCategories.map(({ label, value, icon }) => (
                  <div
                    key={value}
                    className={`p-4 bg-white w-[260px] h-[110px] border rounded-lg flex flex-row items-center gap-4 ${selectedCategory === value ? 'border-secondary-6 bg-secondary-100 shadow-inner-[0_4px_6px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.1)]' : 'border-gray-300'}`}
                    onClick={() => handleCategoryChange(value)}
                  >
                    <div className="flex justify-center items-center">
                      {React.cloneElement(icon, { className: selectedCategory === value ? 'w-6 h-6 text-secondary-6' : 'w-6 h-6 text-primary-6' })}
                    </div>
                    <div className="flex flex-col items-start justify-center w-[192px] h-[76px]">
                      <span className={`text-lg font-medium ${selectedCategory === value ? 'text-secondary-6' : 'text-[#0A2A3D]'}`}>{label}</span>
                    </div>
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === value}
                      onChange={() => handleCategoryChange(value)}
                      className={`w-6 h-6 border ${selectedCategory === value ? 'border-secondary-6' : 'border-gray-400'} rounded-full`}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={handleNext}
                className="mt-6 py-2 px-4 bg-blue-500 text-white rounded-lg"
                disabled={!selectedCategory}
              >
                Suivant
              </button>
              <button
                onClick={handleClientButtonClick}
                className="mt-6 py-2 px-4 bg-green-500 text-white rounded-lg"
              >
                Client
              </button>
            </div>
          }
        />
        {/* Category Forms */}
        <Route path="/associations" element={<AssociationsForm />} />
        <Route path="/blog" element={<BlogForm />} />
        <Route path="/espaces-ventes" element={<EspacesVentesForm />} />
        <Route path="/restaurants" element={<RestaurantsForm />} />
        <Route path="/client" element={<ClientPage />} /> {/* Route for client page */}
      </Routes>
    </div>
  );
};

export default AdminPage;