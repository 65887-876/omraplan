import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Step2 = ({ formData, handleChange }) => {
  const [minDateDepart, setMinDateDepart] = useState('');
  const [minDateRetour, setMinDateRetour] = useState('');

  useEffect(() => {
    // Set the minimum date for dateDepart to today's date
    const today = new Date().toISOString().split('T')[0];
    setMinDateDepart(today);

    // Set the minimum date for dateRetour based on dateDepart
    if (formData.dateDepart) {
      setMinDateRetour(formData.dateDepart);
    } else {
      setMinDateRetour(today);
    }
  }, [formData.dateDepart]);

  return (
    <div className="flex flex-col justify-center items-center sm:mt-10 md:px-0 px-4">
      <label className="sm:text-h3 text-h4 text-center w-[100%] font-medium text-neutral-13">Informations sur le vol</label>
      <p className="text-center text-[18px] font-medium text-primary-6 mt-2 mb-8">Veuillez entrer les détails</p>
      <div className="flex flex-col gap-6 w-full md:w-[800px]">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Compagnie aérienne</label>
          <select
            name="compagnieAerienne"
            value={formData.compagnieAerienne}
            onChange={handleChange}
            className="block w-full p-2 h-[44px] border border-gray-300 rounded-md"
          >
            <option value="">Sélectionner</option>
            <option value="Ajet">Ajet</option>
            <option value="Égypte Air">Égypte Air</option>
            <option value="Jordania Airlines">Jordania Airlines</option>
            <option value="Saudi Airlines">Saudi Airlines</option>
            <option value="Transavia">Transavia</option>
            <option value="Turkish Airlines">Turkish Airlines</option>
            <option value="Wizz Air">Wizz Air</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <h1 className="text-lg font-bold text-gray-700">Date de départ et retour</h1>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col gap-2 w-full sm:w-1/2">
            <label className="text-sm font-medium text-gray-700">Départ</label>
            <input
              type="date"
              name="dateDepart"
              value={formData.dateDepart}
              onChange={handleChange}
              min={minDateDepart} // Set minimum date for departure
              className="block w-full h-[44px] p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col gap-2 w-full sm:w-1/2">
            <label className="text-sm font-medium text-gray-700">Retour</label>
            <input
              type="date"
              name="dateRetour"
              value={formData.dateRetour}
              onChange={handleChange}
              min={minDateRetour} // Set minimum date for return
              className="block w-full p-2 h-[44px] border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <h1 className="text-lg font-bold text-gray-700">Nombre de nuitées</h1>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col gap-2 w-full sm:w-1/2 relative">
            <label className="text-sm font-medium text-gray-700">Medina</label>
            <input
              type="text"
              name="madinahNuits"
              value={formData.madinahNuits}
              onChange={handleChange}
              className="block w-full p-2 h-[44px] border border-gray-300 rounded-md placeholder-transparent"
              placeholder="1"
            />
            <div className="absolute top-6 bottom-0 right-2 flex items-center text-gray-400 pointer-events-none">
              <span>Nuit</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full sm:w-1/2 relative">
            <label className="text-sm font-medium text-gray-700">Mekkah</label>
            <input
              type="text"
              name="makkahNuits"
              value={formData.makkahNuits}
              onChange={handleChange}
              className="block w-full p-2 h-[44px] border border-gray-300 rounded-md placeholder-transparent"
              placeholder="1"
            />
            <div className="absolute top-6 bottom-0 right-2 flex items-center text-gray-400 pointer-events-none">
              <span>Nuit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Prop type validation
Step2.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Step2;