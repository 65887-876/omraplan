import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Step9 = ({ formData, handleDateRangeChange }) => {
  const startDate = formData.disponibilites.startDate ? new Date(formData.disponibilites.startDate) : null;
  const endDate = formData.disponibilites.endDate ? new Date(formData.disponibilites.endDate) : null;

  const isDateInRange = (date) => {
    const dateString = date.toISOString().split('T')[0];
    const { startDate, endDate } = formData.disponibilites;
    return startDate && endDate && dateString >= startDate && dateString <= endDate;
  };

  return (
    <div className="flex flex-col items-center w-full bg-gray-100 py-8">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <label className="block font-semibold text-2xl text-gray-800 mb-4 text-center">
          Quelle est la date que vous recherchez ?
        </label>
        <div className="flex justify-center w-full">
          <DatePicker
            selected={startDate}
            onChange={handleDateRangeChange}
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()} // Ensure the start date is greater than today
            selectsRange
            inline
            monthsShown={2}
            className="w-full p-4 border border-gray-300 rounded-xl shadow-lg bg-white"
            placeholderText="Sélectionnez une plage de dates"
            dateFormat="yyyy-MM-dd"
            dayClassName={(date) => {
              if (isDateInRange(date)) {
                return 'bg-green-200'; // Highlight dates in range
              }
              return 'text-gray-700'; // Default non-selected dates
            }}
            // Responsive date picker styles
            calendarClassName="responsive-calendar"
          />
        </div>
      </div>
      <style jsx>{`
        .responsive-calendar {
          width: 100%;
          max-width: 100%;
        }
        @media (max-width: 768px) {
          .react-datepicker {
            width: 100%;
            font-size: 16px;
          }
          .react-datepicker__month-container {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Step9;