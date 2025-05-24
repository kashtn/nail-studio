import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-medium text-gray-800 mb-4">
            Контакты
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Мы всегда рады ответить на ваши вопросы и помочь с выбором услуг. 
            Свяжитесь с нами любым удобным способом.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-serif font-medium text-gray-800 mb-6">
              Наши контакты
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="font-medium text-gray-800">Адрес</h3>
                  <p className="text-gray-600">
                    г. Москва, ул. Примерная, д. 123
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="font-medium text-gray-800">Телефон</h3>
                  <p className="text-gray-600">
                    <a href="tel:+74951234567" className="hover:text-pink-500 transition-colors">
                      +7 (495) 123-45-67
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="font-medium text-gray-800">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:info@nailartistry.ru" className="hover:text-pink-500 transition-colors">
                      info@nailartistry.ru
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Instagram className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="font-medium text-gray-800">Instagram</h3>
                  <p className="text-gray-600">
                    <a 
                      href="https://instagram.com/nailartistry" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-pink-500 transition-colors"
                    >
                      @nailartistry
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-serif font-medium text-gray-800 mb-6">
              Режим работы
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <Clock className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="font-medium text-gray-800">Часы работы</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>Понедельник - Пятница: 10:00 - 20:00</p>
                    <p>Суббота: 10:00 - 19:00</p>
                    <p>Воскресенье: 11:00 - 18:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-serif font-medium text-gray-800 mb-6">
            Как нас найти
          </h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.7657158915027!2d37.61842331590136!3d55.75581798055754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a50b315e573%3A0xa886bf5a3d9b2e68!2z0JzQvtGB0LrQvtCy0YHQutC40Lkg0JrRgNC10LzQu9GM!5e0!3m2!1sru!2sru!4v1647881234567!5m2!1sru!2sru"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;