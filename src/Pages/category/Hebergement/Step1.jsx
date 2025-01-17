import React from 'react';

const Step1 = ({ formData, handleChange }) => {
  return (
    <div className="flex flex-col justify-center items-center sm:mt-10">
      <label className="sm:text-h3 text-h4 text-center w-[100%] font-medium text-neutral-13">
        Quel type d’annonce souhaitez-vous publier ?
      </label>
      <p className="text-center text-[18px] font-medium text-primary-6 mt-2 mb-8">Choisissez un type</p>
      <div className="flex flex-col gap-6">
        <label
          className={`flex justify-between items-center p-4 border rounded-lg bg-white cursor-pointer ${
            formData.typeAnnonce === 'Offre' ? 'border-2 border-secondary-6 text-secondary-6' : 'border-gray-300 text-neutral-13'
          } w-full md:w-[800px] md:h-auto`}
          style={{ height: '76px' }}
        >
          <h1 className="ml-2 w-[300px] font-bold sm:text-h4 font-plus-jakarta text-[28px]">
            Offre 
          </h1>
          <input
            type="radio"
            name="typeAnnonce"
            value="Offre"
            checked={formData.typeAnnonce === 'Offre'}
            onChange={handleChange}
            className="form-radio text-secondary-6 w-6 h-6"
          />
        </label>
        <label
          className={`flex justify-between items-center p-4 border rounded-lg bg-white cursor-pointer ${
            formData.typeAnnonce === 'Demande' ? 'border-2 border-secondary-6 text-secondary-6' : 'border-gray-300 text-neutral-13'
          } w-full md:w-[800px] md:h-auto`}
          style={{ height: '76px' }}
        >
          <h1 className="ml-2 w-[300px] flex font-bold sm:text-h4 font-plus-jakarta text-[28px]">
            Demande 
          </h1>
          <input
            type="radio"
            name="typeAnnonce"
            value="Demande"
            checked={formData.typeAnnonce === 'Demande'}
            onChange={handleChange}
            className="form-radio text-secondary-6 w-6 h-6"
          />
        </label>
      </div>
    </div>
  );
};

export default Step1;