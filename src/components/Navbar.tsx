
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, List, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

// Don't import Clerk hooks at the top level
const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // We'll determine if Clerk is available based on the global window object
  // This avoids direct usage of Clerk hooks outside of ClerkProvider
  const isClerkAvailable = typeof window !== 'undefined' && 
    (window as any).__clerk_frontend_api && 
    (window as any).__clerk_frontend_api.loaded;
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { icon: <List size={24} />, path: '/', label: 'Habits' },
    { icon: <Calendar size={24} />, path: '/calendar', label: 'Calendar' },
    { icon: <User size={24} />, path: '/profile', label: 'Profile' }
  ];
  
  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-100 px-4 pt-2 pb-6 z-10"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className="max-w-md mx-auto flex justify-between items-center">
        {navItems.map((item) => (
          <motion.button
            key={item.path}
            className={`flex flex-col items-center justify-center p-2 rounded-lg ${
              isActive(item.path) 
                ? 'text-black font-medium' 
                : 'text-gray-400'
            }`}
            onClick={() => navigate(item.path)}
            whileTap={{ scale: 0.9 }}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
            {isActive(item.path) && (
              <motion.div
                className="absolute bottom-1 w-1 h-1 bg-black rounded-full"
                layoutId="indicator"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
