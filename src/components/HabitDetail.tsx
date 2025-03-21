
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Calendar, CheckCircle2, Circle, MoreHorizontal, Trash2 } from 'lucide-react';
import { Habit } from './HabitCard';
import StreakCounter from './StreakCounter';

interface HabitDetailProps {
  habit: Habit | null;
  onClose: () => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const HabitDetail: React.FC<HabitDetailProps> = ({ habit, onClose, onToggle, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  
  if (!habit) return null;
  
  // Generate last 30 days data (mocked)
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    // Random completion based on streak (higher streak = more likely to be completed)
    const completed = i === 0 
      ? habit.completedToday 
      : Math.random() < (0.5 + (habit.streak / 100));
    return { date, completed };
  }).reverse();
  
  const toggleMenu = () => setShowMenu(!showMenu);
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this habit?')) {
      onDelete(habit.id);
      onClose();
    }
  };
  
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-white z-50 overflow-y-auto px-6 pt-12 pb-20"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
      >
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-8">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="rounded-full p-2"
            >
              <ArrowLeft size={24} />
            </motion.button>
            
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={toggleMenu}
                className="rounded-full p-2"
              >
                <MoreHorizontal size={24} />
              </motion.button>
              
              <AnimatePresence>
                {showMenu && (
                  <motion.div 
                    className="absolute right-0 top-12 w-48 bg-white shadow-lg rounded-xl py-2 overflow-hidden border border-gray-100"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <button 
                      className="flex items-center w-full px-4 py-3 text-left text-red-500 hover:bg-gray-50"
                      onClick={handleDelete}
                    >
                      <Trash2 size={18} className="mr-2" />
                      Delete Habit
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <motion.div 
            className="flex flex-col items-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-3xl font-bold mb-1">{habit.name}</h1>
            <StreakCounter count={habit.streak} />
          </motion.div>
          
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Today</h2>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="text-black"
                onClick={() => onToggle(habit.id)}
              >
                {habit.completedToday ? (
                  <CheckCircle2 className="text-black" size={28} />
                ) : (
                  <Circle className="text-gray-300" size={28} />
                )}
              </motion.button>
            </div>
            
            <motion.div
              className={`p-5 rounded-2xl mb-8 ${habit.completedToday 
                ? 'bg-black/5' 
                : 'bg-white border border-gray-200'}`}
              animate={{
                scale: habit.completedToday ? [1, 1.02, 1] : 1,
                transition: { duration: 0.3 }
              }}
            >
              <div className="flex items-center">
                <div className="mr-4">
                  {habit.completedToday ? (
                    <CheckCircle2 className="text-black" size={24} />
                  ) : (
                    <Circle className="text-gray-300" size={24} />
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date().toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <Calendar size={20} className="mr-2 text-gray-500" />
              <h2 className="text-lg font-semibold">History</h2>
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div key={i} className="text-center text-xs text-gray-500">{day}</div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
              {dates.map((day, i) => (
                <motion.div 
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 + (i * 0.01) }}
                  className={`aspect-square rounded-full flex items-center justify-center 
                  ${day.completed 
                    ? 'bg-black' 
                    : 'border border-gray-200'
                  }`}
                >
                  <span className={`text-xs ${day.completed ? 'text-white' : 'text-gray-400'}`}>
                    {day.date.getDate()}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HabitDetail;
