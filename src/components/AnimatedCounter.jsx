import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

// --- Animated Count-Up Block ---
// This component uses react-countup to animate a number from 0 to a target value.
// The animation is triggered by react-intersection-observer when the component scrolls into view.
const AnimatedCounter = ({ endValue, duration = 2.5, suffix = '', prefix = '' }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Ensures the count-up happens only once
    threshold: 0.5,    // Animation starts when 50% of the component is visible
  });

  return (
    <span ref={ref}>
      {/* Conditionally render CountUp only when the component is in view */}
      {inView ? <CountUp start={0} end={endValue} duration={duration} separator="," suffix={suffix} prefix={prefix} /> : '0'}
    </span>
  );
};

export default AnimatedCounter;