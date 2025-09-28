import React, { useState } from 'react';
import { MapPin, Star, Clock, Phone, Globe, Filter, Search } from 'lucide-react';
import VenueCard from './VenueCard';
import FilterPanel from './FilterPanel';
import { venues } from '../data/venues';

const DaySection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         venue.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || venue.location.includes(selectedLocation);
    const matchesRating = !selectedRating || venue.rating >= parseFloat(selectedRating);
    const matchesType = !selectedType || venue.type === selectedType;
    
    return matchesSearch && matchesLocation && matchesRating && matchesType;
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-50 to-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Amazing <span className="text-rose-600">Dining</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect restaurants, cafes, and daytime venues across the country. 
              From cozy brunch spots to elegant dining experiences.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-rose-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-200" size={20} />
                  <input
                    type="text"
                    placeholder="Search venues, cuisine, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 focus:shadow-lg"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-xl hover:from-rose-600 hover:to-rose-700 transition-all duration-300 flex items-center space-x-2 hover:scale-105 hover:shadow-lg transform"
                >
                  <Filter size={20} className="transition-transform duration-200 hover:rotate-12" />
                  <span>Filters</span>
                </button>
              </div>
              
              {showFilters && (
                <FilterPanel
                  selectedLocation={selectedLocation}
                  setSelectedLocation={setSelectedLocation}
                  selectedRating={selectedRating}
                  setSelectedRating={setSelectedRating}
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                  isDay={true}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Venues Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900">
              Featured Venues ({filteredVenues.length})
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVenues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
          
          {filteredVenues.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search size={64} className="mx-auto" />
              </div>
              <p className="text-xl text-gray-600">No venues found matching your criteria.</p>
              <p className="text-gray-500">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DaySection;