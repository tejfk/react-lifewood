import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiDownload } from 'react-icons/fi';

// --- Resume Viewer Modal ---
const ResumeModal = ({ resumeUrl, onClose }) => {
    if (!resumeUrl) return null;

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-[100] p-4">
                <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden">
                    <header className="p-4 border-b flex justify-between items-center bg-gray-50">
                        <h2 className="text-lg font-bold text-gray-800">Resume Preview</h2>
                        <div className="flex items-center space-x-4">
                            <a href={resumeUrl} download target="_blank" rel="noopener noreferrer" className="flex items-center bg-lifewood-green text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-opacity-90 transition-colors">
                                <FiDownload className="mr-2" /> Download
                            </a>
                            <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><FiX size={24} /></button>
                        </div>
                    </header>
                    <div className="flex-grow w-full h-full">
                        <iframe src={resumeUrl} title="Resume Viewer" className="w-full h-full border-0" />
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
export default ResumeModal;