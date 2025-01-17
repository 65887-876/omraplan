import React from "react";
import { FaTimes } from "react-icons/fa";
import plusIcon from '../../../assets/image-plus-outline.png';

const Step2 = ({ handlePhotoChange, photoFiles, handleRemovePhoto, isPhotoDeCouvertureUploaded, previewPhotos }) => {
  return (
    <div className="flex flex-col justify-center items-center p-0 px-2 gap-2 h-auto mt-4">
      <div className="flex flex-col items-center p-0 gap-2 w-full md:w-[800px]">
        <h2 className="font-plus-jakarta font-bold text-2xl md:text-4xl leading-tight text-center text-[#2D3C59]">
          Ajouter une photo de couverture
        </h2>
        <p className="font-plus-jakarta my-2 font-medium text-lg md:text-xl leading-6 text-center text-[#667085]">
          Cette photo sera mise en avant sur votre annonce
        </p>
      </div>
      <div className="flex flex-col items-center p-0 gap-2 w-full md:w-[800px]">
        <div className="flex flex-col justify-center items-center p-0 gap-2 w-full md:w-[800px] h-[176px] bg-white border border-dashed border-[#AAB6BF] rounded-md relative hover:bg-gray-50 transition-all duration-200">
          {!isPhotoDeCouvertureUploaded && (
            <>
              <input
                type="file"
                name="photos"
                onChange={handlePhotoChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                multiple
                required
              />
              <div className="flex flex-col justify-center items-center pointer-events-none w-full h-full">
                <img src={plusIcon} alt="Add" className="h-10 w-10" />
                <span className="font-plus-jakarta font-medium text-sm text-gray-500 mt-2">
                  Importer une photo de couverture
                </span>
              </div>
            </>
          )}
          {isPhotoDeCouvertureUploaded && previewPhotos[0] && (
            <div className="w-full h-full overflow-hidden">
              <img
                src={previewPhotos[0]}
                alt="Photo de couverture"
                className="w-full h-full object-cover"
              />
              <button
                className="absolute top-2 right-2 bg-white text-black rounded-full p-1"
                onClick={(event) => {
                  event.stopPropagation();
                  handleRemovePhoto(0);
                }}
              >
                <FaTimes className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
      {isPhotoDeCouvertureUploaded && (
        <div className="flex flex-row gap-2 justify-center w-full md:w-[800px] mt-2">
          {[1, 2].map((index) => (
            <div key={index} className="relative w-1/2 h-40 overflow-hidden rounded-md border border-dashed border-[#AAB6BF] bg-white">
              {!previewPhotos[index] && (
                <>
                  <input
                    type="file"
                    name="photos"
                    onChange={handlePhotoChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    multiple
                  />
                  <div className="flex flex-col justify-center items-center pointer-events-none w-full h-full">
                    <img src={plusIcon} alt="Add" className="h-10 w-10" />
                    <span className="font-plus-jakarta font-medium text-sm text-gray-500 mt-2">
                      Ajouter des photos
                    </span>
                  </div>
                </>
              )}
              {previewPhotos[index] && (
                <>
                  <img
                    src={previewPhotos[index]}
                    alt={`Photo ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    className="absolute top-2 right-2 bg-white text-black rounded-full p-1"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleRemovePhoto(index);
                    }}
                  >
                    <FaTimes className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Step2;