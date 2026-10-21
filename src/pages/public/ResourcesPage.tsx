import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { ResourceSubject, ResourceType } from '@/types';
import { 
  BookOpen, Search, Download, FileText, Lock, 
  Eye, CheckCircle, FileCode, Video, FileSpreadsheet, Presentation 
} from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

export const ResourcesPage: React.FC = () => {
  const { publishedResources, incrementDownload } = useData();
  const { profile, role } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<ResourceSubject | 'all'>('all');
  const [selectedType, setSelectedType] = useState<ResourceType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'downloads'>('newest');

  const subjects: ResourceSubject[] = [
    'Physics',
    'Mathematics',
    'Chemistry',
    'Biology',
    'Scientific Research',
    'STEM',
    'Worksheets',
    'Learning Documents',
    'Other Academic Resources',
  ];

  const types: ResourceType[] = ['PDF', 'Document', 'Presentation', 'Spreadsheet', 'Link', 'Video'];

  const filteredResources = useMemo(() => {
    return publishedResources
      .filter((res) => {
        const matchSubj = selectedSubject === 'all' || res.subject === selectedSubject;
        const matchType = selectedType === 'all' || res.resource_type === selectedType;
        const matchSearch =
          res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          res.description.toLowerCase().includes(searchTerm.toLowerCase());

        return matchSubj && matchType && matchSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'downloads') {
          return (b.downloads_count || 0) - (a.downloads_count || 0);
        }
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [publishedResources, selectedSubject, selectedType, searchTerm, sortBy]);

  const canAccess = (accessLevel: string) => {
    if (accessLevel === 'public') return true;
    if (accessLevel === 'student') return Boolean(profile);
    if (accessLevel === 'teacher') return role === 'teacher' || role === 'admin';
    return false;
  };

  const handleDownload = (resId: string, title: string, accessLevel: string) => {
    if (!canAccess(accessLevel)) {
      alert('เอกสารนี้สงวนสิทธิ์เฉพาะนักเรียนหรือบุคลากรของโครงการ กรุณาเข้าสู่ระบบก่อนดาวน์โหลด');
      return;
    }
    incrementDownload(resId);
    alert(`เริ่มดาวน์โหลดเอกสาร:\n${title}\n(ในระบบจริงเชื่อมต่อไปยัง Supabase Storage พร้อม Signed URL)`);
  };

  const getFileIcon = (type: ResourceType) => {
    switch (type) {
      case 'PDF': return <FileText className="w-5 h-5 text-red-500" />;
      case 'Presentation': return <Presentation className="w-5 h-5 text-amber-500" />;
      case 'Spreadsheet': return <FileSpreadsheet className="w-5 h-5 text-emerald-500" />;
      case 'Video': return <Video className="w-5 h-5 text-blue-500" />;
      default: return <FileText className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Header Banner */}
      <div className="bg-school-dark text-white py-12 border-b-4 border-school-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900 text-school-yellow text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5" /> คลังความรู้ทางวิชาการ
            </div>
            <h1 className="text-3xl font-bold tracking-tight">คลังความรู้และเอกสารการเรียนรู้</h1>
            <p className="text-sm text-slate-300">
              ศูนย์รวมเอกสารประกอบการสอน สไลด์บรรยาย ใบงาน และคู่มือปฏิบัติการทดลอง
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Search & Filter Toolbar */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-card border border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Subject Selector */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value as any)}
              className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-school-green"
            >
              <option value="all">ทุกสาขาวิชา ({publishedResources.length})</option>
              {subjects.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Type Selector */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-school-green"
            >
              <option value="all">ทุกประเภทไฟล์</option>
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            {/* Sort Order */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-school-green"
            >
              <option value="newest">อัปเดตล่าสุด</option>
              <option value="downloads">ยอดดาวน์โหลดสูงสุด</option>
            </select>
          </div>

          {/* Search box */}
          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาชื่อเอกสาร คำอธิบาย หรือบทเรียน..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
            />
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
            <p className="text-slate-500 text-sm">ไม่พบเอกสารหรือทรัพยากรที่ตรงกับเงื่อนไข</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res) => {
              const accessible = canAccess(res.access_level);
              return (
                <div
                  key={res.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getFileIcon(res.resource_type)}
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-school-soft text-school-green border border-school-green/20">
                          {res.subject}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-400 uppercase">
                        {res.resource_type}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 line-clamp-2 hover:text-school-green transition-colors">
                      <Link to={`/resources/${res.id}`}>{res.title}</Link>
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {res.description}
                    </p>

                    <div className="pt-2 text-xs text-slate-400 flex items-center justify-between">
                      <span>ขนาด: {res.file_size || 'เอกสาร'}</span>
                      <span>ดาวน์โหลด: {res.downloads_count || 0} ครั้ง</span>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <Link
                      to={`/resources/${res.id}`}
                      className="inline-flex items-center gap-1 font-semibold text-slate-600 hover:text-school-green"
                    >
                      <Eye className="w-3.5 h-3.5" /> รายละเอียด
                    </Link>

                    {accessible ? (
                      <button
                        onClick={() => handleDownload(res.id, res.title, res.access_level)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-school-green text-white font-semibold hover:bg-school-dark transition-colors shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>ดาวน์โหลด</span>
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-300 text-[11px] font-medium hover:bg-amber-100"
                      >
                        <Lock className="w-3 h-3" />
                        <span>เฉพาะสมาชิก (เข้าสู่ระบบ)</span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
