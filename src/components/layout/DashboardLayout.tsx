import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { BRAND } from '@/constants/brand';
import { EmblemImage } from '@/components/common/EmblemImage';
import {
  LayoutDashboard,
  Newspaper,
  Calendar,
  BookOpen,
  Award,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  KeyRound
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  const { profile, role, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getRoleBadge = () => {
    if (role === 'admin') return { label: 'ผู้ดูแลระบบ (Admin)', bg: 'bg-red-50 text-red-700 border-red-200' };
    if (role === 'teacher') return { label: 'ครูผู้สอน (Teacher)', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    return { label: 'นักเรียน (Student)', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
  };

  const adminNav = [
    { name: 'ภาพรวมระบบ', path: '/admin', icon: LayoutDashboard },
    { name: 'จัดการข่าวสาร', path: '/admin/news', icon: Newspaper },
    { name: 'จัดการกิจกรรม & ปฏิทิน', path: '/admin/events', icon: Calendar },
    { name: 'จัดการคลังความรู้', path: '/admin/resources', icon: BookOpen },
    { name: 'จัดการผลงาน & รางวัล', path: '/admin/achievements', icon: Award },
    { name: 'จัดการผู้ใช้ & บทบาท', path: '/admin/users', icon: Users },
    { name: 'การตั้งค่าเว็บไซต์', path: '/admin/settings', icon: Settings },
    { name: 'ข้อมูลส่วนตัว & รหัสผ่าน', path: '/profile', icon: KeyRound },
  ];

  const teacherNav = [
    { name: 'พอร์ทัลอาจารย์ผู้สอน', path: '/teacher', icon: LayoutDashboard },
    { name: 'คลังความรู้ทางวิชาการ', path: '/resources', icon: BookOpen },
    { name: 'ปฏิทินกิจกรรมการเรียน', path: '/calendar', icon: Calendar },
    { name: 'ผลงานและรางวัล', path: '/achievements', icon: Award },
    { name: 'ข้อมูลส่วนตัว & รหัสผ่าน', path: '/profile', icon: KeyRound },
  ];

  const studentNav = [
    { name: 'พอร์ทัลนักเรียน', path: '/student', icon: LayoutDashboard },
    { name: 'คลังความรู้และเอกสาร', path: '/resources', icon: BookOpen },
    { name: 'ปฏิทินกิจกรรมและการสอบ', path: '/calendar', icon: Calendar },
    { name: 'ผลงานนักเรียนดีเด่น', path: '/achievements', icon: Award },
    { name: 'ข้อมูลส่วนตัว & รหัสผ่าน', path: '/profile', icon: KeyRound },
  ];

  const currentNav = role === 'admin' ? adminNav : role === 'teacher' ? teacherNav : studentNav;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-school-dark text-white flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="p-5 border-b border-emerald-800/80">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-3">
                <div className="p-1 rounded bg-white shrink-0">
                  <EmblemImage type="program" size="sm" />
                </div>
                <div>
                  <div className="text-base font-bold text-school-yellow leading-none">
                    {BRAND.PROGRAM_SHORT_EN}
                  </div>
                  <div className="text-[11px] font-semibold text-emerald-200 mt-0.5">
                    {BRAND.PROGRAM_FULL_EN}
                  </div>
                  <div className="text-[10px] text-slate-300 truncate max-w-[150px]">
                    {BRAND.SCHOOL_NAME_TH}
                  </div>
                </div>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* User Profile Card (Clickable to /profile) */}
          <Link
            to="/profile"
            className="block p-4 mx-3 my-3 rounded-xl bg-emerald-950/60 border border-emerald-800/50 hover:bg-emerald-900/50 transition-colors group"
            title="คลิกเพื่อจัดการข้อมูลส่วนตัวและเปลี่ยนรหัสผ่าน"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-school-green text-school-yellow font-bold flex items-center justify-center text-sm border border-school-yellow/30 group-hover:scale-105 transition-transform">
                {profile?.display_name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white truncate group-hover:text-school-yellow transition-colors">
                  {profile?.display_name || 'ผู้ใช้งาน'}
                </div>
                <div className="text-[11px] text-slate-400 truncate font-mono">
                  {profile?.email}
                </div>
                <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium border ${getRoleBadge().bg}`}>
                  {getRoleBadge().label}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-school-yellow" />
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className="px-3 space-y-1 mt-2">
            {currentNav.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-school-green text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-emerald-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-school-yellow' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-emerald-800/80 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-emerald-900/60 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              กลับสู่เว็บไซต์หน้าแรก
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-xs text-red-300 hover:text-white hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-subtle">
          <div className="px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                aria-label="เปิดเมนู"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{subtitle}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
              >
                <KeyRound className="w-3.5 h-3.5 text-school-green" />
                <span className="hidden sm:inline">{profile?.display_name}</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="ออกจากระบบ"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};