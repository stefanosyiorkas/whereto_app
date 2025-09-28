import React from 'react';
import { X, MapPin, Star, Clock, Phone, Globe, DollarSign } from 'lucide-react';
import { Venue } from '../types';

interface VenueModalProps {
  venue: Venue;
  isOpen: boolean;
  onClose: () => void;
}

const VenueModal: React.FC<VenueModalProps> = ({ venue, isOpen, onClose }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={18}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header with close button */}
        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center rounded-t-2xl flex-shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">{venue.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          {/* Image */}
          <div className="relative">
            <img
              src={venue.image}
              alt={venue.name}
              className="w-full h-64 object-cover"
            />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full">
            <span className="text-sm font-medium text-rose-600">{venue.type}</span>
          </div>
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg">
            <div className="flex items-center space-x-1">
              {renderStars(venue.rating)}
              <span className="text-white text-sm font-medium ml-2">{venue.rating}/5</span>
            </div>
          </div>
          </div>

          {/* Content */}
        <div className="p-6">
          {/* Cuisine and Price Range */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-rose-600 font-medium text-lg uppercase tracking-wide">
                {venue.cuisine}
              </p>
            </div>
            <div className="flex items-center text-gray-700">
              <DollarSign size={18} className="text-green-600 mr-1" />
              <span className="font-semibold text-lg">{venue.priceRange}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
            <p className="text-gray-700 leading-relaxed">{venue.description}</p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin size={20} className="mr-3 text-rose-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Location</p>
                  <p className="text-gray-600">{venue.location}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock size={20} className="mr-3 text-rose-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Hours</p>
                  <p className="text-gray-600">{venue.hours}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {venue.phone && (
                <div className="flex items-start">
                  <Phone size={20} className="mr-3 text-rose-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <a 
                      href={`tel:${venue.phone}`}
                      className="text-rose-600 hover:text-rose-700 transition-colors"
                    >
                      {venue.phone}
                    </a>
                  </div>
                </div>
              )}
              
              {venue.website && (
                <div className="flex items-start">
                  <Globe size={20} className="mr-3 text-rose-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Website</p>
                    <a 
                      href={venue.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-rose-600 hover:text-rose-700 transition-colors"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Sticky Action Buttons */}
      <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0 rounded-b-2xl">
        <div className="flex space-x-4">
          {venue.phone && (
            <a
              href={`tel:${venue.phone}`}
              className="flex-1 bg-rose-100 text-rose-700 py-3 px-4 rounded-lg hover:bg-rose-200 transition-colors text-center font-medium"
            >
              Call Now
            </a>
          )}
          {venue.website && (
            <a
              href={venue.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white py-3 px-4 rounded-lg hover:from-rose-600 hover:to-rose-700 transition-all duration-300 text-center font-medium"
            >
              Visit Website
            </a>
          )}
          {!venue.phone && !venue.website && (
            <button className="flex-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white py-3 px-4 rounded-lg hover:from-rose-600 hover:to-rose-700 transition-all duration-300 text-center font-medium">
              Make Reservation
            </button>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default VenueModal;