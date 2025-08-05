import React from 'react';
import AnimatedCounter from './AnimatedCounter';
import { FiUsers, FiGlobe, FiMap, FiDatabase } from 'react-icons/fi';
import RevealOnScroll from './RevealOnScroll';

const stats = [
  { icon: FiUsers, value: 30000, suffix: "+", label: "AI Specialists" },
  { icon: FiGlobe, value: 50, suffix: "+", label: "Supported Languages" },
  { icon: FiMap, value: 16, suffix: "+", label: "Countries" },
  { icon: FiDatabase, value: 100, suffix: "M+", label: "Data Records Processed" }
];

const GlobalStatsSection = () => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <RevealOnScroll>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-lifewood-green sm:text-4xl">A Trusted Global Force in AI</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">Scale, Integrity, and Impact in Every Solution</p>
            <p className="mt-6 text-base text-gray-700">
              Lifewood empowers AI solutions through responsible innovation across 16+ countries, with more than 30,000 professionals contributing to multilingual, inclusive AI systems.
            </p>
          </div>
        </RevealOnScroll>
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <RevealOnScroll key={index} delay={index * 0.1}>
              <div className="flex flex-col items-center p-6 bg-sea-salt rounded-lg">
                <stat.icon className="w-12 h-12 text-lifewood-saffron mb-4" />
                <p className="text-4xl font-bold text-lifewood-green">
                  <AnimatedCounter endValue={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-gray-600 mt-2 font-medium">{stat.label}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};
export default GlobalStatsSection;