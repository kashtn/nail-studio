import React from "react";
import { Service } from "../types/service";
import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";

interface BookingSummaryProps {
  selectedService?: Service | null;
  selectedDate?: Date | null;
  selectedTimeSlot?: string | null;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  selectedService,
  selectedDate,
  selectedTimeSlot,
}) => {
  if (!selectedService && !selectedDate && !selectedTimeSlot) return null;

  return (
    <div className="mb-6 p-4 bg-gray-50 border-l-4 border-pink-400 rounded">
      <div className="flex flex-col gap-1 text-sm text-gray-700">
        {selectedService && (
          <div>
            <span className="font-medium">Услуга:</span> {selectedService.name} ({selectedService.price} ₽, {selectedService.duration} мин)
          </div>
        )}
        {selectedDate && (
          <div>
            <span className="font-medium">Дата:</span> {format(selectedDate, "d MMMM yyyy, EEEE", { locale: ru })}
          </div>
        )}
        {selectedTimeSlot && (
          <div>
            <span className="font-medium">Время:</span> {selectedTimeSlot}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSummary; 