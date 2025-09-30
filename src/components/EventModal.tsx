import React from 'react';
import { X, MapPin, Clock, Music, Calendar, Users, DollarSign, Star, Ticket } from 'lucide-react';
import { Event } from '../types';

interface EventModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose }) => {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getGenreColor = (genre: string) => {
    const colors: { [key: string]: string } = {
      'Electronic': 'bg-purple-500',
      'Hip Hop': 'bg-orange-500',
      'Rock': 'bg-red-500',
      'Jazz': 'bg-blue-500',
      'Latin': 'bg-green-500',
      'Pop': 'bg-pink-500',
    };
    return colors[genre] || 'bg-gray-500';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] shadow-2xl transform transition-all duration-300 scale-100 border border-gray-800 flex flex-col">
        {/* Header */}
        <div className="relative">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm p-2 rounded-full hover:bg-black/80 transition-all duration-200 hover:scale-110"
          >
            <X size={24} className="text-white" />
          </button>
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
            <div className="flex items-center space-x-2">
              <Calendar className="text-yellow-400" size={20} />
              <span className="text-white font-bold text-lg">{formatDate(event.date)}</span>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 bg-yellow-500/90 backdrop-blur-sm px-4 py-2 rounded-lg">
            <span className="text-black font-bold text-lg">{event.price}</span>
          </div>
          <div className="absolute top-4 left-4">
            <span className={`text-xs font-medium px-3 py-2 rounded-full text-white ${getGenreColor(event.genre)}`}>
              {event.genre}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 text-white overflow-y-auto flex-1">
          {/* Title Section */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{event.name}</h2>
                <p className="text-yellow-400 font-semibold text-xl mb-4">{event.artist}</p>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getGenreColor(event.genre)}`}>
                    {event.genre}
                  </span>
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm font-medium">
                    {event.capacity} Capacity
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg mb-2">
                  <span className="font-bold text-2xl">{event.price}</span>
                </div>
                <p className="text-gray-400 text-sm">Per ticket</p>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Event Details */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Event Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="text-yellow-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-white">Date</p>
                    <p className="text-gray-300">{formatDate(event.date)}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="text-yellow-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-white">Time</p>
                    <p className="text-gray-300">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Music className="text-yellow-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-white">Genre</p>
                    <p className="text-gray-300">{event.genre}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="text-yellow-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-white">Capacity</p>
                    <p className="text-gray-300">{event.capacity} people</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Venue Information */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Venue Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="text-yellow-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-white">Venue</p>
                    <p className="text-gray-300">{event.venue}</p>
                    <p className="text-gray-400 text-sm">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <DollarSign className="text-yellow-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-white">Ticket Price</p>
                    <p className="text-gray-300">{event.price}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Star className="text-yellow-400 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-medium text-white">Featured Artist</p>
                    <p className="text-gray-300">{event.artist}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">About This Event</h3>
            <p className="text-gray-300 leading-relaxed text-lg">{event.description}</p>
          </div>

          {/* Event Highlights */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Event Highlights</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
                <Music className="text-yellow-400 mx-auto mb-2" size={24} />
                <p className="text-sm font-medium text-white">Live Music</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
                <Users className="text-yellow-400 mx-auto mb-2" size={24} />
                <p className="text-sm font-medium text-white">{event.capacity} Capacity</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
                <Clock className="text-yellow-400 mx-auto mb-2" size={24} />
                <p className="text-sm font-medium text-white">{event.time}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg text-center border border-gray-700">
                <Star className="text-yellow-400 mx-auto mb-2" size={24} />
                <p className="text-sm font-medium text-white">Featured Event</p>
              </div>
            </div>
          </div>

        </div>

        {/* Action Buttons - Sticky */}
        <div className="sticky bottom-0 bg-gray-900 border-t border-gray-800 p-6 rounded-b-2xl">
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-4 px-6 rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 font-semibold text-lg hover:scale-105 hover:shadow-lg transform flex items-center justify-center space-x-2">
              <Ticket size={20} />
              <span>Buy Tickets</span>
            </button>
            <button className="flex-1 bg-gray-800 text-white py-4 px-6 rounded-xl hover:bg-gray-700 transition-all duration-300 font-semibold text-lg hover:scale-105 hover:shadow-lg transform border border-gray-700">
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;