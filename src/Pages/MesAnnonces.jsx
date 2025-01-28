import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify
import Chauffeurs from './categories/Chauffeurs';
import Guides from './categories/Guides';
import Hebergements from './categories/Hebergements';
import Vols from './categories/Vols';
import BabySitters from './categories/BabySitters';
import Sejours from './categories/Sejours';

const MesAnnonces = () => {
  const { userId } = useParams(); // Get the user ID from the URL
  const [annonces, setAnnonces] = useState({});
  const [filteredAnnonces, setFilteredAnnonces] = useState({});
  const [activeCategory, setActiveCategory] = useState('chauffeurs'); 

  useEffect(() => {
    const fetchAnnonces = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const endpoint = userId 
          ? `http://localhost:5000/api/auth/mes-annonces/${userId}` 
          : 'http://localhost:5000/api/auth/mes-annonces';

        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAnnonces(response.data);
        setFilteredAnnonces(response.data);
      } catch (error) {
        console.error('Error fetching annonces:', error.response ? error.response.data : error.message);
      }
    };

    fetchAnnonces();
  }, [userId]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setFilteredAnnonces({ [category]: annonces[category] });
  };

  const handleDelete = async (category, annonceId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/auth/annonces/${annonceId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Remove the deleted annonce from the state
      setAnnonces((prevAnnonces) => {
        const updatedCategoryAnnonces = prevAnnonces[category].filter((annonce) => annonce._id !== annonceId);
        return {
          ...prevAnnonces,
          [category]: updatedCategoryAnnonces
        };
      });

      setFilteredAnnonces((prevFilteredAnnonces) => {
        const updatedCategoryAnnonces = prevFilteredAnnonces[category].filter((annonce) => annonce._id !== annonceId);
        return {
          ...prevFilteredAnnonces,
          [category]: updatedCategoryAnnonces
        };
      });

      // Show success message
      toast.success('Annonce deleted successfully!');
    } catch (error) {
      console.error('Error deleting annonce:', error.response ? error.response.data : error.message);
    }
  };

  const renderCategoryComponent = (category) => {
    const categoryProps = {
      items: filteredAnnonces[category],
      onDelete: (annonceId) => handleDelete(category, annonceId)
    };

    switch (category) {
      case 'chauffeurs':
        return <Chauffeurs {...categoryProps} />;
      case 'guides':
        return <Guides {...categoryProps} />;
      case 'hebergements':
        return <Hebergements {...categoryProps} />;
      case 'vols':
        return <Vols {...categoryProps} />;
      case 'babySitters':
        return <BabySitters {...categoryProps} />;
      case 'sejours':
        return <Sejours {...categoryProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center p-16 gap-16 w-full min-h-[952px] bg-yellow-50 z-2">
      <ToastContainer /> {/* Add ToastContainer here */}
      <div className="w-full max-w-screen-xl mb-4">
        <h1 className="text-xl font-semibold text-gray-700"><span className='text-secondary-6'>Accueil</span> / Mes Annonces</h1>
      </div>
      <h1 className='text-4xl font-semibold'>Annonces:</h1>
      <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md w-full max-w-screen-xl">
        <h2 className="text-2xl font-semibold self-stretch mb-4">Mes Annonces</h2>
        <div className="flex justify-between items-start w-full mb-4">
          <div className="flex space-x-2">
            {[
              { name: 'chauffeurs', label: 'Chauffeurs' },
              { name: 'guides', label: 'Guides' },
              { name: 'hebergements', label: 'Hebergements' },
              { name: 'vols', label: 'Vols' },
              { name: 'babySitters', label: 'Baby Sitters' },
              { name: 'sejours', label: 'Séjours' },
            ].map(({ name, label }) => (
              <button
                key={name}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-plus-jakarta h-[49px] font-bold ${
                  activeCategory === name
                    ? 'bg-[#987306] text-white shadow-md'
                    : 'bg-white border border-solid border-primary-6 text-gray-700'
                }`}
                onClick={() => handleCategoryClick(name)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full">
          {renderCategoryComponent(activeCategory)}
        </div>
      </div>
    </div>
  );
};

export default MesAnnonces;