import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const InterviewModal = ({ applicant, onSubmit, onClose }) => {
  const [details, setDetails] = useState({ date: '', time: '', venue: '' });
  
  if (!applicant) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (details.date && details.time && details.venue) {
      onSubmit(applicant.id, details);
      onClose();
    } else {
      alert("Please fill out all interview details.");
    }
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
          <header className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-bold text-lifewood-green">Schedule Interview for {applicant.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><FiX size={24} /></button>
          </header>
          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            <div><label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label><input type="date" id="date" value={details.date} onChange={(e) => setDetails({...details, date: e.target.value})} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lifewood-saffron" /></div>
            <div><label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label><input type="time" id="time" value={details.time} onChange={(e) => setDetails({...details, time: e.target.value})} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lifewood-saffron" /></div>
            <div><label htmlFor="venue" className="block text-sm font-medium text-gray-700">Venue / Link</label><input type="text" id="venue" placeholder="e.g., Google Meet Link or Office Address" value={details.venue} onChange={(e) => setDetails({...details, venue: e.target.value})} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lifewood-saffron" /></div>
            <div className="pt-4 flex justify-end">
              <button type="submit" className="bg-lifewood-green text-white px-6 py-2 rounded-md hover:bg-opacity-90">Schedule & Send Email</button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
export default InterviewModal;