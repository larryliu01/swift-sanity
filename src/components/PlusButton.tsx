
import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface PlusButtonProps {
  onClick: () => void;
}

const PlusButton: React.FC<PlusButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      className="fixed bottom-24 right-8 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-lg z-20"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Plus size={28} />
    </motion.button>
  );
};

export default PlusButton;
