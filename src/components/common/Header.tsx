import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BRAND } from '@/constants/brand';
import { EmblemImage } from './EmblemImage';
import { useAuth } from '@/context/AuthContext';
import { 
  Menu, X, LogOut, Award, Info, Newspaper, Calendar, PhoneCall, LayoutDashboard
} from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { profile, role, signOut } = useAuth();

  const navLinks = [
    { name: 'หน้าหลัก', path: '/', icon: null },
    { name: 'ข้อมูลโครงการ', path: '/about', icon: Info },
    { name: 'ข่าวสารและประกาศ', path: '/news', icon: Newspaper },
    { name: 'ปฏิทินกิจกรรม', path: '/calendar', icon: Calendar },
    { name: 'ผลงานและรางวัล', path: '/achievements', icon: Award },
    { name: 'ติดต่อเรา', path: '/contact', icon: PhoneCall },
  ];

  const getDashboardPath = () => {
    if (role === 'admin') return '/admin';
    if (role === 'teacher') return '/teacher';
    return '/student';
  };

  const getRoleBadge = () => {
    if (role === 'admin') return { label: 'ผู้ดูแลระบบ (Admin)', color: 'bg-red-100 text-red-800 border-red-300' };
    if (role === 'teacher') return { label: 'ครูผู้สอน (Teacher)', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    return { label: 'นักเรียน (Student)', color: 'bg-blue-100 text-blue-800 border-blue-300' };
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-subtle">
      {/* Top institution bar */}
      <div className="bg-school-dark text-white text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-2 text-slate-200">
            <span className="font-semibold text-school-yellow">{BRAND.PROGRAM_SHORT_EN}</span>
            <span>•</span>
            <span>{BRAND.PROGRAM_FULL_EN}</span>
            <span className="hidden md:inline">• {BRAND.SCHOOL_NAME_TH}</span>
          </div>
          
          <div className="flex items-center gap-3 text-[11px]">
            {profile ? (
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getRoleBadge().color}`}>
                  {getRoleBadge().label}
                </span>
                <span className="text-slate-300 hidden md:inline">{profile.display_name}</span>
                <Link
                  to={getDashboardPath()}
                  className="flex items-center gap-1 text-school-yellow hover:underline font-medium"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  เข้าสู่แดชบอร์ด
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors ml-1"
                  title="ออกจากระบบ"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">ออก</span>
                </button>
              </div>
            ) : (
              <div className="text-slate-300 text-[11px]">
                {BRAND.CONTACT.DEPARTMENT} • {BRAND.SCHOOL_NAME_TH}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main branding & navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Official emblems & Title */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* School Emblem */}
            <div className="p-1 rounded bg-white hover:opacity-95 transition-opacity">
              <EmblemImage type="school" size="md" />
            </div>
            {/* Program Emblem */}
            <div className="p-1 rounded bg-white hover:opacity-95 transition-opacity">
              <EmblemImage type="program" size="md" />
            </div>

            {/* Program Names */}
            <div className="flex flex-col justify-center border-l border-slate-200 pl-3">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-school-dark">
                  {BRAND.PROGRAM_SHORT_EN}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-school-green tracking-wide">
                  {BRAND.PROGRAM_FULL_EN}
                </span>
              </div>
              <div className="text-[12px] sm:text-[13px] font-medium text-slate-700 leading-tight">
                {BRAND.PROGRAM_NAME_TH}
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                {BRAND.SCHOOL_NAME_TH} | {BRAND.SCHOOL_NAME_EN}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-school-soft text-school-green border-b-2 border-school-green font-semibold'
                      : 'text-slate-700 hover:text-school-green hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: Only show if logged in, otherwise clean academic badge */}
          <div className="hidden sm:flex items-center gap-3">
            {profile ? (
              <Link
                to={getDashboardPath()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-school-green text-white text-sm font-semibold hover:bg-school-dark transition-all shadow-sm"
              >
                <LayoutDashboard className="w-4 h-4" />
                แดชบอร์ด
              </Link>
            ) : (
              <div className="text-xs text-slate-500 font-medium px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">
                มัธยมศึกษาตอนต้น (ม.1 – ม.3)
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-school-green hover:bg-slate-100 focus:outline-none"
              aria-label="เมนูหลัก"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-elevated">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-base font-medium ${
                  isActive
                    ? 'bg-school-soft text-school-green font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {Icon && <Icon className="w-5 h-5 text-school-green" />}
                <span>{link.name}</span>
              </Link>
            );
          })}

          {profile && (
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <div className="px-3 py-2 bg-slate-50 rounded-lg">
                <div className="text-sm font-semibold text-slate-800">{profile.display_name}</div>
                <div className="text-xs text-slate-500">{profile.email}</div>
              </div>
              <Link
                to={getDashboardPath()}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-school-green text-white font-semibold"
              >
                <LayoutDashboard className="w-4 h-4" />
                ไปยังแดชบอร์ด
              </Link>
              <button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-100"
              >
                <LogOut className="w-4 h-4" />
                ออกจากระบบ
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
