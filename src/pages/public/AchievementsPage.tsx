import React, { useState, useMemo } from 'react';
import { useData } from '@/context/DataContext';
import { AchievementCategory } from '@/types';
import { Trophy, Calendar, Search, Award, Sparkles, Filter, Users, X } from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

export const AchievementsPage: React.FC = () => {
  const { publishedAchievements } = useData();
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory | 'all'>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeModal, setActiveModal] = useState<any | null>(null);

  const categories: AchievementCategory[] = [
    'Science competitions',
    'Mathematics competitions',
    'Science projects',
    'Research presentations',
    'Academic awards',
    'School activities',
  ];

  const categoryLabels: Record<AchievementCategory, string> = {
    'Science competitions': 'การแข่งขันวิทยาศาสตร์',
    'Mathematics competitions': 'การแข่งขันคณิตศาสตร์',
    'Science projects': 'โครงงานวิทยาศาสตร์',
    'Research presentations': 'การนำเสนอผลงานวิจัย',
    'Academic awards': 'รางวัลเชิดชูเกียรติ',
    'School activities': 'กิจกรรมวิชาการในโรงเรียน',
  };

  // Get unique academic years
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(publishedAchievements.map((a) => a.academic_year)));
    return years.sort().reverse();
  }, [publishedAchievements]);

  // Filter achievements
  const filtered = useMemo(() => {
    return publishedAchievements.filter((ach) => {
      const matchCat = selectedCategory === 'all' || ach.category === selectedCategory;
      const matchYear = selectedYear === 'all' || ach.academic_year === selectedYear;
      const matchSearch =
        ach.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ach.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ach.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ach.result && ach.result.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchCat && matchYear && matchSearch;
    });
  }, [publishedAchievements, selectedCategory, selectedYear, searchTerm]);

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Top Banner */}
      <div className="bg-school-dark text-white py-12 border-b-4 border-school-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900 text-school-yellow text-xs font-semibold">
              <Trophy className="w-3.5 h-3.5 fill-school-yellow" /> หอเกียรติยศ (Hall of Fame)
            </div>
            <h1 className="text-3xl font-bold tracking-tight">ผลงานและรางวัลดีเด่น</h1>
            <p className="text-sm text-slate-300">
              ผลงานการแข่งขัน โครงงานวิทยาศาสตร์ และรางวัลเชิดชูเกียรติของนักเรียนโครงการ GIFTED
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Filter controls */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-card border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Year selector */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-school-green"
            >
              <option value="all">ทุกปีการศึกษา</option>
              {availableYears.map((yr) => (
                <option key={yr} value={yr}>ปีการศึกษา {yr}</option>
              ))}
            </select>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-school-green"
            >
              <option value="all">ทุกประเภทผลงาน ({publishedAchievements.length})</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{categoryLabels[cat]}</option>
              ))}
            </select>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาชื่อผลงาน การแข่งขัน หรือรางวัล..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
            <p className="text-slate-500 text-sm">ไม่พบผลงานที่ตรงกับเงื่อนไขการค้นหา</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((ach) => {
              const formattedDate = format(new Date(ach.achievement_date), 'dd MMMM yyyy', { locale: th });
              const image = ach.image_paths?.[0] || 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80';

              return (
                <div
                  key={ach.id}
                  onClick={() => setActiveModal(ach)}
                  className="bg-white rounded-xl border border-slate-200 shadow-card hover:shadow-elevated transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
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
        )}
      </div>

      {/* Achievement Detail Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto animate-fade-in">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-school-yellow text-school-dark text-xs font-bold shadow-sm">
                  {activeModal.result}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-school-soft text-school-green text-xs font-semibold">
                  ปีการศึกษา {activeModal.academic_year}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {activeModal.title}
              </h2>

              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1">
                <div><strong>การแข่งขัน/กิจกรรม:</strong> {activeModal.event_name}</div>
                <div><strong>วันที่จัดกิจกรรม:</strong> {format(new Date(activeModal.achievement_date), 'dd MMMM yyyy', { locale: th })}</div>
                {activeModal.student_names && (
                  <div><strong>ผู้แทนนักเรียนที่ได้รับรางวัล:</strong> {activeModal.student_names}</div>
                )}
              </div>

              {activeModal.image_paths && activeModal.image_paths.length > 0 && (
                <div className="space-y-2">
                  <div className="text-xs font-bold text-slate-700">
                    ภาพเกียรติบัตร / พิธีมอบรางวัล ({activeModal.image_paths.length} ภาพ):
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeModal.image_paths.map((imgUrl: string, idx: number) => (
                      <a
                        key={idx}
                        href={imgUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl overflow-hidden aspect-video bg-slate-100 border border-slate-200 block group hover:shadow-md transition-all relative"
                      >
                        <img
                          src={imgUrl}
                          alt={`${activeModal.title} - ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line pt-2">
                {activeModal.description}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
