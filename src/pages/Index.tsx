
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { Habit } from '../components/HabitCard';
import HabitCard from '../components/HabitCard';
import CreateHabitModal from '../components/CreateHabitModal';
import HabitDetail from '../components/HabitDetail';
import PlusButton from '../components/PlusButton';
import Navbar from '../components/Navbar';
import AnimatedLogo from '../components/AnimatedLogo';

// Mock data
const initialHabits: Habit[] = [
  { id: '1', name: 'Morning Meditation', streak: 7, completedToday: false, color: '#2196F3' },
  { id: '2', name: 'Read 10 Pages', streak: 21, completedToday: true, color: '#FF5252' },
  { id: '3', name: 'Workout', streak: 5, completedToday: false, color: '#4CAF50' },
];

const Index = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setHabits(initialHabits);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const toggleHabit = (id: string) => {
    setHabits(habits.map(habit => 
      habit.id === id 
        ? { 
            ...habit, 
            completedToday: !habit.completedToday,
            streak: !habit.completedToday ? habit.streak + 1 : habit.streak - 1
          } 
        : habit
    ));
    
    // Update selected habit if it's the one being toggled
    if (selectedHabit && selectedHabit.id === id) {
      setSelectedHabit(prev => 
        prev ? { 
          ...prev, 
          completedToday: !prev.completedToday,
          streak: !prev.completedToday ? prev.streak + 1 : prev.streak - 1
        } : null
      );
    }
  };
  
  const createHabit = (name: string, color: string) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      streak: 0,
      completedToday: false,
      color
    };
    
    setHabits([...habits, newHabit]);
  };
  
  const deleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };
  
  return (
    <LayoutGroup>
      <div className="min-h-screen pt-12 pb-24 px-6 relative">
        <div className="max-w-md mx-auto">
          <motion.div 
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div 
              className="flex items-center"
              layoutId="header"
            >
              <AnimatedLogo />
              <h1 className="text-2xl font-bold ml-2">Habits</h1>
            </motion.div>
            
            <motion.div 
              className="flex items-center text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span 
                className="text-black font-medium text-xl mr-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {new Date().getDate()}
              </motion.span>
              <span className="text-sm">
                {new Date().toLocaleDateString('en-US', { month: 'short' })}
              </span>
            </motion.div>
          </motion.div>
          
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                className="py-12 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 mb-4 animate-pulse"></div>
                <div className="w-48 h-4 bg-gray-100 rounded animate-pulse"></div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ staggerChildren: 0.1 }}
              >
                {habits.length === 0 ? (
                  <motion.div 
                    className="flex flex-col items-center justify-center py-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-gray-500 mb-4">No habits yet. Let's create your first habit!</p>
                    <motion.button
                      className="px-6 py-3 bg-black text-white rounded-xl font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsCreateModalOpen(true)}
                    >
                      Create Habit
                    </motion.button>
                  </motion.div>
                ) : (
                  <div>
                    <motion.p 
                      className="text-gray-500 mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      Keep going! Today's habits:
                    </motion.p>
                    {habits.map(habit => (
                      <HabitCard 
                        key={habit.id}
                        habit={habit}
                        onToggle={toggleHabit}
                        onCardClick={(id) => setSelectedHabit(habits.find(h => h.id === id) || null)}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <PlusButton onClick={() => setIsCreateModalOpen(true)} />
        <Navbar />
        
        <CreateHabitModal 
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSave={createHabit}
        />
        
        <HabitDetail 
          habit={selectedHabit}
          onClose={() => setSelectedHabit(null)}
          onToggle={toggleHabit}
          onDelete={deleteHabit}
        />
      </div>
    </LayoutGroup>
  );
};

export default Index;
