import React from 'react';
import { X, MapPin, Star, Clock, Phone, Globe, Users, DollarSign, Calendar, Award } from 'lucide-react';
import { Venue } from '../types';

interface VenueModalProps {
  venue: Venue;
  isOpen: boolean;
  onClose: () => void;
}

const VenueModal: React.FC<VenueModalProps> = ({ venue, isOpen, onClose }) => {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      setScrollY(target.scrollTop);
    };

    const modalContent = document.querySelector('.venue-modal-content');
    if (modalContent) {
      modalContent.addEventListener('scroll', handleScroll);
      return () => modalContent.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const imageHeight = Math.max(120, 256 - scrollY * 0.5);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={20}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4 animate-fade-in">
      <div className="venue-modal-content bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] shadow-2xl transform transition-all duration-300 scale-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="relative">
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full object-cover rounded-t-2xl transition-all duration-300"
            style={{ height: `${imageHeight}px` }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition-all duration-200 hover:scale-110"
          >
            <X size={24} className="text-gray-600" />
          </button>
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
            <div className="flex items-center space-x-2">
              {renderStars(venue.rating)}
              <span className="text-white font-bold text-sm sm:text-lg">{venue.rating}</span>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 bg-rose-500/90 backdrop-blur-sm px-4 py-2 rounded-lg">
            <span className="text-white font-bold text-sm sm:text-lg">{venue.priceRange}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1">
          {/* Title Section */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{venue.name}</h2>
                <div className="flex items-center space-x-4">
                  <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm font-medium">
                    {venue.type}
                  </span>
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {venue.cuisine}
                  </span>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <div className="flex items-center space-x-1 mb-2">
                  {renderStars(venue.rating)}
                </div>
                <p className="text-gray-600 text-sm">Based on reviews</p>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Location & Contact */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Location & Contact</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-rose-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">Address</p>
                    <p className="text-gray-600">{venue.location}</p>
                  </div>
                </div>

                {venue.phone && (
                  <div className="flex items-start space-x-3">
                    <Phone className="text-rose-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">{venue.phone}</p>
                    </div>
                  </div>
                )}

                {venue.website && (
                  <div className="flex items-start space-x-3">
                    <Globe className="text-rose-500 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">Website</p>
                      <a href={venue.website} className="text-rose-600 hover:text-rose-700 transition-colors">
                        Visit Website
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Hours & Details */}
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Hours & Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="text-rose-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">Hours</p>
                    <p className="text-gray-600">{venue.hours}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <DollarSign className="text-rose-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">Price Range</p>
                    <p className="text-gray-600">{venue.priceRange}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Award className="text-rose-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-gray-900">Cuisine Type</p>
                    <p className="text-gray-600">{venue.cuisine}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">About</h3>
            <p className="text-gray-700 leading-relaxed text-base sm:text-lg">{venue.description}</p>
          </div>

          {/* Features */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Features</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-rose-50 p-3 sm:p-4 rounded-lg text-center">
                <Star className="text-rose-500 mx-auto mb-2" size={24} />
                <p className="text-xs sm:text-sm font-medium text-gray-900">{venue.rating} Rating</p>
              </div>
              <div className="bg-rose-50 p-3 sm:p-4 rounded-lg text-center">
                <Clock className="text-rose-500 mx-auto mb-2" size={24} />
                <p className="text-xs sm:text-sm font-medium text-gray-900">Open Daily</p>
              </div>
              <div className="bg-rose-50 p-3 sm:p-4 rounded-lg text-center">
                <MapPin className="text-rose-500 mx-auto mb-2" size={24} />
                <p className="text-xs sm:text-sm font-medium text-gray-900">Great Location</p>
              </div>
              <div className="bg-rose-50 p-3 sm:p-4 rounded-lg text-center">
                <Award className="text-rose-500 mx-auto mb-2" size={24} />
                <p className="text-xs sm:text-sm font-medium text-gray-900">{venue.type}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons - Sticky */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 sm:p-6 rounded-b-2xl">
          <div className="flex gap-3">
            <button className="flex-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white py-2 px-4 rounded-lg hover:from-rose-600 hover:to-rose-700 transition-all duration-300 font-medium text-sm hover:scale-105 hover:shadow-lg transform">
              Make Reservation
            </button>
            <button className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition-all duration-300 font-medium text-sm hover:scale-105 hover:shadow-lg transform">
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueModal;