import React, { useState } from 'react';
import { Sun, Moon, MapPin, Star, Calendar, Filter, Search } from 'lucide-react';
import DaySection from './components/DaySection';
import NightSection from './components/NightSection';

function App() {
  const [activeSection, setActiveSection] = useState<'day' | 'night'>('day');

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        activeSection === 'day' 
          ? 'bg-white/95 backdrop-blur-sm border-b border-rose-200' 
          : 'bg-black/95 backdrop-blur-sm border-b border-rose-400/20'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-rose-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">W</span>
              </div>
              <h1 className={`text-xl font-bold ${
                activeSection === 'day' ? 'text-gray-900' : 'text-white'
              }`}>
                WhereTo?
              </h1>
            </div>
            
            <nav className="flex items-center space-x-1">
              <button
                onClick={() => setActiveSection('day')}
                className={`group flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeSection === 'day'
                    ? 'bg-rose-100 text-rose-800 shadow-lg scale-105'
                    : 'text-gray-600 hover:text-rose-600 hover:bg-rose-50 hover:scale-105 hover:shadow-md'
                }`}
              >
                <Sun size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>Daybreak</span>
              </button>
              <button
                onClick={() => setActiveSection('night')}
                className={`group flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeSection === 'night'
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg scale-105'
                    : activeSection === 'day' 
                      ? 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 hover:scale-105 hover:shadow-md'
                      : 'text-gray-300 hover:text-yellow-400 hover:bg-yellow-500/10 hover:scale-105 hover:shadow-md'
                }`}
              >
                <Moon size={18} className="group-hover:-rotate-12 transition-transform duration-300" />
                <span>Night Out</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="transition-all duration-300">
        {activeSection === 'day' ? <DaySection /> : <NightSection />}
      </main>

      {/* Footer */}
      <footer className={`py-12 ${
        activeSection === 'day' 
          ? 'bg-gray-50 border-t border-gray-200 mt-16' 
          : 'bg-gray-900 border-t border-gray-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className={`${
              activeSection === 'day' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              © 2025 EventHub. Discover the best venues and events across the country.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;