import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import { Service } from '../types/service';
import { supabase } from '../lib/supabase';
import defaultServices from '../data/services';

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
        // Use default services if fetch fails
        setServices(defaultServices);
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
              <h2 className="text-3xl font-serif font-medium text-gray-800 mb-3">Информация о записи</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium text-gray-800 mb-4">Что ожидать</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span>Пожалуйста, приходите за 5-10 минут до назначенного времени.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span>Если вы записаны на педикюр, рекомендуется надеть открытую обувь.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span>По гигиеническим причинам, пожалуйста, избегайте бритья за 24-48 часов до педикюра.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span>Если у вас есть какие-либо проблемы с ногтями, пожалуйста, сообщите об этом мастеру.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-medium text-gray-800 mb-4">Правила отмены</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span>Пожалуйста, сообщайте об отмене или переносе записи не менее чем за 24 часа.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span>Поздняя отмена (менее 24 часов) может повлечь оплату 50% от стоимости услуги.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span>Неявка без предупреждения оплачивается в полном размере.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-500 mr-2">•</span>
                    <span>Опоздание более чем на 15 минут может привести к переносу записи.</span>
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