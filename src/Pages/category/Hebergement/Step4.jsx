import React from 'react';
import { FaUser, FaDoorOpen, FaBed, FaMinus, FaPlus, FaCouch } from 'react-icons/fa';

const Step4 = ({ formData, handleIncrementDecrement }) => {
  const getHeadingText = () => {
    if (formData.typeHebergement === 'Appartement') {
      return "Donnez des informations concernant l’appartement";
    } else {
      return "Donnez des informations concernant votre hébergement";
    }
  };

  return (
    <div className="flex flex-col justify-center items-center sm:mt-10">
      <h1 className="text-left sm:text-h3 ml-6 text-h4 sm:text-center font-medium text-primary-6 sm:mb-8">
        {getHeadingText()}
      </h1>
      <div className="flex flex-col gap-4 mt-4 w-full md:w-[40%] sm:px-0 px-6">
        <div className="flex justify-between items-center border-b border-gray-300 py-2">
          <div className="flex items-center gap-2">
            <FaUser className="text-3xl text-gray-700" />
            <span className="font-bold font-plus-jakarta text-neutral-13 text-body-large">Voyageurs</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 bg-gray-200 rounded-lg hover:bg-secondary-4"
              onClick={() => handleIncrementDecrement('voyageurs', -1)}
            >
              <FaMinus className="text-secondary-6" />
            </button>
            <span className="font-bold text-lg">{formData.details.voyageurs}</span>
            <button
              type="button"
              className="p-2 bg-secondary-6 rounded-lg hover:bg-secondary-4"
              onClick={() => handleIncrementDecrement('voyageurs', 1)}
            >
              <FaPlus className="text-white" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center border-b border-gray-300 py-2">
          <div className="flex items-center gap-2">
            <FaDoorOpen className="text-3xl text-gray-700" />
            <span className="font-bold font-plus-jakarta text-neutral-13 text-body-large">Chambres</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 bg-gray-200 rounded-lg hover:bg-secondary-4"
              onClick={() => handleIncrementDecrement('chambres', -1)}
            >
              <FaMinus className="text-secondary-6" />
            </button>
            <span className="font-bold text-lg">{formData.details.chambres}</span>
            <button
              type="button"
              className="p-2 bg-secondary-6 rounded-lg hover:bg-secondary-4"
              onClick={() => handleIncrementDecrement('chambres', 1)}
            >
              <FaPlus className="text-white" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center border-b border-gray-300 py-2">
          <div className="flex items-center gap-2">
            <FaBed className="text-3xl text-gray-700" />
            <span className="font-bold font-plus-jakarta text-neutral-13 text-body-large">Lits simples</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 bg-gray-200 rounded-lg hover:bg-secondary-4"
              onClick={() => handleIncrementDecrement('litsSimples', -1)}
            >
              <FaMinus className="text-secondary-6" />
            </button>
            <span className="font-bold text-lg">{formData.details.litsSimples}</span>
            <button
              type="button"
              className="p-2 bg-secondary-6 rounded-lg hover:bg-secondary-4"
              onClick={() => handleIncrementDecrement('litsSimples', 1)}
            >
              <FaPlus className="text-white" />
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center py-2">
          <div className="flex items-center gap-2">
            <FaBed className="text-3xl text-gray-700" />
            <span className="font-bold font-plus-jakarta text-neutral-13 text-body-large">Lits doubles</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 bg-gray-200 rounded-lg hover:bg-secondary-4"
              onClick={() => handleIncrementDecrement('litsDoubles', -1)}
            >
              <FaMinus className="text-secondary-6" />
            </button>
            <span className="font-bold text-lg">{formData.details.litsDoubles}</span>
            <button
              type="button"
              className="p-2 bg-secondary-6 rounded-lg hover:bg-secondary-4"
              onClick={() => handleIncrementDecrement('litsDoubles', 1)}
            >
              <FaPlus className="text-white" />
            </button>
          </div>
        </div>

        {formData.typeHebergement === 'Appartement' && (
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-2">
              <FaCouch className="text-3xl text-gray-700" />
              <span className="font-bold font-plus-jakarta text-neutral-13 text-body-large">Salon</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="p-2 bg-gray-200 rounded-lg hover:bg-secondary-4"
                onClick={() => handleIncrementDecrement('salon', -1)}
              >
                <FaMinus className="text-secondary-6" />
              </button>
              <span className="font-bold text-lg">{formData.details.salon}</span>
              <button
                type="button"
                className="p-2 bg-secondary-6 rounded-lg hover:bg-secondary-4"
                onClick={() => handleIncrementDecrement('salon', 1)}
              >
                <FaPlus className="text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step4;