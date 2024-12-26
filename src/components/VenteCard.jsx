/* eslint-disable react/prop-types */
const VenteCard = ({ item, category }) => {
    const firstWord = category?.charAt(0).toUpperCase() + category?.slice(1);
  
    return (
      <div className="flex flex-col items-start p-0 w-[305px] h-auto bg-white border border-[#EBEEF0] shadow-lg rounded-xl relative overflow-hidden">
        {/* Image Section */}
        <div
          className="w-full h-[171.56px] bg-cover bg-center rounded-t-xl"
          style={{ backgroundImage: `url(${item.photos ? item.photos[0] : "https://via.placeholder.com/150"})` }}
        />
  
        {/* Badge - Displaying the 'category' */}
        {firstWord && (
          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-md">
            <span className="font-plus-jakarta text-sm font-semibold text-[#0A2A3D]">{firstWord}</span>
          </div>
          
        )}
  
        {/* Card Content */}
        <div className="flex flex-col items-end p-4 gap-4 w-full">
          {/* Title */}
          <div className="w-full">
            <p className="font-plus-jakarta text-xl font-bold text-[#0A2A3D]">
              {item.title.length > 30 ? `${item.title.substring(0, 30)}...` : item.title}
            </p>
          </div>
  
          {/* Description */}
          <div className="flex flex-col gap-2 w-full overflow-hidden">
            {/* Price */}
            {item.prixReduit && (
              <div className="flex items-baseline gap-2">
                <span className="font-plus-jakarta text-2xl font-bold text-[#0A2A3D]">{item.prixReduit}€</span>
                {item.prixOriginal && (
                  <span className="font-plus-jakarta text-lg font-semibold line-through text-[#DD1C29]">
                    {item.prixOriginal}€
                  </span>
                )}
              </div>
            )}
  
            {/* Publication Date */}
            {item.dateFinPublication && (
              <p className="text-[#5D7485] text-sm">{`Fin de publication: ${item.dateFinPublication}`}</p>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default VenteCard;
  