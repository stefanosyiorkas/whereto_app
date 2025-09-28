import React, { useState } from 'react';
import { Sun, Moon, MapPin, Star, Calendar, Filter, Search } from 'lucide-react';
import DaySection from './components/DaySection';
import NightSection from './components/NightSection';

function App() {
  const [activeSection, setActiveSection] = useState<'day' | 'night'>('day');

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          activeSection === "day"
            ? "bg-white/95 backdrop-blur-sm border-b border-rose-200"
            : "bg-black/95 backdrop-blur-sm border-b border-rose-400/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-rose-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">W</span>
              </div>
              <h1
                className={`text-xl font-bold ${
                  activeSection === "day" ? "text-gray-900" : "text-white"
                }`}
              >
                WhereTo?
              </h1>
            </div>

            <nav className="flex items-center space-x-2">
              <button
                onClick={() => setActiveSection("day")}
                className={`group flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === "day"
                    ? "bg-rose-100 text-rose-700 border border-rose-200"
                    : "text-gray-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent"
                }`}
              >
                <Sun size={18} className="transition-transform duration-200" />
                <span>Day</span>
              </button>
              <button
                onClick={() => setActiveSection("night")}
                className={`group flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === "night"
                    ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                    : activeSection === "day"
                    ? "text-gray-500 hover:text-yellow-600 hover:bg-yellow-50 border border-transparent"
                    : "text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/5 border border-transparent"
                }`}
              >
                <Moon size={18} className="transition-transform duration-200" />
                <span>Night</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="transition-all duration-300">
        {activeSection === "day" ? <DaySection /> : <NightSection />}
      </main>

      {/* Footer */}
      <footer
        className={`py-12 ${
          activeSection === "day"
            ? "bg-gray-50 border-t border-gray-200 mt-16"
            : "bg-gray-900 border-t border-gray-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p
              className={`${
                activeSection === "day" ? "text-gray-600" : "text-gray-400"
              }`}
            >
              © 2025 EventHub. Discover the best venues and events across the
              country.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;