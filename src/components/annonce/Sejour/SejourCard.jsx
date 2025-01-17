import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarDay } from 'react-icons/fa';

const SejourCard = ({ sejour }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/sejour/${sejour._id}`);
  };

  // Determine the badge text based on the sejour type
  const getBadgeText = (type) => {
    switch (type) {
      case 'Confort':
        return 'Confort';
      case 'Reco':
        return 'Reco';
      case 'Essentiel':
        return 'Essentiel';
      case 'Eco':
        return 'Eco';
      default:
        return '';
    }
  };

  const badgeText = getBadgeText(sejour.type);

  // Determine the display name based on whether the user is professional
  const getDisplayName = () => {
    const { userId } = sejour;
    const isProfessional = userId.isProfessional;
    const companyName = userId.companyDetails?.companyName;
    const displayName = isProfessional && companyName ? companyName : `${userId.prenom} ${userId.kuniya}`;

    // Truncate if longer than 14 characters
    if (displayName.length > 14) {
      return `${displayName.substring(0, 14)}...`;
    }

    return displayName;
  };

  const displayName = getDisplayName();

  return (
    <div
      className="relative flex flex-col justify-center items-center w-[380px] sm:w-[305px] h-[311.56px] bg-white border border-[#EBEEF0] shadow-sm rounded-2xl cursor-pointer transition-transform transform hover:scale-105"
      onClick={handleDetailsClick}
    >
      {/* Badge Section */}
      {badgeText && (
        <div
          className="absolute top-2 left-2 flex justify-center items-center px-3 py-1 w-[78px] h-[32px] bg-white rounded-full"
        >
          <span className="w-[54px] h-[24px] text-center font-bold text-[14px] leading-[24px] text-[#0A2A3D]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            {badgeText}
          </span>
        </div>
      )}

      {/* Top section: Image */}
      <div
        className="flex-shrink-0 w-full h-[171px] bg-cover bg-center rounded-t-lg"
        style={{ backgroundImage: `url(${sejour.photos[0]})` }}
      ></div>

      {/* Bottom section: Content */}
      <div className="flex flex-col justify-between py-3 px-4 gap-2 h-1/2 w-full relative">
        <div>
          <div className="flex flex-col items-start gap-1 w-full">
            <h2 className="text-[30px] font-bold text-neutral-13" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              {displayName}
            </h2>
            <div className="flex items-center font-medium font-plus-jakarta text-primary-5 text-sm">
              <FaCalendarDay className="mr-1" />
              <p>
                Du {new Date(sejour.dateDepart).toLocaleDateString()} au {new Date(sejour.dateRetour).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-end gap-1">
          {sejour.venteFlash ? (
            <>
              <p className="text-[24px] font-plus-jakarta font-bold text-neutral-13">
                {sejour.prixReduit} €
              </p>
              <p className="text-[16px] font-plus-jakarta font-semibold pb-[2px] text-danger-6 line-through">
                {sejour.prixBase} €
              </p>
            </>
          ) : (
            <p className="text-[24px] font-plus-jakarta font-bold text-neutral-13">
              {sejour.prixBase} €
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SejourCard;