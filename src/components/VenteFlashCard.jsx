/* eslint-disable react/prop-types */
import { FaCalendarDay } from "react-icons/fa";

const VenteFlashCard = ({ item }) => {
  // Add a check to ensure item and item.title are defined
  const firstWord = item && item.type ? item.type.split(' ')[0].replace(':', '') : '';
  
  // Check if item.title is a valid string before accessing its length
  const title = item && item.title ? item.title : '';
  
  return (
<div className="flex flex-col items-start p-0 w-[305px] h-auto bg-white border border-[#EBEEF0] shadow-lg rounded-xl relative overflow-hidden">
  {/* Image Section */}
  <div
    className="w-full h-[171.56px] bg-cover bg-center rounded-t-xl"
    style={{ backgroundImage: `url(${item.photos ? item.photos[0] : "https://via.placeholder.com/150"})` }}
  />

  {/* Badge - Displaying the 'type' */}
  <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-md">
    <span className="font-plus-jakarta text-sm font-semibold text-[#0A2A3D]">{firstWord}</span>
  </div>

  {/* Card Content */}
  <div className="flex flex-col items-start p-4 gap-4 w-full">
    {/* Title */}
    <p className="font-plus-jakarta text-xl font-bold text-[#0A2A3D] truncate w-full">
      {title.length > 30 ? `${title.substring(0, 30)}...` : title}
    </p>
    <p className="text-[#5D7485] flex flex-row gap-1 items-center text-sm">
      <FaCalendarDay />
      {`Du: ${item.details?.dateDepart || "01-01-2025"} Au: ${item.details?.dateRetour || "15-01-2025"}`}
    </p>


    {/* Price Section */}
    <div className="flex justify-end items-baseline gap-2 w-full">
      <span className="font-plus-jakarta text-2xl font-extrabold text-[#0A2A3D]">{item.prixReduit}€</span>
      {item.reduction > 0 && (
        <span className="font-plus-jakarta text-lg font-extralight line-through text-[#DD1C29]">
          {item.prixBase}€
        </span>
      )}

      {/* Dummy price with a line inside */}
      <span className="relative text-lg font-semibold text-[#DD1C29]">
      </span>
    </div>

    {/* Publication Date */}
  </div>

</div>

  
  );
};

export default VenteFlashCard;