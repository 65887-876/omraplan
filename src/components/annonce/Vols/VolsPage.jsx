import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VolsCard from './VolsCard';

const VolsPage = () => {
  const [vols, setVols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVols = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/vols', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setVols(response.data);
      } catch (error) {
        setError('Error fetching vols');
      } finally {
        setLoading(false);
      }
    };

    fetchVols();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col justify-start items-center bg-yellow-50 min-h-screen py-8 sm:py-16 px-4 sm:px-20">
      <h1 className="text-[54px] sm:text-[64px] md:text-5xl lg:text-6xl text-neutral-13 font-plus-jakarta sm:font-volkhov font-bold text-center mb-8">Vols</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-4">
        {vols.map(vol => (
          <VolsCard key={vol._id} vol={vol} />
        ))}
      </div>
    </div>
  );
};

export default VolsPage;