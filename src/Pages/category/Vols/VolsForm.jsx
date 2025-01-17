import React, { useState, useEffect } from "react";
import axios from "axios";
import VolsAnnonceReview from "./VolsAnnonceReview";
import Step1 from "./Step1";
import Step2 from "./Step2";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const VolsForm = () => {
  const [formData, setFormData] = useState({
    compagnieAerienne: "",
    itineraire: {
      aller: { Aller: "", Date: "", type: "" },
      retour: { Aller: "", Date: "", type: "" },
    },
    photos: [],
    prixBase: 0,
    promotion: false,
    reduction: 0,
    prixReduit: 0,
    description: "",
    dateFinPublication: "",
    showNumber: false,
    status: false,
    venteFlash: false,
  });

  const [calendarValue, setCalendarValue] = useState(dayjs().add(1, 'day')); // Default to tomorrow
  const [photoFiles, setPhotoFiles] = useState([]);
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [uploadedPhotoUrls, setUploadedPhotoUrls] = useState([]);
  const [step, setStep] = useState(1);
  const [charCount, setCharCount] = useState(formData.description.length);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    calculatePrixReduit();
  }, [formData.reduction, formData.prixBase]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    if (name.includes(".")) {
      const keys = name.split(".");
      setFormData((prev) => {
        const updatedFormData = {
          ...prev,
          itineraire: {
            ...prev.itineraire,
            [keys[1]]: {
              ...prev.itineraire[keys[1]],
              [keys[2]]: fieldValue,
            },
          },
        };
        if (keys[2] === "reduction") {
          updatedFormData.venteFlash = parseFloat(fieldValue) >= 30;
        }
        return updatedFormData;
      });
    } else {
      setFormData((prev) => {
        const updatedFormData = {
          ...prev,
          [name]: fieldValue,
        };
        if (name === "reduction") {
          updatedFormData.venteFlash = parseFloat(fieldValue) >= 30;
        }
        return updatedFormData;
      });
    }
    console.log("Input Change:", { [name]: fieldValue });
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviewPhotos = files.map((file) => URL.createObjectURL(file));
    setPhotoFiles((prev) => [...prev, ...files]);
    setPreviewPhotos((prev) => [...prev, ...newPreviewPhotos]);
    console.log("Photo Change:", files);
  };

  const handleRemovePhoto = (index, event) => {
    event.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      photos: prevData.photos.filter((_, i) => i !== index),
    }));
    setPhotoFiles((prevData) => prevData.filter((_, i) => i !== index));
    setPreviewPhotos((prevData) => prevData.filter((_, i) => i !== index));
  };

  const calculatePrixReduit = () => {
    if (formData.promotion) {
      const prixReduit = formData.prixBase - (formData.prixBase * formData.reduction) / 100;
      setFormData((prev) => ({
        ...prev,
        prixReduit: prixReduit.toFixed(2),
      }));
    }
    console.log("Prix Reduit Calculated:", formData.prixReduit);
  };
  
  const handleNext = () => {
    console.log("Next Step:", step + 1);
    if (step < 6) {
      setStep(step + 1);
    }
  };

  const handleRetour = () => {
    console.log("Previous Step:", step - 1);
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data on Submit:", formData);

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      // Create a FormData object and append the photo files
      const photosFormData = new FormData();
      photoFiles.forEach((file) => {
        photosFormData.append("photos", file);
      });

      // Upload the photos to Cloudinary
      const photoResponse = await axios.post("http://localhost:5000/api/auth/uploadVols", photosFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Get the photo URLs from the response
      const photoUrls = photoResponse.data.urls;
      setUploadedPhotoUrls(photoUrls); // Update the state with the uploaded URLs

      // Prepare the final form data with the photo URLs
      const finalFormData = {
        ...formData,
        photos: photoUrls,
        prixBase: parseFloat(formData.prixBase), // Ensure prixBase is a number
        prixReduit: parseFloat(formData.prixReduit), // Ensure prixReduit is a number
        venteFlash: parseFloat(formData.reduction) >= 30, // Make sure venteFlash is true if reduction is >= 30%
        status: false, // Ensure status is always false
      };

      console.log("Final Form Data to be Submitted:", finalFormData);

      // Submit the final form data
      const response = await axios.post(
        "http://localhost:5000/api/auth/vols",
        finalFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Success:", response.data);
      alert("Vols announcement created successfully!");
    } catch (error) {
      console.error("Error submitting form:", error.response ? error.response.data : error.message);
      alert("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const progressPercentage = Math.min((step / 6) * 100, 100);

  const handleToggleChange = () => {
    setFormData((prev) => ({
      ...prev,
      promotion: !prev.promotion,
    }));
    console.log("Promotion Toggled:", !formData.promotion);
  };

  const handleCalendarChange = (newValue) => {
    if (newValue.isAfter(dayjs())) {
      setCalendarValue(newValue);
      setFormData((prev) => ({
        ...prev,
        dateFinPublication: newValue.format('YYYY-MM-DD'),
      }));
      console.log("Calendar Date Selected:", newValue.format('YYYY-MM-DD'));
    } else {
      alert("Please select a date in the future.");
    }
  };

  return (
    <>
      <div className="bg-yellow-50 min-h-screen flex flex-col justify-between">
        <form onSubmit={handleSubmit} className="w-full max-w-6xl mx-auto sm:p-6 md:p-8 lg:p-10">
          {step === 1 && (
            <Step1
              formData={formData}
              handleInputChange={handleInputChange}
            />
          )}

          {step === 2 && (
            <Step2
              handlePhotoChange={handlePhotoChange}
              photoFiles={photoFiles}
              handleRemovePhoto={handleRemovePhoto}
              isPhotoDeCouvertureUploaded={photoFiles.length > 0}
              previewPhotos={previewPhotos}
            />
          )}

          {step === 3 && (
            <div className="space-y-6 mt-2 p-2 sm:px-24">
              <div className="text-center py-6">
                <h1 className="sm:text-h2 text-h5 font-bold text-[#2D3C59] font-plus-jakarta">A présent, fixez votre prix </h1>
                <p className="py-4 font-plus-jakarta text-gray-600">
                  Vous pourrez modifier ce prix à tout moment.
                </p>
              </div>
              <div className="mt-4">
                <h4 className="font-plus-jakarta text-neutral-13 font-bold">Prix de base</h4>
                <div className="flex items-center">
                  <input
                    type="number"
                    name="prixBase"
                    value={formData.prixBase}
                    onChange={handleInputChange}
                    className="p-3 w-[396px] h-[44px] rounded-lg border border-gray-300"
                  />
                </div>
              </div>

              <div className="flex items-center mt-2">
                <div
                  onClick={handleToggleChange}
                  className={`relative inline-block w-12 h-6 cursor-pointer ${formData.promotion ? 'bg-[#987306]' : 'bg-gray-300'} rounded-full`}
                >
                  <span
                    className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${formData.promotion ? 'transform translate-x-6' : ''}`}
                  ></span>
                </div>
                <label className="ml-2 text-primary-6 font-plus-jakarta">En Promotion</label>
              </div>
              {formData.promotion && (
                <div>
                  <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mt-2">
                    <div className="w-full sm:w-1/2">
                      <h4 className="font-plus-jakarta text-neutral-13 font-bold">Réduction</h4>
                      <div className="flex items-center">
                        <input
                          type="number"
                          name="reduction"
                          value={formData.reduction}
                          onChange={handleInputChange}
                          className="w-full h-[44px] rounded-lg p-3 border border-gray-300 shadow-sm"
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <h4 className="font-plus-jakarta text-neutral-13 font-bold">
                        {formData.reduction >= 30 ? (
                          <>
                            Prix <span className="text-[#987306]">Flash</span>
                          </>
                        ) : (
                          'Prix réduit (Bon plan)'
                        )}
                      </h4>
                      <div className="flex items-center">
                        <input
                          type="number"
                          name="prixReduit"
                          value={formData.prixReduit}
                          onChange={handleInputChange}
                          className="w-full h-[44px] rounded-lg p-3 bg-white border border-gray-300 shadow-sm"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 font-plus-jakarta font-bold text-primary-6">
                    Toutes les publications proposant une réduction d'au moins 30% et ayant une durée de mise en ligne inférieure à 10 jours seront affichées en "Vente Flash".
                  </div>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 px-4 sm:px-8 md:px-16 lg:px-32 relative">
              <div className="text-center py-6">
                <h1 className="text-h5 md:text-2xl lg:text-h2 font-bold text-[#2D3C59] font-plus-jakarta">Mettez en valeur votre annonce avec une description soignée</h1>
                <p className="py-4 font-plus-jakarta text-sm md:text-base lg:text-lg text-[#667085]">Les descriptions courtes sont généralement les plus efficaces</p>
              </div>
              <div>
                <label className="block font-bold my-2 text-neutral-13 font-plus-jakarta">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) => {
                    if (e.target.value.length <= 400) {
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }));
                      setCharCount(e.target.value.length);
                    }
                  }}
                  rows="4"
                  maxLength="400"
                  placeholder="Entrez une description..."
                  className="w-full rounded-lg h-[184px] p-3 border border-gray-300"
                />
                <div className="text-right text-sm text-gray-500">
                  {charCount}/400
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
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
                    className="bg-white rounded-2xl shadow p-4" // Adjusted padding for more space
                    sx={{
                      '& .MuiCalendarPicker-root': {
                        width: '100%', // Adjust width to be responsive
                        maxWidth: '450px', // Set max-width for larger size
                      },
                      '& .MuiPickersDay-root.Mui-selected': {
                        backgroundColor: '#3a556a', // Tailwind primary-6 color
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
          )}
          {step === 6 && (

              <VolsAnnonceReview
                formData={formData}
                previewPhotos={previewPhotos}
                setFormData={setFormData}
                showPhoneNumber={formData.showNumber}
                setShowPhoneNumber={(value) => setFormData((prev) => ({ ...prev, showNumber: value }))}
              />

          )}
          {/* Buttons for navigation and submission */}
          <div className="fixed bottom-0 left-0 right-0  bg-yellow-50">
            <div className="w-full bg-white">
              <div
                className="bg-primary-6 h-2"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between px-4 sm:px-8 md:px-16 pb-4 sm:pb-6 pt-2 items-center">
              <button
                type="button"
                onClick={handleRetour}
                className={`py-2 px-6 bg-transparent text-neutral-6 font-bold hover:cursor-pointer hover:text-primary-4 ${step === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={step === 1}
              >
                Retour
              </button>
              {step < 6 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="py-2 px-6 bg-primary-6 text-white font-semibold rounded-lg hover:cursor-pointer hover:bg-primary-4"
                >
                  Continuer
                </button>
              )}
              {step === 6 && (
                <button
                  type="submit"
                  className="py-2 px-6 bg-primary-6 text-white font-semibold rounded-lg hover:cursor-pointer hover:bg-primary-4"
                  disabled={loading}
                >
                  {loading ? 'Soumission...' : 'Publier'}
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Display uploaded photo URLs */}
        <div className="mt-4">
          <h3 className="font-plus-jakarta text-neutral-13 font-bold">Images uploaded successfully:</h3>
          <ul>
            {uploadedPhotoUrls.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default VolsForm;