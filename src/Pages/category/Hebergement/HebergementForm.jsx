import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';
import Step8 from './Step8';
import Step9 from './Step9';
import Step10 from './Step10';
import Fin from './Fin';
import Price from './Price';
import InformationStep from './InformationStep';
import dayjs from 'dayjs';

const HebergementForm = () => {
  const [formData, setFormData] = useState({
    typeAnnonce: '',
    ville: '',
    typeHebergement: '',
    details: {
      voyageurs: 1,
      chambres: 2,
      litsSimples: 1,
      litsDoubles: 1,
      salon: 1,
    },
    prixBase: '',
    negociable: false,
    shownumber: false,
    description: '',
    photos: [],
    disponibilites: {
      startDate: '',
      endDate: '',
    },
    selectedDate: null,
    videoUrl: '',
    hotelName: '',
    distance: '',
    hotelLocation: '',
    dateFinPublication: '',
    promotion: false,
    reduction: 0,
    prixReduit: 0,
  });

  const [userData, setUserData] = useState({
    email: '',
    phoneNumber: ''
  });

  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [isVideoUrlValid, setVideoUrlValid] = useState(false);
  const [isStepValid, setIsStepValid] = useState(false);

  useEffect(() => {
    validateStep();
  }, [formData, step, isVideoUrlValid]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authorization token not found');
      }

      const response = await axios.get('http://localhost:5000/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUserData(response.data.user);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (name.includes('.')) {
      const [field, subfield] = name.split('.');
      setFormData((prevData) => ({
        ...prevData,
        [field]: {
          ...prevData[field],
          [subfield]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleToggleChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      negociable: !prevData.negociable,
    }));
  };

  const handleIncrementDecrement = (field, amount) => {
    setFormData((prevData) => ({
      ...prevData,
      details: {
        ...prevData.details,
        [field]: Math.max(0, prevData.details[field] + amount),
      },
    }));
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    setLoading(true);
    try {
      const uploadData = new FormData();
      files.forEach((file) => {
        uploadData.append('photo', file);
      });

      const response = await axios.post('http://localhost:5000/api/auth/uploadHebergement', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Uploaded photos:', response.data.url);
      setFormData((prevData) => ({
        ...prevData,
        photos: prevData.photos.concat(response.data.url),
      }));
      setPreviewPhotos((prevData) => prevData.concat(response.data.url));
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
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authorization token not found');
      }

      const photos = formData.typeAnnonce === 'Demande' ? [] : formData.photos;

      const disponibilites = {
        startDate: formData.disponibilites.startDate ? new Date(formData.disponibilites.startDate).toISOString() : '',
        endDate: formData.disponibilites.endDate ? new Date(formData.disponibilites.endDate).toISOString() : '',
      };

      console.log('Submitting form data:', {
        typeAnnonce: formData.typeAnnonce,
        type: formData.typeHebergement,
        ville: formData.ville,
        disponibilites: disponibilites,
        informations: formData.details,
        prixBase: formData.prixBase,
        negociable: formData.negociable,
        shownumber: formData.shownumber,
        description: formData.description,
        photos: photos,
        dateFinPublication: formData.dateFinPublication,
        videoUrl: formData.videoUrl,
        hotelName: formData.hotelName,
        distance: formData.distance,
        hotelLocation: formData.hotelLocation,
        promotion: formData.promotion,
        reduction: formData.reduction,
        prixReduit: formData.prixReduit,
      });

      const response = await axios.post('http://localhost:5000/api/auth/hebergement', {
        typeAnnonce: formData.typeAnnonce,
        type: formData.typeHebergement,
        ville: formData.ville,
        disponibilites: disponibilites,
        informations: formData.details,
        prixBase: formData.prixBase,
        negociable: formData.negociable,
        shownumber: formData.shownumber,
        description: formData.description,
        photos: photos,
        dateFinPublication: formData.dateFinPublication,
        videoUrl: formData.videoUrl,
        hotelName: formData.hotelName,
        distance: formData.distance,
        hotelLocation: formData.hotelLocation,
        promotion: formData.promotion,
        reduction: formData.reduction,
        prixReduit: formData.prixReduit,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Hebergement created successfully:', response.data);
      alert('Hebergement créé avec succès!');
    } catch (error) {
      console.error('Error creating hebergement:', error);

      if (error.response) {
        console.error('Response Data:', error.response.data);
        console.error('Response Status:', error.response.status);

        // Display detailed error message to the user
        alert(`Échec de la création de l'hébergement. Erreur: ${error.response.data.message}`);
      } else {
        alert('Échec de la création de l\'hébergement. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const bottomBarHeight = 96;
  const headerHeight = 72;

  const handleDateRangeChange = (dates) => {
    const [start, end] = dates;
    setFormData((prevFormData) => ({
      ...prevFormData,
      disponibilites: {
        startDate: start ? dayjs(start).format('YYYY-MM-DD') : '',
        endDate: end ? dayjs(end).format('YYYY-MM-DD') : '',
      },
    }));
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        setIsStepValid(!!formData.typeAnnonce);
        break;
      case 2:
        setIsStepValid(!!formData.ville);
        break;
      case 3:
        setIsStepValid(!!formData.typeHebergement);
        break;
      case 4:
        setIsStepValid(formData.details.voyageurs > 0 && formData.details.chambres > 0);
        break;
      case 5:
        setIsStepValid(!!formData.prixBase);
        break;
      case 6:
        setIsStepValid(!!formData.description);
        break;
      case 7:
        setIsStepValid(true);
        break;
      case 8:
        setIsStepValid(formData.photos.length > 0); 
        break;
      case 9:
        setIsStepValid(!!formData.hotelName && !!formData.distance && !!formData.hotelLocation);
        break;
      case 10:
        setIsStepValid(!!formData.dateFinPublication);
        break;
      case 11:
        setIsStepValid(!!formData.disponibilites.startDate && !!formData.disponibilites.endDate);
        break;
      default:
        setIsStepValid(false);
    }
  };

  useEffect(() => {
    validateStep();
  }, [formData, step, isVideoUrlValid]);

  // Set totalSteps based on the typeAnnonce
  const totalSteps = formData.typeAnnonce === 'Offre' ? 12 : 10;

  const renderStep = () => {
    if (step === 1) {
      return <Step1 formData={formData} handleChange={handleInputChange} />;
    }

    if (formData.typeAnnonce === 'Offre') {
      switch (step) {
        case 2: return <Step2 formData={formData} handleChange={handleInputChange} />;
        case 3: return <Step3 formData={formData} handleChange={handleInputChange} />;
        case 4: return <Step4 formData={formData} handleIncrementDecrement={handleIncrementDecrement} />;
        case 5: return <Price formData={formData} handleInputChange={handleInputChange} setFormData={setFormData} />;
        case 6: return <Step6 formData={formData} handleChange={handleInputChange} />;
        case 7: return <Step7 formData={formData} handleChange={handleInputChange} setVideoUrlValid={setVideoUrlValid} />;
        case 8: return <Step8 formData={formData} handleFileChange={handleFileChange} previewPhotos={previewPhotos} handleRemovePhoto={handleRemovePhoto} />;
        case 9: return <InformationStep formData={formData} handleChange={handleInputChange} />;
        case 10: return <Fin formData={formData} setFormData={setFormData} />;
        case 11: return <Step9 formData={formData} handleDateRangeChange={handleDateRangeChange} />;
        case 12: return <Step10 formData={formData} previewPhotos={previewPhotos} showPhoneNumber={showPhoneNumber} setShowPhoneNumber={setShowPhoneNumber} />;
        default: return null;
      }
    } else if (formData.typeAnnonce === 'Demande') {
      // Hardcode the previewPhotos to Recherch.png for Demande
      const hardcodedPhotos = ["https://res.cloudinary.com/dyikqziqi/image/upload/v1736835184/Hebergement/ymzyasvos4qdu4wavj5l.png"];
      switch (step) {
        case 2: return <Step2 formData={formData} handleChange={handleInputChange} />;
        case 3: return <Step3 formData={formData} handleChange={handleInputChange} />;
        case 4: return <Step4 formData={formData} handleIncrementDecrement={handleIncrementDecrement} />;
        case 5: return <Step5 formData={formData} handleChange={handleInputChange} handleToggleChange={handleToggleChange} />;
        case 6: return <Step6 formData={formData} handleChange={handleInputChange} />;
        case 7: return <Fin formData={formData} setFormData={setFormData} />;
        case 8: return <Step9 formData={formData} handleDateRangeChange={handleDateRangeChange} />;
        case 9: return <Step10 formData={formData} previewPhotos={hardcodedPhotos} showPhoneNumber={showPhoneNumber} setShowPhoneNumber={setShowPhoneNumber} />;
        default: return null;
      }
    }
  };
  
  return (
    <div className="flex flex-col justify-center items-center w-full bg-[#FAF8ED]">
      <form onSubmit={handleSubmit} className="w-full max-w-full" style={{ minHeight: `calc(100vh - ${headerHeight + bottomBarHeight}px)` }}>
        {renderStep()}

        <div className="fixed bottom-0 left-0 right-0 bg-inherit" style={{ height: `${bottomBarHeight}px}` }}>
          <div className="w-full bg-white">
            <div className="bg-primary-6 h-2" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
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
            {step < totalSteps && (
              <button
                type="button"
                onClick={nextStep}
                className={`py-2 px-6 rounded-lg ${step !== 7 && !isStepValid ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-primary-6 text-white'}`}
                disabled={step !== 7 && !isStepValid}
              >
                Continuer
              </button>
            )}
            {step === totalSteps && (
              <button
                type="submit"
                className={`py-2 px-6 rounded-lg bg-primary-6 text-white`}
                disabled={loading}
              >
                {loading ? 'Soumission...' : 'Créer Hébergement'}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default HebergementForm;