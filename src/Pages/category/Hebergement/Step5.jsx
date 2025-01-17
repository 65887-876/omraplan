import React from 'react';

const Step5 = ({ formData, handleChange, handleToggleChange }) => {
  return (
    <div className="space-y-6">
      <div className="text-center py-6">
        <h1 className="text-h2 font-plus-jakarta font-bold text-[#2D3C59]">A présent, fixez votre prix </h1>
        <p className="py-4 text-primary-6 font-plus-jakarta">Vous pourrez modifier ce prix à tout moment.</p>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-start">
          <h4 className="font-semibold text-gray-700">Prix max (pour une nuit)</h4>
          <input
            type="number"
            name="prixBase"
            value={formData.prixBase}
            onChange={handleChange}
            placeholder="0"
            className="w-[396px] h-[44px] shadow-sm rounded-lg border border-primary-3 p-2"
          />
          
          <div className="flex items-center mt-4">
            <label className="mr-4 text-gray-700">Négociable</label>
            <div
              onClick={handleToggleChange} // Correctly call the handleToggleChange function
              className={`relative inline-block w-12 h-6 cursor-pointer ${formData.negociable ? 'bg-[#987306]' : 'bg-gray-300'} rounded-full`}
            >
              <span
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.negociable ? 'transform translate-x-6' : ''}`}
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5;