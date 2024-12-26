
const TravelSection = () => {
  return (
    <div className="bg-gray-100 p-6 sm:p-10 text-gray-800">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
            Organisez votre <span className="text-blue-600">OMRA</span> et partez au <span className="text-blue-600">meilleur prix !</span>
          </h1>
          <p className="text-center text-lg font-semibold text-gray-600 mb-6">
            Réduisez vos coûts, pas vos rêves
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-around bg-gray-50 py-4 rounded-lg">
            <div className="flex flex-col items-center mb-4 sm:mb-0">
              <span className="text-gray-500 font-medium">Location</span>
              <span className="text-xl font-semibold">Makkah, KSA</span>
            </div>
            <div className="flex flex-col items-center mb-4 sm:mb-0">
              <span className="text-gray-500 font-medium">Day</span>
              <span className="text-xl font-semibold">Lundi</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-gray-500 font-medium">Weather</span>
              <span className="text-xl font-semibold">Soleil 32°</span>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <div className="flex flex-col items-center">
              <span className="text-gray-500 font-medium">Taux du jour</span>
              <span className="text-xl font-semibold">1 € = 3.95 Riyals</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelSection;
