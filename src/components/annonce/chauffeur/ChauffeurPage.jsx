import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChauffeurCard from './ChauffeurCard';

const ChauffeursPage = () => {
  const [chauffeurs, setChauffeurs] = useState([]);
  const [filters, setFilters] = useState({
    cities: {
      Mekkah: false,
      Madina: false,
      Jeddah: false,
    },
    gender: '',
  });

  useEffect(() => {
    const fetchChauffeurs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/chauffeurs', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setChauffeurs(response.data);
      } catch (error) {
        console.error('Error fetching chauffeurs:', error);
      }
    };

    fetchChauffeurs();
  }, []);

  const handleCityChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      cities: {
        ...prevFilters.cities,
        [name]: checked,
      },
    }));
  };

  const handleGenderChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      gender: e.target.value,
    }));
  };

  const filteredChauffeurs = chauffeurs.filter((chauffeur) => {
    const cityMatch = filters.cities[chauffeur.city] || Object.values(filters.cities).every((v) => !v);
    const genderMatch = filters.gender === '' || chauffeur.sex === filters.gender;
    return cityMatch && genderMatch;
  });

  return (
    <div className="bg-yellow-50 min-h-screen px-20 py-16">
      <h1 className="text-[64px] text-neutral-13 font-volkhov font-bold text-center mb-8">Chauffeurs</h1>

      {/* Filters Section */}
      <div className="flex justify-center items-center p-6 gap-10 w-[695px] h-[92px] bg-white rounded-full mx-auto mb-8">
        {/* Ville Filters */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="mekkah" name="Mekkah" className="w-5 h-5 rounded-md" onChange={handleCityChange} />
            <label htmlFor="mekkah" className="text-lg font-medium text-gray-700">Mekkah</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="madina" name="Madina" className="w-5 h-5 rounded-md" onChange={handleCityChange} />
            <label htmlFor="madina" className="text-lg font-medium text-gray-700">Madina</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="jeddah" name="Jeddah" className="w-5 h-5 rounded-md" onChange={handleCityChange} />
            <label htmlFor="jeddah" className="text-lg font-medium text-gray-700">Jeddah</label>
          </div>
        </div>

        {/* Separator Line */}
        <div className="h-full border-r-2 border-gray-300"></div>

        {/* Sexe Filters */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
            <input type="radio" id="femme" name="sexe" value="Femme" className="w-5 h-5 rounded-full" onChange={handleGenderChange} />
            <label htmlFor="femme" className="text-lg font-medium text-gray-700">Femme</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="radio" id="homme" name="sexe" value="Homme" className="w-5 h-5 rounded-full" onChange={handleGenderChange} />
            <label htmlFor="homme" className="text-lg font-medium text-gray-700">Homme</label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredChauffeurs.map(chauffeur => (
          <ChauffeurCard key={chauffeur._id} chauffeur={chauffeur} />
        ))}
      </div>
    </div>
  );
};

export default ChauffeursPage;