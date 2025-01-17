import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

// Import the video icon image
import videoIcon from './video.png';

const Step7 = ({ formData, handleChange, setVideoUrlValid }) => {
  const [videoUrl, setVideoUrl] = useState(formData.videoUrl || '');
  const [isValidUrl, setIsValidUrl] = useState(false);

  useEffect(() => {
    // Validate YouTube or Vimeo URL
    const youtubeRegex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    const vimeoRegex = /^(https?:\/\/)?(www\.vimeo\.com)\/.+$/;
    const isValid = youtubeRegex.test(videoUrl) || vimeoRegex.test(videoUrl);
    setIsValidUrl(isValid);
    setVideoUrlValid(isValid);
  }, [videoUrl, setVideoUrlValid]);

  const handleVideoUrlChange = (e) => {
    const { value } = e.target;
    setVideoUrl(value);
    handleChange({ target: { name: 'videoUrl', value } });
  };

  return (
    <div className="flex flex-col justify-center pt-16 items-center p-4 gap-4 w-full">
      <div className="flex flex-col items-center gap-4 w-full md:w-[800px]">
        <h2 className="font-plus-jakarta font-bold text-2xl md:text-4xl leading-tight text-center text-[#2D3C59]">
          Vidéo
        </h2>
        <p className='text-primary-4 font-plus-jakarta'>
          Veuillez  remplir les informations en dessous
        </p>
        <input
          type="text"
          name="videoUrl"
          value={videoUrl}
          onChange={handleVideoUrlChange}
          className="w-full p-2 border h-[45px] border-gray-300 rounded-md"
          placeholder="Entrez ici le lien youtube ou vimeo de votre vidéo"
        />
      </div>
      <div className="flex flex-col items-center p-4 gap-4 w-full md:w-[800px] bg-white rounded-md">
        {videoUrl && isValidUrl ? (
          <>
            <h3 className="font-plus-jakarta font-bold text-xl md:text-2xl leading-tight text-center text-[#2D3C59]">
              Voici un aperçu de votre vidéo
            </h3>
            <ReactPlayer url={videoUrl} controls width="100%" />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-4 gap-4 w-full h-[200px]">
            <img src={videoIcon} alt="Video Icon" className="text-gray-400 text-6xl" />
            <p className="font-plus-jakarta font-bold text-xl md:text-2xl leading-tight text-center text-gray-400">
              Voici un aperçu de votre vidéo
            </p>
          </div>
        )}
        {videoUrl && !isValidUrl && (
          <p className="text-red-500">URL non valide. Veuillez entrer une URL YouTube ou Vimeo valide.</p>
        )}
      </div>
    </div>
  );
};

export default Step7;