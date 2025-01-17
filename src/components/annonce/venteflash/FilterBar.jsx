import React from 'react';
import { FaPlane, FaHotel, FaSuitcase } from 'react-icons/fa'; // Import icons

const FilterBar = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-row justify-center items-center p-6 gap-4 bg-white  rounded-full w-[583px]">
      <div
        className={`flex items-center px-4 py-2 gap-2 w-[131px] h-[56px] rounded-full cursor-pointer ${
          activeCategory === 'Sejours' ? 'bg-secondary-6 border-secondary-6 text-white' : 'bg-white border border-gray-300'
        }`}
        onClick={() => onCategoryChange('Sejours')}
      >
        <FaSuitcase />
        <span className="text-2xl font-medium">Sejours</span>
      </div>

      <div
        className={`flex items-center px-4 py-2 gap-2 w-[131px] h-[56px] rounded-full cursor-pointer ${
          activeCategory === 'Vols' ? 'bg-secondary-6 border-secondary-6 text-white' : 'bg-white border border-gray-300'
        }`}
        onClick={() => onCategoryChange('Vols')}
      >
        <FaPlane className="text-2xl" />
        <span className="text-2xl font-medium">Vols</span>
      </div>

      <div
        className={`flex items-center px-4 py-2 gap-2 w-[223px] h-[56px] rounded-full cursor-pointer ${
          activeCategory === 'Hébergements' ? 'bg-secondary-6 border-secondary-6 text-white' : 'bg-white border border-gray-300'
        }`}
        onClick={() => onCategoryChange('Hébergements')}
      >
        <FaHotel className="text-2xl" />
        <span className="text-2xl font-medium">Hébergements</span>
      </div>
    </div>
  );
};

export default FilterBar;