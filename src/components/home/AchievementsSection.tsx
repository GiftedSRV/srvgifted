import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { Trophy, Award, ArrowRight, Calendar, Sparkles } from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

export const AchievementsSection: React.FC = () => {
  const { publishedAchievements } = useData();

  const displayAchievements = publishedAchievements.slice(0, 3);

  if (displayAchievements.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold uppercase tracking-wider border border-amber-200 mb-2">
              <Trophy className="w-3.5 h-3.5 text-school-yellow fill-school-yellow" /> ผลงานแห่งความภาคภูมิใจ
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-school-dark">
              ผลงานและรางวัลดีเด่น
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              ความสำเร็จและรางวัลจากการแข่งขันทางวิชาการและโครงงานของนักเรียนโครงการ GIFTED
            </p>
          </div>

          <Link
            to="/achievements"
            className="inline-flex items-center gap-2 text-sm font-semibold text-school-green hover:text-school-dark transition-colors group"
          >
            <span>ดูผลงานทั้งหมด</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayAchievements.map((ach) => {
            const formattedDate = format(new Date(ach.achievement_date), 'dd MMMM yyyy', { locale: th });
            const image = ach.image_paths?.[0] || 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80';

            return (
              <div
                key={ach.id}
                className="bg-white rounded-xl border border-slate-200/90 shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={image}
                    alt={ach.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-school-yellow text-school-dark text-xs font-bold shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      {ach.result}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[11px] backdrop-blur-sm">
                    ปีการศึกษา {ach.academic_year}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-school-green">
                      {ach.event_name}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-school-green transition-colors line-clamp-2">
                      {ach.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                      {ach.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-school-green" />
                      <span>{formattedDate}</span>
                    </div>

                    {ach.student_names && (
                      <span className="text-slate-600 font-medium truncate max-w-[150px]">
                        {ach.student_names}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
