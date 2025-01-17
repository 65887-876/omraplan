import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { FaSuitcase, FaPlane, FaHotel, FaMapMarkedAlt, FaCar, FaBabyCarriage } from 'react-icons/fa'; // Import icons

import SejourForm from './category/Sejour/SejourForm';
import VolForm from './category/Vols/VolsForm';
import HebergementForm from './category/Hebergement/HebergementForm';
import GuideForm from './category/Guide/GuideForm';
import ChauffeurForm from './category/Chauffeurs/ChauffeurForm';
import BabysitterForm from './category/BabySitter/BabysitterForm';

const categories = [
  { label: 'Séjour', value: 'sejour', icon: <FaSuitcase className="w-6 h-6" /> },
  { label: 'Vol', value: 'vol', icon: <FaPlane className="w-6 h-6" /> },
  { label: 'Hébergement', value: 'hebergement', icon: <FaHotel className="w-6 h-6" /> },
  { label: 'Guide', value: 'guide', icon: <FaMapMarkedAlt className="w-6 h-6" /> },
  { label: 'Chauffeur', value: 'chauffeur', icon: <FaCar className="w-6 h-6" /> },
  { label: 'Baby Sitter', value: 'babysitter', icon: <FaBabyCarriage className="w-6 h-6" /> },
];

const CreateAnnonce = () => {
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
  
  const headerHeight = 72;
  const bottomBarHeight = 0;
  return (
    <div className="flex flex-col  bg-[#FAF8ED]" style={{ minHeight: `calc(100vh - ${headerHeight + bottomBarHeight}px)` }}>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex flex-col justify-center items-center ">
              <h1 className="text-2xl font-bold mb-4">Que souhaitez-vous publier ?</h1>
              <p className="text-lg mb-6">Choisissez le type d’annonce</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map(({ label, value, icon }) => (
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
            </div>
          }
        />
        {/* Category Forms */}
        <Route path="/sejour" element={<SejourForm />} />
        <Route path="/vol" element={<VolForm />} />
        <Route path="/hebergement" element={<HebergementForm />} />
        <Route path="/guide" element={<GuideForm />} />
        <Route path="/chauffeur" element={<ChauffeurForm />} />
        <Route path="/babysitter" element={<BabysitterForm />} />
      </Routes>

    </div>
  );
};

export default CreateAnnonce;