import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* --- NEW IMAGE IN MODAL --- */}
          <div className="w-full h-48 bg-gray-200">
             <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
          </div>
          {/* --- END IMAGE --- */}

          <header className="p-6 border-b flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-lifewood-green">{project.title}</h2>
              <span className="text-sm font-semibold bg-lifewood-saffron/20 text-lifewood-saffron px-2 py-0.5 rounded-full">{project.industry}</span>
            </div>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition-colors"><FiX size={24} /></button>
          </header>
          <div className="p-8 overflow-y-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{project.fullDescription}</p>
            <h3 className="font-bold text-gray-800 mb-4">Key Achievements:</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span><strong>Dataset Size:</strong> {project.details.dataset}</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span><strong>Language Support:</strong> {project.details.languages}</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span><strong>Primary Outcome:</strong> {project.details.outcome}</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
export default ProjectModal;