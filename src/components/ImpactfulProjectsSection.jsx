import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

// --- Project Card Additions ---
const newProjectsData = [
  {
    id: 1,
    title: "Global Medical NLP Platform – Singapore",
    summary: "Created a multilingual medical labeling pipeline across 7 Asian languages to power advanced diagnostic AI.",
    details: "This project involved processing over 2 million clinical notes and patient records. Our team developed a custom annotation platform with integrated machine translation and clinical entity recognition, enabling doctors and data specialists to collaborate seamlessly. The resulting dataset improved the precision of an AI-powered diagnostic tool by over 30%."
  },
  {
    id: 2,
    title: "Retail AI Assistant Training – UAE",
    summary: "Labeled complex voice commands and customer intents to train virtual sales agents for a major retail chain.",
    details: "We collected and annotated 500,000+ voice commands in both Arabic and English, focusing on regional dialects and retail-specific terminology. The high-quality data allowed our client to deploy intelligent virtual assistants across 300+ retail branches in just two months, significantly improving customer experience and operational efficiency."
  },
  {
    id: 3,
    title: "Smart City Surveillance Dataset – US",
    summary: "Processed and annotated millions of frames of urban traffic data to enhance real-time public safety analytics.",
    details: "Working with multiple municipalities, we provided semantic segmentation for vehicles, pedestrians, and environmental hazards from thousands of hours of video footage. The meticulously labeled dataset boosted real-time anomaly detection efficiency by 21% in pilot cities, contributing to smarter and safer urban environments."
  }
];

// Sub-component for the accordion card
const ProjectAccordionCard = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex justify-between items-center"
      >
        <h3 className="text-xl font-bold text-lifewood-green">{project.title}</h3>
        <div className="text-lifewood-saffron">
          {isOpen ? <FiMinus size={24} /> : <FiPlus size={24} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2">
              <p className="font-semibold text-gray-800">{project.summary}</p>
              <p className="mt-4 text-gray-600">{project.details}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ImpactfulProjectsSection = () => {
  return (
    <section className="bg-sea-salt py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-lifewood-green sm:text-4xl">Our Most Impactful Work</h2>
          <p className="mt-4 text-lg text-gray-600">
            From government partnerships to enterprise-level AI, Lifewood delivers data solutions that scale across borders and drive real-world outcomes.
          </p>
        </div>
        <div className="mt-16 max-w-4xl mx-auto space-y-6">
          {newProjectsData.map(project => (
            <ProjectAccordionCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default ImpactfulProjectsSection;