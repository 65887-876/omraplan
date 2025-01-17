import React from 'react';
import {
  format,
  startOfMonth,
  startOfWeek,
  addDays,
  endOfWeek,
  isSameMonth,
  isSameDay,
  parseISO,
  endOfMonth,
} from 'date-fns';
import { fr } from 'date-fns/locale';

const Calendar = ({ month, year, handleDateChange, selectedDate }) => {
  const start = startOfWeek(startOfMonth(new Date(year, month)), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(new Date(year, month)), { weekStartsOn: 1 });

  const handleDateClick = (day) => {
    const formattedDate = format(day, 'yyyy-MM-dd', { locale: fr }); // Correctly format date
    handleDateChange({ target: { name: 'dateFinPublication', value: formattedDate } });
  };

  const renderDays = () => {
    const days = [];
    let day = start;
    while (day <= end) {
      const isDisabled = !isSameMonth(day, new Date(year, month));
      const isSelected = isSameDay(day, parseISO(selectedDate));
      days.push(
        <div
          key={day.toString()}
          className={`p-2 text-center cursor-pointer ${
            isDisabled ? 'text-gray-400' : ''
          } ${isSelected ? 'bg-primary-6 text-white rounded-full' : ''}`}
          onClick={() => !isDisabled && handleDateClick(day)}
        >
          {format(day, 'd', { locale: fr })}
        </div>
      );
      day = addDays(day, 1);
    }
    return days;
  };

  return (
    <div className="bg-white">
      <div className="text-center font-semibold">
        {format(new Date(year, month), 'MMMM yyyy', { locale: fr })}
      </div>
      <div className="grid grid-cols-7 gap-1 mt-2">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 mt-1">{renderDays()}</div>
    </div>
  );
};

export default Calendar;
