import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { BRAND } from '@/constants/brand';
import { 
  GraduationCap, BookOpen, Calendar, Award, Download, 
  User, CheckCircle2, FileText, Clock, MapPin, ExternalLink, ShieldCheck 
} from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

export const StudentDashboard: React.FC = () => {
  const { profile, updateProfile } = useAuth();
  const { publishedNews, upcomingEvents, publishedResources, publishedAchievements, incrementDownload } = useData();

  const [displayNameInput, setDisplayNameInput] = useState(profile?.display_name || '');
  const [profileSaved, setProfileSaved] = useState(false);

  // Student accessible resources: public + student access level
  const studentResources = publishedResources.filter(
    (r) => r.access_level === 'public' || r.access_level === 'student'
  );

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayNameInput.trim()) return;
    await updateProfile({ display_name: displayNameInput.trim() });
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleDownload = (id: string, title: string) => {
    incrementDownload(id);
    alert(`ดาวน์โหลดเอกสารการเรียนสำหรับนักเรียน:\n${title}\n(ดึงไฟล์จากระบบ Private Storage)`);
  };

  return (
    <DashboardLayout
      title="พอร์ทัลนักเรียน (Student Portal)"
      subtitle="ระบบสารสนเทศและแหล่งเรียนรู้เฉพาะนักเรียนโครงการ GIFTED สารวิทยา"
    >
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-school-dark to-school-green rounded-2xl p-6 sm:p-8 text-white shadow-elevated flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-school-yellow text-xs font-semibold backdrop-blur-sm border border-white/20">
              <GraduationCap className="w-3.5 h-3.5" /> นักเรียนโครงการ GIFTED
            </span>
            <h2 className="text-xl sm:text-2xl font-bold">
              ยินดีต้อนรับ, {profile?.display_name || 'นักเรียน'}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
              {BRAND.PROGRAM_NAME_TH} • {profile?.class_name || 'ระดับชั้นมัธยมศึกษาตอนต้น'}
            </p>
          </div>

          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20 text-center shrink-0">
            <div className="text-xs text-slate-200">สถานะบัญชีนักเรียน</div>
            <div className="text-sm font-bold text-school-yellow mt-0.5 flex items-center gap-1 justify-center">
              <ShieldCheck className="w-4 h-4" /> ปกติ (Active)
            </div>
          </div>
        </div>

        {/* 2-Column Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (8 cols): Resources & Events */}
          <div className="lg:col-span-8 space-y-8">
            {/* Student Learning Resources */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-school-green" />
                  <h3 className="text-base font-bold text-slate-900">
                    เอกสารประกอบการเรียนและชีทสำหรับนักเรียน
                  </h3>
                </div>
                <span className="text-xs text-slate-400">
                  {studentResources.length} รายการ
                </span>
              </div>

              <div className="space-y-3">
                {studentResources.slice(0, 5).map((res) => (
                  <div
                    key={res.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-school-green/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-school-soft text-school-green border border-school-green/20">
                          {res.subject}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 uppercase">
                          {res.resource_type}
                        </span>
                        {res.access_level === 'student' && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                            เฉพาะนักเรียน
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{res.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{res.description}</p>
                    </div>

                    <button
                      onClick={() => handleDownload(res.id, res.title)}
                      className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-school-green text-white text-xs font-semibold hover:bg-school-dark transition-colors shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>ดาวน์โหลด</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Academic Events */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-school-green" />
                  <h3 className="text-base font-bold text-slate-900">
                    กำหนดการและกิจกรรมที่ต้องเข้าร่วม
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                {upcomingEvents.slice(0, 3).map((evt) => {
                  const startDate = new Date(evt.start_at);
                  return (
                    <div
                      key={evt.id}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-4"
                    >
                      <div className="w-12 h-14 rounded-xl bg-school-soft border border-school-green/20 text-school-green flex flex-col items-center justify-center shrink-0">
                        <span className="text-base font-bold">{format(startDate, 'dd')}</span>
                        <span className="text-[10px] font-bold uppercase">{format(startDate, 'MMM', { locale: th })}</span>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-slate-900">{evt.title}</h4>
                        <p className="text-xs text-slate-600 line-clamp-2">{evt.description}</p>
                        <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-school-green" />
                            {format(startDate, 'HH:mm')} น.
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-school-green" />
                            {evt.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Profile & Student Announcement */}
          <div className="lg:col-span-4 space-y-6">
            {/* Student Profile Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-card space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
                <User className="w-4 h-4 text-school-green" /> ข้อมูลบัญชีนักเรียน
              </h3>

              {profileSaved && (
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> บันทึกข้อมูลสำเร็จ
                </div>
              )}

              <form onSubmit={handleProfileUpdate} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    ชื่อ - สกุลที่แสดง
                  </label>
                  <input
                    type="text"
                    value={displayNameInput}
                    onChange={(e) => setDisplayNameInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    อีเมลสถานศึกษา
                  </label>
                  <input
                    type="text"
                    disabled
                    value={profile?.email || ''}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-100 text-xs text-slate-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    ระดับชั้น / ห้องเรียน
                  </label>
                  <input
                    type="text"
                    disabled
                    value={profile?.class_name || 'มัธยมศึกษาปีที่ 2/1'}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-100 text-xs text-slate-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    บทบาทในระบบ (Role)
                  </label>
                  <span className="inline-block px-2.5 py-1 rounded bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
                    นักเรียน (Student)
                  </span>
                  <p className="text-[10px] text-slate-400 mt-1">
                    * นักเรียนไม่สามารถเปลี่ยนบทบาทตนเองได้ตามข้อกำหนดความปลอดภัย
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-school-green text-white text-xs font-semibold hover:bg-school-dark transition-colors shadow-sm"
                >
                  บันทึกการแก้ไขโปรไฟล์
                </button>
              </form>
            </div>

            {/* Program Notice */}
            <div className="bg-school-soft border border-school-green/20 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-bold text-school-dark uppercase tracking-wider">
                ประกาศสำคัญสำหรับนักเรียน
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                ขอให้นักเรียนทุกคนตรวจเช็คไฟล์เอกสารประกอบการทำโครงงาน และส่งแบบข้อเสนอโครงงาน (Proposal) 
                ตามกำหนดการที่ระบุไว้ในปฏิทินกิจกรรม
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
