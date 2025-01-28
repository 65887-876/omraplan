import { useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';
import plusIcon from '../../../assets/image-plus-outline.png'; // Ensure this is the correct path

const Blog = () => {
  const [formData, setFormData] = useState({
    photos: [],
    videoUrl: '',
    titre: '',
    textDeCarte: '',
    description: '',
  });
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [isPhotoDeCouvertureUploaded, setIsPhotoDeCouvertureUploaded] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);
    try {
      const uploadData = new FormData();
      files.forEach(file => {
        uploadData.append('photos', file);
      });

      const response = await axios.post('http://localhost:5000/api/auth/uploadblog', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newPhotos = response.data.urls;
      setFormData((prevData) => ({
        ...prevData,
        photos: prevData.photos.concat(newPhotos),
      }));
      setPreviewPhotos((prevData) => prevData.concat(newPhotos));
      setIsPhotoDeCouvertureUploaded(true);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePhoto = (index) => {
    setPreviewPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    setFormData((prevData) => ({
      ...prevData,
      photos: prevData.photos.filter((_, i) => i !== index),
    }));
    if (index === 0) {
      setIsPhotoDeCouvertureUploaded(false);
    }
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const validateFields = () => {
    const requiredFields = [
      'photos', 'videoUrl', 'titre', 'textDeCarte', 'description'
    ];

    for (let field of requiredFields) {
      if (!formData[field] || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        alert(`Field ${field} is missing or empty`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      console.log('Form submission failed');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/blogs', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Blog created successfully:', response.data);
      alert('Blog créé avec succès!');
    } catch (error) {
      console.error('Error creating blog:', error.response);
      alert('Échec de la création du blog. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const bottomBarHeight = 96;
  const headerHeight = 72;

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full bg-[#FAF8ED]">
        <form onSubmit={handleSubmit} className="w-full max-w-full" style={{ minHeight: `calc(100vh - ${headerHeight + bottomBarHeight}px)` }}>
          
          {step === 1 && (
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
                        onClick={() => handleRemovePhoto(0)}
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
                            onClick={() => handleRemovePhoto(index)}
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
          )}

          {step === 2 && (
            <div>
              <h2 className="font-plus-jakarta font-bold text-2xl md:text-4xl leading-tight text-center text-[#2D3C59]">
                Video URL
              </h2>
              <input
                type="text"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleInputChange}
                placeholder="Video URL"
                className="w-full md:w-[800px] p-2 border border-gray-300 rounded-md"
              />
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-plus-jakarta font-bold text-2xl md:text-4xl leading-tight text-center text-[#2D3C59]">
                Blog Details
              </h2>
              <input
                type="text"
                name="titre"
                value={formData.titre}
                onChange={handleInputChange}
                placeholder="Titre"
                className="w-full md:w-[800px] p-2 border border-gray-300 rounded-md mb-4"
                required
              />
              <input
                type="text"
                name="textDeCarte"
                value={formData.textDeCarte}
                onChange={handleInputChange}
                placeholder="Text de Carte"
                className="w-full md:w-[800px] p-2 border border-gray-300 rounded-md mb-4"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Texte de la Page Blog"
                className="w-full md:w-[800px] p-2 border border-gray-300 rounded-md mb-4"
                rows="4"
                required
              />
            </div>
          )}

          <div className="fixed bottom-0 left-0 right-0 bg-inherit" style={{ height: `${bottomBarHeight}px` }}>
            <div className="w-full bg-white">
              <div className="bg-primary-6 h-2" style={{ width: `${(step / 3) * 100}%` }}></div>
            </div>
            <div className="flex justify-between items-center px-4 sm:px-8 md:px-16 pb-4 sm:pb-6 pt-7">
              <button
                type="button"
                onClick={prevStep}
                className={`py-2 px-6 rounded-lg font-bold font-plus-jakarta ${step === 1 ? 'bg-transparent text-neutral-13' : 'bg-primary-6 text-white'}`}
                disabled={step === 1}
              >
                Retour
              </button>
              {step < 3 && (
                <button
                  type="button"
                  onClick={nextStep}
                  className="py-2 px-6 bg-primary-6 text-white rounded-lg"
                >
                  Continuer
                </button>
              )}
              {step === 3 && (
                <button
                  type="submit"
                  className="py-2 px-6 bg-primary-6 text-white rounded-lg"
                  disabled={loading}
                >
                  {loading ? 'Soumission...' : 'Créer Blog'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Blog;