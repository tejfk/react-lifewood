import React from 'react';
import { motion } from 'framer-motion';

// Define the shapes and their initial properties
const shapes = [
  // Large background shapes
  { size: [200, 250, 200], x: ['0%', '10%', '0%'], y: ['10%', '-5%', '10%'], rotate: [0, 10, 0], opacity: 0.1, color: "bg-lifewood-green", delay: 0 },
  { size: [300, 350, 300], x: ['80%', '90%', '80%'], y: ['50%', '60%', '50%'], rotate: [0, -10, 0], opacity: 0.1, color: "bg-lifewood-saffron", delay: 2 },
  // Smaller foreground shapes
  { size: [80, 100, 80], x: ['15%', '25%', '15%'], y: ['70%', '80%', '70%'], rotate: [0, 20, 0], opacity: 0.2, color: "bg-lifewood-saffron", delay: 1 },
  { size: [60, 80, 60], x: ['70%', '60%', '70%'], y: ['15%', '25%', '15%'], rotate: [0, -20, 0], opacity: 0.15, color: "bg-lifewood-green", delay: 3 },
];

const HeroBackgroundAnimation = () => {
  return (
    // This container is positioned absolutely behind the main content
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full blur-3xl ${shape.color}`}
          animate={{
            width: shape.size,
            height: shape.size,
            x: shape.x,
            y: shape.y,
            rotate: shape.rotate,
            opacity: shape.opacity,
          }}
          transition={{
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: shape.delay,
          }}
        />
      ))}
    </div>
  );
};
export default HeroBackgroundAnimation;