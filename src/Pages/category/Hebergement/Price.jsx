import { useEffect } from 'react';

const Price = ({ formData, handleInputChange, setFormData }) => {
  useEffect(() => {
    if (formData.prixReduit !== '' && formData.prixBase !== '') {
      const calculatedReduction = ((formData.prixBase - formData.prixReduit) / formData.prixBase) * 100;
      if (Math.round(calculatedReduction) !== formData.reduction) {
        setFormData((prevData) => ({
          ...prevData,
          reduction: Math.round(calculatedReduction),
        }));
      }
    }
  }, [formData.prixReduit]);

  useEffect(() => {
    if (formData.reduction !== '' && formData.prixBase !== '') {
      const calculatedPrixReduit = formData.prixBase - (formData.prixBase * (formData.reduction / 100));
      if (Math.round(calculatedPrixReduit) !== formData.prixReduit) {
        setFormData((prevData) => ({
          ...prevData,
          prixReduit: Math.round(calculatedPrixReduit),
        }));
      }
    }
  }, [formData.reduction]);

  return (
    <div className="flex flex-col justify-center sm:mt-10 p-2 sm:px-24">
        <div className="text-center py-6">
          <h1 className="sm:text-h2 text-h5 font-bold text-[#2D3C59] font-plus-jakarta">A présent, fixez votre prix </h1>
          <p className="py-4 font-plus-jakarta text-gray-600">
            Vous pourrez modifier ce prix à tout moment.
          </p>
        </div>
        <div className="mt-4 ml-32">
          <h4 className="font-plus-jakarta text-neutral-13 font-bold">Prix de base</h4>
          <div className="flex items-center">
            <input
              type="number"
              name="prixBase"
              value={formData.prixBase}
              onChange={handleInputChange}
              className="p-3 w-[396px] h-[44px] rounded-lg border border-gray-300"
            />
          </div>
        </div>

        <div className="flex items-center mt-2 ml-32">
          <div
            onClick={() => setFormData((prevData) => ({ ...prevData, promotion: !prevData.promotion }))}
            className={`relative inline-block w-12 h-6 cursor-pointer ${formData.promotion ? 'bg-[#987306]' : 'bg-gray-300'} rounded-full`}
          >
            <span
              className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.promotion ? 'transform translate-x-6' : ''}`}
            ></span>
          </div>
          <label className="ml-2 text-primary-6 font-plus-jakarta">En Promotion</label>
        </div>
        {formData.promotion && (
          <div>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mt-2">
              <div className="w-full sm:w-1/2">
                <h4 className="font-plus-jakarta text-neutral-13 font-bold">Réduction (%)</h4>
                <div className="flex items-center">
                  <input
                    type="number"
                    name="reduction"
                    value={formData.reduction}
                    onChange={handleInputChange}
                    className="w-full h-[44px] rounded-lg p-3 border border-gray-300 shadow-sm"
                  />
                </div>
              </div>
              <div className="w-full sm:w-1/2">
                <h4 className="font-plus-jakarta text-neutral-13 font-bold">
                  {formData.reduction >= 30 ? (
                    <>
                      Prix <span className="text-[#987306]">Flash</span>
                    </>
                  ) : (
                    'Prix réduit (Bon plan)'
                  )}
                </h4>
                <div className="flex items-center">
                  <input
                    type="number"
                    name="prixReduit"
                    value={formData.prixReduit}
                    onChange={handleInputChange}
                    className="w-full h-[44px] rounded-lg p-3 bg-white border border-gray-300 shadow-sm"
                  />
                </div>
              </div>
            </div>
            <div className="mt-3 font-plus-jakarta font-bold text-primary-6">
              Toutes les publications proposant une réduction d'au moins 30% et ayant une durée de mise en ligne inférieure à 10 jours seront affichées en "Vente Flash".
            </div>
        </div>
      )}
    </div>
  );
};

export default Price;