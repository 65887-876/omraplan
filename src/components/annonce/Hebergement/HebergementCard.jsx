import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarDay } from 'react-icons/fa';

const HebergementCard = ({ hebergement }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/hebergement/${hebergement._id}`);
  };

  // Determine the badge text, background color, and width based on the hebergement type
  const getBadgeProps = (typeAnnonce, type) => {
    if (typeAnnonce === 'Demande') {
      return { text: 'Recherche', bgColor: 'bg-primary-6', width: 'w-[98px]' };
    }

    switch (type) {
      case 'Hôtel':
        return { text: 'Hôtel', bgColor: 'bg-[#138936]', width: 'w-[62px]' };
      case 'Appartement':
        return { text: 'Appartement', bgColor: 'bg-[#138936]', width: 'w-[117px]' };
      default:
        return { text: '', bgColor: '', width: '' };
    }
  };

  const { text: badgeText, bgColor: badgeBgColor, width: badgeWidth } = getBadgeProps(hebergement.typeAnnonce, hebergement.type);

  // Determine the display photo based on the typeAnnonce
  const getDisplayPhoto = () => {
    if (hebergement.typeAnnonce === 'Demande') {
      return 'https://res.cloudinary.com/dyikqziqi/image/upload/v1736835184/Hebergement/ymzyasvos4qdu4wavj5l.png';
    }
    return hebergement.photos.length > 0 ? hebergement.photos[0] : 'default.png';
  };

  const displayPhoto = getDisplayPhoto();

  // Determine the display name
  const getDisplayName = () => {
    if (hebergement.typeAnnonce === 'Demande') {
      return hebergement.ville;
    }
    return hebergement.hotelName ? hebergement.hotelName : hebergement.ville;
  };

  const displayName = getDisplayName();

  // Ensure disponibilites and its properties exist before accessing them
  const startDate = hebergement.disponibilites?.startDate ? new Date(hebergement.disponibilites.startDate).toLocaleDateString() : 'N/A';
  const endDate = hebergement.disponibilites?.endDate ? new Date(hebergement.disponibilites.endDate).toLocaleDateString() : 'N/A';

  return (
    <div
      className="relative flex flex-col justify-center items-center w-[380px] sm:w-[305px] h-[350px] bg-white border border-[#EBEEF0] shadow-sm rounded-2xl cursor-pointer transition-transform transform hover:scale-105"
      onClick={handleDetailsClick}
    >
      {/* Top section: Image */}
      <div
        className="flex-shrink-0 w-full h-[171px] bg-cover bg-center rounded-t-lg"
        style={{ backgroundImage: `url(${displayPhoto})` }}
      ></div>

      {/* Bottom section: Content */}
      <div className="flex flex-col justify-between py-3 px-4 gap-2 h-1/2 w-full relative">
        {/* Badge above the title */}
        {badgeText && (
          <div className={`flex justify-center items-center px-3 py-0.5 ${badgeWidth} h-[32px] ${badgeBgColor} rounded-full`}>
            <span className="text-center font-bold text-white text-[14px] leading-[24px]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              {badgeText}
            </span>
          </div>
        )}

        <div className="flex flex-col items-start gap-1 w-full">
          <h2 className="text-[24px] font-bold text-neutral-13" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            {displayName}
          </h2>
          <div className="flex items-center font-medium font-plus-jakarta text-primary-5 text-sm">
            <FaCalendarDay className="mr-1" />
            <p>
              Du {startDate} au {endDate}
            </p>
          </div>
        </div>
        <div className="flex justify-end items-end gap-1">
          {hebergement.venteFlash ? (
            <>
              <p className="text-[24px] font-plus-jakarta font-bold text-neutral-13">
                {hebergement.prixReduit} €
              </p>
              <p className="text-[16px] font-plus-jakarta font-semibold pb-[2px] text-danger-6 line-through">
                {hebergement.prixBase} €
              </p>
            </>
          ) : (
            <p className="text-[24px] font-plus-jakarta font-bold text-neutral-13">
              {hebergement.prixBase} €
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HebergementCard;