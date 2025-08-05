import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// --- Scroll Reveal Animation Wrapper ---
// This component wraps any content and animates it into view when the user scrolls to it.
const RevealOnScroll = ({ children, delay = 0, duration = 0.6 }) => {
  // useInView hook from react-intersection-observer
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation will trigger only once
    threshold: 0.1,    // Trigger when 10% of the element becomes visible
  });

  // Animation variants for Framer Motion
  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: 'easeOut',
        delay, // Optional delay for staggered animations
      },
    },
  };

  return (
    <motion.div
      ref={ref} // Attach the ref to this element
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'} // Animate when 'inView' is true
    >
      {children}
    </motion.div>
  );
};

export default RevealOnScroll;