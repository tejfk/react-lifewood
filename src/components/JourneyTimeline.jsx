import React from 'react';
import { motion } from 'framer-motion';

const timelineEvents = [
  { year: "2004", event: "Founded to bring ethical innovation and human-centric design to the global data industry." },
  { year: "2010", event: "Scaled our first major delivery teams across the Asia-Pacific region, establishing a global footprint." },
  { year: "2015", event: "Deployed large-scale multilingual NLP projects, supporting over 50 languages for enterprise clients." },
  { year: "2018", event: "Became a trusted partner for complex global genealogy and sensitive government data work." },
  { year: "2024", event: "Reached a milestone of over 30,000 team members operating across 16+ countries worldwide." }
];

const JourneyTimeline = () => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center tracking-tight text-lifewood-green sm:text-4xl mb-16">The Lifewood Journey</h2>
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-lifewood-saffron/30" aria-hidden="true"></div>
          <div className="space-y-16">
            {timelineEvents.map((item, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute left-1/2 -translate-x-1/2 -mt-1 w-8 h-8 bg-lifewood-saffron rounded-full border-4 border-white flex items-center justify-center">
                  <div className="w-3 h-3 bg-lifewood-green rounded-full"></div>
                </div>
                <div className={`w-full flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className="w-full md:w-5/12 p-6 bg-paper rounded-lg shadow-lg">
                    <h3 className="font-bold text-lifewood-green text-2xl">{item.year}</h3>
                    <p className="text-gray-600 mt-2">{item.event}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default JourneyTimeline;