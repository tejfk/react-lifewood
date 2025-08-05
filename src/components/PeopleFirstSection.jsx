import React from 'react';
import { motion } from 'framer-motion';

const PeopleFirstSection = () => {
  return (
    <section className="bg-lifewood-green text-white py-16 sm:py-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-6 lg:px-8 text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">People First, AI Next</h2>
        <p className="mt-6 text-lg leading-8 text-gray-200">
            Lifewood is built on people. We hire inclusively, train responsibly, and lead with ethics — from Bangladesh to California, our team thrives through diversity and empowerment. Our commitment to creating opportunity is the foundation of every data point we process.
        </p>
        <blockquote className="mt-10 border-l-4 border-lifewood-saffron pl-6 text-xl italic font-medium text-white">
            <p>“We don’t just build data — we build opportunity.”</p>
        </blockquote>
      </motion.div>
    </section>
  );
};
export default PeopleFirstSection;