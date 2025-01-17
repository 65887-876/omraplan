const Step1 = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <div className="text-center py-6">
        <h1 className="text-h2 font-bold text-[#2D3C59] font-plus-jakarta">Détails du Vol</h1>
        <p className="py-4 font-plus-jakarta text-gray-600">Veuillez remplir les informations en dessous.</p>
      </div>
      <div>
        <label className="block font-semibold text-gray-700">Quelle compagnie aérienne ?</label>
        <select
          name="compagnieAerienne"
          value={formData.compagnieAerienne}
          onChange={handleInputChange}
          className="w-full p-3 border h-[44px] border-gray-300"
        >
          <option value="">Sélectionnez...</option>
          <option value="Ajet">Ajet</option>
          <option value="Égypte Air">Égypte Air</option>
          <option value="Jordania Airlines">Jordania Airlines</option>
          <option value="Saudi Airlines">Saudi Airlines</option>
          <option value="Transavia">Transavia</option>
          <option value="Turkish Airlines">Turkish Airlines</option>
          <option value="Wizz Air">Wizz Air</option>
          <option value="Autre">Autre</option>
        </select>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-lg">Itinéraire Aller (Départ)</h4>
        <div className="flex space-x-4">
          <input
            type="text"
            name="itineraire.aller.Aller"
            value={formData.itineraire.aller.Aller}
            onChange={handleInputChange}
            className="p-3 h-[44px] border rounded-lg border-gray-300 w-full"
            placeholder="Sélectionnez..."
          />
          <input
            type="date"
            name="itineraire.aller.Date"
            value={formData.itineraire.aller.Date}
            onChange={handleInputChange}
            className="p-3 h-[44px] border rounded-lg border-gray-300 w-full"
          />
        </div>
        <div className="flex space-x-6">
          <label className="flex items-center text-gray-700">
            <input
              type="radio"
              name="itineraire.aller.type"
              value="Direct"
              checked={formData.itineraire.aller.type === "Direct"}
              onChange={handleInputChange}
              className="mr-2"
            />
            Direct
          </label>
          <label className="flex items-center text-gray-700">
            <input
              type="radio"
              name="itineraire.aller.type"
              value="Avec escale"
              checked={formData.itineraire.aller.type === "Avec escale"}
              onChange={handleInputChange}
              className="mr-2"
            />
            Avec escale
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-lg">Itinéraire Retour (Retour)</h4>
        <div className="flex space-x-4">
          <input
            type="text"
            name="itineraire.retour.Aller"
            value={formData.itineraire.retour.Aller}
            onChange={handleInputChange}
            className="p-3 h-[44px] border rounded-lg border-gray-300 w-full"
            placeholder="Sélectionnez..."
          />
          <input
            type="date"
            name="itineraire.retour.Date"
            value={formData.itineraire.retour.Date}
            onChange={handleInputChange}
            className="p-3 h-[44px] border rounded-lg border-gray-300 w-full"
          />
        </div>
        <div className="flex space-x-6">
          <label className="flex items-center text-gray-700">
            <input
              type="radio"
              name="itineraire.retour.type"
              value="Direct"
              checked={formData.itineraire.retour.type === "Direct"}
              onChange={handleInputChange}
              className="mr-2"
            />
            Direct
          </label>
          <label className="flex items-center text-gray-700">
            <input
              type="radio"
              name="itineraire.retour.type"
              value="Avec escale"
              checked={formData.itineraire.retour.type === "Avec escale"}
              onChange={handleInputChange}
              className="mr-2"
            />
            Avec escale
          </label>
        </div>
      </div>
    </div>
  );
};

export default Step1;
