import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { AdmissionBanner } from '@/components/home/AdmissionBanner';
import { ProgramIntro } from '@/components/home/ProgramIntro';
import { LatestNewsSection } from '@/components/home/LatestNewsSection';
import { UpcomingEventsSection } from '@/components/home/UpcomingEventsSection';
import { AchievementsSection } from '@/components/home/AchievementsSection';
import { BRAND } from '@/constants/brand';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Seasonal Admission Announcement Banner (Auto-hidden if inactive) */}
      <AdmissionBanner />

      {/* 3. Program Introduction & Highlights */}
      <ProgramIntro />

      {/* 4. Latest News & Announcements */}
      <LatestNewsSection />

      {/* 5. Upcoming Activities & Calendar */}
      <UpcomingEventsSection />

      {/* 6. Approved Achievements */}
      <AchievementsSection />

      {/* 7. Institutional Call to Action */}
      <section className="bg-school-dark text-white py-14 border-t-4 border-school-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-emerald-950/70 border border-emerald-800/80 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-school-green text-school-yellow text-xs font-semibold">
                การพัฒนาการศึกษาอย่างยั่งยืน
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                เปิดรับทุกโอกาสสู่การเรียนรู้ทางวิทยาศาสตร์และคณิตศาสตร์
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                เข้าสู่พอร์ทัลเพื่อตรวจสอบสถิติผลงาน ติดตามกิจกรรม และความก้าวหน้าทางวิชาการของโครงการห้องเรียนพิเศษ GIFTED โรงเรียนสารวิทยา
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-school-yellow text-slate-900 font-bold text-sm hover:bg-yellow-400 transition-all shadow-md"
              >
                <span>เข้าสู่ระบบบุคลากร / นักเรียน</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all"
              >
                <span>ข้อมูลโครงการและหลักสูตร</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
