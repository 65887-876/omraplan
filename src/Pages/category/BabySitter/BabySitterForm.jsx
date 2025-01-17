import { useState } from 'react';
import axios from 'axios';
import Step6 from './Step6';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import BabySitterReview from './BabySitterReview';

const BabySitterForm = () => {
  const [formData, setFormData] = useState({
    sex: '',
    city: '',
    languages: [],
    otherLanguages: '',
    photos: [],
    description: '',
    dateFinPublication: '',
  });
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleRemovePhoto = (index) => {
    setPreviewPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
    setFormData((prevData) => ({
      ...prevData,
      photos: prevData.photos.filter((_, i) => i !== index),
    }));
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);
    try {
      const uploadData = new FormData();
      files.forEach(file => {
        uploadData.append('photos', file);
      });

      const response = await axios.post('http://localhost:5000/api/auth/uploadbabysitter', uploadData, {
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
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const [showPhoneNumber, setShowPhoneNumber] = useState(false);

  const validateFields = () => {
    const requiredFields = [
      'sex', 'city', 'languages', 'description', 'dateFinPublication'
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
      const response = await axios.post('http://localhost:5000/api/auth/babysitters', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure you send the token for verification
        },
      });
      console.log('BabySitter created successfully:', response.data);
      alert('BabySitter créé avec succès!');
    } catch (error) {
      console.error('Error creating babysitter:', error.response); // Log the full error response
      alert('Échec de la création du babysitter. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < 8) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const bottomBarHeight = 96;
  const headerHeight = 72;
  const [calendarValue, setCalendarValue] = useState(dayjs());

  const handleCalendarChange = (newValue) => {
    const formattedDate = newValue ? newValue.format('YYYY-MM-DD') : '';
    setFormData((prevData) => ({
      ...prevData,
      dateFinPublication: formattedDate,
    }));
    setCalendarValue(newValue);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full bg-[#FAF8ED]">
        <form onSubmit={handleSubmit} className="w-full max-w-full" style={{ minHeight: `calc(100vh - ${headerHeight + bottomBarHeight}px)` }}>
          {step === 1 && (
            <div className="flex flex-col justify-center items-center sm:mt-10">
              <label className="sm:text-h3 text-h4 text-center font-medium text-neutral-13">Sexe</label>
              <p className='text-center text-[18px] font-medium text-primary-6 mt-2 mb-8'>Choisissez votre sexe</p>
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
              <p className='text-center text-[18px] font-medium text-primary-6 mt-2 mb-8'>Choisissez votre ville</p>
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
            <div className="flex flex-col justify-center items-center sm:mt-10 w-full">
              <label className="sm:text-h3 text-h4 text-center font-medium text-neutral-13">Quelles langues parlez-vous ?</label>
              <div className="flex flex-wrap gap-4 justify-left items-center mb-4 w-full md:w-[800px]">
                {['Français', 'Arabe', 'Anglais', 'Autres'].map(language => (
                  <label
                    key={language}
                    className={`flex justify-center items-center p-2 border rounded-full cursor-pointer ${formData.languages.includes(language) ? 'bg-secondary-6 text-white' : 'bg-white text-neutral-13'} transition-colors duration-200`}
                  >
                    <input
                      type="checkbox"
                      name="languages"
                      value={language}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span className="font-plus-jakarta font-medium text-sm">{language}</span>
                  </label>
                ))}
              </div>
              {formData.languages.includes('Autres') && (
                <select
                  name="otherLanguages"
                  value={formData.otherLanguages}
                  onChange={handleChange}
                  className="w-full md:w-[800px] p-2 border border-gray-300 rounded-md mb-4"
                  style={{ borderRadius: '8px' }}
                >
                  <option value="">Indiquez les autres langues</option>
                  {[
                    'Arabe (dialectes maghrébins : marocain, algérien, tunisien)',
                    'Bambara',
                    'Cantonais',
                    'Chinois (mandarin)',
                    'Espagnol',
                    'Italien',
                    'Lingala',
                    'Peul',
                    'Polonais',
                    'Portugais',
                    'Roumain',
                    'Russe',
                    'Soninké',
                    'Tamoul',
                    'Turc',
                    'Vietnamien',
                    'Wolof',
                  ].map(language => (
                    <option key={language} value={language}>{language}</option>
                  ))}
                </select>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col w-full justify-center items-center sm:mt-10">
              <label className="sm:text-h3 text-h4 text-center font-medium text-neutral-13">Description</label>
              <p className='text-center text-[18px] font-medium text-primary-6 mt-2 mb-8'>Décrivez vos services</p>
              <div className="flex flex-col gap-6 w-full md:w-[800px]">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Entrez une description..."
                  style={{
                    height: '184px',
                    padding: '10px 14px',
                    gap: '8px',
                    borderRadius: '8px 0px 0px 0px',
                    borderWidth: '1px 0px 0px 0px',
                    opacity: '1',
                  }}
                  required
                />
                <div className="text-right text-neutral-13">
                  {formData.description.length}/400
                </div>
              </div>
            </div>
          )}
      
          {step === 5 && (
            <Step6
              handleFileChange={handleFileChange}
              previewPhotos={previewPhotos}
              handleRemovePhoto={handleRemovePhoto}
            />
          )}

          {step === 6 && (
            <div className="space-y-6">
              <div className="text-center py-6">
                <h1 className="text-h2 font-bold text-[#2D3C59] font-plus-jakarta">Date de Fin de Publication</h1>
                <p className="py-4 font-plus-jakarta text-gray-600">Veuillez entrer la date de fin de publication.</p>
              </div>
              <div className="w-full flex justify-center">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar
                    value={calendarValue}
                    onChange={handleCalendarChange}
                    showDaysOutsideCurrentMonth
                    className="bg-white rounded-2xl shadow p-4"
                    sx={{
                      '& .MuiCalendarPicker-root': {
                        width: '100%',
                        maxWidth: '450px',
                      },
                      '& .MuiPickersDay-root.Mui-selected': {
                        backgroundColor: '#3a556a',
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
          )}

          {step === 7 && (
            <BabySitterReview
              formData={formData}
              previewPhotos={previewPhotos}
              setFormData={setFormData}
              showPhoneNumber={showPhoneNumber}
              setShowPhoneNumber={setShowPhoneNumber}
            />
          )}

          <div className="fixed bottom-0 left-0 right-0 bg-inherit" style={{ height: `${bottomBarHeight}px` }}>
            <div className="w-full bg-white">
              <div
                className="bg-primary-6 h-2"
                style={{ width: `${(step / 6) * 100}%` }}
              ></div>
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
                  {loading ? 'Soumission...' : 'Créer BabySitter'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default BabySitterForm;