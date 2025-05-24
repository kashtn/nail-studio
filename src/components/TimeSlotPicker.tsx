import React from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";

export interface TimeSlot {
  time: string;
  available: boolean;
}

interface TimeSlotPickerProps {
  selectedDate: Date | null;
  timeSlots: TimeSlot[];
  selectedTimeSlot: string | null;
  onSelectTimeSlot: (time: string) => void;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  selectedDate,
  timeSlots,
  selectedTimeSlot,
  onSelectTimeSlot,
}) => {
  if (!selectedDate) {
    return (
      <div className="text-center py-4 text-gray-500">
        Пожалуйста, выберите дату
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-gray-800 mb-4">
        Доступное время на{" "}
        {format(selectedDate, "EEEE, d MMMM", { locale: ru })}
      </h3>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {timeSlots.map((slot, index) => (
          <button
            key={index}
            className={`p-3 rounded-md border transition-colors text-center ${
              slot.time === selectedTimeSlot
                ? "bg-pink-500 text-white border-pink-500"
                : !slot.available
                ? "bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed"
                : "bg-white text-gray-800 border-gray-200 hover:border-pink-300"
            }`}
            onClick={() => slot.available && onSelectTimeSlot(slot.time)}
            disabled={!slot.available}
          >
            {slot.time}
          </button>
        ))}
      </div>

      {timeSlots.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Нет доступного времени на выбранную дату
        </div>
      )}
    </div>
  );
};

export default TimeSlotPicker;
