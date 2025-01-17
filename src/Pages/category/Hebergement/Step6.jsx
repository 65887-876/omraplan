import React from 'react';

const Step6 = ({ formData, handleChange }) => {
  return (
    <div className="sm:mb-4 flex flex-col justify-normal items-center">
      <label className="flex font-plus-jakarta font-bold justify-center my-2 sm:mt-14 sm:text-h2 text-[28px] text-gray-700">
        <p className="flex text-center sm:w-[80%]">Décrivez le type d’hebergement que vous recherchez</p>
      </label>
      <p className="text-primary-6 sm:mt-4 font-plus-jakarta text-center sm:text-left">Les descriptions courtes sont généralement les plus efficaces</p>
      <div className="flex flex-col w-full items-center mt-4 sm:mt-10">
        <p className="flex justify-start font-plus-jakarta font-bold text-neutral-13 my-1 items-start w-full sm:w-[800px]">Description</p>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          placeholder='Enter une description...'
          className="w-full sm:w-[800px] h-[184px] p-4 border border-gray-300 rounded-lg bg-white hover:border-secondary-6"
          maxLength="400"
          required
        />
        <div className="text-right text-gray-500 w-full sm:w-[800px]">
          {formData.description.length}/400
        </div>
      </div>
    </div>
  );
};

export default Step6;