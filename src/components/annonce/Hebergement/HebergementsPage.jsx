import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HebergementCard from './HebergementCard';
import FilterBar from './FilterBar';

const HebergementsPage = () => {
  const [hebergements, setHebergements] = useState([]);
  const [filteredHebergements, setFilteredHebergements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHebergements = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/hebergements', {

        });
        setHebergements(response.data);
        setFilteredHebergements(response.data);
      } catch (error) {
        setError('Error fetching hebergements');
      } finally {
        setLoading(false);
      }
    };

    fetchHebergements();
  }, []);

  const handleFilterChange = (filters) => {
    const { type, villes } = filters;
    let filtered = hebergements;

    if (type) {
      filtered = filtered.filter((heb) => heb.type === type);
    }

    if (villes.length > 0) {
      filtered = filtered.filter((heb) => villes.includes(heb.ville));
    }

    setFilteredHebergements(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col justify-start items-center bg-yellow-50 min-h-screen py-8 sm:py-12 px-2 sm:px-20">
      <h1 className="text-[54px] sm:text-[64px] md:text-5xl lg:text-6xl text-neutral-13 py-1 font-plus-jakarta sm:font-volkhov font-bold text-center mb-8">
        Hebergements
      </h1>
      <FilterBar onFilterChange={handleFilterChange} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {filteredHebergements.map((hebergement) => (
          <HebergementCard key={hebergement._id} hebergement={hebergement} />
        ))}
      </div>
    </div>
  );
};

export default HebergementsPage;