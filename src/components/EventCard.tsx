import React from 'react';
import { MapPin, Clock, Music, Calendar, Users } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onViewDetails: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onViewDetails }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
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
    <div className="bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-700 hover:border-yellow-500/50 group transform hover:-translate-y-2 hover:scale-105">
      <div className="relative">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className={`text-xs font-medium px-2 py-1 rounded-full text-white ${getGenreColor(event.genre)}`}>
            {event.genre}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg">
          <div className="flex items-center text-white text-sm">
            <Calendar size={14} className="mr-1" />
            {formatDate(event.date)}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
          <p className="text-rose-400 font-medium text-sm">
            {event.artist}
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-300">
            <MapPin size={16} className="mr-2 text-rose-400" />
            <span className="text-sm">{event.venue}, {event.location}</span>
          </div>
          <div className="flex items-center text-gray-300">
            <Clock size={16} className="mr-2 text-rose-400" />
            <span className="text-sm">{event.time}</span>
          </div>
          <div className="flex items-center justify-between text-gray-300">
            <div className="flex items-center">
              <Users size={16} className="mr-2 text-rose-400" />
              <span className="text-sm">{event.capacity} capacity</span>
            </div>
            <span className="text-yellow-400 font-bold text-lg">{event.price}</span>
          </div>
        </div>

        <p className="text-gray-300 text-sm mb-6 line-clamp-2">{event.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Music size={16} className="text-yellow-400" />
            <span className="text-xs text-gray-400 uppercase tracking-wide">{event.genre}</span>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 font-medium transform hover:scale-105 hover:shadow-lg">
            <span onClick={() => onViewDetails(event)}>Get Tickets</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;