import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import { Service } from '../types/service';
import { supabase } from '../lib/supabase';

const BookingPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const serviceIdParam = searchParams.get('service');
  const initialServiceId = serviceIdParam ? parseInt(serviceIdParam, 10) : undefined;
  
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        // Fetch services from Supabase
        const { data, error } = await supabase
          .from('services')
          .select('*');
        
        if (error) throw error;
        
        if (data) {
          setServices(data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        
        // Fallback data for demo purposes
        setServices([
          {
            id: 1,
            name: 'Classic Manicure',
            description: 'A traditional manicure with nail shaping, cuticle care, hand massage, and polish of your choice.',
            price: 25,
            duration: 30,
            image_url: 'https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            created_at: new Date().toISOString()
          },
          {
            id: 2,
            name: 'Gel Manicure',
            description: 'Long-lasting gel polish application that protects your natural nails while providing gorgeous, chip-free color for weeks.',
            price: 40,
            duration: 45,
            image_url: 'https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            created_at: new Date().toISOString()
          },
          {
            id: 3,
            name: 'Luxury Pedicure',
            description: 'Indulge in our luxury pedicure with exfoliation, callus removal, extended massage, and perfect polish.',
            price: 55,
            duration: 60,
            image_url: 'https://images.pexels.com/photos/3997385/pexels-photo-3997385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            created_at: new Date().toISOString()
          },
          {
            id: 4,
            name: 'Gel Extensions',
            description: 'Stunning gel extensions that provide strength, length and the perfect canvas for nail art.',
            price: 70,
            duration: 90,
            image_url: 'https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            created_at: new Date().toISOString()
          },
          {
            id: 5,
            name: 'Custom Nail Art',
            description: 'Express your personal style with custom hand-painted designs, glitter, gems, or 3D elements.',
            price: 20,
            duration: 30,
            image_url: 'https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            created_at: new Date().toISOString()
          },
          {
            id: 6,
            name: 'Paraffin Treatment',
            description: 'Soothe and moisturize dry hands with a warm paraffin wax treatment that leaves skin soft and rejuvenated.',
            price: 25,
            duration: 20,
            image_url: 'https://images.pexels.com/photos/3997304/pexels-photo-3997304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            created_at: new Date().toISOString()
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-pink-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-800 mb-4">Запись на прием</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Запланируйте ваш следующий визит с помощью нашей удобной системы онлайн-записи.
          </p>
        </div>
      </section>
      
      {/* Booking Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            {loading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                <div className="h-32 bg-gray-200 rounded mb-6"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            ) : (
              <BookingForm 
                services={services} 
                initialServiceId={initialServiceId}
              />
            )}
          </div>
        </div>
      </section>
      
      {/* Booking Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-medium text-gray-800 mb-3">Booking Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium text-gray-800 mb-4">What to Expect</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span>Please arrive 5-10 minutes before your scheduled appointment time.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span>If you're getting a pedicure, wearing open-toe shoes is recommended.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span>For hygiene reasons, please avoid shaving 24-48 hours before a pedicure.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span>If you have any existing nail conditions, please inform your technician.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium text-gray-800 mb-4">Cancellation Policy</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span>Please provide at least 24 hours' notice for cancellations or rescheduling.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span>Late cancellations (less than 24 hours) may incur a 50% service fee.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span>No-shows will be charged the full service amount.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span>Arriving more than 15 minutes late may result in rescheduling your appointment.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;