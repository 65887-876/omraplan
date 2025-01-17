import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GuideCard from './GuideCard';

const GuidesPage = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/guides', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setGuides(response.data);
      } catch (error) {
        setError('Error fetching guides');
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col justify-start items-center bg-yellow-50 min-h-screen py-8 sm:py-16 px-4 sm:px-20">
      <h1 className="text-[54px] sm:text-[64px] md:text-5xl lg:text-6xl text-neutral-13 font-plus-jakarta sm:font-volkhov font-bold text-center mb-8">Guides</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-4">
        {guides.map(guide => (
          <GuideCard key={guide._id} guide={guide} />
        ))}
      </div>
    </div>
  );
};

export default GuidesPage;