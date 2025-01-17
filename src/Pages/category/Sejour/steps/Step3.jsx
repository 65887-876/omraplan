import PropTypes from 'prop-types';
import MapSelector from '../MapSelector'
const Step3 = ({ formData, handleNestedChange, locationMedina, handleLocationChangeMedina, handleLocationInputChange, generateMapLink }) => {
  return (
    <div className="flex flex-col justify-center items-center px-4 sm:mt-4">
      <label className="sm:text-h3 text-h4 text-center w-[100%] font-medium text-neutral-13">Informations sur l’hôtel à Medina</label>
      <p className="text-center text-[18px] font-medium text-primary-6 mt-2 mb-8">Veuillez entrer les détails</p>
      <div className="flex flex-col gap-6 w-full md:w-[800px]">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-neutral-13">Nom de l’hôtel</label>
          <input
            type="text"
            name="nom"
            value={formData.hotelMedina.nom}
            onChange={(e) => handleNestedChange(e, 'hotelMedina')}
            className="block w-full p-2 border border-gray-300 rounded-md"
            style={{ height: '44px' }}
            placeholder="Entrez le nom de l’hôtel"
          />
        </div>
        <div className="flex flex-col gap-2 relative">
          <label className="text-sm font-bold text-neutral-13">Distance du Masjid Nabawi</label>
          <input
            type="text"
            name="distanceMasjidNabawi"
            value={formData.hotelMedina.distanceMasjidNabawi}
            onChange={(e) => handleNestedChange(e, 'hotelMedina')}
            className="block w-full p-2 border border-gray-300 rounded-md placeholder-transparent"
            style={{ height: '44px' }}
            placeholder="100"
          />
          <div className="absolute top-12 right-2 transform -translate-y-1/2 flex items-center text-gray-400 pointer-events-none">
            <span>Mètres</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-bold text-neutral-13">Emplacement de l’hôtel</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 4.418 6 10 6 10s6-5.582 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" clipRule="evenodd" />
              </svg>
            </span>
            <input
              type="text"
              name="emplacement"
              value={locationMedina ? generateMapLink(locationMedina) : formData.hotelMedina.emplacement}
              onChange={(e) => handleLocationInputChange(e, 'hotelMedina')}
              className="block w-full p-2 pl-10 border border-gray-300 rounded-md"
              style={{ height: '44px' }}
              placeholder="Entrez l’emplacement de l’hôtel"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full h-64 sm:h-[240px] md:h-[260px] bg-white border border-gray-300 rounded-md overflow-hidden">
            <MapSelector location={locationMedina} setLocation={handleLocationChangeMedina} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Prop type validation
Step3.propTypes = {
  formData: PropTypes.object.isRequired,
  handleNestedChange: PropTypes.func.isRequired,
  locationMedina: PropTypes.object,
  handleLocationChangeMedina: PropTypes.func.isRequired,
  handleLocationInputChange: PropTypes.func.isRequired,
  generateMapLink: PropTypes.func.isRequired,
};

export default Step3;