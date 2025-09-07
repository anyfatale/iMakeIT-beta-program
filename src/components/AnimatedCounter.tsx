import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, duration = 1 }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * value);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [value, duration]);

  return (
    <motion.span
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {count.toLocaleString()}
    </motion.span>
  );
};

export default AnimatedCounter;