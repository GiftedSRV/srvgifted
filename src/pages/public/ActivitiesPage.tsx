import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { Compass, Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

export const ActivitiesPage: React.FC = () => {
  const { publishedEvents } = useData();

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Header */}
      <div className="bg-school-dark text-white py-12 border-b-4 border-school-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900 text-school-yellow text-xs font-semibold">
              <Compass className="w-3.5 h-3.5" /> กิจกรรมพัฒนาผู้เรียน
            </div>
            <h1 className="text-3xl font-bold tracking-tight">กิจกรรมวิชาการและการเรียนรู้</h1>
            <p className="text-sm text-slate-300">
              ค่ายวิชาการ การศึกษาแหล่งเรียนรู้นอกสถานที่ และการอบรมเชิงปฏิบัติการทางวิทยาศาสตร์และคณิตศาสตร์
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedEvents.map((evt) => {
            const formattedDate = format(new Date(evt.start_at), 'dd MMMM yyyy', { locale: th });
            const image = evt.cover_image_path || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80';

            return (
              <div
                key={evt.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={image}
                    alt={evt.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-school-dark/90 text-white text-xs font-medium backdrop-blur-sm">
                      {evt.category_name || 'กิจกรรม'}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-school-green" />
                      <span>{formattedDate}</span>
                    </div>

                    <h2 className="text-base font-bold text-slate-900 group-hover:text-school-green transition-colors line-clamp-2">
                      {evt.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {evt.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100">
                      <MapPin className="w-3.5 h-3.5 text-school-green shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400">
                      {evt.organizer_name || 'โครงการ GIFTED'}
                    </span>
                    <Link
                      to="/calendar"
                      className="inline-flex items-center gap-1 font-semibold text-school-green hover:underline"
                    >
                      ดูในปฏิทิน <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
