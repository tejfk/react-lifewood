import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import MainLogo from '../assets/mainlogo2.png';
import LanguageToggle from './LanguageToggle';
import { FiX, FiMenu } from 'react-icons/fi';

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.services'), path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center h-20">
        <Link to="/" className="flex items-center">
          <img src={MainLogo} alt="Lifewood Logo" className="h-8 w-auto" />
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => 
                `relative font-medium text-gray-700 hover:text-lifewood-saffron transition-colors group ${isActive ? 'text-lifewood-green' : ''}`
              }
              end={link.path === '/'}
            >
              {({ isActive }) => (
                <>
                  {link.name}
                  <span 
                    className={`absolute -bottom-1 left-0 w-full h-0.5 bg-lifewood-saffron transition-transform duration-300 transform group-hover:scale-x-100 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/apply" className="ml-4 block px-4 py-2 bg-lifewood-saffron text-white rounded-full shadow-sm font-semibold">
              Apply Now
            </Link>
          </motion.div>
          <div className="border-l border-gray-300 h-6 mx-2"></div>
          <LanguageToggle />
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 z-50">
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-0 left-0 w-full bg-white shadow-xl pt-24 pb-8"
          >
            <div className="container mx-auto px-6 flex flex-col items-center space-y-6">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.name} 
                  to={link.path} 
                  onClick={() => setIsMenuOpen(false)} 
                  className={({ isActive }) => `text-lg font-semibold ${isActive ? 'text-lifewood-saffron' : 'text-gray-700'}`}
                  end={link.path === '/'}
                >
                  {link.name}
                </NavLink>
              ))}
              <Link to="/apply" onClick={() => setIsMenuOpen(false)} className="mt-4 w-full text-center px-6 py-3 bg-lifewood-saffron text-white rounded-full font-semibold">
                Apply Now
              </Link>
              <div className="pt-4"><LanguageToggle /></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;