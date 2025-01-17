/* eslint-disable react/no-unescaped-entities */
import PropTypes from 'prop-types';

const Step6 = ({ formData, handleInputChange, handleToggleChange }) => {
  return (
    <div className="flex flex-col justify-center items-center md:px-0 px-4 sm:mt-4 ">
      <div className="text-center">
        <h1 className="text-h2 font-bold text-[#2D3C59] font-plus-jakarta">A présent, fixez votre prix </h1>
        <p className="py-4 font-plus-jakarta text-gray-600">
          Vous pourrez modifier ce prix à tout moment.
        </p>
      </div>
      <div className="flex flex-col gap-1 w-full md:w-[800px]">
        <h4 className="font-semibold text-gray-700">Prix de base</h4>
        <div className="flex items-center">
          <input
            type="number"
            name="prixBase"
            value={formData.prixBase}
            onChange={handleInputChange}
            className="w-[396px] rounded-lg p-3 border border-gray-300"
          />
        </div>
      </div>

      <div className="flex gap-2 py-6 items-center md:w-[800px]">
        <div
          onClick={handleToggleChange}
          className={`relative inline-block w-12 h-6 cursor-pointer ${formData.promotion ? 'bg-[#987306]' : 'bg-gray-300'} rounded-full`}
        >
          <span
            className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.promotion ? 'transform translate-x-6' : ''}`}
          ></span>
        </div>
        <label className=" text-gray-700">En Promotion</label>
      </div>
      {formData.promotion && (
        <div className="flex md:w-[800px] gap-4">
          <div className="w-1/2">
            <h4 className="font-semibold text-gray-700">Réduction</h4>
            <div className="flex items-center">
              <input
                type="number"
                name="reduction"
                value={formData.reduction}
                onChange={handleInputChange}
                className="w-full rounded-lg p-3 border border-gray-300"
              />
              <span className="ml-2">%</span>
            </div>
          </div>
          <div className="w-1/2">
            <h4 className="font-semibold text-gray-700">{formData.reduction >= 30 ? 'Prix réduit (Vente Flash)' : 'Prix réduit (Bon plan)'}</h4>
            <div className="flex items-center">
              <input
                type="number"
                name="prixReduit"
                value={formData.prixReduit}
                onChange={handleInputChange}
                className="w-full rounded-lg p-3 border bg-white border-gray-300"
                disabled
              />
              <span className="ml-2">€</span>
            </div>
          </div>
        </div>
      )}
      {formData.promotion && (
        <div className="flex font-plus-jakarta text-sm justify-center items-center py-4 text-primary-6">
          <p className='sm:mr-6 sm:w-[75%]'>Toutes les publications proposant une réduction d&apos;au moins 30% et ayant une durée de mise en ligne inférieure à 10 jours seront affichées en "Vente Flash".</p>
        </div>
      )}
    </div>
  );
};

// Prop type validation
Step6.propTypes = {
  formData: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleToggleChange: PropTypes.func.isRequired,
};

export default Step6;