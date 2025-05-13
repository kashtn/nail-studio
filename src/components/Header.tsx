import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mail as Nail, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Nail size={28} className="text-pink-400" />
          <span className="text-2xl font-serif font-medium text-gray-800">NailArtistry</span>
        </Link>
        
        {/* Десктопная навигация */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" label="Главная" currentPath={location.pathname} onClick={closeMenu} />
          <NavLink to="/services" label="Услуги" currentPath={location.pathname} onClick={closeMenu} />
          <NavLink to="/booking" label="Записаться" currentPath={location.pathname} onClick={closeMenu} highlight />
          <NavLink to="/gallery" label="Галерея" currentPath={location.pathname} onClick={closeMenu} />
          <NavLink to="/contact" label="Контакты" currentPath={location.pathname} onClick={closeMenu} />
          
          {user ? (
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 click:text-pink-600 transition-colors">
                <User size={18} />
                <span>Аккаунт</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 hidden group-hover:block">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50">Мой профиль</Link>
                <Link to="/appointments" className="block px-4 py-2 text-sm text-gray-700 hover:bg-pink-50">Мои записи</Link>
                <button 
                  onClick={handleSignOut} 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-pink-50"
                >
                  Выйти
                </button>
              </div>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="text-gray-700 hover:text-pink-600 transition-colors"
            >
              Войти
            </Link>
          )}
        </nav>
        
        {/* Кнопка мобильного меню */}
        <button 
          className="md:hidden text-gray-700 focus:outline-none" 
          onClick={toggleMenu}
          aria-label="Переключить меню"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Мобильная навигация */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <NavLink to="/" label="Главная" currentPath={location.pathname} onClick={closeMenu} />
            <NavLink to="/services" label="Услуги" currentPath={location.pathname} onClick={closeMenu} />
            <NavLink to="/booking" label="Записаться" currentPath={location.pathname} onClick={closeMenu} highlight />
            <NavLink to="/gallery" label="Галерея" currentPath={location.pathname} onClick={closeMenu} />
            <NavLink to="/contact" label="Контакты" currentPath={location.pathname} onClick={closeMenu} />
            
            {user ? (
              <>
                <Link 
                  to="/profile" 
                  className="py-2 text-gray-700 hover:text-pink-600 transition-colors"
                  onClick={closeMenu}
                >
                  Мой профиль
                </Link>
                <Link 
                  to="/appointments" 
                  className="py-2 text-gray-700 hover:text-pink-600 transition-colors"
                  onClick={closeMenu}
                >
                  Мои записи
                </Link>
                <button 
                  onClick={handleSignOut} 
                  className="py-2 text-left text-gray-700 hover:text-pink-600 transition-colors"
                >
                  Выйти
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="py-2 text-gray-700 hover:text-pink-600 transition-colors"
                onClick={closeMenu}
              >
                Войти
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  currentPath: string;
  onClick: () => void;
  highlight?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, currentPath, onClick, highlight }) => {
  const isActive = currentPath === to;
  
  return (
    <Link
      to={to}
      className={`${
        highlight
          ? 'px-4 py-2 rounded-md bg-pink-500 text-white hover:bg-pink-600 transition-colors'
          : isActive
          ? 'text-pink-600 font-medium'
          : 'text-gray-700 hover:text-pink-600 transition-colors'
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default Header;