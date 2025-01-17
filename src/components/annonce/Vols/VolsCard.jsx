import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarDay } from 'react-icons/fa';

const VolsCard = ({ vol }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/vols/${vol._id}`);
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-[350px] sm:w-[305px] h-[311.56px] bg-white border border-[#EBEEF0] shadow-sm rounded-lg cursor-pointer transition-transform transform hover:scale-105"
      onClick={handleDetailsClick}
    >
      {/* Top section: Image */}
      <div
        className="flex-shrink-0 w-full h-[171px] bg-cover bg-center rounded-t-lg"
        style={{ backgroundImage: `url(${vol.photos[0]})` }}
      ></div>

      {/* Bottom section: Content */}
      <div className="flex flex-col justify-between py-3 px-4 gap-2 h-1/2 w-full relative">
        <div>
          <div className="flex flex-col items-start gap-1 w-full">
            {vol.itineraire && vol.itineraire.aller && vol.itineraire.retour ? (
              <>
                <h4 className="text-[24px] font-bold text-neutral-13" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                  {vol.itineraire.aller.Aller} - {vol.itineraire.retour.Aller}
                </h4>
                <div className="flex items-center font-medium font-plus-jakarta text-primary-5 text-sm">
                  <FaCalendarDay className="mr-1" />
                  <p>
                    Du {new Date(vol.itineraire.aller.Date).toLocaleDateString()} au {new Date(vol.itineraire.retour.Date).toLocaleDateString()}
                  </p>
                </div>
              </>
            ) : (
              <h4 className="text-[24px] pb-1 font-semibold text-neutral-13" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                Itinerary not available
              </h4>
            )}
          </div>
        </div>
        <div className="flex justify-end items-end gap-1">
          {vol.venteFlash ? (
            <>
              <p className="text-[24px] font-plus-jakarta font-bold text-neutral-13">
                {vol.prixReduit} €
              </p>
              <p className="text-[16px] font-plus-jakarta font-semibold pb-[2px] text-danger-6 line-through">
                {vol.prixBase} €
              </p>
            </>
          ) : (
            <p className="text-[24px] font-plus-jakarta font-bold text-neutral-13">
              {vol.prixReduit} €
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolsCard;