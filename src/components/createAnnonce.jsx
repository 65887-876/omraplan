import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAnnonce = () => {
  const [type, setType] = useState(""); 
  const [data, setData] = useState({}); 
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate();

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setData({}); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    
    if (name === 'amenities') {
      setData((prevData) => {
        const amenities = checked
          ? [...(prevData.amenities || []), value]
          : (prevData.amenities || []).filter((item) => item !== value);
  
        return {
          ...prevData,
          amenities,
        };
      });
    }
  
    if (name === 'promotion.isPromotion') {
      setData((prevData) => ({
        ...prevData,
        promotion: {
          ...prevData.promotion,
          isPromotion: checked,
        },
      }));
    }
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    if (files.length) {
      console.log("Files uploaded:", files);
      // You can handle the files here (e.g., upload to a server or store in state)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post("http://localhost:5000/api/auth/annonces", { type, data }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setMessage("Annonce created successfully!");
      console.log(response.data);
      navigate(`/create-annonce/${type}`);
    } catch (error) {
      setMessage("Failed to create annonce.");
      console.error(error);
    }
  };

  const renderFields = () => {
    switch (type) {
      case "Sejours":
        return (
          <>
            <div>
              <label>Formule:</label>
              <select name="formule" onChange={handleChange}>
                <option value="">Select</option>
                <option value="Confort">Confort: 5 étoiles</option>
                <option value="Essentiel">Essentiel: 4 étoiles</option>
                <option value="Eco">Eco: 3 étoiles</option>
              </select>
            </div>
            <div>
              <label>Compagnie Aérienne:</label>
              <input type="text" name="compagnieAerienne" onChange={handleChange} />
            </div>
            <div>
              <label>Date de Départ:</label>
              <input type="date" name="dateDepart" onChange={handleChange} />
            </div>
            <div>
              <label>Date de Retour:</label>
              <input type="date" name="dateRetour" onChange={handleChange} />
            </div>
            <div>
              <label>Nombre de Nuitées:</label>
              <input type="number" name="nombreNuitees" onChange={handleChange} />
            </div>
            <div>
              <label>Prix de Base (€):</label>
              <input type="number" name="prixBase" onChange={handleChange} />
            </div>
            <div>
              <label>Description:</label>
              <textarea name="description" onChange={handleChange} />
            </div>
          </>
        );
      case "Vols":
        return (
          <>
            <div>
              <label>Compagnie Aérienne:</label>
              <select name="compagnieAerienne" onChange={handleChange}>
                <option value="">Select</option>
                <option value="Ajet">Ajet</option>
                <option value="Égypte Air">Égypte Air</option>
                <option value="Saudi Airlines">Saudi Airlines</option>
              </select>
            </div>
            <div>
              <label>Date Aller:</label>
              <input type="date" name="dateAller" onChange={handleChange} />
            </div>
            <div>
              <label>Date Retour:</label>
              <input type="date" name="dateRetour" onChange={handleChange} />
            </div>
            <div>
              <label>Direct ou Escale:</label>
              <select name="itineraire" onChange={handleChange}>
                <option value="">Select</option>
                <option value="Direct">Direct</option>
                <option value="Escale">Avec Escale</option>
              </select>
            </div>
            <div>
              <label>Prix de Base (€):</label>
              <input type="number" name="prixBase" onChange={handleChange} />
            </div>
            <div>
              <label>Description:</label>
              <textarea name="description" onChange={handleChange} />
            </div>
          </>
        );
      case "Hebergement":
        return (
          <>
            <div>
              <label>Type d'Hébergement:</label>
              <select name="type" onChange={handleChange}>
                <option value="">Sélectionnez</option>
                <option value="Hotel">Hôtel</option>
                <option value="Appartement">Appartement</option>
              </select>
            </div>
            {data.type === "Hotel" && (
              <>
                <div>
                  <label>Ville:</label>
                  <select name="ville" onChange={handleChange}>
                    <option value="">Sélectionnez</option>
                    <option value="Mekkah">Mekkah</option>
                    <option value="Medina">Medina</option>
                  </select>
                </div>
                <div>
                  <label>Nom de l'Hôtel:</label>
                  <input type="text" name="details.nom" onChange={handleChange} />
                </div>
                <div>
                  <label>Distance du Masjid al-Haram/Madinah:</label>
                  <input type="number" name="details.distance" onChange={handleChange} />
                </div>
                <div>
                  <label>Emplacement de l'Hôtel (Map):</label>
                  <input type="text" name="details.emplacement" onChange={handleChange} />
                </div>
                <div>
                  <label>Photos de Couverture:</label>
                  <input type="file" name="photos" multiple onChange={handleFileUpload} />
                </div>
                <div>
                  <label>Voyageurs:</label>
                  <input type="number" name="infosHebergement.voyageurs" onChange={handleChange} />
                </div>
                <div>
                  <label>Chambres:</label>
                  <input type="number" name="infosHebergement.chambres" onChange={handleChange} />
                </div>
                <div>
                  <label>Lits Simples:</label>
                  <input type="number" name="infosHebergement.litsSimples" onChange={handleChange} />
                </div>
                <div>
                  <label>Lits Doubles:</label>
                  <input type="number" name="infosHebergement.litsDoubles" onChange={handleChange} />
                </div>
                <div>
                  <label>Prix de Base (€):</label>
                  <input type="number" name="prixBase" onChange={handleChange} />
                </div>
                <div>
                  <input type="checkbox" name="promotion.isPromotion" onChange={handleCheckboxChange} />
                  <label>Promotion</label>
                </div>
                {data.promotion?.isPromotion && (
                  <>
                    <div>
                      <label>Réduction (%):</label>
                      <input type="number" name="promotion.reduction" onChange={handleChange} />
                    </div>
                    <div>
                      <label>Prix Réduit (Bon Plan) (€):</label>
                      <input type="number" name="promotion.prixReduit" onChange={handleChange} />
                    </div>
                  </>
                )}
                <div>
                  <label>Description:</label>
                  <textarea name="description" onChange={handleChange}></textarea>
                </div>
                <div>
                  <label>Date de Fin de Publication:</label>
                  <input type="date" name="dateFinPublication" onChange={handleChange} />
                </div>
              </>
            )}
            {data.type === "Appartement" && (
              <>
                <div>
                  <label>Ville:</label>
                  <select name="ville" onChange={handleChange}>
                    <option value="">Sélectionnez</option>
                    <option value="Mekkah">Mekkah</option>
                    <option value="Medina">Medina</option>
                  </select>
                </div>
                <div>
                  <label>Nom de l'Appartement:</label>
                  <input type="text" name="details.nom" onChange={handleChange} />
                </div>
                <div>
                  <label>Distance du Masjid al-Haram/Madinah:</label>
                  <input type="number" name="details.distance" onChange={handleChange} />
                </div>
                <div>
                  <label>Emplacement de l'Appartement (Map):</label>
                  <input type="text" name="details.emplacement" onChange={handleChange} />
                </div>
                <div>
                  <label>Photos de Couverture:</label>
                  <input type="file" name="photos" multiple onChange={handleFileUpload} />
                </div>
                <div>
                  <label>Voyageurs:</label>
                  <input type="number" name="infosHebergement.voyageurs" onChange={handleChange} />
                </div>
                <div>
                  <label>Chambres:</label>
                  <input type="number" name="infosHebergement.chambres" onChange={handleChange} />
                </div>
                <div>
                  <label>Lits Simples:</label>
                  <input type="number" name="infosHebergement.litsSimples" onChange={handleChange} />
                </div>
                <div>
                  <label>Lits Doubles:</label>
                  <input type="number" name="infosHebergement.litsDoubles" onChange={handleChange} />
                </div>
                <div>
                  <label>Prix de Base (€):</label>
                  <input type="number" name="prixBase" onChange={handleChange} />
                </div>
                <div>
                  <input type="checkbox" name="promotion.isPromotion" onChange={handleCheckboxChange} />
                  <label>Promotion</label>
                </div>
                {data.promotion?.isPromotion && (
                  <>
                    <div>
                      <label>Réduction (%):</label>
                      <input type="number" name="promotion.reduction" onChange={handleChange} />
                    </div>
                    <div>
                      <label>Prix Réduit (Bon Plan) (€):</label>
                      <input type="number" name="promotion.prixReduit" onChange={handleChange} />
                    </div>
                  </>
                )}
                <div>
                  <label>Description:</label>
                  <textarea name="description" onChange={handleChange}></textarea>
                </div>
                <div>
                  <label>Date de Fin de Publication:</label>
                  <input type="date" name="dateFinPublication" onChange={handleChange} />
                </div>
              </>
            )}
          </>
        );
      case "Guide":
        return (
          <>
            <div>
              <label>Sexe:</label>
              <select name="sexe" onChange={handleChange}>
                <option value="">Select</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>
            <div>
              <label>Langues Parlées:</label>
              <input type="text" name="langues" onChange={handleChange} />
            </div>
            <div>
              <label>Description:</label>
              <textarea name="description" onChange={handleChange} />
            </div>
          </>
        );
      case "Chauffeurs":
        return (
          <>
            <div>
              <label>Sexe:</label>
              <select name="sexe" onChange={handleChange}>
                <option value="">Select</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>
            <div>
              <label>Ville:</label>
              <select name="ville" onChange={handleChange}>
                <option value="">Select</option>
                <option value="Mekkah">Mekkah</option>
                <option value="Medina">Medina</option>
                <option value="Jeddah">Jeddah</option>
              </select>
            </div>
            <div>
              <label>Nombre de Places:</label>
              <input type="number" name="nombrePlaces" onChange={handleChange} />
            </div>
            <div>
              <label>Description:</label>
              <textarea name="description" onChange={handleChange} />
            </div>
          </>
        );
      case "BabySitter":
        return (
          <>
            <div>
              <label>Sexe:</label>
              <select name="sexe" onChange={handleChange}>
                <option value="">Select</option>
                <option value="Homme">Homme</option>
                <option value="Femme">Femme</option>
              </select>
            </div>
            <div>
              <label>Langues Parlées:</label>
              <input type="text" name="langues" onChange={handleChange} />
            </div>
            <div>
              <label>Description:</label>
              <textarea name="description" onChange={handleChange} />
            </div>
          </>
        );
      default:
        return <p>Please select a type of annonce.</p>;
    }
  };

  return (
    <div className="flex flex-col items-center py-32 px-20 gap-16 w-full max-w-screen-xl h-auto mx-auto">
      <h1 className="text-4xl font-bold mb-6">Create Annonce</h1>
      {message && <p className="text-lg text-red-600">{message}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6 w-full max-w-3xl">
        <div className="grid grid-cols-3 gap-6 w-full">
          {[
            { value: "Sejours", label: "Séjours" },
            { value: "Vols", label: "Vols" },
            { value: "Hebergement", label: "Hébergement" },
            { value: "Guide", label: "Guide" },
            { value: "Chauffeurs", label: "Chauffeurs" },
            { value: "BabySitter", label: "Baby-Sitter" },
          ].map((category) => (
            <label
              key={category.value}
              className="flex items-center justify-between p-4 border border-gray-300 rounded-lg shadow-sm bg-white cursor-pointer hover:bg-gray-100 transition duration-300"
            >
              <span className="text-lg font-medium">{category.label}</span>
              <input
                type="checkbox"
                value={category.value}
                checked={type === category.value}
                onChange={() => setType(category.value)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 rounded"
              />
            </label>
          ))}
        </div>
        {renderFields()}
        <button
          type="submit"
          className="py-3 px-6 text-lg font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default CreateAnnonce;