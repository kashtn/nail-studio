import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Service } from '../types/service';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import DatePicker from './DatePicker';
import TimeSlotPicker, { TimeSlot } from './TimeSlotPicker';
import { format, parse } from 'date-fns';

interface BookingFormProps {
  services: Service[];
  initialServiceId?: number;
}

const BookingForm: React.FC<BookingFormProps> = ({ services, initialServiceId }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Form state
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  
  // UI state
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Set initial service if provided
  useEffect(() => {
    if (initialServiceId && services.length > 0) {
      const service = services.find(s => s.id === initialServiceId);
      if (service) {
        setSelectedService(service);
      }
    }
  }, [initialServiceId, services]);
  
  // Prefill user data if logged in
  useEffect(() => {
    if (user) {
      setClientEmail(user.email || '');
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
          const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          slots.push({
            time: timeString,
            available: Math.random() > 0.3, // Random availability for demo purposes
          });
        }
      }
      
      setTimeSlots(slots);
    }
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService || !selectedDate || !selectedTimeSlot) {
      setErrorMessage('Please select a service, date, and time');
      return;
    }
    
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      // Combine date and time
      const appointmentDateTime = parse(
        `${format(selectedDate, 'yyyy-MM-dd')} ${selectedTimeSlot}`,
        'yyyy-MM-dd HH:mm',
        new Date()
      );
      
      // Create appointment in Supabase
      const { data, error } = await supabase
        .from('appointments')
        .insert({
          client_id: user?.id || null,
          service_id: selectedService.id,
          appointment_date: appointmentDateTime.toISOString(),
          status: 'pending',
          client_name: clientName,
          client_email: clientEmail,
          client_phone: clientPhone,
          notes: notes || null
        })
        .select();
      
      if (error) throw error;
      
      setSuccessMessage('Your appointment has been booked successfully!');
      
      // Clear form
      setSelectedService(null);
      setSelectedDate(null);
      setSelectedTimeSlot(null);
      setNotes('');
      
      // Redirect to confirmation page after 2 seconds
      setTimeout(() => {
        navigate('/booking-confirmation', { 
          state: { 
            appointment: data[0],
            serviceName: selectedService.name
          } 
        });
      }, 2000);
      
    } catch (error) {
      console.error('Error booking appointment:', error);
      setErrorMessage('Failed to book appointment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Service Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Select Service</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map(service => (
            <div
              key={service.id}
              className={`p-4 border rounded-md cursor-pointer transition-colors ${
                selectedService?.id === service.id
                  ? 'bg-pink-50 border-pink-400'
                  : 'bg-white border-gray-200 hover:border-pink-300'
              }`}
              onClick={() => setSelectedService(service)}
            >
              <h4 className="font-medium text-gray-800">{service.name}</h4>
              <div className="flex justify-between mt-2 text-sm">
                <span>₽{service.price}</span>
                <span>{service.duration} min</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Date & Time Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DatePicker
          selectedDate={selectedDate}
          onChange={setSelectedDate}
        />
        
        <TimeSlotPicker
          selectedDate={selectedDate}
          timeSlots={timeSlots}
          selectedTimeSlot={selectedTimeSlot}
          onSelectTimeSlot={setSelectedTimeSlot}
        />
      </div>
      
      {/* Client Info */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Your Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
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
            <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="clientEmail"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
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
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
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
      
      {/* Error & Success Messages */}
      {errorMessage && (
        <div className="p-4 bg-red-50 text-red-800 rounded-md">
          {errorMessage}
        </div>
      )}
      
      {successMessage && (
        <div className="p-4 bg-green-50 text-green-800 rounded-md">
          {successMessage}
        </div>
      )}
      
      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-md font-medium transition-colors disabled:bg-gray-400"
          disabled={isLoading || !selectedService || !selectedDate || !selectedTimeSlot}
        >
          {isLoading ? 'Запись...' : 'Записаться'}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;