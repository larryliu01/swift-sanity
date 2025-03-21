
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const circleVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 1.5, bounce: 0 },
        opacity: { duration: 0.2 }
      }
    }
  };

  return (
    <div className="flex items-center justify-center w-16 h-16">
      <motion.svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        initial="hidden"
        animate="visible"
      >
        <motion.circle
          cx="32"
          cy="32"
          r="28"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          variants={circleVariants}
        />
        <motion.path
          d="M22 32L30 40L44 26"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: {
                pathLength: { delay: 0.5, type: "spring", duration: 1.5, bounce: 0 },
                opacity: { delay: 0.5, duration: 0.2 }
              }
            }
          }}
        />
      </motion.svg>
    </div>
  );
};

export default AnimatedLogo;
