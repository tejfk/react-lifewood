import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend } from 'react-icons/fi';

const LiveDemoModal = ({ isOpen, onClose }) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    setIsLoading(true);
    setResult(null);
    setTimeout(() => {
      const sentiments = [
        { label: 'Positive', color: 'text-green-600', emoji: '😊' },
        { label: 'Neutral', color: 'text-yellow-600', emoji: '😐' },
        { label: 'Negative', color: 'text-red-600', emoji: '😠' },
      ];
      const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
      setResult(randomSentiment);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
            className="relative bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl text-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"><FiX size={24} /></button>
            <h2 className="text-2xl font-bold mb-2 text-lifewood-green">Live AI Demo</h2>
            <p className="text-gray-600 mb-6">Enter text to see our AI determine its sentiment.</p>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g., 'Lifewood's technology is truly innovative!'"
              className="w-full h-24 p-3 bg-sea-salt border border-gray-200 rounded-lg focus:ring-2 focus:ring-lifewood-saffron focus:outline-none transition"
            />
            <button
              onClick={handleAnalyze}
              disabled={isLoading || !inputText}
              className="mt-4 w-full flex items-center justify-center bg-lifewood-saffron text-lifewood-green font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiSend className="mr-2" />
              {isLoading ? 'Analyzing...' : 'Analyze Sentiment'}
            </button>
            {isLoading && (
              <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="mt-6 text-center text-gray-500"><p>Processing with our AI model...</p></motion.div>
            )}
            {result && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-lifewood-green/10 rounded-lg text-center">
                <p className="text-lg text-gray-700">Result: <span className={`font-bold ${result.color}`}>{result.label} {result.emoji}</span></p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default LiveDemoModal;