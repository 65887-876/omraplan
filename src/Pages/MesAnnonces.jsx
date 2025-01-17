import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPen, FaTrash } from 'react-icons/fa';

const MesAnnonces = () => {
  const [annonces, setAnnonces] = useState({});
  const [filteredAnnonces, setFilteredAnnonces] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchAnnonces = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/auth/mes-annonces', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAnnonces(response.data);
        setFilteredAnnonces(response.data);
      } catch (error) {
        console.error('Error fetching annonces:', error.response ? error.response.data : error.message);
      }
    };

    fetchAnnonces();
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);

    if (category === 'all') {
      setFilteredAnnonces(annonces);
    } else {
      setFilteredAnnonces({ [category]: annonces[category] });
    }
  };

  const calculateTimeRemaining = (endDate) => {
    if (!endDate) return '';

    const now = new Date();
    const end = new Date(endDate);
    const timeDiff = end - now;

    if (isNaN(timeDiff)) return '';

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days} days, ${hours} hours`;
  };

  const getTitle = (item, category) => {
    switch (category) {
      case 'sejours':
        return item.compagnieAerienne || 'N/A';
      case 'babySitters':
        return item?.name && item?.age ? `${item.name} ${item.age} ans` : 'N/A';
      case 'vols':
        return `${item.company || 'N/A'} - ${item.flightNumber || 'N/A'}`;
      case 'hebergements':
        return item.type || 'N/A';
      case 'guides':
        return item.fullName || 'N/A';
      case 'chauffeurs':
        return item.sex || 'N/A';
      default:
        return item.type || 'N/A';
    }
  };

  const getStatusIndicator = (item) => {
    let statusText = item.status ? 'Publié' : 'En attente';
    let statusColor = item.status ? 'bg-green-500' : 'bg-orange-500';

    return (
      <div className="flex items-center">
        <span className={`inline-block w-3 h-3 rounded-full mr-2 ${statusColor}`}></span>
        <p className="text-sm mr-4">{statusText}</p>
        {item.venteFlash && (
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full mr-2 bg-red-500"></span>
            <p className="text-sm mr-4">Vente Flash</p>
          </div>
        )}
        {item.bonPlan && (
          <div className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full mr-2 bg-green-500"></span>
            <p className="text-sm">Bon Plan</p>
          </div>
        )}
      </div>
    );
  };

  const renderAnnonces = (category, items) => (
    <div key={category} className="w-full mb-4">
      {items && items.length > 0 && (
        <ul className="w-full">
          {items.map((item, index) => (
            <li key={index} className="grid grid-cols-5 items-center p-4 border-b border-gray-300">
              <div className="flex items-center">
                <div className="w-[88px] h-[49.5px] bg-cover bg-center rounded-tl-sm" style={{ backgroundImage: `url(${item.photos?.[0] || ''})` }}></div>
                <div className="ml-4">
                  <p className="font-bold text-base mb-1">{getTitle(item, category)}</p>
                  <p className="text-sm text-gray-600">{item.description || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center">
                {getStatusIndicator(item)}
              </div>
              <div>
                <p className="text-sm">{item.dateFinPublication ? new Date(item.dateFinPublication).toLocaleDateString() : 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm">{calculateTimeRemaining(item.dateFinPublication)}</p>
              </div>
              <div className="flex space-x-4 justify-center">
                <FaPen className="text-primary-6 cursor-pointer" />
                <FaTrash className="text-primary-6 cursor-pointer" />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center p-16 gap-16 w-full min-h-[952px] bg-yellow-50 z-2">
      <div className="w-full max-w-screen-xl mb-4">
        <h1 className="text-xl font-semibold text-gray-700"><span className='text-secondary-6'>Acueil</span> / mes-annonces</h1>
      </div>
      <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md w-full max-w-screen-xl">
        <h2 className="text-2xl font-semibold self-stretch mb-4">Mes Annonces</h2>
        <div className="flex justify-between items-start w-full mb-4">
          <div className="flex space-x-2">
            {[
              { name: 'all', label: 'All' },
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
          <div className="grid grid-cols-5 items-center p-4 mb-2 bg-gray-100 border border-gray-300">
            <div>Annonce</div>
            <div>Status</div>
            <div>Publié le</div>
            <div>Temps restant</div>
            <div className="flex justify-center">Actions</div>
          </div>
          {Object.keys(filteredAnnonces).map((category) =>
            renderAnnonces(category, filteredAnnonces[category])
          )}
        </div>
      </div>
    </div>
  );
};

export default MesAnnonces;