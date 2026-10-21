import React, { useState, useMemo } from 'react';
import { useData } from '@/context/DataContext';
import { 
  Calendar as CalendarIcon, Clock, MapPin, Search, 
  ChevronLeft, ChevronRight, Filter, ExternalLink, CalendarDays 
} from 'lucide-react';
import { 
  format, startOfMonth, endOfMonth, eachDayOfInterval, 
  isSameMonth, isSameDay, addMonths, subMonths, isToday 
} from 'date-fns';
import { th } from 'date-fns/locale';
import { CalendarEvent } from '@/types';

export const CalendarPage: React.FC = () => {
  const { publishedEvents, categories } = useData();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [viewMode, setViewMode] = useState<'month' | 'list'>('month');
  const [activeModalEvent, setActiveModalEvent] = useState<CalendarEvent | null>(null);

  const eventCategories = categories.filter((c) => c.category_type === 'event');

  // Filter events
  const filteredEvents = useMemo(() => {
    return publishedEvents.filter((event) => {
      const matchCat = selectedCategory === 'all' || event.category_id === selectedCategory;
      const matchSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [publishedEvents, selectedCategory, searchTerm]);

  // Calendar dates calculation
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Upcoming vs past
  const now = new Date();
  const upcomingEvents = filteredEvents
    .filter((e) => new Date(e.start_at) >= new Date(now.setHours(0,0,0,0)))
    .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime());

  const pastEvents = filteredEvents
    .filter((e) => new Date(e.start_at) < new Date(now.setHours(0,0,0,0)))
    .sort((a, b) => new Date(b.start_at).getTime() - new Date(a.start_at).getTime());

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Top Banner */}
      <div className="bg-school-dark text-white py-12 border-b-4 border-school-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900 text-school-yellow text-xs font-semibold">
              <CalendarDays className="w-3.5 h-3.5" /> ปฏิทินวิชาการ
            </div>
            <h1 className="text-3xl font-bold tracking-tight">ปฏิทินกิจกรรมและการอบรม</h1>
            <p className="text-sm text-slate-300">
              กำหนดการค่ายวิทยาศาสตร์ การสอบวัดผล และกิจกรรมทางวิชาการประจำปีการศึกษา
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Controls Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-card border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* View Mode Toggle */}
            <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  viewMode === 'month' ? 'bg-white text-school-green shadow-sm' : 'text-slate-600'
                }`}
              >
                มุมมองรายเดือน
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                  viewMode === 'list' ? 'bg-white text-school-green shadow-sm' : 'text-slate-600'
                }`}
              >
                มุมมองรายการ
              </button>
            </div>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-school-green"
            >
              <option value="all">ทุกหมวดหมู่ ({publishedEvents.length})</option>
              {eventCategories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหากิจกรรม สถานที่..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
            />
          </div>
        </div>

        {/* View 1: Month View */}
        {viewMode === 'month' && (
          <div className="bg-white rounded-2xl shadow-card border border-slate-200 overflow-hidden">
            {/* Month Navigation */}
            <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {format(currentMonth, 'MMMM yyyy', { locale: th })}
              </h2>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className="p-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700"
                  title="เดือนก่อนหน้า"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentMonth(new Date())}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700"
                >
                  วันนี้
                </button>
                <button
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="p-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700"
                  title="เดือนถัดไป"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Days grid */}
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-7 gap-px mb-2 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>อา.</span>
                <span>จ.</span>
                <span>อ.</span>
                <span>พ.</span>
                <span>พฤ.</span>
                <span>ศ.</span>
                <span>ส.</span>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {daysInMonth.map((day) => {
                  const dayEvents = filteredEvents.filter((e) =>
                    isSameDay(new Date(e.start_at), day)
                  );
                  const isCurrentDay = isToday(day);

                  return (
                    <div
                      key={day.toISOString()}
                      className={`min-h-[90px] sm:min-h-[110px] p-2 rounded-xl border transition-all flex flex-col justify-between ${
                        isCurrentDay
                          ? 'border-school-green bg-school-soft/50 ring-1 ring-school-green'
                          : 'border-slate-200 bg-white hover:bg-slate-50/80'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                            isCurrentDay
                              ? 'bg-school-green text-white'
                              : 'text-slate-700'
                          }`}
                        >
                          {format(day, 'd')}
                        </span>
                        {dayEvents.length > 0 && (
                          <span className="w-2 h-2 rounded-full bg-school-yellow"></span>
                        )}
                      </div>

                      <div className="space-y-1 mt-1 overflow-y-auto max-h-[60px] scrollbar-none">
                        {dayEvents.map((evt) => (
                          <button
                            key={evt.id}
                            onClick={() => setActiveModalEvent(evt)}
                            className="w-full text-left p-1 rounded bg-school-green text-white text-[10px] font-semibold leading-tight truncate block hover:bg-school-dark"
                            title={evt.title}
                          >
                            {evt.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* View 2: List View & Upcoming Timeline */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-school-green" />
            กิจกรรมที่กำลังจะมาถึง ({upcomingEvents.length})
          </h2>

          {upcomingEvents.length === 0 ? (
            <div className="bg-white rounded-xl p-8 text-center border border-slate-200 text-slate-500 text-sm">
              ไม่มีกิจกรรมที่กำลังจะมาถึงในช่วงเวลานี้
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => {
                const startDate = new Date(event.start_at);
                return (
                  <div
                    key={event.id}
                    onClick={() => setActiveModalEvent(event)}
                    className="bg-white rounded-xl border border-slate-200 p-5 shadow-card hover:shadow-elevated hover:border-school-green transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-school-soft text-school-green border border-school-green/20">
                          {event.category_name || 'กิจกรรม'}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {format(startDate, 'dd MMM yyyy', { locale: th })}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 line-clamp-2">
                        {event.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="pt-2 text-xs text-slate-500 space-y-1">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-school-green shrink-0" />
                          <span>{format(startDate, 'HH:mm')} - {format(new Date(event.end_at), 'HH:mm')} น.</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-school-green shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-school-green">
                      <span>ดูรายละเอียด</span>
                      {event.registration_url && (
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">เปิดรับสมัคร</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Past Events Section */}
          {pastEvents.length > 0 && (
            <div className="pt-8 border-t border-slate-200">
              <h3 className="text-base font-bold text-slate-700 mb-4">
                กิจกรรมที่ผ่านมาแล้ว ({pastEvents.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {pastEvents.map((evt) => (
                  <div
                    key={evt.id}
                    onClick={() => setActiveModalEvent(evt)}
                    className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    <div className="font-bold text-slate-800 line-clamp-1">{evt.title}</div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {format(new Date(evt.start_at), 'dd MMMM yyyy', { locale: th })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Event Details Modal */}
      {activeModalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-school-soft text-school-green border border-school-green/20">
                  {activeModalEvent.category_name || 'กิจกรรม'}
                </span>
                <button
                  onClick={() => setActiveModalEvent(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 text-xs font-bold"
                >
                  ปิด
                </button>
              </div>

              <h3 className="text-xl font-bold text-slate-900 leading-snug">
                {activeModalEvent.title}
              </h3>

              <div className="space-y-2 p-3 rounded-xl bg-slate-50 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-school-green" />
                  <span>
                    {format(new Date(activeModalEvent.start_at), 'dd MMMM yyyy เวลา HH:mm น.', { locale: th })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-school-green" />
                  <span>{activeModalEvent.location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <span>ผู้จัด: {activeModalEvent.organizer_name || 'โครงการ GIFTED สารวิทยา'}</span>
                </div>
              </div>

              <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {activeModalEvent.description}
              </div>

              {activeModalEvent.registration_url && (
                <div className="pt-2">
                  <a
                    href={activeModalEvent.registration_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-school-green text-white font-semibold text-sm hover:bg-school-dark transition-all"
                  >
                    <span>ลงทะเบียนเข้าร่วมกิจกรรม</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
