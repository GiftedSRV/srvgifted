import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { 
  ArrowLeft, Download, FileText, Lock, Eye, Calendar, 
  User, ShieldCheck, CheckCircle2, Share2, AlertCircle 
} from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

export const ResourceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { resources, incrementDownload } = useData();
  const { profile, role } = useAuth();

  const resource = resources.find((r) => r.id === id);

  if (!resource) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">ไม่พบเอกสารนี้</h2>
        <p className="text-sm text-slate-500 mb-6">เอกสารอาจถูกลบหรือย้ายที่อยู่</p>
        <Link
          to="/resources"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-school-green text-white text-sm font-semibold hover:bg-school-dark"
        >
          <ArrowLeft className="w-4 h-4" />
          กลับสู่คลังความรู้
        </Link>
      </div>
    );
  }

  const canAccess = () => {
    if (resource.access_level === 'public') return true;
    if (resource.access_level === 'student') return Boolean(profile);
    if (resource.access_level === 'teacher') return role === 'teacher' || role === 'admin';
    return false;
  };

  const isAccessible = canAccess();

  const handleDownload = () => {
    if (!isAccessible) {
      alert('เอกสารนี้สงวนสิทธิ์เฉพาะนักเรียนหรือบุคลากรของโครงการ กรุณาเข้าสู่ระบบ');
      return;
    }
    incrementDownload(resource.id);
    alert(`ดาวน์โหลดเอกสารสำเร็จ:\n${resource.title}\n(ในระบบจริงเชื่อมต่อไปยัง Supabase Storage Private Bucket)`);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between text-xs text-slate-500">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 font-semibold text-school-green hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
          </button>
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:underline">หน้าหลัก</Link>
            <span>/</span>
            <Link to="/resources" className="hover:underline">คลังความรู้</Link>
            <span>/</span>
            <span className="text-slate-800 truncate max-w-[200px]">{resource.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-white rounded-2xl shadow-card border border-slate-200 p-6 sm:p-10 space-y-6">
          {/* Header pill & dates */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-school-soft text-school-green font-bold border border-school-green/20">
                {resource.subject}
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-semibold uppercase">
                {resource.resource_type}
              </span>
              {resource.access_level !== 'public' && (
                <span className="px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200 font-medium flex items-center gap-1">
                  <Lock className="w-3 h-3" /> เฉพาะนักเรียน/บุคลากร
                </span>
              )}
            </div>

            <div className="text-slate-400">
              อัปเดตเมื่อ: {format(new Date(resource.created_at), 'dd MMMM yyyy', { locale: th })}
            </div>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
              {resource.title}
            </h1>
          </div>

          {/* Description */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm sm:text-base text-slate-700 leading-relaxed">
            {resource.description}
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-slate-400">ขนาดไฟล์</div>
              <div className="text-sm font-bold text-slate-800 mt-0.5">{resource.file_size || 'ไม่ระบุ'}</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-slate-400">ยอดดาวน์โหลด</div>
              <div className="text-sm font-bold text-slate-800 mt-0.5">{resource.downloads_count || 0} ครั้ง</div>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
              <div className="text-slate-400">ผู้จัดทำ / เผยแพร่</div>
              <div className="text-sm font-bold text-slate-800 mt-0.5">{resource.author_name || 'คณะทำงานโครงการ'}</div>
            </div>
          </div>

          {/* Download Action Area */}
          <div className="pt-6 border-t border-slate-100">
            {isAccessible ? (
              <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-emerald-900">คุณมีสิทธิ์เข้าถึงเอกสารนี้</div>
                    <div className="text-xs text-emerald-700">สามารถกดดาวน์โหลดเอกสารต้นฉบับได้ทันที</div>
                  </div>
                </div>
                <button
                  onClick={handleDownload}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-school-green text-white font-bold text-sm hover:bg-school-dark transition-all shadow-md"
                >
                  <Download className="w-4 h-4" />
                  ดาวน์โหลดเอกสาร
                </button>
              </div>
            ) : (
              <div className="p-5 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Lock className="w-6 h-6 text-amber-600 shrink-0" />
                  <div>
                    <div className="text-sm font-bold text-amber-900">เอกสารนี้ต้องเข้าสู่ระบบก่อนดาวน์โหลด</div>
                    <div className="text-xs text-amber-700">สงวนสิทธิ์เฉพาะนักเรียนและอาจารย์โครงการ GIFTED โรงเรียนสารวิทยา</div>
                  </div>
                </div>
                <Link
                  to="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-school-green text-white font-bold text-xs hover:bg-school-dark transition-all shadow-sm"
                >
                  เข้าสู่ระบบเพื่อดาวน์โหลด
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
