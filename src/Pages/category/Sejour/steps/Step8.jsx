import React from 'react';
import PropTypes from 'prop-types';
import Calendar from '../Calendar';

const Step8 = ({ formData, handleChange }) => {
  // Helper function to get month names
  const getMonthName = (monthIndex) => {
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    return monthNames[monthIndex];
  };

  // Helper function to get day names
  const getDayNames = () => {
    return ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"];
  };

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const nextMonth = (currentMonth + 1) % 12;
  const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;

  return (
    <div className="flex flex-col items-center md:px-0 px-4 sm:mt-4 gap-4">
      <div className="text-center">
        <h1 className="sm:text-h2 text-h5 font-bold text-[#2D3C59] font-plus-jakarta">
          Date de fin de publication ?
        </h1>
        <p className="py-4 font-plus-jakarta font-medium text-[#667085]">
          Veuillez indiquer à quelle date l’annonce sera supprimée automatiquement
        </p>
      </div>
      <div className="w-full md:w-[800px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Month 1 */}
          <div>
            <div className="grid grid-cols-7 gap-1 text-center font-medium text-gray-700">
              {getDayNames().map((day, index) => (
                <div key={index}>{day}</div>
              ))}
            </div>
            <Calendar month={currentMonth} year={currentYear} handleDateChange={handleChange} selectedDate={formData.dateFinPublication} />
          </div>
          {/* Month 2 */}
          <div>
            <div className="grid grid-cols-7 gap-1 text-center font-medium text-gray-700">
              {getDayNames().map((day, index) => (
                <div key={index}>{day}</div>
              ))}
            </div>
            <Calendar month={nextMonth} year={nextMonthYear} handleDateChange={handleChange} selectedDate={formData.dateFinPublication} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Prop type validation
Step8.propTypes = {
  formData: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Step8;