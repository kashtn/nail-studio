import React, { useState } from 'react';
import { X } from 'lucide-react';

const GalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  
  const galleryImages = [
    {
      id: 1,
      src: 'https://images.pexels.com/photos/704815/pexels-photo-704815.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      alt: 'Red manicure with flower design',
      category: 'manicure'
    },
    {
      id: 2,
      src: 'https://images.pexels.com/photos/3997385/pexels-photo-3997385.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      alt: 'Pink gel nails with rhinestones',
      category: 'gel'
    },
    {
      id: 3,
      src: 'https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      alt: 'Blue ombre nail design',
      category: 'art'
    },
    {
      id: 4,
      src: 'https://images.pexels.com/photos/3997304/pexels-photo-3997304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      alt: 'French manicure with thin line',
      category: 'manicure'
    },
    {
      id: 5,
      src: 'https://images.pexels.com/photos/939836/pexels-photo-939836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      alt: 'Nude nails with marble design',
      category: 'art'
    },
    {
      id: 6,
      src: 'https://images.pexels.com/photos/3997383/pexels-photo-3997383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      alt: 'French pedicure with flower accent',
      category: 'pedicure'
    },
    {
      id: 7,
      src: 'https://images.pexels.com/photos/3997388/pexels-photo-3997388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      alt: 'Acrylic extensions with detailed art',
      category: 'acrylic'
    },
    {
      id: 8,
      src: 'https://images.pexels.com/photos/3997393/pexels-photo-3997393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      alt: 'White nails with gold accents',
      category: 'gel'
    },
    {
      id: 9,
      src: 'https://images.pexels.com/photos/4046316/pexels-photo-4046316.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      alt: 'Black matte nails with glossy details',
      category: 'manicure'
    },
    {
      id: 10,
      src: 'https://images.pexels.com/photos/3997375/pexels-photo-3997375.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      alt: 'Pink and white ombre with crystals',
      category: 'art'
    },
    {
      id: 11,
      src: 'https://images.pexels.com/photos/7765057/pexels-photo-7765057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      alt: 'Holiday-themed nail art design',
      category: 'art'
    },
    {
      id: 12,
      src: 'https://images.pexels.com/photos/6621462/pexels-photo-6621462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      alt: 'Rainbow design for children',
      category: 'art'
    }
  ];

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-pink-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-800 mb-4">Галерея дизайнов ногтей</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Просмотрите нашу коллекцию красивых дизайнов ногтей и вдохновитесь для вашего следующего визита.
          </p>
        </div>
      </section>
      
      {/* Gallery Filter */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <FilterButton 
              label="Все дизайны" 
              isActive={filter === 'all'} 
              onClick={() => setFilter('all')} 
            />
            <FilterButton 
              label="Маникюр" 
              isActive={filter === 'manicure'} 
              onClick={() => setFilter('manicure')} 
            />
            <FilterButton 
              label="Педикюр" 
              isActive={filter === 'pedicure'} 
              onClick={() => setFilter('pedicure')} 
            />
            <FilterButton 
              label="Гель-лак" 
              isActive={filter === 'gel'} 
              onClick={() => setFilter('gel')} 
            />
            <FilterButton 
              label="Наращивание" 
              isActive={filter === 'acrylic'} 
              onClick={() => setFilter('acrylic')} 
            />
            <FilterButton 
              label="Дизайн" 
              isActive={filter === 'art'} 
              onClick={() => setFilter('art')} 
            />
          </div>
        </div>
      </section>
      
      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map(image => (
              <div 
                key={image.id} 
                className="overflow-hidden rounded-lg shadow-md cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => setSelectedImage(image.src)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
          
          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} />
          </button>
          <img 
            src={selectedImage} 
            alt="Enlarged nail design" 
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      
      {/* CTA Section */}
      <section className="py-16 bg-pink-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-medium text-gray-800 mb-4">Love What You See?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Book an appointment today and let our talented nail artists create a design perfect for you.
          </p>
          <a 
            href="/booking" 
            className="inline-block px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-md font-medium transition-colors transform hover:scale-105"
          >
            Book Now
          </a>
        </div>
      </section>
    </div>
  );
};

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
        isActive
          ? 'bg-pink-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default GalleryPage;