import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SejourCard from './SejourCard';

const SejoursPage = () => {
  const [sejours, setSejours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSejours = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/sejours', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setSejours(response.data);
      } catch (error) {
        setError('Error fetching sejours');
      } finally {
        setLoading(false);
      }
    };

    fetchSejours();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col justify-start items-center bg-yellow-50 min-h-screen py-8 sm:py-12 px-2 sm:px-20">
      <h1 className="text-[54px] sm:text-[64px] md:text-5xl lg:text-6xl text-neutral-13 py-1 font-plus-jakarta sm:font-volkhov font-bold text-center mb-8">Séjours</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-4">
        {sejours.map(sejour => (
          <SejourCard key={sejour._id} sejour={sejour} />
        ))}
      </div>
    </div>
  );
};

export default SejoursPage;