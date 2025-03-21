
import React from 'react';
import { motion } from 'framer-motion';

interface StreakCounterProps {
  count: number;
}

const StreakCounter: React.FC<StreakCounterProps> = ({ count }) => {
  return (
    <motion.div 
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring' }}
    >
      <div className="relative w-16 h-16 flex items-center justify-center mb-1">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            className="stroke-current text-gray-200"
            strokeWidth="3"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <motion.path
            className="stroke-current text-black"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: count > 0 ? 1 : 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        <span className="absolute font-semibold text-xl">{count}</span>
      </div>
      <motion.span 
        className="text-sm font-medium text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Day Streak
      </motion.span>
    </motion.div>
  );
};

export default StreakCounter;
