import React, { useState } from 'react';
import { Calendar, MapPin, Music, Clock, Filter, Search } from 'lucide-react';
import EventCard from './EventCard';
import EventModal from './EventModal';
import WeeklyCalendar from './WeeklyCalendar';
import FilterPanel from './FilterPanel';
import { events } from '../data/events';
import { Event } from '../types';

const NightSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const locations = Array.from(new Set(events.map(event => event.location))).sort();

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || event.location === selectedLocation;
    const matchesGenre = !selectedGenre || event.genre === selectedGenre;
    const matchesDate = !selectedDate || event.date === selectedDate;

    return matchesSearch && matchesLocation && matchesGenre && matchesDate;
  });

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Experience the <span className="text-yellow-400">Nightlife</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the hottest clubs, bars, and nighttime events. 
              From underground venues to rooftop parties across the country.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-yellow-500/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-200" size={20} />
                  <input
                    type="text"
                    placeholder="Search events, venues, artists, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 focus:shadow-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('calendar')}
                    className={`px-4 py-3 rounded-xl transition-colors flex items-center space-x-2 ${
                      viewMode === 'calendar'
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg scale-105'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105 transform'
                    }`}
                  >
                    <Calendar size={20} className="transition-transform duration-200 hover:rotate-12" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-3 rounded-xl transition-all duration-300 transform ${
                      viewMode === 'list'
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg scale-105'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'
                    }`}
                  >
                    List
                  </button>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 flex items-center space-x-2 hover:scale-105 hover:shadow-lg transform"
                  >
                    <Filter size={20} className="transition-transform duration-200 hover:rotate-12" />
                    <span>Filters</span>
                  </button>
                </div>
              </div>

              {/* Location Pills */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setSelectedLocation('')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedLocation === ''
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg scale-105'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'
                  }`}
                >
                  All Locations
                </button>
                {locations.map((location) => (
                  <button
                    key={location}
                    onClick={() => setSelectedLocation(location)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedLocation === location
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-lg scale-105'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105'
                    }`}
                  >
                    {location}
                  </button>
                ))}
              </div>

              {showFilters && (
                <FilterPanel
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                  selectedGenre={selectedGenre}
                  setSelectedGenre={setSelectedGenre}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  isDay={false}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {viewMode === 'calendar' ? (
            <WeeklyCalendar events={filteredEvents} onEventClick={handleViewDetails} />
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">
                  Upcoming Events ({filteredEvents.length})
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} onViewDetails={handleViewDetails} />
                ))}
              </div>
              
              {filteredEvents.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-gray-600 mb-4">
                    <Search size={64} className="mx-auto" />
                  </div>
                  <p className="text-xl text-gray-400">No events found matching your criteria.</p>
                  <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Event Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default NightSection;