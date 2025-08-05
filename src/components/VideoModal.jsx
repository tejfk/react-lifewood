// This file remains the same. Copy it from the previous single-page version.
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
const VideoModal = ({ isOpen, setOpen }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} onClick={(e) => e.stopPropagation()} className="relative bg-black rounded-lg shadow-xl w-full max-w-4xl aspect-video">
            <button onClick={() => setOpen(false)} className="absolute -top-3 -right-3 bg-white text-black rounded-full p-1 z-10"><FiX size={20} /></button>
            <iframe className="w-full h-full rounded-lg" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default VideoModal;