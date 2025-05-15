import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset form status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-pink-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-gray-800 mb-4">Свяжитесь с нами</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Есть вопросы или нужна помощь? Мы здесь, чтобы помочь. Свяжитесь с нашей командой.
          </p>
        </div>
      </section>
      
      {/* Contact Information and Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-serif font-medium text-gray-800 mb-6">Свяжитесь с нами</h2>
              
              <div className="space-y-6 mb-8">
                <ContactInfoItem 
                  icon={<MapPin className="w-6 h-6 text-pink-500" />}
                  title="Our Location"
                  content={<>123 Beauty Street, Suite 100<br />New York, NY 10001</>}
                />
                
                <ContactInfoItem 
                  icon={<Phone className="w-6 h-6 text-pink-500" />}
                  title="Phone Number"
                  content={<a href="tel:+12125551234" className="hover:text-pink-600 transition-colors">(212) 555-1234</a>}
                />
                
                <ContactInfoItem 
                  icon={<Mail className="w-6 h-6 text-pink-500" />}
                  title="Email Address"
                  content={<a href="mailto:info@nailartistry.com" className="hover:text-pink-600 transition-colors">info@nailartistry.com</a>}
                />
                
                <ContactInfoItem 
                  icon={<Clock className="w-6 h-6 text-pink-500" />}
                  title="Business Hours"
                  content={<>
                    Monday - Friday: 9:00 AM - 7:00 PM<br />
                    Saturday: 9:00 AM - 6:00 PM<br />
                    Sunday: 10:00 AM - 4:00 PM
                  </>}
                />
              </div>
              
              {/* Map Placeholder */}
              <div className="bg-gray-200 h-64 rounded-lg overflow-hidden relative">
                <iframe 
                  title="Salon Location"
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48375.81600343123!2d-74.0059413021785!3d40.7127847918849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1651159554583!5m2!1sen!2sus"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-serif font-medium text-gray-800 mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Тема
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                    required
                  >
                    <option value="">Выберите тему</option>
                    <option value="Booking Question">Вопрос по записи</option>
                    <option value="Service Inquiry">Вопрос по услугам</option>
                    <option value="Feedback">Отзыв</option>
                    <option value="Career Opportunity">Вакансии</option>
                    <option value="Other">Другое</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Ваше сообщение
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-300 focus:border-transparent"
                    required
                  ></textarea>
                </div>
                
                {formStatus === 'success' && (
                  <div className="p-4 bg-green-50 text-green-800 rounded-md">
                    Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время!
                  </div>
                )}
                
                {formStatus === 'error' && (
                  <div className="p-4 bg-red-50 text-red-800 rounded-md">
                    Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.
                  </div>
                )}
                
                <button
                  type="submit"
                  className="flex items-center justify-center w-full px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-md font-medium transition-colors disabled:bg-pink-300"
                  disabled={formStatus === 'submitting'}
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Send size={18} className="mr-2" />
                      Отправить сообщение
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-medium text-gray-800 mb-3">Часто задаваемые вопросы</h2>
              <p className="text-gray-600">
                Найдите ответы на часто задаваемые вопросы о нашем салоне и услугах.
              </p>
            </div>
            
            <div className="space-y-6">
              <FAQItem 
                question="Как записаться на прием?" 
                answer="Вы можете записаться на прием через нашу онлайн-систему бронирования, позвонив нам по телефону +7 (495) 123-45-67 или посетив наш салон лично. Онлайн-запись доступна 24/7 для вашего удобства."
              />
              <FAQItem 
                question="Что делать, если нужно отменить запись?" 
                answer="Мы понимаем, что планы могут измениться. Пожалуйста, сообщите об отмене как минимум за 24 часа, чтобы избежать штрафа за отмену. Вы можете отменить запись через нашу онлайн-систему или позвонив нам напрямую."
              />
              <FAQItem 
                question="Предлагаете ли вы подарочные карты?" 
                answer="Да! Подарочные карты можно приобрести в салоне или онлайн. Они станут отличным подарком на день рождения, праздники или любой особый случай. Подарочные карты можно использовать для любых услуг или товаров."
              />
              <FAQItem 
                question="Какие меры безопасности COVID-19 у вас действуют?" 
                answer="Мы уделяем приоритетное внимание здоровью и безопасности наших клиентов и персонала. Наш салон следует всем местным санитарным нормам, включая усиленные процедуры очистки, проверки здоровья персонала и соответствующие меры социального дистанцирования, где это требуется."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ icon, title, content }) => {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-1">{title}</h3>
        <div className="text-gray-600">{content}</div>
      </div>
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
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <button 
        className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none hover:bg-gray-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-800">{question}</h3>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </span>
      </button>
      <div 
        className={`px-6 overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

export default ContactPage;