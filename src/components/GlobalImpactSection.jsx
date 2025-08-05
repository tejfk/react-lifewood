import React from 'react';
import { motion } from 'framer-motion';

const regions = [
  { flag: '🇵🇭', name: 'Philippines', role: 'Ethical hiring & annotation hub' },
  { flag: '🇨🇳', name: 'China', role: 'AI delivery partner for local tech' },
  { flag: '🇺🇸', name: 'United States', role: 'Smart city & finance projects' },
  { flag: '🇦🇪', name: 'UAE', role: 'Government & enterprise partnerships' },
  { flag: '🇦🇺', name: 'Australia', role: 'Data science & research center' }
];

const GlobalImpactSection = () => {
  return (
    <section className="bg-paper py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-lifewood-green sm:text-4xl">Where We Work, Who We Serve</h2>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {regions.map((region, index) => (
                <motion.div 
                    key={region.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                    <span className="text-5xl mb-4">{region.flag}</span>
                    <h3 className="text-lg font-bold text-gray-900">{region.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{region.role}</p>
                </motion.div>
            ))}
        </div>
        <p className="mt-12 text-center text-lg italic text-gray-700 max-w-3xl mx-auto">“We meet teams where they are — in culture, language, and purpose.”</p>
      </div>
    </section>
  );
};
export default GlobalImpactSection;