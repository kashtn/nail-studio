import React, { useState } from 'react';
import { addDays, format, startOfWeek, addWeeks, subWeeks, isSameDay, isAfter, isBefore } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ru from 'date-fns/locale/ru';

interface DatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date) => void;
  disabledDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onChange,
  disabledDates = [],
  minDate = new Date(),
  maxDate = addDays(new Date(), 60),
}) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const goToPreviousWeek = () => {
    const previousWeek = subWeeks(currentWeekStart, 1);
    setCurrentWeekStart(previousWeek);
  };

  const goToNextWeek = () => {
    const nextWeek = addWeeks(currentWeekStart, 1);
    setCurrentWeekStart(nextWeek);
  };

  const isDateDisabled = (date: Date) => {
    if (isBefore(date, minDate) || isAfter(date, maxDate)) {
      return true;
    }
    
    return disabledDates.some(disabledDate => isSameDay(date, disabledDate));
  };

  const handleDateClick = (date: Date) => {
    if (!isDateDisabled(date)) {
      onChange(date);
    }
  };

  const renderDayNames = () => {
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    return days.map(day => (
      <div key={day} className="w-1/7 text-center font-medium text-sm text-gray-700">
        {day}
      </div>
    ));
  };

  const renderDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(currentWeekStart, i);
      const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
      const isDisabled = isDateDisabled(date);
      
      days.push(
        <button
          key={i}
          className={`w-1/7 aspect-square flex flex-col items-center justify-center rounded-md border transition-colors ${
            isSelected
              ? 'bg-pink-500 text-white border-pink-500'
              : isDisabled
              ? 'bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed'
              : 'bg-white text-gray-800 border-gray-200 hover:border-pink-300'
          }`}
          onClick={() => handleDateClick(date)}
          disabled={isDisabled}
        >
          <span className="text-lg">{format(date, 'd')}</span>
          <span className="text-xs">{format(date, 'MMM', { locale: ru })}</span>
        </button>
      );
    }
    return days;
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">Выберите дату</h3>
        <div className="flex space-x-2">
          <button
            className="p-2 border rounded-md hover:bg-gray-100 transition-colors"
            onClick={goToPreviousWeek}
            aria-label="Предыдущая неделя"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="p-2 border rounded-md hover:bg-gray-100 transition-colors"
            onClick={goToNextWeek}
            aria-label="Следующая неделя"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {renderDayNames()}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {renderDays()}
      </div>
    </div>
  );
};

export default DatePicker;