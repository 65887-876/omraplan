import React, { useState } from 'react';
import { FaHotel, FaBuilding } from 'react-icons/fa'; // Import icons

const FilterBar = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    type: '',
    villes: [],
  });

  const handleTypeChange = (type) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      type: type === prevState.type ? '' : type,
    }));
    onFilterChange({ ...selectedFilters, type: type === selectedFilters.type ? '' : type });
  };

  const handleVilleChange = (ville) => {
    const updatedVilles = selectedFilters.villes.includes(ville)
      ? selectedFilters.villes.filter((v) => v !== ville)
      : [...selectedFilters.villes, ville];
    setSelectedFilters((prevState) => ({
      ...prevState,
      villes: updatedVilles,
    }));
    onFilterChange({ ...selectedFilters, villes: updatedVilles });
  };

  return (
    <div className="flex w-[679px] flex-row  justify-center items-center px-4 py-4 gap-4 bg-white border border-gray-200 rounded-full shadow-md  max-w-5xl">

      <div
        className={`flex items-center px-4 py-2 gap-2 w-[131px] h-[56px] rounded-full cursor-pointer ${
          selectedFilters.type === 'Hôtel' ? 'bg-secondary-6 border-secondary-6 text-white' : 'bg-white border border-gray-300'
        }`}
        onClick={() => handleTypeChange('Hôtel')}
      >
        <FaHotel className="text-2xl" />
        <span className="text-2xl font-medium">Hôtel</span>
      </div>


      <div
        className={`flex items-center px-4 py-2 gap-2 w-[223px] h-[56px] rounded-full cursor-pointer ${
          selectedFilters.type === 'Appartement' ? 'bg-secondary-6 border-secondary-6 text-white' : 'bg-white border border-gray-300'
        }`}
        onClick={() => handleTypeChange('Appartement')}
      >
        <FaBuilding className="text-2xl" />
        <span className="text-2xl font-medium">Appartement</span>
      </div>


      <div className="h-[56px] border-l px-1 border-gray-300"></div>


      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-secondary-6 border-gray-300 rounded"
          checked={selectedFilters.villes.includes('Mekkah')}
          onChange={() => handleVilleChange('Mekkah')}
        />
        <label className="text-xl font-medium text-gray-800">Mekkah</label>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-secondary-6 border-gray-300 rounded"
          checked={selectedFilters.villes.includes('Medina')}
          onChange={() => handleVilleChange('Medina')}
        />
        <label className="text-xl font-medium text-gray-800">Medina</label>
      </div>
    </div>
  );
};

export default FilterBar;