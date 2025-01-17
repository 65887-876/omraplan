import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HebergementCard from '../Hebergement/HebergementCard';
import SejourCard from '../Sejour/SejourCard';
import VolsCard from '../Vols/VolsCard';
import FilterBar from './FilterBar';  // Adjust the path as necessary

const VenteFlashPage = () => {
  const [hebergements, setHebergements] = useState([]);
  const [sejours, setSejours] = useState([]);
  const [vols, setVols] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Sejours');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hebergementResponse = await axios.get('http://localhost:5000/api/auth/hebergements', {
        });
        const sejourResponse = await axios.get('http://localhost:5000/api/auth/sejours', {
        });
        const volResponse = await axios.get('http://localhost:5000/api/auth/vols', {
        });

        setHebergements(hebergementResponse.data.filter(item => item.venteFlash));
        setSejours(sejourResponse.data.filter(item => item.venteFlash));
        setVols(volResponse.data.filter(item => item.venteFlash));
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    switch (activeCategory) {
      case 'Sejours':
        setFilteredData(sejours);
        break;
      case 'Vols':
        setFilteredData(vols);
        break;
      case 'Hébergements':
        setFilteredData(hebergements);
        break;
      default:
        setFilteredData([]);
    }
  }, [activeCategory, hebergements, sejours, vols]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col justify-start items-center bg-yellow-50 min-h-screen py-8 sm:py-12 px-2 sm:px-20">
      <h1 className="text-[54px] sm:text-[64px] md:text-5xl lg:text-6xl text-neutral-13 py-1 font-plus-jakarta sm:font-volkhov font-bold text-center mb-8">Vente Flash</h1>
      <FilterBar activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {filteredData.map((item) => {
          if (activeCategory === 'Sejours') {
            return <SejourCard key={item._id} sejour={item} />;
          } else if (activeCategory === 'Vols') {
            return <VolsCard key={item._id} vol={item} />;
          } else if (activeCategory === 'Hébergements') {
            return <HebergementCard key={item._id} hebergement={item} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default VenteFlashPage;