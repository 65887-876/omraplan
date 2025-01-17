import React from 'react';

const InformationStep = ({ formData, handleChange }) => {
  const isHotel = formData.typeHebergement === 'Hôtel';
  const isMekkah = formData.ville === 'Mekkah';

  return (
    <div className="flex flex-col justify-center items-center p-0 px-2 gap-2 h-auto mt-4">
      <div className='flex flex-col items-center p-0 gap-2 w-full md:w-[800px]'>

        <h2 className="font-plus-jakarta py-5 font-bold text-2xl md:text-4xl leading-tight text-center text-[#2D3C59]">
          Informations sur {isHotel ? 'l’hôtel' : 'l’appartement'}
        </h2>
        <p className="font-plus-jakarta my-2 font-medium text-lg md:text-xl leading-6 text-center text-[#667085]">
          Veuillez indiquez le nom et le lieu de l’hôtel 
        </p>
        <div className="flex flex-col items-start p-0 gap-4 w-full py-2">
          <div className="flex flex-col items-start p-0 gap-2 w-full h-auto">
            <label className="font-semibold text-gray-700" htmlFor="hotelName">
              Nom de {isHotel ? 'l’hôtel' : 'l’appartement'}
            </label>
            <input
              type="text"
              id="hotelName"
              name="hotelName"
              placeholder={`Entrer le nom de ${isHotel ? 'l’hôtel' : 'l’appartement'}`}
              value={formData.hotelName}
              onChange={handleChange}
              className="flex flex-row items-center p-3 gap-2 w-full h-11 bg-white border border-gray-300 shadow-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-6"
            />
          </div>

          <div className="flex flex-col items-start p-0 gap-2 w-full h-auto">
            <label className="font-semibold text-gray-700" htmlFor="distance">
              Distance du {isMekkah ? 'Masjid al-Haram' : 'Masjid an-Nabawi'}
            </label>
            <input
              type="number"
              id="distance"
              name="distance"
              placeholder="100"
              value={formData.distance}
              onChange={handleChange}
              className="flex flex-row items-center p-3 gap-2 w-full h-11 bg-white border border-gray-300 shadow-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-6"
            />
            <p className="text-gray-600 text-xs italic">Mètres</p>
          </div>

          <div className="flex flex-col items-start p-0 gap-2 w-full h-auto">
            <label className="font-semibold text-gray-700" htmlFor="hotelLocation">
              Emplacement de {isHotel ? 'l’hôtel' : 'l’appartement'}
            </label>
            <input
              type="text"
              id="hotelLocation"
              name="hotelLocation"
              placeholder={`Entrer une adresse de ${isHotel ? 'l’hôtel' : 'l’appartement'}`}
              value={formData.hotelLocation}
              onChange={handleChange}
              className="flex flex-row items-center p-3 gap-2 w-full h-11 bg-white border border-gray-300 shadow-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformationStep;