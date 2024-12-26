/* eslint-disable react/prop-types */

const Button = ({ name, icon, onClick, isSelected, className }) => {
  const baseStyles = "flex flex-row justify-center items-center gap-2 text-xl font-medium";
  
  const selectedStyles = "bg-[#987306] border-[#987306] text-white";
  const unselectedStyles = "bg-white border-[1px] border-[#D0D6DB] text-[#0A2A3D]";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${isSelected ? selectedStyles : unselectedStyles} ${className}  px-4 rounded-full`}
    >
      <span className="text-2xl">{icon}</span>
      <span>{name}</span>
    </button>
  );
};

export default Button;