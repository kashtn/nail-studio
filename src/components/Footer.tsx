import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, MapPin, Phone, Clock, Mail as Nail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Nail size={24} className="text-pink-400" />
              <span className="text-xl font-serif">NailArtistry</span>
            </div>
            <p className="text-gray-400 mb-6">
              Поднимите свой опыт ухода за ногтями с нашими премиальными услугами. Мы специализируемся на создании красивых, 
              долговечных дизайнов ногтей, адаптированных под ваш личный стиль.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://instagram.com" icon={<Instagram size={20} />} label="Instagram" />
              <SocialLink href="https://facebook.com" icon={<Facebook size={20} />} label="Facebook" />
              <SocialLink href="https://twitter.com" icon={<Twitter size={20} />} label="Twitter" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <FooterLink to="/" label="Главная" />
              <FooterLink to="/services" label="Услуги" />
              <FooterLink to="/booking" label="Записаться" />
              <FooterLink to="/gallery" label="Галерея" />
              <FooterLink to="/contact" label="Контакты" />
              <FooterLink to="/login" label="Личный кабинет" />
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-medium mb-4">Наши услуги</h3>
            <ul className="space-y-2">
              <FooterLink to="/services#manicure" label="Маникюр" />
              <FooterLink to="/services#pedicure" label="Педикюр" />
              <FooterLink to="/services#gel-nails" label="Гель-лак" />
              <FooterLink to="/services#acrylic" label="Наращивание" />
              <FooterLink to="/services#nail-art" label="Дизайн ногтей" />
              <FooterLink to="/services#spa" label="СПА-уход" />
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-4">Контактная информация</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-pink-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">ул. Красоты, 123<br />Москва, 123456</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-pink-400 mr-3 flex-shrink-0" />
                <a href="tel:+74951234567" className="text-gray-400 hover:text-pink-400 transition-colors">
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-pink-400 mr-3 flex-shrink-0" />
                <a href="mailto:info@nailartistry.ru" className="text-gray-400 hover:text-pink-400 transition-colors">
                  info@nailartistry.ru
                </a>
              </li>
              <li className="flex items-start">
                <Clock size={20} className="text-pink-400 mr-3 mt-1 flex-shrink-0" />
                <div className="text-gray-400">
                  <p>Пн-Пт: 9:00 - 20:00</p>
                  <p>Сб: 10:00 - 18:00</p>
                  <p>Вс: 10:00 - 16:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} NailArtistry. Все права защищены.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-pink-400 transition-colors">Политика конфиденциальности</Link>
            <Link to="/terms" className="hover:text-pink-400 transition-colors">Условия использования</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-500 transition-colors"
    aria-label={label}
  >
    {icon}
  </a>
);

interface FooterLinkProps {
  to: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, label }) => (
  <li>
    <Link to={to} className="text-gray-400 hover:text-pink-400 transition-colors">
      {label}
    </Link>
  </li>
);

export default Footer;