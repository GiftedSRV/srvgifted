import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { Calendar as CalendarIcon, Clock, MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

export const UpcomingEventsSection: React.FC = () => {
  const { upcomingEvents } = useData();

  const displayEvents = upcomingEvents.slice(0, 3);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-school-soft text-school-green text-xs font-semibold uppercase tracking-wider border border-school-green/20 mb-2">
              <CalendarIcon className="w-3.5 h-3.5 text-school-yellow" /> กิจกรรมและกำหนดการ
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-school-dark">
              กิจกรรมที่กำลังจะมาถึง
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              ตารางกิจกรรม ค่ายวิชาการ และการสอบวัดผลตามปฏิทินการศึกษา
            </p>
          </div>

          <Link
            to="/calendar"
            className="inline-flex items-center gap-2 text-sm font-semibold text-school-green hover:text-school-dark transition-colors group"
          >
            <span>ดูปฏิทินกิจกรรมทั้งหมด</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {displayEvents.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <p className="text-sm text-slate-500">ไม่มีกิจกรรมที่กำลังจะมาถึงในขณะนี้</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayEvents.map((event) => {
              const startDate = new Date(event.start_at);
              const day = format(startDate, 'dd');
              const month = format(startDate, 'MMM', { locale: th });
              const fullDate = format(startDate, 'dd MMMM yyyy', { locale: th });
              const time = format(startDate, 'HH:mm') + ' น.';

              return (
                <div
                  key={event.id}
                  className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-card hover:shadow-elevated hover:border-school-green/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header with Date Badge */}
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 flex flex-col items-center justify-center w-14 h-16 rounded-xl bg-school-soft text-school-green border border-school-green/20">
                        <span className="text-xl font-bold leading-none">{day}</span>
                        <span className="text-xs font-semibold text-school-dark mt-0.5">{month}</span>
                      </div>
                      <div className="space-y-1">
                        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {event.category_name || 'กิจกรรมทั่วไป'}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 line-clamp-2">
                          {event.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>

                    {/* Metadata details */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-school-green shrink-0" />
                        <span>{fullDate} เวลา {time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-school-green shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      จัดโดย: {event.organizer_name || 'โครงการ GIFTED'}
                    </span>
                    {event.registration_url && (
                      <a
                        href={event.registration_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-school-green hover:underline"
                      >
                        ลงทะเบียน <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
