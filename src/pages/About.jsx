import React from 'react';
import GlobalMap from '../components/GlobalMap';
// --- Import new components ---
import JourneyTimeline from '../components/JourneyTimeline';
import PeopleFirstSection from '../components/PeopleFirstSection';
import GlobalImpactSection from '../components/GlobalImpactSection';

const About = () => {
  return (
    <div className="bg-white">
        {/* --- EXISTING INTRO & GLOBAL MAP (UNCHANGED) --- */}
        <section className="bg-sea-salt py-20 text-center">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-bold text-lifewood-green">Our Mission is Global, Our Drive is AI</h1>
            </div>
        </section>
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Our Global Footprint</h2>
                </div>
                <GlobalMap />
            </div>
        </section>
      
        {/* --- NEW SECTION: The Lifewood Journey --- */}
        <JourneyTimeline />

        {/* --- NEW SECTION: People First, AI Next --- */}
        <PeopleFirstSection />

        {/* --- NEW SECTION: Reusable Global Impact Section --- */}
        <GlobalImpactSection />
    </div>
  );
};
export default About;