import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { 
  UserCheck, Newspaper, Calendar, BookOpen, Award, Plus, 
  Clock, CheckCircle, AlertCircle, FileText, Upload, Sparkles 
} from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';
import { ResourceSubject, ResourceType, AchievementCategory } from '@/types';

export const TeacherDashboard: React.FC = () => {
  const { profile } = useAuth();
  const { 
    news, addNews, 
    events, addEvent, 
    resources, addResource, 
    achievements, addAchievement 
  } = useData();

  const [activeTab, setActiveTab] = useState<'overview' | 'news' | 'events' | 'resources' | 'achievements'>('overview');

  // Form states for creating drafts
  const [newArticleTitle, setNewArticleTitle] = useState('');
  const [newArticleSummary, setNewArticleSummary] = useState('');
  const [newArticleContent, setNewArticleContent] = useState('');
  const [newsSuccess, setNewsSuccess] = useState(false);

  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDesc, setNewEventDesc] = useState('');
  const [newEventLocation, setNewEventLocation] = useState('');
  const [newEventStart, setNewEventStart] = useState('');
  const [newEventEnd, setNewEventEnd] = useState('');
  const [eventSuccess, setEventSuccess] = useState(false);

  const [newResTitle, setNewResTitle] = useState('');
  const [newResDesc, setNewResDesc] = useState('');
  const [newResSubject, setNewResSubject] = useState<ResourceSubject>('Physics');
  const [newResType, setNewResType] = useState<ResourceType>('PDF');
  const [newResAccess, setNewResAccess] = useState<'public' | 'student'>('student');
  const [resSuccess, setResSuccess] = useState(false);

  const [newAchTitle, setNewAchTitle] = useState('');
  const [newAchEvent, setNewAchEvent] = useState('');
  const [newAchResult, setNewAchResult] = useState('');
  const [newAchCategory, setNewAchCategory] = useState<AchievementCategory>('Science competitions');
  const [newAchYear, setNewAchYear] = useState('2567');
  const [newAchDesc, setNewAchDesc] = useState('');
  const [achSuccess, setAchSuccess] = useState(false);

  // Statistics
  const teacherNews = news.filter((n) => n.author_id === profile?.id || n.author_name === profile?.display_name);
  const teacherDrafts = news.filter((n) => n.status === 'draft');
  const upcomingEvents = events.filter((e) => new Date(e.start_at).getTime() >= Date.now());

  // Handle Handlers
  const handleCreateNewsDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArticleTitle.trim()) return;

    await addNews({
      title: newArticleTitle,
      slug: 'news-' + Date.now(),
      summary: newArticleSummary,
      content: newArticleContent,
      category_id: 'cat-news-1',
      category_name: 'ข่าวประกาศโครงการ',
      cover_image_path: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
      author_id: profile?.id || 'teacher-1',
      author_name: profile?.display_name || 'ครูผู้สอน',
      status: 'draft', // Teachers create drafts for review
      is_featured: false,
    });

    setNewsSuccess(true);
    setNewArticleTitle('');
    setNewArticleSummary('');
    setNewArticleContent('');
    setTimeout(() => setNewsSuccess(false), 3000);
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    await addEvent({
      title: newEventTitle,
      description: newEventDesc,
      location: newEventLocation,
      start_at: newEventStart || new Date().toISOString(),
      end_at: newEventEnd || new Date().toISOString(),
      category_id: 'cat-event-1',
      category_name: 'ค่ายวิชาการ',
      organizer_id: profile?.id || 'teacher-1',
      organizer_name: profile?.display_name || 'คณะครูผู้สอน',
      status: 'published',
      visibility: 'public',
    });

    setEventSuccess(true);
    setNewEventTitle('');
    setNewEventDesc('');
    setNewEventLocation('');
    setTimeout(() => setEventSuccess(false), 3000);
  };

  const handleCreateResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResTitle.trim()) return;

    await addResource({
      title: newResTitle,
      description: newResDesc,
      subject: newResSubject,
      resource_type: newResType,
      access_level: newResAccess,
      author_id: profile?.id || 'teacher-1',
      author_name: profile?.display_name || 'คณะครูผู้สอน',
      file_size: '2.5 MB',
      status: 'published',
    });

    setResSuccess(true);
    setNewResTitle('');
    setNewResDesc('');
    setTimeout(() => setResSuccess(false), 3000);
  };

  const handleCreateAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAchTitle.trim()) return;

    await addAchievement({
      title: newAchTitle,
      event_name: newAchEvent,
      result: newAchResult,
      category: newAchCategory,
      academic_year: newAchYear,
      achievement_date: new Date().toISOString().split('T')[0],
      description: newAchDesc,
      image_paths: ['https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80'],
      submitted_by: profile?.id || 'teacher-1',
      submitter_name: profile?.display_name || 'ครูผู้สอน',
      status: 'pending_review', // Submitted for admin review
    });

    setAchSuccess(true);
    setNewAchTitle('');
    setNewAchEvent('');
    setNewAchResult('');
    setNewAchDesc('');
    setTimeout(() => setAchSuccess(false), 3000);
  };

  return (
    <DashboardLayout
      title="พอร์ทัลอาจารย์และบุคลากร (Teacher Dashboard)"
      subtitle="ระบบจัดการการเรียนการสอน กิจกรรมวิชาการ และส่งผลงานนักเรียน"
    >
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: 'ภาพรวมวิชาการ', icon: Clock },
            { id: 'news', label: 'ร่างข่าวและประกาศ', icon: Newspaper },
            { id: 'events', label: 'สร้างกิจกรรม/ค่าย', icon: Calendar },
            { id: 'resources', label: 'อัปโหลดเอกสารการสอน', icon: BookOpen },
            { id: 'achievements', label: 'ส่งผลงานการแข่งขัน', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  active
                    ? 'bg-school-green text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
                <div className="text-xs font-semibold text-slate-500">บทความแบบร่าง (Drafts)</div>
                <div className="text-2xl font-bold text-school-dark mt-1">{teacherDrafts.length}</div>
                <div className="text-[11px] text-amber-600 mt-1">รอการตรวจสอบและเผยแพร่</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
                <div className="text-xs font-semibold text-slate-500">กิจกรรมที่กำลังจะมาถึง</div>
                <div className="text-2xl font-bold text-school-dark mt-1">{upcomingEvents.length}</div>
                <div className="text-[11px] text-emerald-600 mt-1">กำหนดการในปฏิทิน</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
                <div className="text-xs font-semibold text-slate-500">คลังเอกสารในระบบ</div>
                <div className="text-2xl font-bold text-school-dark mt-1">{resources.length}</div>
                <div className="text-[11px] text-slate-400 mt-1">เผยแพร่สู่ผู้เรียนแล้ว</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-card">
                <div className="text-xs font-semibold text-slate-500">ผลงานรอการอนุมัติ</div>
                <div className="text-2xl font-bold text-school-dark mt-1">
                  {achievements.filter((a) => a.status === 'pending_review').length}
                </div>
                <div className="text-[11px] text-blue-600 mt-1">ส่งให้อนุมัติโดยแอดมิน</div>
              </div>
            </div>

            {/* Teacher permissions notice */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 leading-relaxed">
              <strong>สิทธิ์การใช้งานของอาจารย์ผู้สอน (Teacher Permissions):</strong>
              <ul className="list-disc list-inside mt-1 space-y-0.5 text-emerald-800">
                <li>สามารถสร้างและแก้ไขร่างข่าวสารเพื่อรอการอนุมัติ</li>
                <li>สามารถสร้างกิจกรรม ค่ายวิทยาศาสตร์-คณิตศาสตร์ และเผยแพร่ลงปฏิทิน</li>
                <li>สามารถอัปโหลดเอกสารประกอบการสอน สไลด์ และแบบฝึกหัดในคลังความรู้</li>
                <li>สามารถส่งผลงานและรางวัลของนักเรียนเพื่อรอการอนุมัติเข้าสู่หอเกียรติยศ</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Create News Draft */}
        {activeTab === 'news' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">ร่างข่าวและประกาศใหม่</h3>
              <p className="text-xs text-slate-500">
                ข่าวสารที่ครูผู้สอนสร้างจะถูกบันทึกเป็นแบบร่าง (Draft) เพื่อรอการตรวจสอบและเผยแพร่โดยผู้ดูแลระบบ
              </p>
            </div>

            {newsSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> บันทึกแบบร่างข่าวสารเรียบร้อยแล้ว
              </div>
            )}

            <form onSubmit={handleCreateNewsDraft} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  หัวข้อข่าวสาร (ภาษาไทย) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น กำหนดการสอบคัดเลือกเข้าค่ายวิชาการ..."
                  value={newArticleTitle}
                  onChange={(e) => setNewArticleTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  สรุปเนื้อหาย่อ (Summary) *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="สรุปสั้น 1-2 ประโยคสำหรับแสดงในการ์ดข่าว..."
                  value={newArticleSummary}
                  onChange={(e) => setNewArticleSummary(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  เนื้อหาฉบับเต็ม *
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="พิมพ์รายละเอียดเนื้อหาข่าวสาร ข้อกำหนด หรือรายละเอียดประกาศ..."
                  value={newArticleContent}
                  onChange={(e) => setNewArticleContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-school-green text-white text-xs font-bold hover:bg-school-dark transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>บันทึกแบบร่างข่าวสาร</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Create Event */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">เพิ่มกิจกรรมหรือกำหนดการใหม่</h3>
              <p className="text-xs text-slate-500">
                เพิ่มกำหนดการค่ายวิทยาศาสตร์ การทดสอบ หรือการอบรมลงในปฏิทินของโครงการ
              </p>
            </div>

            {eventSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> เพิ่มกิจกรรมลงในปฏิทินสำเร็จแล้ว
              </div>
            )}

            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ชื่อกิจกรรม *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น การอบรมเชิงปฏิบัติการดาราศาสตร์..."
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  สถานที่จัดกิจกรรม *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ห้องปฏิบัติการวิทยาศาสตร์ อาคาร 5"
                  value={newEventLocation}
                  onChange={(e) => setNewEventLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    วันและเวลาเริ่มต้น *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={newEventStart}
                    onChange={(e) => setNewEventStart(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    วันและเวลาสิ้นสุด *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={newEventEnd}
                    onChange={(e) => setNewEventEnd(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  คำอธิบายกิจกรรม
                </label>
                <textarea
                  rows={3}
                  placeholder="รายละเอียดกิจกรรม กำหนดการคร่าวๆ สิ่งที่ต้องเตรียม..."
                  value={newEventDesc}
                  onChange={(e) => setNewEventDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-school-green text-white text-xs font-bold hover:bg-school-dark transition-all shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>บันทึกกิจกรรมลงปฏิทิน</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: Upload Resource */}
        {activeTab === 'resources' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">อัปโหลดเอกสารเข้าสู่คลังความรู้</h3>
              <p className="text-xs text-slate-500">
                เพิ่มชีทเรียน เอกสารประกอบการสอน หรือแบบฝึกหัดสำหรับนักเรียน
              </p>
            </div>

            {resSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> เพิ่มเอกสารในคลังความรู้สำเร็จแล้ว
              </div>
            )}

            <form onSubmit={handleCreateResource} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ชื่อเอกสาร / ทรัพยากร *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น ชีทสรุปสูตรฟิสิกส์ - การเคลื่อนที่แนวตรง..."
                  value={newResTitle}
                  onChange={(e) => setNewResTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    กลุ่มสาระ / วิชา *
                  </label>
                  <select
                    value={newResSubject}
                    onChange={(e) => setNewResSubject(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  >
                    <option value="Physics">Physics (ฟิสิกส์)</option>
                    <option value="Mathematics">Mathematics (คณิตศาสตร์)</option>
                    <option value="Chemistry">Chemistry (เคมี)</option>
                    <option value="Biology">Biology (ชีววิทยา)</option>
                    <option value="Scientific Research">Scientific Research (วิจัย)</option>
                    <option value="STEM">STEM (สะเต็มศึกษา)</option>
                    <option value="Worksheets">Worksheets (ใบงาน)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ประเภทไฟล์ *
                  </label>
                  <select
                    value={newResType}
                    onChange={(e) => setNewResType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  >
                    <option value="PDF">PDF</option>
                    <option value="Document">Word Document</option>
                    <option value="Presentation">PowerPoint Presentation</option>
                    <option value="Spreadsheet">Excel / Spreadsheet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ระดับสิทธิ์การเข้าถึง *
                  </label>
                  <select
                    value={newResAccess}
                    onChange={(e) => setNewResAccess(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  >
                    <option value="student">เฉพาะนักเรียนโครงการ (Student)</option>
                    <option value="public">สาธารณะ (Public)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  คำอธิบายเอกสาร
                </label>
                <textarea
                  rows={3}
                  placeholder="อธิบายสรุปเนื้อหา วิธีนำไปใช้ หรือระดับชั้นที่เหมาะสม..."
                  value={newResDesc}
                  onChange={(e) => setNewResDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-school-green text-white text-xs font-bold hover:bg-school-dark transition-all shadow-sm"
              >
                <Upload className="w-4 h-4" />
                <span>บันทึกทรัพยากรการเรียนรู้</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 5: Submit Achievement */}
        {activeTab === 'achievements' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">ส่งผลงานและรางวัลนักเรียนเข้าสู่ระบบ</h3>
              <p className="text-xs text-slate-500">
                ส่งข้อมูลการแข่งขันและรางวัลของนักเรียนเพื่อรอการตรวจสอบและอนุมัติโดยผู้ดูแลระบบ
              </p>
            </div>

            {achSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> ส่งผลงานเข้าสู่ระบบเรียบร้อยแล้ว (รอการอนุมัติ)
              </div>
            )}

            <form onSubmit={handleCreateAchievement} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ชื่อผลงาน / รางวัลที่ได้รับ *
                </label>
                <input
                  type="text"
                  required
                  placeholder="เช่น รางวัลชนะเลิศ เหรียญทอง การแข่งขันตอบปัญหาวิทยาศาสตร์..."
                  value={newAchTitle}
                  onChange={(e) => setNewAchTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ชื่องาน / รายการแข่งขัน *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น งานสัปดาห์วิทยาศาสตร์แห่งชาติ..."
                    value={newAchEvent}
                    onChange={(e) => setNewAchEvent(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ผลการแข่งขัน / เหรียญรางวัล *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น เหรียญทอง, รองชนะเลิศอันดับ 1"
                    value={newAchResult}
                    onChange={(e) => setNewAchResult(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ประเภทผลงาน *
                  </label>
                  <select
                    value={newAchCategory}
                    onChange={(e) => setNewAchCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  >
                    <option value="Science competitions">การแข่งขันวิทยาศาสตร์</option>
                    <option value="Mathematics competitions">การแข่งขันคณิตศาสตร์</option>
                    <option value="Science projects">โครงงานวิทยาศาสตร์</option>
                    <option value="Research presentations">การนำเสนอผลงานวิจัย</option>
                    <option value="Academic awards">รางวัลเชิดชูเกียรติ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ปีการศึกษา *
                  </label>
                  <input
                    type="text"
                    required
                    value={newAchYear}
                    onChange={(e) => setNewAchYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  คำอธิบายผลงาน (ไม่ระบุข้อมูลส่วนบุคคลที่อ่อนไหวเพื่อความปลอดภัย)
                </label>
                <textarea
                  rows={3}
                  placeholder="รายละเอียดของผลงานและกระบวนการพัฒนา..."
                  value={newAchDesc}
                  onChange={(e) => setNewAchDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-school-green text-white text-xs font-bold hover:bg-school-dark transition-all shadow-sm"
              >
                <Award className="w-4 h-4" />
                <span>ส่งผลงานเพื่อขออนุมัติเผยแพร่</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};
