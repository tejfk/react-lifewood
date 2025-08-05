import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const SolutionCard = ({ icon: Icon, title, description }) => {
    const [isExpanded, setExpanded] = useState(false);
    return (
        <motion.div layout onClick={() => setExpanded(!isExpanded)} className="p-6 rounded-xl cursor-pointer bg-sea-salt dark:bg-gray-800 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <motion.div layout="position" className="flex items-center justify-between">
                <div className="flex items-center">
                    {Icon && <Icon className="w-8 h-8 mr-4 text-lifewood-saffron" />}
                    <h3 className="text-xl font-semibold font-manrope text-lifewood-green dark:text-white">{title}</h3>
                </div>
                <motion.div animate={{ rotate: isExpanded ? 45 : 0 }} transition={{ duration: 0.3 }}>
                    <FiArrowRight className="w-6 h-6 text-lifewood-saffron" />
                </motion.div>
            </motion.div>
            <AnimatePresence>
                {isExpanded && (
                    <motion.p initial={{ opacity: 0, height: 0, marginTop: 0 }} animate={{ opacity: 1, height: 'auto', marginTop: '16px' }} exit={{ opacity: 0, height: 0, marginTop: 0 }} transition={{ duration: 0.3 }} className="text-gray-600 dark:text-gray-300 font-manrope pl-12">
                        {description}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
export default SolutionCard;