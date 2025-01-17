import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HebergementCard from '../Hebergement/HebergementCard';
import SejourCard from '../Sejour/SejourCard';
import VolsCard from '../Vols/VolsCard';
import FilterBar from './FilterBar';  // Adjust the path as necessary
import GuideCard from '../Guide/GuideCard';
import ChauffeurCard from '../Chauffeur/ChauffeurCard';
import BabysitterCard from '../BabySitter/BabysitterCard';

const TousLesVentesPage = () => {
  const [hebergements, setHebergements] = useState([]);
  const [sejours, setSejours] = useState([]);
  const [vols, setVols] = useState([]);
  const [guides, setGuides] = useState([]);
  const [chauffeurs, setChauffeurs] = useState([]);
  const [babysitters, setBabysitters] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Sejours');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          hebergementResponse,
          sejourResponse,
          volResponse,
          guideResponse,
          chauffeurResponse,
          babysitterResponse,
        ] = await Promise.all([
          axios.get('http://localhost:5000/api/auth/hebergements'),
          axios.get('http://localhost:5000/api/auth/sejours'),
          axios.get('http://localhost:5000/api/auth/vols'),
          axios.get('http://localhost:5000/api/auth/guides'),
          axios.get('http://localhost:5000/api/auth/chauffeurs'),
          axios.get('http://localhost:5000/api/auth/babysitters'),
        ]);

        setHebergements(hebergementResponse.data);
        setSejours(sejourResponse.data);
        setVols(volResponse.data);
        setGuides(guideResponse.data);
        setChauffeurs(chauffeurResponse.data);
        setBabysitters(babysitterResponse.data);
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
      case 'Hebergements':
        setFilteredData(hebergements);
        break;
      case 'Guides':
        setFilteredData(guides);
        break;
      case 'Chauffeurs':
        setFilteredData(chauffeurs);
        break;
      case 'Babysitters':
        setFilteredData(babysitters);
        break;
      default:
        setFilteredData([]);
    }
  }, [activeCategory, hebergements, sejours, vols, guides, chauffeurs, babysitters]);

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
    <div className="flex flex-col justify-start items-center bg-yellow-50 min-h-screen py-8 sm:py-16 px-4 sm:px-20">
      <h1 className="text-[54px] sm:text-[64px] md:text-5xl lg:text-6xl text-neutral-13 font-plus-jakarta sm:font-volkhov font-bold text-center mb-8">Tous Les Ventes</h1>
      <FilterBar activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {filteredData.map((item) => {
          if (activeCategory === 'Sejours') {
            return <SejourCard key={item._id} sejour={item} />;
          } else if (activeCategory === 'Vols') {
            return <VolsCard key={item._id} vol={item} />;
          } else if (activeCategory === 'Hebergements') {
            return <HebergementCard key={item._id} hebergement={item} />;
          } else if (activeCategory === 'Guides') {
            return <GuideCard key={item._id} guide={item} />;
          } else if (activeCategory === 'Chauffeurs') {
            return <ChauffeurCard key={item._id} chauffeur={item} />;
          } else if (activeCategory === 'Babysitters') {
            return <BabysitterCard key={item._id} babysitter={item} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default TousLesVentesPage;