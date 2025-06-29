import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-white dark:bg-dark-900 shadow-xl border-b border-gray-200 dark:border-dark-700'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo and Institute Info */}
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <img
                  src="/SPIT_logo.png"
                  alt="SPIT Logo"
                  className="h-12 w-12 lg:h-14 lg:w-14 object-contain transition-all duration-300"
                />
              </div>
              <div className="hidden sm:block">
                <div className={`text-xs font-normal leading-tight transition-colors duration-500 ${
                  isScrolled 
                    ? 'text-gray-600 dark:text-gray-400' 
                    : 'text-gray-300 dark:text-gray-400'
                }`}>
                  Bharatiya Vidya Bhavans
                </div>
                <h1 className={`font-playfair font-bold text-base lg:text-lg leading-tight whitespace-nowrap transition-colors duration-500 ${
                  isScrolled 
                    ? 'text-gray-900 dark:text-white' 
                    : 'text-white dark:text-white'
                }`}>
                  Sardar Patel Institute of Technology
                </h1>
                <div className={`text-xs font-normal leading-tight transition-colors duration-500 ${
                  isScrolled 
                    ? 'text-gray-600 dark:text-gray-400' 
                    : 'text-gray-300 dark:text-gray-400'
                }`}>
                  NBA Accredited Engineering Programs
                </div>
              </div>
            </div>

            {/* Right Side - Back to Home Page & Theme Toggle & Mobile Menu Button */}
            <div className="flex items-center space-x-3">
              <a
                href="/"
                className={`hidden md:block text-sm font-medium px-4 py-2 rounded-lg transition-all duration-500 ${
                  isScrolled
                    ? 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-accent-teal hover:bg-gray-100 dark:hover:bg-dark-800'
                    : 'text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                }`}
              >
                Back to Home Page
              </a>
              <div className={`transition-all duration-500 ${
                isScrolled ? '' : 'drop-shadow-lg'
              }`}>
                <ThemeToggle />
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition-all duration-500 ${
                  isScrolled
                    ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-800'
                    : 'text-white hover:bg-white/10 backdrop-blur-sm drop-shadow-lg'
                }`}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <a
                href="/"
                className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-all duration-300 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Back to Home Page
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};