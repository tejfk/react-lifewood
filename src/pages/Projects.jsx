import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiUsers, FiGlobe, FiMap, FiDatabase } from 'react-icons/fi';
import AnimatedCounter from '../components/AnimatedCounter';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import GlobalMap from '../components/GlobalMap';
import ImpactfulProjectsSection from '../components/ImpactfulProjectsSection';
import mobilityImage from '../assets/images/project-mobility.png';
import nlpImage from '../assets/images/project-nlp.png';
import genealogyImage from '../assets/images/project-genealogy.png';

const projectsData = [
  { id: 1, title: "Autonomous Vehicle Image Labeling – USA", industry: "Smart Mobility", summary: "Provided over one million high-precision annotated frames for training next-generation self-driving vehicle models.", fullDescription: "Our team executed a large-scale data labeling project, including semantic segmentation and 3D bounding boxes for vehicles, pedestrians, and infrastructure. This foundational dataset was critical for improving the perception and decision-making accuracy of our client's autonomous systems.", imageUrl: mobilityImage, details: { dataset: "1M+ annotated video frames", languages: "English, Spanish (for UI/tooling)", outcome: "Improved object detection accuracy by 22%" } },
  { id: 2, title: "Multilingual Chatbot NLP Training – APAC", industry: "Customer Service / NLP", summary: "Curated conversational utterances to power enterprise-grade AI chatbots across six languages.", fullDescription: "To enhance customer service automation for a major telecom provider, we collected, transcribed, and annotated conversational data. This involved intent recognition, entity extraction, and sentiment analysis to build a robust NLP model that understands regional dialects and user intent.", imageUrl: nlpImage, details: { dataset: "200,000+ verified utterances", languages: "Chinese, English, Malay, Tagalog, Thai, Vietnamese", outcome: "Deployed intelligent bots for three major telecom clients" } },
  { id: 3, title: "Genealogy Record Digitization – Global", industry: "Historical Archives", summary: "Digitized millions of historical family records, making them searchable for global genealogy platforms.", fullDescription: "This long-term project involved processing handwritten census data, birth certificates, and historical documents. Our human-in-the-loop system ensured high accuracy in transcribing and indexing delicate information, unlocking invaluable data for researchers and families worldwide.", imageUrl: genealogyImage, details: { dataset: "5M+ individual records processed", languages: "English, German, French, Italian", outcome: "Achieved 99.8% data accuracy for historical records" } }
];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const stats = [ { icon: FiUsers, value: 30000, label: "AI Specialists" }, { icon: FiMap, value: 16, label: "Countries Served" }, { icon: FiGlobe, value: 50, label: "Supported Languages" }, { icon: FiDatabase, value: 100, label: "Million+ Records Processed" } ];

    return (
        <div className="bg-paper">
            {/* Hero Section */}
            <section className="relative bg-sea-salt py-20 sm:py-24 md:py-32 text-center overflow-hidden px-4">
                <div className="absolute inset-0 z-0 opacity-20"><div className="absolute top-[10%] left-[20%] w-16 h-16 bg-lifewood-green/50 rounded-full animate-float-1"></div><div className="absolute top-[60%] left-[80%] w-24 h-24 bg-lifewood-saffron/50 rounded-3xl animate-float-2"></div></div>
                <div className="container mx-auto relative z-10">
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-lifewood-green">Case Studies & Global Impact</motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-4 text-base md:text-lg text-gray-600 max-w-md md:max-w-3xl mx-auto">Explore how Lifewood empowers AI transformation across industries and regions.</motion.p>
                </div>
            </section>

            {/* Global Metrics Banner */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <stat.icon className="w-8 h-8 md:w-10 md:h-10 text-lifewood-saffron mb-2" />
                                <p className="text-2xl md:text-3xl font-bold text-lifewood-green"><AnimatedCounter endValue={stat.value} /></p>
                                <p className="text-xs md:text-sm text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Project Cards */}
            <section className="py-16 md:py-20 bg-paper">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12 md:mb-16"><h2 className="text-3xl md:text-4xl font-bold tracking-tight text-lifewood-green">Featured Projects</h2></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {projectsData.map(project => (<ProjectCard key={project.id} project={project} onReadMore={() => setSelectedProject(project)} />))}
                    </div>
                </div>
            </section>
            
            <ImpactfulProjectsSection />
            
            {/* Regional Impact */}
            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12 md:mb-16"><h2 className="text-3xl md:text-4xl font-bold tracking-tight text-lifewood-green">Regional Impact Highlights</h2><p className="mt-4 text-base md:text-lg text-gray-600">Our global delivery centers are hubs of innovation and opportunity.</p></div>
                    <GlobalMap />
                </div>
            </section>

            {/* CTA Banner */}
            <section className="bg-lifewood-green">
                <div className="container mx-auto px-6 py-16 text-center"><h2 className="text-2xl md:text-3xl font-bold text-white">Interested in how Lifewood can support your AI project?</h2><Link to="/contact" className="mt-8 inline-block bg-lifewood-saffron text-lifewood-green font-bold py-3 px-8 rounded-full hover:opacity-90 transition-opacity">Contact Us</Link></div>
            </section>
            
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </div>
    );
};
export default Projects;