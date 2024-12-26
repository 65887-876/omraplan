import Happy from '../assets/umrah couple.png';

const ReductionOmra = () => {
  return (

    <section className="relative bg-yellow-50  flex flex-col items-center py-16 sm:px-20 gap-6  w-full  ">
      {/* Decorative circles */}
      <div className="absolute z-10 bg-[#87AABE] blur-[1px] rounded-full w-10 h-10 top-[15%] left-[7%] hidden md:block" />
      <div className="absolute z-10 bg-[#987306] blur-[2px] rounded-full w-16 h-16 top-[2%] left-[35%] hidden md:block" />
      <div className="absolute z-10 bg-[#D9952F] blur-[1px] rounded-full w-10 h-10 top-[46%] left-[39%] hidden md:block" />
      <div className="absolute z-10 bg-[#FFD482] blur-[1px] rounded-full w-14 h-14 top-[68%] left-[42%] hidden md:block" />

      <div className="flex flex-row justify-around items-center gap-24 w-full h-full">
        {/* Left Section: Image */}
        <div className="relative w-[585px] h-[636px] hidden md:block">
          <div className="absolute w-[506.9px] h-[578.58px] bg-cover bg-no-repeat bg-center">
            <img src={Happy} className="rounded-[120px_120px_120px_0px]" alt="Happy Tourist" />
          </div>
        </div>

        {/* Right Section: Content */}
        <div className="flex flex-col items-center gap-8 w-full px-4 sm:px-0 md:w-[599px] h-full">
          <div className="flex flex-col gap-4">
            <h1 className="text-[#0A2A3D] text-[40px] font-bold leading-[54px]">
              Des réductions en exclusivité sur <span className="text-[#987306]">Omra Bons plans</span>
            </h1>
            <p className="text-[#3A556A] font-plus-jakarta text-[18px] font-bold leading-[30px]">
              Profitez de nos bons plans pour un voyage Omra mémorable
              ! Hébergements, vols, activités : économisez sur tout avec
              nos offres exclusives. Préparez-vous à une expérience
              inoubliable dès maintenant !
              <div className="block md:hidden absolute right-0 top-[24%] transform -translate-y-1/2 w-14 h-14 rounded-full bg-[#5ea9de]"></div>

            </p>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-8">
            {/* Metric Cards */}
            <MetricCard value="+15M" label="Pelerins en 2024" />
            <MetricCard value="450" label="E-Visa / Jour" />
            <MetricCard value="28" label="Compagnie aérienne" />
            <MetricCard value="46K+" label="Satisfactions" />
          </div>
        </div>
      </div>
    </section>

  );
};

const MetricCard = ({ value, label }) => {
  return (
    <div className="flex flex-col justify-center items-center p-4 gap-5 bg-white shadow-md rounded-lg w-[380px]  sm:w-[283.5px] h-[168px]">
      <div className="text-[#F28B0E] font-volkhov text-[64px] font-bold leading-[83px] text-center">
        {value}
      </div>
      <div className="text-[#3A556A] text-[16px] font-medium leading-[22px] text-center">
        {label}
      </div>
    </div>
  );
};

export default ReductionOmra;
