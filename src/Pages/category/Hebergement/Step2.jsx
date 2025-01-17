import React from 'react';

const Step2 = ({ formData, handleChange }) => {
  return (
    <div className="flex flex-col justify-center items-center sm:mt-10">
      <label className="sm:text-h3 text-h4 text-center font-medium text-neutral-13">
        Dans qu’elle ville l’hébergement est-il ?
      </label>
      <p className='text-center text-[18px] font-medium text-primary-6 mt-2 mb-8'>Choisissez une ville</p>
      <div className="flex flex-col gap-6">
        <label
          className={`flex justify-between items-center p-4 border rounded-lg bg-white cursor-pointer ${
            formData.ville === 'Mekkah' ? 'border-2 border-secondary-6 text-secondary-6' : 'border-gray-300'
          } w-full md:w-[800px] md:h-auto`}
          style={{ height: '76px' }}
        >
          <h1 className="ml-2 w-[300px] font-bold sm:text-h4 font-plus-jakarta text-[28px]">
            Mekkah 
          </h1>
          <input
            type="radio"
            name="ville"
            value="Mekkah"
            checked={formData.ville === 'Mekkah'}
            onChange={handleChange}
            className="form-radio text-secondary-6 w-6 h-6"
          />
        </label>
        <label
          className={`flex justify-between items-center p-4 border rounded-lg bg-white cursor-pointer ${
            formData.ville === 'Medina' ? 'border-2 border-secondary-6 text-secondary-6' : 'border-gray-300'
          } w-full md:w-[800px] md:h-auto`}
          style={{ height: '76px' }}
        >
          <h1 className="ml-2 w-[300px] font-bold sm:text-h4 font-plus-jakarta text-[28px]">
            Medina 
          </h1>
          <input
            type="radio"
            name="ville"
            value="Medina"
            checked={formData.ville === 'Medina'}
            onChange={handleChange}
            className="form-radio text-secondary-6 w-6 h-6"
          />
        </label>
      </div>
    </div>
  );
};

export default Step2;