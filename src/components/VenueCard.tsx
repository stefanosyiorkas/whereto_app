import React, { useState } from 'react';
import { MapPin, Star, Clock, Phone, Globe } from 'lucide-react';
import { Venue } from '../types';
import VenueModal from './VenueModal';

interface VenueCardProps {
  venue: Venue;
}

const VenueCard: React.FC<VenueCardProps> = ({ venue }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-rose-200 group transform hover:-translate-y-2 hover:scale-105">
        <div className="relative">
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-rose-600">{venue.type}</span>
          </div>
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg">
            <div className="flex items-center space-x-1">
              {renderStars(venue.rating)}
              <span className="text-white text-sm font-medium ml-1">{venue.rating}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{venue.name}</h3>
            <p className="text-rose-600 font-medium text-sm uppercase tracking-wide">
              {venue.cuisine}
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center text-gray-600">
              <MapPin size={16} className="mr-2 text-rose-500" />
              <span className="text-sm">{venue.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock size={16} className="mr-2 text-rose-500" />
              <span className="text-sm">{venue.hours}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="text-sm font-medium">Price Range: </span>
              <span className="text-rose-600 font-bold ml-1">{venue.priceRange}</span>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-6 line-clamp-2">{venue.description}</p>

          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {venue.phone && (
                <button className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors">
                  <Phone size={16} className="hover:rotate-12 transition-transform duration-200" />
                </button>
              )}
              {venue.website && (
                <button className="p-2 bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors">
                  <Globe size={16} className="hover:rotate-12 transition-transform duration-200" />
                </button>
              )}
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg hover:from-rose-600 hover:to-rose-700 transition-all duration-300 font-medium transform hover:scale-105 hover:shadow-lg"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* Modal - rendered outside the card container */}
      <VenueModal 
        venue={venue}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default VenueCard;