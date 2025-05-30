import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Service } from "../types/service";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import DatePicker from "./DatePicker";
import TimeSlotPicker, { TimeSlot } from "./TimeSlotPicker";
import { format, parse } from "date-fns";
import BookingSummary from "./BookingSummary";

interface BookingFormProps {
  services: Service[];
  initialServiceId?: number;
}

const LOCAL_STORAGE_KEY = "bookingFormState";

const BookingForm: React.FC<BookingFormProps> = ({
  services,
  initialServiceId,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Form state
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [notes, setNotes] = useState("");

  // UI state
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  // Fetch user profile data when reaching step 4
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentStep === 4 && user) {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (error) throw error;

          if (data) {
            setClientName(data.full_name || "");
            setClientPhone(data.phone || "");
            setClientEmail(user.email || "");
            setNotes(data.preferences || "");
          }
        } catch (error) {
          console.error("Ошибка при загрузке профиля:", error);
        }
      }
    };

    fetchUserProfile();
  }, [currentStep, user]);

  // Set initial service if provided
  useEffect(() => {
    if (initialServiceId && services.length > 0) {
      const service = services.find((s) => s.id === initialServiceId);
      if (service) {
        setSelectedService(service);
        setCurrentStep(2);
      }
    }
  }, [initialServiceId, services]);

  // Prefill user data if logged in
  useEffect(() => {
    if (user) {
      setClientPhone(user.email?.split("@")[0] || "");
      setClientEmail(user.email || "");
    }
  }, [user]);

  // Generate time slots for selected date
  useEffect(() => {
    if (selectedDate) {
      // Generate time slots from 9 AM to 5 PM
      const slots: TimeSlot[] = [];
      const openingTime = 9; // 9 AM
      const closingTime = 17; // 5 PM

      // Generate 30-minute slots
      for (let hour = openingTime; hour < closingTime; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const timeString = `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`;
          slots.push({
            time: timeString,
            available: Math.random() > 0.3, // Random availability for demo purposes
          });
        }
      }

      setTimeSlots(slots);
    }
  }, [selectedDate]);

  // Восстановление состояния из localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        let restoredStep = 1;
        let restoredService: Service | null = null;
        if (parsed.selectedServiceId && services.length > 0) {
          const service = services.find(
            (s) => s.id === parsed.selectedServiceId
          );
          if (service) {
            setSelectedService(service);
            restoredService = service;
            restoredStep = 2;
          }
        }
        if (parsed.selectedDate) {
          setSelectedDate(new Date(parsed.selectedDate));
          if (restoredService) restoredStep = 3;
        }
        if (parsed.selectedTimeSlot) {
          setSelectedTimeSlot(parsed.selectedTimeSlot);
          if (restoredService && parsed.selectedDate) restoredStep = 4;
        }
        if (parsed.clientName) setClientName(parsed.clientName);
        if (parsed.clientEmail) setClientEmail(parsed.clientEmail);
        if (parsed.clientPhone) setClientPhone(parsed.clientPhone);
        if (parsed.notes) setNotes(parsed.notes);
        // Устанавливаем шаг только если он валиден по данным
        setCurrentStep(restoredStep);
      } catch {
        console.error("Ошибка при восстановлении состояния формы");
      }
    }
  }, [services]);

  // Сохраняем состояние в localStorage при изменениях
  useEffect(() => {
    const state = {
      selectedServiceId: selectedService?.id || null,
      selectedDate: selectedDate ? selectedDate.toISOString() : null,
      selectedTimeSlot,
      clientName,
      clientEmail,
      clientPhone,
      notes,
      currentStep,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [
    selectedService,
    selectedDate,
    selectedTimeSlot,
    clientName,
    clientEmail,
    clientPhone,
    notes,
    currentStep,
  ]);

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setCurrentStep(2);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setCurrentStep(3);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTimeSlot(time);
    setCurrentStep(4);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedService || !selectedDate || !selectedTimeSlot) {
      setErrorMessage("Пожалуйста, выберите услугу, дату и время");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      // Combine date and time
      const appointmentDateTime = parse(
        `${format(selectedDate, "yyyy-MM-dd")} ${selectedTimeSlot}`,
        "yyyy-MM-dd HH:mm",
        new Date()
      );

      // Create appointment in Supabase
      const { data, error } = await supabase
        .from("appointments")
        .insert({
          client_id: user?.id || null,
          service_id: selectedService.id,
          appointment_date: appointmentDateTime.toISOString(),
          status: "pending",
          client_name: clientName,
          client_email: clientEmail,
          client_phone: clientPhone,
          notes: notes || null,
        })
        .select();

      if (error) throw error;
      const endPoint = import.meta.env.VITE_GATEAWAY_URL;

      fetch(endPoint + "/sync/appointments", { method: "POST" });

      setIsLoading(false);
      // Clear form
      setSelectedService(null);
      setSelectedDate(null);
      setSelectedTimeSlot(null);
      setNotes("");
      // Очищаем localStorage после успешной отправки
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      navigate("/booking-confirmation", {
        state: {
          appointment: data[0],
          serviceName: selectedService.name,
        },
      });
    } catch (error) {
      setIsLoading(false);
      console.error("Ошибка при записи на прием:", error);
      setErrorMessage(
        "Не удалось записаться на прием. Пожалуйста, попробуйте еще раз."
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`flex items-center ${
              step < currentStep ? "text-pink-500" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step <= currentStep ? "border-pink-500" : "border-gray-300"
              }`}
            >
              {step}
            </div>
            <div className="ml-2 text-sm hidden sm:block">
              {step === 1 && "Услуга"}
              {step === 2 && "Дата"}
              {step === 3 && "Время"}
              {step === 4 && "Данные"}
            </div>
            {step < 4 && (
              <div
                className={`w-8 sm:w-16 h-0.5 mx-2 ${
                  step < currentStep ? "bg-pink-500" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Mobile Step Indicator */}
      <div className="sm:hidden text-center mb-6">
        <span className="text-sm font-medium text-gray-700">
          {currentStep === 1 && "Шаг 1: Выбор услуги"}
          {currentStep === 2 && "Шаг 2: Выбор даты"}
          {currentStep === 3 && "Шаг 3: Выбор времени"}
          {currentStep === 4 && "Шаг 4: Ваши данные"}
        </span>
      </div>

      {/* Service Selection */}
      {currentStep === 1 && (
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Выберите услугу
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((service) => (
              <div
                key={service.id}
                className={`p-4 border rounded-md cursor-pointer transition-colors ${
                  selectedService?.id === service.id
                    ? "bg-pink-50 border-pink-400"
                    : "bg-white border-gray-200 hover:border-pink-300"
                }`}
                onClick={() => handleServiceSelect(service)}
              >
                <h4 className="font-medium text-gray-800">{service.name}</h4>
                <div className="flex justify-between mt-2 text-sm">
                  <span>{service.price} ₽</span>
                  <span>{service.duration} мин</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Date Selection */}
      {currentStep === 2 && (
        <>
          <BookingSummary selectedService={selectedService} />
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Выберите дату
            </h3>
            <DatePicker
              selectedDate={selectedDate}
              onChange={handleDateSelect}
            />
          </div>
        </>
      )}

      {/* Time Selection */}
      {currentStep === 3 && (
        <>
          <BookingSummary
            selectedService={selectedService}
            selectedDate={selectedDate}
          />
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Выберите время
            </h3>
            <TimeSlotPicker
              selectedDate={selectedDate}
              timeSlots={timeSlots}
              selectedTimeSlot={selectedTimeSlot}
              onSelectTimeSlot={handleTimeSelect}
            />
          </div>
        </>
      )}

      {/* Client Info */}
      {currentStep === 4 && (
        <>
          <BookingSummary
            selectedService={selectedService}
            selectedDate={selectedDate}
            selectedTimeSlot={selectedTimeSlot}
          />
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Ваша информация
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="clientName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Полное имя
                </label>
                <input
                  type="text"
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="clientPhone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Номер телефона
                </label>
                <input
                  type="tel"
                  id="clientPhone"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Особые пожелания (необязательно)
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Error & Success Messages */}
      {errorMessage && (
        <div className="p-4 bg-red-50 text-red-800 rounded-md">
          {errorMessage}
        </div>
      )}

      {/* {successMessage && (
        <div className="p-4 bg-green-50 text-green-800 rounded-md">
          {successMessage}
        </div>
      )} */}

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={() => setCurrentStep(currentStep - 1)}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Назад
          </button>
        )}

        {currentStep === 4 && (
          <button
            type="submit"
            className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-md font-medium transition-colors disabled:bg-gray-400"
            disabled={isLoading}
          >
            {isLoading ? "Запись..." : "Записаться"}
          </button>
        )}
      </div>
    </form>
  );
};

export default BookingForm;
