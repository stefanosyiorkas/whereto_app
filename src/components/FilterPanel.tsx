import React from 'react';

interface FilterPanelProps {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  selectedRating?: string;
  setSelectedRating?: (rating: string) => void;
  selectedType?: string;
  setSelectedType?: (type: string) => void;
  selectedGenre?: string;
  setSelectedGenre?: (genre: string) => void;
  selectedDate?: string;
  setSelectedDate?: (date: string) => void;
  isDay: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedLocation,
  setSelectedLocation,
  selectedRating,
  setSelectedRating,
  selectedType,
  setSelectedType,
  selectedGenre,
  setSelectedGenre,
  selectedDate,
  setSelectedDate,
  isDay
}) => {
  const locations = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Las Vegas', 'San Francisco'];
  const ratings = ['4.0', '4.5', '4.8'];
  const venueTypes = ['Restaurant', 'Cafe', 'Bar & Grill', 'Fine Dining'];
  const musicGenres = ['Electronic', 'Hip Hop', 'Rock', 'Jazz', 'Latin', 'Pop'];
  
  const clearAllFilters = () => {
    setSelectedLocation('');
    if (setSelectedRating) setSelectedRating('');
    if (setSelectedType) setSelectedType('');
    if (setSelectedGenre) setSelectedGenre('');
    if (setSelectedDate) setSelectedDate('');
  };

  return (
    <div className={`mt-6 p-6 rounded-xl border-t ${
      isDay 
        ? 'bg-rose-50/50 border-rose-200 animate-fade-in' 
        : 'bg-gray-700/50 border-yellow-600/30 animate-fade-in'
    }`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Rating Filter (Day only) */}
        {isDay && setSelectedRating && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Rating
            </label>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-rose-500 focus:border-transparent hover:shadow-md transition-all duration-200"
            >
              <option value="">Any Rating</option>
              {ratings.map(rating => (
                <option key={rating} value={rating}>{rating}+ Stars</option>
              ))}
            </select>
          </div>
        )}

        {/* Venue Type Filter (Day only) */}
        {isDay && setSelectedType && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Venue Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-rose-500 focus:border-transparent hover:shadow-md transition-all duration-200"
            >
              <option value="">All Types</option>
              {venueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        )}

        {/* Music Genre Filter (Night only) */}
        {!isDay && setSelectedGenre && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Music Genre
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border bg-gray-600 border-gray-500 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent hover:shadow-md transition-all duration-200"
            >
              <option value="">All Genres</option>
              {musicGenres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        )}

        {/* Date Filter (Night only) */}
        {!isDay && setSelectedDate && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Event Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border bg-gray-600 border-gray-500 text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent hover:shadow-md transition-all duration-200"
            />
          </div>
        )}
      </div>

      {/* Clear Filters Button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={clearAllFilters}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            isDay 
              ? 'text-rose-600 hover:bg-rose-100 hover:scale-105 transform transition-all duration-200' 
              : 'text-yellow-400 hover:bg-gray-600 hover:scale-105 transform transition-all duration-200'
          }`}
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;