import React from 'react';

const Step3 = ({ formData, handleChange }) => {
  return (
    <div className="flex flex-col justify-center items-center sm:mt-10">
      <label className="sm:text-h3 text-h4 text-center font-medium text-neutral-13">
        Quel type d’hébergement recherchez-vous ?
      </label>
      <p className='text-center text-[18px] font-medium text-primary-6 mt-2 mb-8'>Choisissez le type d’hebergement proposé</p>
      <div className="flex flex-col gap-6">
        <label
          className={`flex justify-between items-center p-4 border rounded-lg bg-white cursor-pointer ${
            formData.typeHebergement === 'Hôtel' ? 'border-2 border-secondary-6 text-secondary-6' : 'border-gray-300'
          } w-full md:w-[800px] md:h-auto`}
          style={{ height: '76px' }}
        >
          <h1 className="ml-2 w-[300px] font-bold sm:text-h4 font-plus-jakarta text-[28px]">
            Hôtel 
          </h1>
          <input
            type="radio"
            name="typeHebergement"
            value="Hôtel"
            checked={formData.typeHebergement === 'Hôtel'}
            onChange={handleChange}
            className="form-radio text-secondary-6 w-6 h-6"
          />
        </label>
        <label
          className={`flex justify-between items-center p-4 border rounded-lg bg-white cursor-pointer ${
            formData.typeHebergement === 'Appartement' ? 'border-2 border-secondary-6 text-secondary-6' : 'border-gray-300'
          } w-full md:w-[800px] md:h-auto`}
          style={{ height: '76px' }}
        >
          <h1 className="ml-2 w-[300px] font-bold sm:text-h4 font-plus-jakarta text-[28px]">
            Appartement 
          </h1>
          <input
            type="radio"
            name="typeHebergement"
            value="Appartement"
            checked={formData.typeHebergement === 'Appartement'}
            onChange={handleChange}
            className="form-radio text-secondary-6 w-6 h-6"
          />
        </label>
      </div>
    </div>
  );
};

export default Step3;