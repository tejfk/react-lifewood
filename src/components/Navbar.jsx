import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const Navbar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const navLinks = ["Solutions", "About", "Careers", "Contact"];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-lifewood-green dark:text-white font-manrope">
          Lifewood<span className="text-lifewood-saffron">.</span>
        </a>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="font-manrope text-gray-700 dark:text-gray-300 relative group">
              <span>{link}</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-lifewood-green dark:bg-lifewood-saffron transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </a>
          ))}
        </nav>
        <div className="md:hidden">
           <button className="text-lifewood-green dark:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
           </button>
        </div>
      </div>
      <motion.div className="h-1 bg-lifewood-green dark:bg-lifewood-saffron" style={{ scaleX }} />
    </header>
  );
};
export default Navbar;