import React from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';

const Hebergements = ({ items }) => {
  // Sort items by the latest published date
  const sortedItems = items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="w-full mb-4">
      {sortedItems && sortedItems.length > 0 && (
        <ul className="w-full">
          {/* Header Row */}
          <li className="grid grid-cols-12 gap-4 items-center p-4 bg-gray-100 border-b border-gray-300" style={{ width: '1216px' }}>
            <div className="col-span-3 text-left">Annonce</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Publié le</div>
            <div className="col-span-3 text-center">Temps restant</div>
            <div className="col-span-2 text-center">Actions</div>
          </li>
          {/* Content Rows */}
          {sortedItems.map((item, index) => (
            <li key={index} className="grid grid-cols-12 gap-4 items-center p-4 border-b border-gray-300" style={{ width: '1216px' }}>
              <div className="flex items-center col-span-3">
                <div className="w-[88px] h-[49px] bg-cover bg-center rounded-tl-sm" style={{ backgroundImage: `url(${item.photos?.[0] || ''})` }}></div>
                <div className="ml-4">
                  <p className="font-bold font-plus-jakarta text-primary-10 text-[16px]">{item.type || 'N/A'}</p>
                  <p className="text-sm font-plus-jakarta text-primary-6">{item.city || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center justify-center col-span-2 gap-2">
                <div className='flex items-center justify-center border py-[7px] px-2 rounded-full'>
                  <div className={`inline-block w-3 h-3 rounded-full mr-1 ${item.status ? 'bg-green-500' : 'bg-orange-500'}`}></div>
                  <p className="text-sm">{item.status ? 'Publié' : 'En attente'}</p>
                </div>
                <span className={`py-[2px] px-1 h-[28px] w-[75px] flex justify-center rounded-full text-white ${item.venteFlash ? 'bg-danger-6' : 'bg-success-6'}`}>
                  {item.venteFlash ? 'Flash' : 'Bon plan'}
                </span>
              </div>
              <div className="text-center col-span-2 ml-[15%] font-plus-jakarta text-primary-10 font-medium">
                <p className="">{item.createdAt ? formatDate(item.createdAt) : 'N/A'}</p>
              </div>
              <div className="text-center col-span-3 font-plus-jakarta text-primary-10">
                <p className="">{calculateTimeRemaining(item.dateFinPublication)}</p>
              </div>
              <div className="flex justify-center col-span-2 ml-[15%]">
                <FaPen className="text-primary-6 cursor-pointer" />
                <FaTrash className="text-primary-6 cursor-pointer ml-2" />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const formatDate = (dateString) => {
  const options = { weekday: 'long', day: '2-digit', month: 'short' };
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', options);
};

const calculateTimeRemaining = (endDate) => {
  if (!endDate) return '';

  const now = new Date();
  const end = new Date(endDate);
  const timeDiff = end - now;

  if (isNaN(timeDiff)) return '';

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return days === 1 ? '1 jour' : `${days} jours`;
};

export default Hebergements;