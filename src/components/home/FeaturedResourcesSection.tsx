import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { ResourceSubject } from '@/types';
import { BookOpen, FileText, Download, ArrowRight, Lock, Eye } from 'lucide-react';

export const FeaturedResourcesSection: React.FC = () => {
  const { publishedResources, incrementDownload } = useData();
  const [selectedSubject, setSelectedSubject] = useState<ResourceSubject | 'all'>('all');

  const subjects: ResourceSubject[] = [
    'Physics',
    'Mathematics',
    'Chemistry',
    'Biology',
    'Scientific Research',
    'STEM',
  ];

  const filtered = selectedSubject === 'all'
    ? publishedResources
    : publishedResources.filter((r) => r.subject === selectedSubject);

  const displayResources = filtered.slice(0, 4);

  return (
    <section className="py-16 bg-school-light border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-school-green text-xs font-semibold uppercase tracking-wider border border-school-green/20 mb-2">
              <BookOpen className="w-3.5 h-3.5 text-school-yellow" /> แหล่งเรียนรู้ดิจิทัล
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-school-dark">
              คลังความรู้ทางวิชาการ
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              เอกสารประกอบการสอน แบบฝึกหัด และคู่มือปฏิบัติการทดลอง
            </p>
          </div>

          <Link
            to="/resources"
            className="inline-flex items-center gap-2 text-sm font-semibold text-school-green hover:text-school-dark transition-colors group"
          >
            <span>ดูคลังความรู้ทั้งหมด</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Subject Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          <button
            onClick={() => setSelectedSubject('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedSubject === 'all'
                ? 'bg-school-green text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            ทั้งหมด
          </button>
          {subjects.map((subj) => (
            <button
              key={subj}
              onClick={() => setSelectedSubject(subj)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSubject === subj
                  ? 'bg-school-green text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {subj}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayResources.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-school-soft text-school-green border border-school-green/20">
                    {res.subject}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase">
                    {res.resource_type}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 line-clamp-2 hover:text-school-green transition-colors">
                  <Link to={`/resources/${res.id}`}>{res.title}</Link>
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {res.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  {res.file_size || 'เอกสาร'}
                </span>

                <div className="flex items-center gap-1.5">
                  <Link
                    to={`/resources/${res.id}`}
                    className="p-1.5 rounded text-slate-500 hover:text-school-green hover:bg-slate-50"
                    title="ดูรายละเอียด"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>

                  {res.access_level === 'public' ? (
                    <button
                      onClick={() => {
                        incrementDownload(res.id);
                        alert(`ดาวน์โหลดเอกสาร: ${res.title}\n(ในระบบจริงจะดาวน์โหลดไฟล์จาก Supabase Storage)`);
                      }}
                      className="flex items-center gap-1 px-2.5 py-1 rounded bg-school-soft text-school-green hover:bg-school-green hover:text-white font-semibold transition-colors"
                      title="ดาวน์โหลดไฟล์"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>โหลด</span>
                    </button>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <Lock className="w-3 h-3" /> นักเรียน
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
