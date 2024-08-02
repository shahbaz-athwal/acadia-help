'use client';
import { useState, useEffect, useRef } from 'react';
import { IconMenu, IconSearch } from '@tabler/icons-react';
import { motion, useAnimation } from 'framer-motion';

export const Navbar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const controls = useAnimation();

  // Function to handle the keyboard shortcut
  const handleKeyboardShortcut = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardShortcut);
    return () => {
      window.removeEventListener('keydown', handleKeyboardShortcut);
    };
  }, []);

  // Floating Navbar animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        controls.start({ y: 0 });
      } else {
        controls.start({ y: -60 });
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [controls]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-full px-12 py-3.5 transition-all duration-300 bg-pink"
      animate={controls}
      style={{ zIndex: 1000 }} // Ensure the navbar stays above other content
    >
      <div className="container mx-auto flex items-center justify-between px-4 text-white">
        {/* Text Section */}
        <div className="relative text-2xl font-bold cursor-pointer group">
          <span className="transition-transform duration-300 transform group-hover:scale-110 inline-block">
            RateMyProf
          </span>
          <div className="absolute bottom-0 left-0 w-full h-0.5 transition-transform duration-300 transform scale-x-0 group-hover:scale-x-100 bg-white"></div>
        </div>

        {/* Search and Buttons Section */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <motion.div
            className="relative flex items-center"
            style={{ overflow: 'hidden' }} // Prevent content overflow
          >
            <input
              type="text"
              placeholder={isFocused ? "" : "Search..."}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 transition-opacity duration-300 bg-gray-800 text-white hover:bg-gray-700 opacity-75 cursor-text"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              ref={searchInputRef}
            />
            <IconSearch className="absolute left-3 h-6 w-6 text-white"/>
            {!isFocused && (
              <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/15 p-1.5 rounded-sm text-xs leading-3 text-gray-400">
                Ctrl K
              </kbd>
            )}
          </motion.div>

          {/* Login Button */}
          <motion.button
            className="bg-white text-black py-2 px-4 rounded-lg hover:bg-gray-300 transform hover:scale-105 transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="border border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-lg sm:hidden">
          <IconMenu className="text-white"/>
        </div>
      </div>
    </motion.div>
  );
};

