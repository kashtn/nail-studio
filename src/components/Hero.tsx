import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" 
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center md:text-left">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-6xl font-serif font-medium text-white mb-4 leading-tight">
            Поднимите свой <span className="text-pink-300">маникюр</span> на новый уровень
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Премиальные услуги по уходу за ногтями, созданные специально для вас и выполненные экспертами.
            Запишитесь сегодня и почувствуйте разницу.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
            <Link 
              to="/booking" 
              className="px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-md font-medium transition-colors duration-300 transform hover:scale-105"
            >
              Записаться
            </Link>
            <Link 
              to="/services" 
              className="px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-pink-600 rounded-md font-medium transition-all duration-300"
            >
              Наши услуги
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;