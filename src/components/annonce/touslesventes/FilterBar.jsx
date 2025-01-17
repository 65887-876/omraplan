import React from 'react';
import { FaPlane, FaHotel, FaSuitcase, FaMapMarkedAlt, FaTaxi, FaChild, FaHome } from 'react-icons/fa'; // Import icons

const FilterBar = ({ activeCategory, onCategoryChange }) => {
  const categoriesWithIcons = [
    { name: "Sejours", icon: <FaSuitcase className="text-2xl" /> },
    { name: "Vols", icon: <FaPlane className="text-2xl" /> },
    { name: "Hebergements", icon: <FaHome className="text-2xl" /> },
    { name: "Guides", icon: <FaMapMarkedAlt className="text-2xl" /> },
    { name: "Chauffeurs", icon: <FaTaxi className="text-2xl" /> },
    { name: "Babysitters", icon: <FaChild className="text-2xl" /> },
  ];

  return (
    <div className="flex w-full flex-row justify-center items-center px-4 py-4 gap-4 bg-white border-[0.5px]  rounded-full max-w-6xl mx-auto">
      {categoriesWithIcons.map((category) => (
        <div
          key={category.name}
          className={`flex items-center px-4 py-2 gap-2 min-w-[150px] h-[56px] rounded-full cursor-pointer ${
            activeCategory === category.name
              ? 'bg-secondary-6 border-secondary-6 text-white'
              : 'bg-white border border-gray-300'
          }`}
          onClick={() => onCategoryChange(category.name)}
        >
          {category.icon}
          <span className="text-2xl font-medium">{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default FilterBar;