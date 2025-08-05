import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiDatabase, FiCpu, FiCloud } from 'react-icons/fi';
import GlobalStatsSection from '../components/GlobalStatsSection';
import GlobalImpactSection from '../components/GlobalImpactSection';
import HeroBackgroundAnimation from '../components/HeroBackgroundAnimation';
import RevealOnScroll from '../components/RevealOnScroll'; // Import the wrapper

const Home = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className="relative h-[80vh] md:h-screen flex items-center justify-center text-center bg-paper overflow-hidden px-4">
        <HeroBackgroundAnimation />
        <div className="relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800">{t('hero.title')}</motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-4 text-base md:text-lg text-gray-600 max-w-md md:max-w-3xl mx-auto">{t('hero.subtitle')}</motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }}><Link to="/services" className="mt-10 inline-block bg-lifewood-green text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-opacity-90 transition-all transform hover:scale-105">{t('hero.cta')}</Link></motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <RevealOnScroll>
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t('home_about_preview.title')}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">{t('home_about_preview.description')}</p>
              <Link to="/about" className="font-bold text-lifewood-green hover:underline">{t('home_about_preview.cta')}</Link>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1470&q=80" alt="Team at Lifewood" className="rounded-lg shadow-xl"/>
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-sea-salt">
        <div className="container mx-auto px-6">
          <RevealOnScroll>
            <div className="text-center mb-12"><h2 className="text-3xl sm:text-4xl font-bold">Core Capabilities</h2></div>
          </RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <RevealOnScroll delay={0.1}><div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all"><FiDatabase className="text-lifewood-saffron w-12 h-12 mb-4" /><h3 className="font-bold text-xl mb-2">Data Annotation</h3></div></RevealOnScroll>
            <RevealOnScroll delay={0.2}><div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all"><FiCpu className="text-lifewood-saffron w-12 h-12 mb-4" /><h3 className="font-bold text-xl mb-2">Intelligent Automation</h3></div></RevealOnScroll>
            <RevealOnScroll delay={0.3}><div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-all"><FiCloud className="text-lifewood-saffron w-12 h-12 mb-4" /><h3 className="font-bold text-xl mb-2">Cloud AI</h3></div></RevealOnScroll>
          </div>
        </div>
      </section>
      
      <GlobalStatsSection />
      <GlobalImpactSection />

      <section className="py-16 md:py-20 bg-lifewood-green text-white">
        <RevealOnScroll>
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">Join the AI Revolution with Lifewood</h2>
            <motion.div className="inline-block mt-8" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/contact" className="block bg-lifewood-saffron text-lifewood-green font-bold py-3 px-8 rounded-full">Get Started</Link>
            </motion.div>
          </div>
        </RevealOnScroll>
      </section>
    </>
  );
};
export default Home;