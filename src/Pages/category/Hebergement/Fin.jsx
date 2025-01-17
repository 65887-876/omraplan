import React, { useState } from 'react';
import { LocalizationProvider, DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Fin = ({ formData, setFormData }) => {
  const [calendarValue, setCalendarValue] = useState(dayjs().add(1, 'day')); // Default to demin

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
            className="bg-white rounded-2xl shadow p-4"
            sx={{
              '& .MuiCalendarPicker-root': {
                width: '100%', 
                maxWidth: '450px', 
              },
              '& .MuiPickersDay-root.Mui-selected': {
                backgroundColor: '#3a556a', 
              },
            }}
          />
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default Fin;