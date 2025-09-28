import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Event } from '../types';

interface WeeklyCalendarProps {
  events: Event[];
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ events }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - dayOfWeek);
    return weekStart;
  });

  const getWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(currentWeekStart);
      day.setDate(currentWeekStart.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date: Date) => {
    const dateString = formatDate(date);
    return events.filter(event => event.date === dateString);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeekStart = new Date(currentWeekStart);
    newWeekStart.setDate(currentWeekStart.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeekStart(newWeekStart);
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekDays = getWeekDays();

  return (
    <div className="bg-transparent rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Weekly Events
        </h3>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-300">
            {currentWeekStart.toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric' 
            })} - {weekDays[6].toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </span>
          <div className="flex space-x-1">
            <button
              onClick={() => navigateWeek('prev')}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-300 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateWeek('next')}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-gray-300 hover:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-sm font-semibold text-gray-300 p-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          const isToday = formatDate(day) === formatDate(new Date());
          
          return (
            <div
              key={index}
              className={`min-h-[120px] p-2 border border-gray-700 rounded-lg ${
                isToday ? 'bg-blue-900/20 border-blue-500' : 'bg-gray-800/40 hover:bg-gray-700/40'
              }`}
            >
              <div className={`text-sm font-semibold mb-2 ${
                isToday ? 'text-blue-400' : 'text-gray-200'
              }`}>
                {day.getDate()}
              </div>
              
              <div className="space-y-1">
                {dayEvents.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    className="text-xs p-1 rounded bg-purple-100 text-purple-800 truncate"
                    title={`${event.name} at ${event.time}`}
                  >
                    <div className="font-medium truncate">{event.name}</div>
                    <div className="text-purple-600">{event.time}</div>
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-gray-500 text-center">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyCalendar;