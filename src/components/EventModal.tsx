import React from 'react';
import { X, MapPin, Clock, Music, Calendar, Users, DollarSign, Ticket } from 'lucide-react';
import { Event } from '../types';

interface EventModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, isOpen, onClose }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      full: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric',
        month: 'long', 
        day: 'numeric' 
      }),
      day: date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      })
    };
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

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    const hour24 = parseInt(hours);
    const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
    const period = hour24 >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${period}`;
  };

  if (!isOpen) return null;

  const dateInfo = formatDate(event.date);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
        {/* Header with close button */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white">{event.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        {/* Image */}
        <div className="relative">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-full">
            <span className={`text-xs font-medium px-2 py-1 rounded-full text-white ${getGenreColor(event.genre)}`}>
              {event.genre}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg">
            <div className="flex items-center text-white text-sm font-medium">
              <Calendar size={16} className="mr-2" />
              {dateInfo.day}
            </div>
          </div>
          <div className="absolute bottom-4 right-4 bg-yellow-500/90 backdrop-blur-sm px-4 py-2 rounded-lg">
            <span className="text-black font-bold text-lg">{event.price}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Artist and Genre */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-rose-400 font-medium text-lg mb-1">
                {event.artist}
              </p>
              <div className="flex items-center">
                <Music size={16} className="text-yellow-400 mr-2" />
                <span className="text-gray-400 text-sm uppercase tracking-wide">{event.genre}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-yellow-400 justify-end">
                <DollarSign size={20} className="mr-1" />
                <span className="font-bold text-xl">{event.price.replace('$', '')}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">About This Event</h3>
            <p className="text-gray-300 leading-relaxed">{event.description}</p>
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar size={20} className="mr-3 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Date</p>
                  <p className="text-gray-300">{dateInfo.full}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock size={20} className="mr-3 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Time</p>
                  <p className="text-gray-300">{formatTime(event.time)}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Music size={20} className="mr-3 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Genre</p>
                  <p className="text-gray-300">{event.genre}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin size={20} className="mr-3 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Venue</p>
                  <p className="text-gray-300">{event.venue}</p>
                  <p className="text-gray-400 text-sm">{event.location}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Users size={20} className="mr-3 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Capacity</p>
                  <p className="text-gray-300">{event.capacity.toLocaleString()} people</p>
                </div>
              </div>

              <div className="flex items-start">
                <Ticket size={20} className="mr-3 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Ticket Price</p>
                  <p className="text-yellow-400 font-bold">{event.price}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-4 border-t border-gray-800">
            <button className="flex-1 bg-gray-800 text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors text-center font-medium border border-gray-700">
              Add to Calendar
            </button>
            <button className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-3 px-4 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 text-center font-medium">
              Get Tickets
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <h4 className="text-white font-medium mb-2">Event Information</h4>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>• Doors open 30 minutes before show time</li>
              <li>• Age restriction: 18+</li>
              <li>• Limited parking available</li>
              <li>• No outside food or beverages permitted</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;