import HorairePriere from "./HorairePriere";

const HorairePriereMain = () => {
  return (
    <div className="flex flex-col items-center h-auto z-2 px-6 sm:px-[80px] py-[64px] bg-[#FAF8ED]">
      {/* Main Content */}
      <div className="flex flex-col items-start w-full max-w-screen-lg">
        <div className="flex flex-col items-start gap-2 w-full max-w-3xl">
          <h1 className="text-h2 font-bold text-neutral-13">Horaires de prière</h1>
        </div>
        <div className="py-10">
          <h2 className="text-h4 font-bold text-neutral-13">
            Pourquoi rechercher les horaires de prière à Paris, Lyon et dans les grandes villes de France ?
          </h2>
        </div>
      </div>
      
      {/* HorairePriere Component */}
      <div className="w-full max-w-screen-lg">
        <HorairePriere />
      </div>
      
      {/* Full-Width Paragraphs */}
      <div className="w-screen px-0 py-10 bg-cover rounded-lg text-neutral-13">
        <div className="max-w-3xl mx-auto text-left text-h3">
          <p className="w-full">
            Connaître les horaires de prière est essentiel pour les musulmans qui souhaitent accomplir leurs prières quotidiennes à temps, que ce soit pendant une journée ordinaire ou au cours de moments particuliers comme le Ramadan 2025. Dans des villes comme Paris, Lyon, Marseille, Toulouse, Nice ou Bordeaux, où la vie moderne peut être trépidante, il est important d’avoir accès à des informations précises sur les heures de prière pour maintenir un équilibre entre la pratique spirituelle et les activités quotidiennes.
          </p>
          <p>
            Pendant le Ramadan 2025, les heures de prière prennent une dimension encore plus importante, notamment pour connaître les moments exacts du fajr (prière de l’aube) pour le début du jeûne, et du maghrib (prière du coucher du soleil) pour la rupture du jeûne. Rechercher les horaires de prière à Paris, horaire de prière à Lyon ou dans d’autres grandes villes de France permet de s’organiser efficacement, que vous soyez chez vous, au travail ou en déplacement.
          </p>
          <p>
            Les heures de prière à Paris ou dans des métropoles comme Lille, Strasbourg, Rennes et Nantes varient en fonction de l’endroit où vous vous trouvez en France. Un calendrier fiable des horaires de prière est donc indispensable pour accomplir vos obligations religieuses en toute sérénité.
          </p>
          <p>
            En plus de vous accompagner spirituellement, avoir accès aux horaires de prière à jour vous permet également de planifier vos activités sans compromettre vos engagements religieux. Rechercher les heures de prière pour le Ramadan 2025 dans votre ville est une pratique simple qui enrichit votre quotidien et renforce votre connexion avec votre foi.
          </p>
          <p>
            Trouvez dès maintenant les horaires précis de prière pour Paris, Lyon, et toutes les grandes villes de France, et organisez votre journée autour de vos obligations spirituelles.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HorairePriereMain;