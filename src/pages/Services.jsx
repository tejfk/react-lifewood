import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCpu, FiShield, FiCloud, FiGlobe, FiUsers, FiRepeat, FiArrowRight } from 'react-icons/fi';
// --- Import new component ---
import AdvancedServicesSection from '../components/AdvancedServicesSection';

// --- EXISTING DATA & COMPONENTS (UNCHANGED) ---
const servicesData = [
    { icon: FiCpu, title: "AI Data Annotation", description: "Bounding boxes, segmentation, audio transcription, and NLP labeling with industry-leading quality." },
    { icon: FiRepeat, title: "Intelligent Automation", description: "Custom document parsing, process bots, and workflow automation to boost enterprise efficiency." },
    { icon: FiShield, title: "Secure Data Management", description: "End-to-end secure data pipelines, storage, and management compliant with global standards." },
    { icon: FiCloud, title: "Cloud AI Deployment", description: "Seamless deployment and management of your AI models on AWS, Azure, and GCP." },
    { icon: FiUsers, title: "Human-in-the-loop Workflows", description: "Combining machine precision with expert human oversight for superior model performance." },
    { icon: FiGlobe, title: "Multilingual Dataset Services", description: "Our global team creates and labels datasets in over 50 languages for international applications." }
];

const ServiceCard = ({ icon: Icon, title, description, index }) => (
    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
        <Icon className="w-12 h-12 text-lifewood-saffron mb-5" />
        <h3 className="text-xl font-bold text-lifewood-green mb-3">{title}</h3>
        <p className="text-gray-600 flex-grow">{description}</p>
    </motion.div>
);

const Services = () => {
  return (
    <div className="bg-paper">
      <div className="py-20">
        <div className="container mx-auto px-6">
          {/* --- EXISTING INTRO & SERVICE CARDS (UNCHANGED) --- */}
          <div className="text-center mb-20">
              <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="text-4xl md:text-5xl font-bold text-gray-800">Our Services</motion.h1>
              <motion.p initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: 0.2}} className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                  We deliver scalable, ethical, and intelligent AI solutions to clients worldwide.
              </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {servicesData.map((service, index) => (
              <ServiceCard key={index} index={index} {...service} />
            ))}
          </div>
        </div>
      </div>
      
      {/* --- NEW SECTION: Advanced AI Applications --- */}
      <AdvancedServicesSection />

      <div className="py-20">
        <div className="container mx-auto px-6">
            {/* --- EXISTING FINAL CTA (UNCHANGED) --- */}
            <div className="text-center">
                <Link to="/contact" className="inline-flex items-center bg-lifewood-saffron text-lifewood-green font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity transform hover:scale-105">
                    Let’s Talk <FiArrowRight className="ml-2" />
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};
export default Services;