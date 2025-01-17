import { useState } from 'react';
import axios from 'axios';
import Step6 from './Step6';
import Step7 from './Step7';

const ChauffeurForm = () => {
  const [formData, setFormData] = useState({
    sex: '',
    city: '',
    vehicule: { seats: '1' },
    languages: [],
    otherLanguages: '',
    photos: [],
    description: '',
    showNumber: false,

  });
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showOtherLanguagesDropdown, setShowOtherLanguagesDropdown] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (checked) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: [...prevData[name], value],
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: prevData[name].filter((item) => item !== value),
        }));
      }
    } else if (name === 'seats') {
      setFormData((prevData) => ({
        ...prevData,
        vehicule: { seats: value },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);
    try {
      const uploadData = new FormData();
      files.forEach(file => {
        uploadData.append('photos', file);
      });

      const response = await axios.post('http://localhost:5000/api/auth/uploadchauffeur', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFormData((prevData) => ({
        ...prevData,
        photos: prevData.photos.concat(response.data.urls),
      }));
      setPreviewPhotos(prevData => prevData.concat(response.data.urls));
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemovePhoto = (index, event) => {
    event.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      photos: prevData.photos.filter((_, i) => i !== index),
    }));
    setPreviewPhotos((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.photos.length === 0) {
      alert('Please upload at least one photo.');
      return;
    }

    console.log('Submitting form with data:', formData);

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/chauffeurs', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });
      console.log('Chauffeur created successfully:', response.data);
      alert('Chauffeur créé avec succès!');
      window.location.reload(); 
    } catch (error) {
      console.error('Error creating chauffeur:', error);
      alert('Échec de la création du chauffeur. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 7) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleLanguageSelect = (language, event) => {
    event.preventDefault();

    if (language === 'Autres') {
      setShowOtherLanguagesDropdown(!showOtherLanguagesDropdown);
    } else {
      setShowOtherLanguagesDropdown(false);
    }

    if (formData.languages.includes(language)) {
      setFormData({
        ...formData,
        languages: formData.languages.filter((lang) => lang !== language),
      });
    } else {
      setFormData({
        ...formData,
        languages: [...formData.languages, language],
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full bg-[#FAF8ED]">
      <form onSubmit={handleSubmit} className="w-full max-w-full" style={{ minHeight: `calc(100vh - 168px)` }}>
        {step === 1 && (
          <div className="flex flex-col justify-center items-center sm:mt-10">
            <label className="sm:text-h3 text-h4 text-center font-medium text-neutral-13">Sexe</label>
            <p className="text-center text-[18px] font-medium text-primary-6 mt-2 mb-8">Choisissez votre sexe</p>
            <div className="flex flex-col gap-6">
              <label
                className={`flex justify-between items-center p-4 border rounded-lg bg-white cursor-pointer ${formData.sex === 'Homme' ? 'border-2 border-secondary-6 text-secondary-6' : 'border-gray-300'} w-full md:w-[800px] md:h-auto`}
                style={{ height: '76px' }}
              >
                <h1 className="ml-2 w-[300px] font-bold sm:text-h4 font-plus-jakarta text-[28px]">Homme</h1>
                <input
                  type="radio"
                  name="sex"
                  value="Homme"
                  checked={formData.sex === 'Homme'}
                  onChange={handleChange}
                  className="form-radio text-secondary-6 w-6 h-6"
                />
              </label>
              <label
                className={`flex justify-between items-center p-4 border rounded-lg bg-white cursor-pointer ${formData.sex === 'Femme' ? 'border-2 border-secondary-6 text-secondary-6' : 'border-gray-300'} w-full md:w-[800px] md:h-auto`}
                style={{ height: '76px' }}
              >
                <h1 className="ml-2 w-[300px] font-bold sm:text-h4 font-plus-jakarta text-[28px]">Femme</h1>
                <input
                  type="radio"
                  name="sex"
                  value="Femme"
                  checked={formData.sex === 'Femme'}
                  onChange={handleChange}
                  className="form-radio text-secondary-6 w-6 h-6"
                />
              </label>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col justify-center items-center sm:mt-10">
            <label className="sm:text-h3 text-h4 text-center font-medium text-neutral-13">Dans quelle ville êtes-vous ?</label>
            <p className="text-center text-[18px] font-medium text-primary-6 mt-2 mb-8">Choisissez votre ville</p>
            <div className="flex flex-col gap-6">
              <label
                className={`flex justify-between items-center p-4 border rounded-lg bg-white cursor-pointer ${formData.city === 'Madina' ? 'border-2 border-secondary-6 text-secondary-6' : 'border-gray-300'} w-full md:w-[800px] md:h-auto`}
                style={{ height: '76px' }}
              >
                <h1 className="ml-2 w-[300px] font-bold sm:text-h4 font-plus-jakarta text-[28px]">Madina</h1>
                <input
                  type="radio"
                  name="city"
                  value="Madina"
                  checked={formData.city === 'Madina'}
                  onChange={handleChange}
                  className="form-radio text-secondary-6 w-6 h-6"
                />
              </label>
              <label
                className={`flex justify-between items-center p-4 border rounded-lg bg-white cursor-pointer ${formData.city === 'Mekkah' ? 'border-2 border-secondary-6 text-secondary-6' : 'border-gray-300'} w-full md:w-[800px] md:h-auto`}
                style={{ height: '76px' }}
              >
                <h1 className="ml-2 w-[300px] font-bold sm:text-h4 font-plus-jakarta text-[28px]">Mekkah</h1>
                <input
                  type="radio"
                  name="city"
                  value="Mekkah"
                  checked={formData.city === 'Mekkah'}
                  onChange={handleChange}
                  className="form-radio text-secondary-6 w-6 h-6"
                />
              </label>
              <label
                className={`flex justify-between items-center p-4 border rounded-lg bg-white cursor-pointer ${formData.city === 'Jeddah' ? 'border-2 border-secondary-6 text-secondary-6' : 'border-gray-300'} w-full md:w-[800px] md:h-auto`}
                style={{ height: '76px' }}
              >
                <h1 className="ml-2 w-[300px] font-bold sm:text-h4 font-plus-jakarta text-[28px]">Jeddah</h1>
                <input
                  type="radio"
                  name="city"
                  value="Jeddah"
                  checked={formData.city === 'Jeddah'}
                  onChange={handleChange}
                  className="form-radio text-secondary-6 w-6 h-6"
                />
              </label>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col justify-center items-center py-8  sm:py-16 gap-8">
            <div className="flex flex-col justify-center items-center px-2 sm:px-32 gap-8 w-full max-w-5xl">
              <div className="flex flex-col items-start gap-2 w-full">
                <div className="flex flex-col items-start gap-3 w-full">
                  <label className="font-plus-jakarta font-bold text-h4 leading-tight sm:ml-0 ml-2 sm:text-center text-neutral-13 w-full">
                    A propos de vehicule
                  </label>
                </div>
              </div>
              <div className="flex flex-col items-start w-full">
                <div className="flex flex-col items-start w-full">
                  <div className="flex flex-col w-full">
                    <div className="flex flex-col justify-center items-center gap-3 w-full">
                      <div className='flex flex-col gap-2 w-full'>
                        <label className="font-plus-jakarta text-left font-bold text-lg leading-tight text-neutral-13 w-full">
                          Nombre de place
                        </label>
                        <div className="relative w-full flex items-center justify-center ">
                          <input
                            type="number"
                            name="seats"
                            value={formData.vehicule.seats}
                            onChange={handleChange}
                            className="w-[800px] h-[44px] p-2 border border-gray-300 rounded-md box-border shadow-xs pr-12"
                            required
                          />
                          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                            Places
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col justify-center items-center px-2  sm:px-16 py-8 sm:py-16 gap-8">
            <div className="flex flex-col justify-center items-center  sm:px-8 gap-10 w-full max-w-5xl">
              <div className="flex flex-col my-4 items-center gap-7 w-full">
                <div className="flex flex-col items-center gap-3 w-full">
                  <label className="font-plus-jakarta font-bold text-h3 sm:text-h4 leading-tight text-center text-neutral-13 w-full">
                    A propos de vous
                  </label>
                </div>
              </div>
              <div className="flex flex-col items-start w-full">
                <div className="flex flex-col items-start w-full">
                  <div className="flex flex-col w-full">
                    <div className="flex flex-col justify-center items-center gap-3 w-full">
                      <div className="flex flex-col gap-2 w-full">
                        <label className="font-plus-jakarta  text-left font-bold text-lg leading-tight text-neutral-13 w-full">
                          Qu’elle(s) langue(s) parlez-vous ?
                        </label>
                        <div className="flex md:justify-start sm:gap-2 gap-3 w-full flex-wrap items-center ">
                          {['Français', 'Arabe', 'Anglais', 'Autres'].map((language) => (
                            <button
                              key={language}
                              onClick={(event) => handleLanguageSelect(language, event)}
                              className={`flex justify-center items-center px-4 py-2 border rounded-2xl cursor-pointer 
                                ${formData.languages.includes(language) ? 'bg-secondary-6 text-white' : 'bg-white text-neutral-13'}`}
                            >
                              {language}
                            </button>
                          ))}
                        </div>
                        {showOtherLanguagesDropdown && (
                          <div className="mt-4">
                            <label className="font-plus-jakarta font-bold text-lg leading-tight text-neutral-13 w-full text-center">
                            Veuillez indiquez les autres langues
                            </label>
                            <select
                              name="otherLanguages"
                              value={formData.otherLanguages}
                              onChange={handleChange}
                              className="w-full sm:w-[800px] p-2 border border-gray-300 rounded-md mt-2"
                            >
                              <option value="" disabled>
                                Sélectionnez une langue
                              </option>
                              <option value="Espagnol">Espagnol</option>
                              <option value="Allemand">Allemand</option>
                              <option value="Chinois">Chinois</option>
                              <option value="Russe">Russe</option>
                              <option value="Japonais">Japonais</option>
                              <option value="Italien">Italien</option>
                            </select>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col justify-center items-center sm:mt-10">
            <label className="sm:text-h3 text-h4 sm:w-[70%] text-center font-medium text-neutral-13">Mettez en valeur votre annonce avec une description soignée</label>
            <p className="text-center text-[18px] font-medium text-primary-6 mt-2 mb-8">Les descriptions courtes sont généralement les plus efficaces</p>
            <div className="flex flex-col">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="md:w-[800px] md:h-[184px] w-[380px] h-[184px] p-4 border border-gray-300 rounded-md"
                required
                placeholder='Enter une description...'
              />
              <p className='font-plus-jakarta text-primary-6 text-right'>
                0/400
              </p>
            </div>

          </div>
        )}

        {step === 6 && (
          <Step6
            handleFileChange={handleFileChange}
            previewPhotos={previewPhotos}
            handleRemovePhoto={handleRemovePhoto}
          />
        )}
        {step === 7 && (
     <Step7
     formData={formData}
     previewPhotos={previewPhotos}
     setFormData={setFormData}
     showPhoneNumber={showPhoneNumber}
     setShowPhoneNumber={setShowPhoneNumber}
   />
        )}
        <div className="fixed bottom-0 bg-[#FAF8ED] left-0 right-0 " style={{ height: `96px` }}>
          <div className="w-full bg-white">
            <div className="bg-primary-6 h-2" style={{ width: `${(step / 7) * 100}%` }}></div>
          </div>
          <div className="flex justify-between items-center px-4 sm:px-8 md:px-16 pb-4 sm:pb-6 pt-7">
            <button
              type="button"
              onClick={prevStep}
              className={`py-2 px-6 rounded-lg font-bold font-plus-jakarta ${step === 1 ? 'bg-transparent text-neutral-13' : 'bg-transparent text-neutral-13'}`}
              disabled={step === 1}
            >
              Retour
            </button>
            {step < 7 && (
              <button
                type="button"
                onClick={nextStep}
                className="py-2 px-6 bg-primary-6 text-white rounded-lg"
              >
                Continuer
              </button>
            )}
            {step === 7 && (
              <button
                type="submit"
                className="py-2 px-6 bg-primary-6 text-white rounded-lg"
                disabled={loading}
              >
                {loading ? 'Soumission...' : 'Créer Chauffeur'}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChauffeurForm;