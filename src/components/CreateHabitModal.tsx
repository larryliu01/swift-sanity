
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface CreateHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, color: string) => void;
}

const CreateHabitModal: React.FC<CreateHabitModalProps> = ({ isOpen, onClose, onSave }) => {
  const [habitName, setHabitName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#000000');
  
  const colors = [
    '#000000',
    '#FF5252',
    '#4CAF50',
    '#2196F3',
    '#FFC107',
    '#9C27B0',
    '#00BCD4',
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (habitName.trim()) {
      onSave(habitName, selectedColor);
      setHabitName('');
      setSelectedColor('#000000');
      onClose();
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end justify-center sm:items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md pt-8 pb-8 px-6 relative"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 500 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="absolute right-6 top-6 text-gray-500 hover:text-black"
              onClick={onClose}
            >
              <X />
            </button>
            
            <h2 className="text-2xl font-semibold mb-6">New Habit</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What habit would you like to track?
                </label>
                <input
                  type="text"
                  value={habitName}
                  onChange={(e) => setHabitName(e.target.value)}
                  placeholder="e.g., Morning meditation"
                  className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                  autoFocus
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose a color
                </label>
                <div className="flex flex-wrap gap-3">
                  {colors.map(color => (
                    <motion.button
                      key={color}
                      type="button"
                      whileTap={{ scale: 0.9 }}
                      className={`w-10 h-10 rounded-full ${
                        selectedColor === color ? 'ring-2 ring-offset-2 ring-black/30' : ''
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>
              
              <motion.button
                type="submit"
                className="w-full bg-black text-white py-4 rounded-xl font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!habitName.trim()}
              >
                Create Habit
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateHabitModal;
