import { Link } from 'react-router-dom';
import { LuHouse } from "react-icons/lu";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50">
        <div className='flex flex-col m-10'>


            <div className="flex flex-row items-center mb-6 ">
              <span className='text-primary-4 mr-[2px]'><LuHouse /></span>
              <Link to="/" className="text-primary-4 font-plus-jakarta mr-[6px]">Accueil</Link>
              <span className="text-secondary-6 font-plus-jakarta">/</span>
              <Link to="/aboutus" className="text-secondary-6 font-plus-jakarta ml-[6px]">Qui sommes-nous ?</Link>
            </div>


            <div className="flex flex-col font-plus-jakarta items-center w-[800px] bg-white border border-gray-50 rounded-lg  shadow-sm py-8 px-7">
                <div className="w-full ">
                <h2 className="text-[40px] font-bold text-left text-neutral-13 mb-4">Qui sommes-nous ?</h2>
                <hr className="border-t-2 border-gray-300 mb-4" />
                <div className="text-left ml-4">
                    <p className="text-base text-neutral-13">
                    Nous sommes une équipe d'expatriés ayant vécu plusieurs années en Arabie Saoudite, au cœur des lieux saints de l'Islam. Forts de cette expérience, nous avons accompagné de nombreux pèlerins francophones dans leur voyage spirituel, en répondant à leurs besoins sur place.
                    </p>
                    <p className="text-base text-neutral-13 mb-4">
                    C'est en constatant les défis auxquels les pèlerins sont confrontés que nous avons eu l'idée de créer Omra Bons Plans. Notre mission est simple : offrir une plateforme unique et gratuite qui met en relation les prestataires de services, qu'ils soient professionnels ou particuliers, avec les futurs pèlerins.
                    </p>
                    <p className="text-base text-neutral-13 mb-5">
                    Sur notre site, vous trouverez tout ce dont vous avez besoin pour une Omra sereine et bien organisée : des hébergements abordables, des chauffeurs parlant votre langue, des guides expérimentés, des baby-sitters attentionnées, et bien plus encore. Nous réunissons tout cela en un seul endroit pour vous simplifier la vie et vous permettre de vous concentrer sur l'essentiel : votre spiritualité.
                    </p>
                    <p className="text-base text-neutral-13 mb-2">
                    Avec Omra Bons Plans, nous mettons notre connaissance du terrain et notre dévouement à votre service, pour rendre chaque pèlerinage inoubliable.
                    </p>
                </div>
                </div>
            </div>
      </div>
    </div>
  );
};

export default AboutUs;