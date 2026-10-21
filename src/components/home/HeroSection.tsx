import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '@/constants/brand';
import { ArrowRight, Compass, Newspaper, Microscope, Brain, Languages, Lightbulb } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-school-soft via-white to-school-light py-14 md:py-20 border-b border-slate-200">
      {/* Decorative subtle background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#176B45" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 max-w-4xl">
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-school-green/20 shadow-sm text-school-dark text-xs sm:text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-school-green animate-pulse"></span>
            <span>{BRAND.SCHOOL_NAME_TH}</span>
            <span className="text-slate-400">|</span>
            <span className="text-school-green font-semibold">{BRAND.SCHOOL_NAME_EN}</span>
          </div>

          {/* Official Titles */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-baseline gap-3">
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-school-dark">
                {BRAND.PROGRAM_SHORT_EN}
              </h1>
              <span className="text-xl sm:text-3xl font-bold text-school-green">
                {BRAND.PROGRAM_FULL_EN}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold text-slate-800 leading-snug">
              {BRAND.PROGRAM_NAME_TH}
            </h2>

            <p className="text-sm sm:text-base font-medium text-slate-600">
              {BRAND.SCHOOL_NAME_TH} | {BRAND.SCHOOL_NAME_EN}
            </p>
          </div>

          {/* Curriculum Vision Statement */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white/95 backdrop-blur-sm border-l-4 border-school-yellow shadow-card space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-school-green flex items-center gap-1.5">
              <span>วิสัยทัศน์หลักสูตร (Curriculum Vision)</span>
            </div>
            <p className="text-base sm:text-lg text-slate-800 font-semibold leading-relaxed">
              {BRAND.SUPPORTING_STATEMENT}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 border-t border-slate-100">
              {BRAND.CURRICULUM_FOCUS}
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-school-green text-white font-semibold text-sm hover:bg-school-dark transition-all shadow-md hover:shadow-lg transform active:scale-95"
            >
              <Compass className="w-4 h-4 text-school-yellow" />
              <span>ข้อมูลโครงการและหลักสูตร</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/news"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white border border-slate-300 text-slate-800 font-semibold text-sm hover:border-school-green hover:text-school-green hover:bg-school-soft transition-all shadow-sm"
            >
              <Newspaper className="w-4 h-4 text-school-green" />
              <span>ข่าวสารและประกาศ</span>
            </Link>
          </div>
        </div>

        {/* 4 Core Competency Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-slate-200">
          <div className="p-4 rounded-xl bg-white/90 border border-slate-200 shadow-sm hover:border-school-green/40 transition-all">
            <div className="w-9 h-9 rounded-lg bg-school-soft text-school-green flex items-center justify-center mb-2 font-bold text-lg">
              🔬
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900">เจาะลึก 3 สาขา</div>
            <div className="text-[11px] text-slate-500 mt-0.5">ฟิสิกส์ • เคมี • ชีววิทยา แยกเรียนตั้งแต่ ม.1</div>
          </div>

          <div className="p-4 rounded-xl bg-white/90 border border-slate-200 shadow-sm hover:border-school-green/40 transition-all">
            <div className="w-9 h-9 rounded-lg bg-school-soft text-school-green flex items-center justify-center mb-2 font-bold text-lg">
              📐
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900">Genius Math</div>
            <div className="text-[11px] text-slate-500 mt-0.5">คณิตศาสตร์อัจฉริยภาพ 1-6 และ Math Project</div>
          </div>

          <div className="p-4 rounded-xl bg-white/90 border border-slate-200 shadow-sm hover:border-school-green/40 transition-all">
            <div className="w-9 h-9 rounded-lg bg-school-soft text-school-green flex items-center justify-center mb-2 font-bold text-lg">
              🇬🇧
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900">Intensive Eng</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Reading & Writing เต็มรูปแบบทุกภาคเรียน</div>
          </div>

          <div className="p-4 rounded-xl bg-white/90 border border-slate-200 shadow-sm hover:border-school-green/40 transition-all">
            <div className="w-9 h-9 rounded-lg bg-school-soft text-school-green flex items-center justify-center mb-2 font-bold text-lg">
              💡
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-900">Project-Based</div>
            <div className="text-[11px] text-slate-500 mt-0.5">ทำโครงงานวิจัยและฝึกปฏิบัติจริงในห้องแล็บ</div>
          </div>
        </div>
      </div>
    </section>
  );
};
