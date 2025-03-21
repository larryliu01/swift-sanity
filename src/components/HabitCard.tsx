
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

export interface Habit {
  id: string;
  name: string;
  streak: number;
  completedToday: boolean;
  color?: string;
}

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onCardClick: (id: string) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle, onCardClick }) => {
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(habit.id);
  };

  return (
    <motion.div
      layoutId={`habit-card-${habit.id}`}
      className="glass-card p-4 mb-3 cursor-pointer relative overflow-hidden"
      whileHover={{ y: -2, boxShadow: '0 10px 30px -15px rgba(0,0,0,0.1)' }}
      onClick={() => onCardClick(habit.id)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h3 className="font-medium text-lg">{habit.name}</h3>
          <span className="text-gray-500 text-sm">{habit.streak} day streak</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="text-black"
          onClick={handleToggle}
        >
          {habit.completedToday ? (
            <CheckCircle2 className="text-black" size={28} />
          ) : (
            <Circle className="text-gray-300" size={28} />
          )}
        </motion.button>
      </div>
      {habit.color && (
        <div 
          className="absolute bottom-0 left-0 h-1 w-full" 
          style={{ backgroundColor: habit.color }}
        />
      )}
    </motion.div>
  );
};

export default HabitCard;
