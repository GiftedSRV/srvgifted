import React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Newspaper, Calendar, BookOpen, Award, Users, 
  Settings, ShieldAlert, CheckCircle, Clock, ArrowRight, Activity 
} from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

export const AdminDashboard: React.FC = () => {
  const { 
    news, events, resources, achievements, users, auditLogs 
  } = useData();

  const publishedNewsCount = news.filter((n) => n.status === 'published').length;
  const draftNewsCount = news.filter((n) => n.status === 'draft').length;
  const upcomingEventsCount = events.filter((e) => new Date(e.start_at).getTime() >= Date.now()).length;
  const pendingAchievementsCount = achievements.filter((a) => a.status === 'pending_review').length;

  return (
    <DashboardLayout
      title="ศูนย์ควบคุมผู้ดูแลระบบ (Admin Dashboard)"
      subtitle="ระบบบริหารจัดการข้อมูลสารสนเทศ นโยบายการเข้าถึง และการเผยแพร่ข้อมูลทางการ"
    >
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-500">ข่าวสารที่เผยแพร่</div>
              <div className="text-3xl font-extrabold text-school-dark mt-1">{publishedNewsCount}</div>
              <div className="text-[11px] text-amber-600 mt-1">แบบร่างคงเหลือ {draftNewsCount} รายการ</div>
            </div>
            <div className="p-3.5 rounded-xl bg-school-soft text-school-green">
              <Newspaper className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-500">กิจกรรมที่กำลังจะมาถึง</div>
              <div className="text-3xl font-extrabold text-school-dark mt-1">{upcomingEventsCount}</div>
              <div className="text-[11px] text-slate-400 mt-1">รวมทั้งหมด {events.length} กิจกรรม</div>
            </div>
            <div className="p-3.5 rounded-xl bg-school-soft text-school-green">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-500">คลังเอกสารและทรัพยากร</div>
              <div className="text-3xl font-extrabold text-school-dark mt-1">{resources.length}</div>
              <div className="text-[11px] text-emerald-600 mt-1">พร้อมให้นักเรียนดาวน์โหลด</div>
            </div>
            <div className="p-3.5 rounded-xl bg-school-soft text-school-green">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-500">ผลงานรอการอนุมัติ</div>
              <div className="text-3xl font-extrabold text-school-dark mt-1">{pendingAchievementsCount}</div>
              <div className="text-[11px] text-blue-600 mt-1">ส่งจากอาจารย์ผู้สอน</div>
            </div>
            <div className="p-3.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
              <Award className="w-6 h-6 text-school-yellow" />
            </div>
          </div>
        </div>

        {/* Quick Management Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <Link
            to="/admin/news"
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-school-green shadow-card hover:shadow-elevated transition-all flex flex-col items-center text-center group"
          >
            <Newspaper className="w-6 h-6 text-school-green mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800">จัดการข่าวสาร</span>
          </Link>

          <Link
            to="/admin/events"
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-school-green shadow-card hover:shadow-elevated transition-all flex flex-col items-center text-center group"
          >
            <Calendar className="w-6 h-6 text-school-green mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800">จัดการกิจกรรม</span>
          </Link>

          <Link
            to="/admin/resources"
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-school-green shadow-card hover:shadow-elevated transition-all flex flex-col items-center text-center group"
          >
            <BookOpen className="w-6 h-6 text-school-green mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800">จัดการคลังความรู้</span>
          </Link>

          <Link
            to="/admin/achievements"
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-school-green shadow-card hover:shadow-elevated transition-all flex flex-col items-center text-center group"
          >
            <Award className="w-6 h-6 text-school-green mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800">จัดการผลงาน</span>
          </Link>

          <Link
            to="/admin/users"
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-school-green shadow-card hover:shadow-elevated transition-all flex flex-col items-center text-center group"
          >
            <Users className="w-6 h-6 text-school-green mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800">จัดการผู้ใช้ & สิทธิ์</span>
          </Link>

          <Link
            to="/admin/settings"
            className="p-4 rounded-xl bg-white border border-slate-200 hover:border-school-green shadow-card hover:shadow-elevated transition-all flex flex-col items-center text-center group"
          >
            <Settings className="w-6 h-6 text-school-green mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-bold text-slate-800">ตั้งค่าเว็บไซต์</span>
          </Link>
        </div>

        {/* Audit Log Table (Recent Administrative Activity) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-school-green" />
              <h3 className="text-base font-bold text-slate-900">
                ประวัติการดำเนินการของผู้ดูแลระบบ (Audit Logs)
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              บันทึกกิจกรรมความปลอดภัยอัตโนมัติ
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">วันและเวลา</th>
                  <th className="px-6 py-3.5">ผู้ดำเนินการ</th>
                  <th className="px-6 py-3.5">บทบาท</th>
                  <th className="px-6 py-3.5">การกระทำ (Action)</th>
                  <th className="px-6 py-3.5">ตารางเป้าหมาย</th>
                  <th className="px-6 py-3.5">รายละเอียด</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.slice(0, 10).map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3 text-slate-500 whitespace-nowrap">
                      {format(new Date(log.created_at), 'dd MMM yyyy HH:mm:ss น.', { locale: th })}
                    </td>
                    <td className="px-6 py-3 font-semibold text-slate-800 whitespace-nowrap">
                      {log.actor_name}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {log.actor_role}
                      </span>
                    </td>
                    <td className="px-6 py-3 font-mono font-bold text-school-green whitespace-nowrap">
                      {log.action}
                    </td>
                    <td className="px-6 py-3 text-slate-500 font-mono whitespace-nowrap">
                      {log.entity_type}
                    </td>
                    <td className="px-6 py-3 text-slate-600 max-w-xs truncate">
                      {log.details || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
