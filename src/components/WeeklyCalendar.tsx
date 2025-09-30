import React, { useState, useMemo } from 'react';
import { Event } from '../types';
import { Calendar, Clock, MapPin, Music, ChevronLeft, ChevronRight, Grid3x3 as Grid3X3 } from 'lucide-react';

interface WeeklyCalendarProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ events, onEventClick }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);
    monday.setHours(0, 0, 0, 0);
    return monday;
  });
  
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<'weekly' | 'monthly'>('weekly');
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const weekDates = useMemo(() => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + i);
      dates.push(date);
    }
    return dates;
  }, [currentWeekStart]);

  const monthDates = useMemo(() => {
    const year = currentWeekStart.getFullYear();
    const month = currentWeekStart.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Get the Monday of the week containing the first day
    const startDate = new Date(firstDay);
    const dayOfWeek = firstDay.getDay();
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    startDate.setDate(firstDay.getDate() + mondayOffset);
    
    // Generate all dates for the calendar grid
    const dates = [];
    const current = new Date(startDate);
    
    // Generate 6 weeks (42 days) to ensure full month coverage
    for (let i = 0; i < 42; i++) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return { dates, currentMonth: month, currentYear: year };
  }, [currentWeekStart]);

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeekStart(newDate);
    setSelectedDay(null);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeekStart);
    newDate.setMonth(currentWeekStart.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentWeekStart(newDate);
    setSelectedDay(null);
  };

  const isToday = (date: Date) => {
    return date.getTime() === today.getTime();
  };

  const isSameDay = (date1: Date, date2: Date | null) => {
    if (!date2) return false;
    return date1.getTime() === date2.getTime();
  };

  const selectedDayEvents = selectedDay ? getEventsForDate(selectedDay) : [];

  const formatDateHeader = () => {
    if (viewMode === 'weekly') {
      const endDate = new Date(currentWeekStart);
      endDate.setDate(currentWeekStart.getDate() + 6);
      
      if (currentWeekStart.getMonth() === endDate.getMonth()) {
        return `${months[currentWeekStart.getMonth()]} ${currentWeekStart.getDate()}-${endDate.getDate()}, ${currentWeekStart.getFullYear()}`;
      } else {
        return `${months[currentWeekStart.getMonth()]} ${currentWeekStart.getDate()} - ${months[endDate.getMonth()]} ${endDate.getDate()}, ${currentWeekStart.getFullYear()}`;
      }
    } else {
      return `${months[monthDates.currentMonth]} ${monthDates.currentYear}`;
    }
  };

  const renderWeeklyView = () => (
    <div className="grid grid-cols-7 gap-4">
      {weekDates.map((date, index) => {
        const dayEvents = getEventsForDate(date);
        const isCurrentDay = isToday(date);
        const isSelected = isSameDay(date, selectedDay);
        
        return (
          <div
            key={index}
            className={`bg-gray-800 rounded-lg p-4 border transition-all duration-300 cursor-pointer hover:scale-105 ${
              isCurrentDay 
                ? 'border-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-400/20' 
                : isSelected
                ? 'border-yellow-400 bg-yellow-400/5'
                : 'border-gray-700 hover:border-yellow-400'
            }`}
            onClick={() => setSelectedDay(isSelected ? null : date)}
          >
            <div className="text-center">
              <h4 className={`font-semibold mb-2 ${
                isCurrentDay ? 'text-yellow-400' : 'text-white'
              }`}>
                {days[index]}
              </h4>
              <div className={`text-2xl font-bold mb-2 ${
                isCurrentDay ? 'text-yellow-400' : 'text-gray-300'
              }`}>
                {date.getDate()}
              </div>
              <div className={`text-sm px-2 py-1 rounded-full ${
                dayEvents.length > 0 
                  ? 'bg-yellow-400 text-black font-medium' 
                  : 'bg-gray-700 text-gray-400'
              }`}>
                {dayEvents.length} {dayEvents.length === 1 ? 'event' : 'events'}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderMonthlyView = () => (
    <div className="space-y-4">
      {/* Day headers */}
      <div className="grid grid-cols-7 gap-2">
        {days.map(day => (
          <div key={day} className="text-center text-yellow-400 font-semibold py-2">
            {day.slice(0, 3)}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {monthDates.dates.map((date, index) => {
          const dayEvents = getEventsForDate(date);
          const isCurrentDay = isToday(date);
          const isSelected = isSameDay(date, selectedDay);
          const isCurrentMonth = date.getMonth() === monthDates.currentMonth;
          
          return (
            <div
              key={index}
              className={`aspect-square bg-gray-800 rounded-lg p-2 border transition-all duration-300 cursor-pointer hover:scale-105 ${
                isCurrentDay 
                  ? 'border-yellow-400 bg-yellow-400/10 shadow-lg shadow-yellow-400/20' 
                  : isSelected
                  ? 'border-yellow-400 bg-yellow-400/5'
                  : 'border-gray-700 hover:border-yellow-400'
              } ${!isCurrentMonth ? 'opacity-40' : ''}`}
              onClick={() => setSelectedDay(isSelected ? null : date)}
            >
              <div className="h-full flex flex-col justify-between">
                <div className={`text-sm font-semibold ${
                  isCurrentDay ? 'text-yellow-400' : isCurrentMonth ? 'text-white' : 'text-gray-500'
                }`}>
                  {date.getDate()}
                </div>
                {dayEvents.length > 0 && (
                  <div className="text-xs bg-yellow-400 text-black rounded-full px-1 py-0.5 text-center font-medium">
                    {dayEvents.length}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">Events Calendar</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'weekly' ? 'monthly' : 'weekly')}
            className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
              viewMode === 'monthly' 
                ? 'bg-yellow-400 text-black' 
                : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
          >
            <Grid3X3 size={16} />
            {viewMode === 'weekly' ? 'Monthly' : 'Weekly'}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => viewMode === 'weekly' ? navigateWeek('prev') : navigateMonth('prev')}
          className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft size={20} />
        </button>
        
        <h4 className="text-lg font-semibold text-white">
          {formatDateHeader()}
        </h4>
        
        <button
          onClick={() => viewMode === 'weekly' ? navigateWeek('next') : navigateMonth('next')}
          className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 hover:scale-110"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Calendar View */}
      {viewMode === 'weekly' ? renderWeeklyView() : renderMonthlyView()}

      {/* Selected Day Events */}
      {selectedDay && selectedDayEvents.length > 0 && (
        <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
          <h4 className="text-lg font-semibold text-yellow-400 mb-4">
            Events on {selectedDay.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h4>
          
          <div className="space-y-4">
            {selectedDayEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-all duration-300 cursor-pointer group hover:scale-105"
                onClick={() => onEventClick(event)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-semibold text-white group-hover:text-yellow-400 transition-colors mb-2">
                      {event.name}
                    </h5>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        <span>{event.time}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-yellow-400" />
                        <span>{event.venue}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Music className="w-4 h-4 text-yellow-400" />
                        <span>{event.genre}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400 font-semibold">{event.price}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedDay && selectedDayEvents.length === 0 && (
        <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700 text-center">
          <p className="text-gray-400">
            No events scheduled for {selectedDay.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      )}
    </div>
  );
};

export default WeeklyCalendar;