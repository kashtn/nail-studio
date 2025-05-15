import React from 'react';
import { Clock, RussianRuble } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Service } from '../types/service';

interface ServiceCardProps {
  service: Service;
  featured?: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, featured = false }) => {
  const { id, name, description, price, duration, image_url } = service;
  
  return (
    <div 
      className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full ${
        featured ? 'border-2 border-pink-400' : ''
      }`}
    >
      <div 
        className="h-48 bg-cover bg-center relative" 
        style={{ backgroundImage: `url(${image_url || 'https://images.pexels.com/photos/3997385/pexels-photo-3997385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'})` }}
      >
        {featured && (
          <div className="absolute top-0 right-0 bg-pink-500 text-white px-3 py-1 rounded-bl-lg font-medium">
            Популярная
          </div>
        )}
      </div>
      
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-serif font-medium text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-gray-600">
            <Clock size={16} className="mr-1" />
            <span>{duration} мин</span>
          </div>
          <div className="flex items-center text-gray-800 font-medium">
            <RussianRuble size={16} className="mr-1" />
            <span>{price}</span>
          </div>
        </div>
      </div>
      
      <div className="px-6 pb-6">
        <Link
          to={`/booking?service=${id}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="block w-full py-2 bg-pink-500 hover:bg-pink-600 text-white text-center rounded-md font-medium transition-colors"
        >
          Записаться
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;