import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import SejourAnnonceReview from './SejourAnnonceReview';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Step5 from './steps/Step5';
import Step6 from './steps/Step6';
import Step7 from './steps/Step7';
import Step8 from './steps/Step8';
import 'leaflet/dist/leaflet.css';

const SejourForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    prixBase: '0',
    promotion: false,
    reduction: '0',
    prixReduit: '0',
    venteFlash: false,
    description: '',
    dateFinPublication: '',
    photos: [],
    compagnieAerienne: '',
    dateDepart: '',
    dateRetour: '',
    madinahNuits: '1',
    makkahNuits: '1',
    type: '',
    hotelMedina: {
      nom: '',
      distanceMasjidNabawi: '100',
      emplacement: '',
    },
    hotelMakkah: {
      nom: '',
      distanceKaba: '100',
      emplacement: '',
    },
    shownumber: false  
  });
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const isValidJSON = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const [locationMedina, setLocationMedina] = useState(isValidJSON(formData.hotelMedina.emplacement) ? JSON.parse(formData.hotelMedina.emplacement) : null);
  const [locationMakkah, setLocationMakkah] = useState(isValidJSON(formData.hotelMakkah.emplacement) ? JSON.parse(formData.hotelMakkah.emplacement) : null);

  useEffect(() => {
    checkVenteFlash();
  }, [formData.reduction, formData.dateFinPublication]);

  useEffect(() => {
    calculatePrixReduit();
  }, [formData.reduction, formData.prixBase]);

  const isValidDate = (date) => {
    return !isNaN(Date.parse(date));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    if (name === 'dateDepart' || name === 'dateRetour') {
      const currentDate = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
      const dateDepart = name === 'dateDepart' ? value : formData.dateDepart;
      const dateRetour = name === 'dateRetour' ? value : formData.dateRetour;

      if (name === 'dateDepart' && isValidDate(value) && value <= currentDate) {
        setErrors(prevErrors => ({
          ...prevErrors,
          dateDepart: 'La date de départ doit être supérieure à la date d\'aujourd\'hui.',
        }));
      } else if (name === 'dateRetour' && isValidDate(value) && dateDepart >= value) {
        setErrors(prevErrors => ({
          ...prevErrors,
          dateRetour: 'La date de retour doit être supérieure à la date de départ.',
        }));
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          dateDepart: '',
          dateRetour: '',
        }));
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
  };

  const handleToggleChange = () => {
    setFormData((prev) => ({
      ...prev,
      promotion: !prev.promotion,
    }));
  };

  const handleNestedChange = (e, hotelType) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [hotelType]: {
        ...prevData[hotelType],
        [name]: value,
      },
    }));
  };

  const checkVenteFlash = () => {
    if (formData.promotion && formData.reduction >= 30) {
      const today = new Date();
      const endDate = new Date(formData.dateFinPublication);
      if ((endDate - today) / (1000 * 60 * 60 * 24) < 10) {
        setFormData((prev) => ({ ...prev, venteFlash: true }));
      } else {
        setFormData((prev) => ({ ...prev, venteFlash: false }));
      }
    } else {
      setFormData((prev) => ({ ...prev, venteFlash: false }));
    }
  };

  const calculatePrixReduit = () => {
    if (formData.promotion) {
      const prixReduit = formData.prixBase - (formData.prixBase * formData.reduction) / 100;
      setFormData((prev) => ({
        ...prev,
        prixReduit: prixReduit.toFixed(2),
      }));
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handlePhotoChange = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);
    try {
      const uploadData = new FormData();
      files.forEach((file) => {
        uploadData.append('photos', file);
      });

      for (const pair of uploadData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        alert('No authentication token found. Please log in.');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/auth/uploadSejour', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, 
        },
      });

      console.log('Photo upload response:', response.data);

      if (response.data && response.data.urls) {
        setFormData((prevData) => ({
          ...prevData,
          photos: prevData.photos.concat(response.data.urls),
        }));
        setPreviewPhotos((prevData) => prevData.concat(response.data.urls));
      } else {
        console.error('Unexpected response format:', response);
        alert('Failed to upload images. Please try again.');
      }
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateFields()) {
      console.log('Form submission failed');
      return;
    }

    console.log('Submitting form with data:', formData);

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      setLoading(true);

      const finalFormData = {
        ...formData,
        prixBase: Number(formData.prixBase),
        reduction: Number(formData.reduction),
        prixReduit: Number(formData.prixReduit),
        madinahNuits: Number(formData.madinahNuits),
        makkahNuits: Number(formData.makkahNuits),
        dateFinPublication: new Date(formData.dateFinPublication),
        dateDepart: new Date(formData.dateDepart),
        dateRetour: new Date(formData.dateRetour),
        hotelMedina: {
          ...formData.hotelMedina,
          emplacement: formData.hotelMedina.emplacement,
        },
        hotelMakkah: {
          ...formData.hotelMakkah,
          emplacement: formData.hotelMakkah.emplacement,
        },
        shownumber: formData.shownumber !== undefined ? formData.shownumber : false // Ensure correct casing and default value
      };

      console.log('Final form data being submitted:', finalFormData);

      const response = await axios.post('http://localhost:5000/api/auth/sejour', finalFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Success:', response.data);
      alert('Séjour créé avec succès!');
      window.location.reload(); 
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
      alert('Échec de la création du séjour. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const validateFields = () => {
    const requiredFields = [
      'prixBase', 'description', 'dateFinPublication', 'compagnieAerienne',
      'dateDepart', 'dateRetour', 'madinahNuits', 'makkahNuits', 'type',
      'hotelMedina.nom', 'hotelMedina.distanceMasjidNabawi', 'hotelMedina.emplacement',
      'hotelMakkah.nom', 'hotelMakkah.distanceKaba', 'hotelMakkah.emplacement',
    ];

    for (let field of requiredFields) {
      const value = field.split('.').reduce((o, i) => o[i], formData);
      if (!value) {
        console.error(`Field ${field} is missing or empty`);
        return false;
      }
    }

    return true;
  };

  const progressPercentage = Math.min((step / 9) * 100, 100);

  const handleLocationChangeMedina = (newLocation) => {
    setLocationMedina(newLocation);
    handleNestedChange({ target: { name: 'emplacement', value: JSON.stringify(newLocation) } }, 'hotelMedina');
  };

  const handleLocationChangeMakkah = (newLocation) => {
    setLocationMakkah(newLocation);
    handleNestedChange({ target: { name: 'emplacement', value: JSON.stringify(newLocation) } }, 'hotelMakkah');
  };

  const generateMapLink = (location) => {
    if (!location) return '';
    const { lat, lng } = location;
    return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=18/${lat}/${lng}`;
  };

  const handleLocationInputChange = (e, section) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [section]: {
        ...prevFormData[section],
        [name]: value,
      },
    }));
    if (section === 'hotelMedina') {
      setLocationMedina(null);
    } else if (section === 'hotelMakkah') {
      setLocationMakkah(null);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-full" style={{ minHeight: `calc(100vh - 168px)` }}>
        {step === 1 && <Step1 formData={formData} handleChange={handleInputChange} />}
        {step === 2 && <Step2 formData={formData} handleChange={handleInputChange} errors={errors} />}
        {step === 3 && (
          <Step3
            formData={formData}
            handleNestedChange={handleNestedChange}
            locationMedina={locationMedina}
            handleLocationChangeMedina={handleLocationChangeMedina}
            handleLocationInputChange={handleLocationInputChange}
            generateMapLink={generateMapLink}
          />
        )}
        {step === 4 && (
          <Step4
            formData={formData}
            handleNestedChange={handleNestedChange}
            locationMakkah={locationMakkah}
            handleLocationChangeMakkah={handleLocationChangeMakkah}
            handleLocationInputChange={handleLocationInputChange}
            generateMapLink={generateMapLink}
          />
        )}
        {step === 5 && <Step5 handleFileChange={handlePhotoChange} previewPhotos={previewPhotos} handleRemovePhoto={handleRemovePhoto} />}
        {step === 6 && <Step6 formData={formData} handleInputChange={handleInputChange} handleToggleChange={handleToggleChange} />}
        {step === 7 && <Step7 formData={formData} handleChange={handleInputChange} />}
        {step === 8 && <Step8 formData={formData} handleChange={handleInputChange} />}
        {step === 9 && (
          <SejourAnnonceReview 
            formData={formData} 
            previewPhotos={previewPhotos} 
            setFormData={setFormData} 
          />
        )}

        <div className="fixed bottom-0 left-0 right-0 bg-yellow-50">
          <div className="w-full bg-white">
            <div
              className="bg-primary-6 h-2"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between px-4 sm:px-8 md:px-16 pb-4 sm:pb-6 pt-2 items-center">
            <button
              type="button"
              onClick={prevStep}
              className="py-2 px-6 bg-transparent text-neutral-600 font-bold hover:cursor-pointer hover:text-primary-400"
              disabled={step === 1}
            >
              Retour
            </button>
            {step < 10 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 6) checkVenteFlash();
                  nextStep();
                }}
                className="py-2 px-6 bg-primary-6 text-white font-semibold rounded-lg hover:cursor-pointer hover:bg-primary-400"
              >
                Continuer
              </button>
            ) : (
              <button
                type="submit"
                className="py-2 px-6 bg-primary-600 text-white font-semibold rounded-lg hover:cursor-pointer hover:bg-primary-400"
                disabled={loading}
              >
                {loading ? 'Soumission...' : 'Soumettre'}
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default SejourForm;