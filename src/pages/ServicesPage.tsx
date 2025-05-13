import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import { Service } from '../types/service';
import { supabase } from '../lib/supabase';

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<string[]>(['All', 'Manicure', 'Pedicure', 'Extensions', 'Nail Art', 'Spa']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        // Fetch services from Supabase
        let query = supabase
          .from('services')
          .select('*');
        
        const { data, error } = await query;
        
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

  // Filter services based on selected category
  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(service => {
        // In a real app, we would have a category field
        // This is just a mock filtering for demo purposes
        const serviceName = service.name.toLowerCase();
        return serviceName.includes(selectedCategory.toLowerCase());
      });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-pink-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-800 mb-4">Наши услуги</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Откройте для себя наш ассортимент премиальных услуг по уходу за ногтями, разработанных для поддержания красоты ваших рук и ног.
          </p>
        </div>
      </section>
      
      {/* Services Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map(category => (
                <button
                  key={category}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-pink-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Services Grid */}
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-pulse w-full max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="bg-gray-200 rounded-lg h-80"></div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredServices.map(service => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No services found in this category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      
      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-medium text-gray-800 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our services and booking process.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <FAQItem 
              question="How long do gel nails typically last?" 
              answer="Our gel manicures typically last 2-3 weeks without chipping or peeling, depending on your natural nail growth and daily activities. Proper aftercare can help extend the life of your gel nails."
            />
            <FAQItem 
              question="What should I do if my nail breaks or chips?" 
              answer="If you experience a break or chip, please contact us to schedule a quick repair appointment. Avoid trying to fix it yourself as this may cause more damage. Minor repairs can usually be accommodated within 15-30 minutes."
            />
            <FAQItem 
              question="How often should I get a manicure or pedicure?" 
              answer="For regular nail polish, we recommend a manicure every 1-2 weeks and a pedicure every 3-4 weeks. For gel or dip powder nails, every 2-3 weeks is ideal to maintain their appearance as your natural nails grow."
            />
            <FAQItem 
              question="Can I reschedule or cancel my appointment?" 
              answer="Yes, you can reschedule or cancel your appointment through our online booking system or by calling us. We appreciate at least 24 hours' notice for cancellations to allow us to offer the time slot to another client."
            />
            <FAQItem 
              question="Do you offer nail services for special occasions?" 
              answer="Absolutely! We offer special packages for weddings, proms, and other special events. You can book individual appointments or group bookings. We recommend booking well in advance for special occasions, especially during peak seasons."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="flex items-center justify-between w-full text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-gray-800">{question}</h3>
        <ChevronDown 
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </button>
      <div 
        className={`mt-2 text-gray-600 overflow-hidden transition-all ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="pb-2">{answer}</p>
      </div>
    </div>
  );
};

export default ServicesPage;