import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const ProjectCard = ({ project, onReadMore }) => {
  return (
    // --- Microinteraction Styles Applied ---
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
    >
      <div className="aspect-video overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </div>
      
      <div className="p-8 flex-grow">
        <span className="text-xs font-bold uppercase text-lifewood-saffron tracking-wider">{project.industry}</span>
        <h3 className="mt-2 text-2xl font-bold text-lifewood-green">{project.title}</h3>
        <p className="mt-4 text-gray-600 flex-grow">{project.summary}</p>
      </div>
      <div className="bg-sea-salt p-6">
        <h4 className="font-semibold text-gray-800 mb-3">Highlights:</h4>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>{project.details.dataset}</li>
          <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>{project.details.outcome}</li>
        </ul>
      </div>
      <motion.button 
        onClick={onReadMore} 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-auto bg-gray-100 group-hover:bg-lifewood-saffron text-lifewood-green font-bold py-3 px-4 transition-colors duration-300 flex items-center justify-center"
      >
        Read More <FiArrowRight className="ml-2" />
      </motion.button>
    </motion.div>
  );
};
export default ProjectCard;