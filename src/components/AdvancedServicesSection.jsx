import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiCpu, FiVideo, FiBookOpen, FiShoppingCart, FiHeart } from 'react-icons/fi';

const applications = [
  { icon: FiUsers, title: "Human-in-the-loop AI", description: "Combine scalable technology with human intuition to ensure unparalleled accuracy and nuance in your AI models." },
  { icon: FiCpu, title: "Enterprise NLP Processing", description: "Enable complex language processing across 50+ languages for your global AI pipelines and customer interactions." },
  { icon: FiVideo, title: "Video Intelligence", description: "Annotate, transcribe, and enrich live video data for autonomous systems, security, and advanced model training." },
  { icon: FiBookOpen, title: "Genealogy & Archive Digitization", description: "Unlock historical data with structured, high-accuracy labeling of archived family records, documents, and manuscripts." },
  { icon: FiShoppingCart, title: "Retail & eCommerce Automation", description: "Power intelligent search, product tagging, personalization engines, and fully automated chatbot solutions." },
  { icon: FiHeart, title: "Healthcare AI Training", description: "Fuel next-generation diagnosis engines and medical research with ethically sourced, precisely labeled medical data." }
];

const AdvancedServicesSection = () => {
  return (
    <section className="bg-paper py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-lifewood-green sm:text-4xl">Advanced AI Applications</h2>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {applications.map((app, index) => (
                 <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
                >
                    <app.icon className="w-10 h-10 text-lifewood-saffron mb-5"/>
                    <h3 className="text-xl font-bold text-lifewood-green mb-3">{app.title}</h3>
                    <p className="text-gray-600 flex-grow">{app.description}</p>
                 </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};
export default AdvancedServicesSection;