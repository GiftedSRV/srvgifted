import React, { useState } from 'react';
import { BRAND } from '@/constants/brand';
import { EmblemImage } from '@/components/common/EmblemImage';
import { 
  Microscope, 
  Brain, 
  Compass, 
  Lightbulb, 
  Users, 
  CheckCircle, 
  ShieldCheck, 
  Target, 
  Sparkles, 
  BookOpen, 
  Award, 
  Layers, 
  Globe2, 
  GraduationCap, 
  Cpu, 
  Languages, 
  Binary, 
  MapPin, 
  BarChart3,
  Calendar
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vision' | 'structure' | 'subjects' | 'worldclass'>('vision');

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* 1. Page Header */}
      <div className="bg-gradient-to-r from-school-dark via-emerald-950 to-slate-900 text-white py-14 sm:py-16 border-b-4 border-school-yellow relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/80 text-school-yellow text-xs font-semibold border border-school-yellow/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ข้อมูลโครงการห้องเรียนพิเศษ</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                {BRAND.PROGRAM_SHORT_EN}
                <span className="block text-xl sm:text-2xl text-emerald-200 font-semibold mt-1">
                  {BRAND.PROGRAM_FULL_EN}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed">
                {BRAND.PROGRAM_NAME_TH}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                <span className="font-semibold text-school-yellow">{BRAND.SCHOOL_NAME_TH}</span>
                <span>•</span>
                <span>{BRAND.DEPARTMENT_NAME}</span>
                <span>•</span>
                <span>สำนักงานเขตพื้นที่การศึกษามัธยมศึกษากรุงเทพมหานคร เขต 2</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 shadow-lg shrink-0">
              <div className="p-1 rounded-xl bg-white shadow-sm">
                <EmblemImage type="school" size="md" />
              </div>
              <div className="p-1 rounded-xl bg-white shadow-sm">
                <EmblemImage type="program" size="md" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        
        {/* Navigation Tabs */}
        <div className="bg-white p-2 rounded-2xl shadow-card border border-slate-200 mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('vision')}
            className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'vision'
                ? 'bg-school-green text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>วิสัยทัศน์ & ธรรมชาติหลักสูตร</span>
          </button>
          <button
            onClick={() => setActiveTab('structure')}
            className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'structure'
                ? 'bg-school-green text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>โครงสร้าง & จุดมุ่งหมาย (ม.1 – ม.3)</span>
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'subjects'
                ? 'bg-school-green text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Microscope className="w-4 h-4" />
            <span>เจาะลึกวิชาวิทย์-คณิต-อังกฤษ</span>
          </button>
          <button
            onClick={() => setActiveTab('worldclass')}
            className={`flex-1 min-w-[200px] py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              activeTab === 'worldclass'
                ? 'bg-school-green text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Globe2 className="w-4 h-4" />
            <span>มาตรฐานสากล & บริบทท้องถิ่น</span>
          </button>
        </div>

        {/* Tab 1: Vision & Curriculum Nature */}
        {activeTab === 'vision' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Vision Banner */}
            <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-card border-l-8 border-school-yellow border-y border-r border-slate-200">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-school-green text-xs font-bold inline-block mb-3">
                Curriculum Vision
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 leading-snug">
                วิสัยทัศน์หลักสูตรห้องเรียนพิเศษ GIFTED
              </h2>
              <blockquote className="text-lg sm:text-xl font-semibold text-emerald-950 leading-relaxed italic bg-emerald-50/70 p-5 rounded-xl border border-emerald-100 mb-6">
                “{BRAND.CURRICULUM_VISION}”
              </blockquote>
              
              <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 text-sm">
                <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed font-medium">
                  <strong>💡 จุดเน้นสำคัญของห้องเรียน GIFTED ม.ต้น:</strong> {BRAND.CURRICULUM_FOCUS}
                </div>
              </div>
            </div>

            {/* 4 Characteristics of Curriculum */}
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-school-green" />
                4 ลักษณะเฉพาะของหลักสูตร GIFTED สารวิทยา
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-200 flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-school-green flex items-center justify-center shrink-0 font-bold text-lg">
                    1
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-base">เพิ่มความรู้ & ประสบการณ์</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      เนื้อหาลึกซึ้งกว่ามาตรฐานแกนกลาง มุ่งเน้นการคิดวิเคราะห์ขั้นสูงและเตรียมความพร้อมในการแข่งขันวิชาการทั้งระดับชาติและนานาชาติ
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-200 flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold text-lg">
                    2
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-base">การวิจัยเป็นฐาน (Research-Based)</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      การจัดทำโครงงานวิทยาศาสตร์และคณิตศาสตร์เป็นหัวใจสำคัญ ปลูกฝังจิตวิทยาศาสตร์และระเบียบวิธีวิจัยตั้งแต่วัยมัธยมศึกษาตอนต้น
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-200 flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 font-bold text-lg">
                    3
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-base">ทักษะแห่งศตวรรษที่ 21 (21st Century Skills)</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      ใช้เทคโนโลยีสารสนเทศสืบค้นและสื่อสาร ทำงานเป็นทีมอย่างเป็นระบบ และพัฒนาภาวะผู้นำทางวิชาการ
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-200 flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0 font-bold text-lg">
                    4
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-900 text-base">เรียนรู้นอกห้องเรียน (Experiential Learning)</h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      จัดค่ายวิชาการบูรณาการ ศึกษาดูงานในสถาบันวิจัยชั้นนำ มหาวิทยาลัย และแหล่งเรียนรู้ทางวิทยาศาสตร์เพื่อเปิดโลกทัศน์เชิงประจักษ์
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 5 Core Competencies & 21st Century 5C Skills */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-card border border-slate-200 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Brain className="w-5 h-5 text-school-green" />
                สมรรถนะสำคัญ 5 ประการ & ทักษะศตวรรษที่ 21 (5C Skills)
              </h3>
              
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide mb-1">
                  5 สมรรถนะหลักของผู้เรียนตามหลักสูตร
                </div>
                <div className="flex flex-wrap gap-2 text-sm font-semibold text-emerald-950">
                  <span className="px-3 py-1 bg-white rounded-lg border border-emerald-200 shadow-sm">1. การสื่อสาร</span>
                  <span className="px-3 py-1 bg-white rounded-lg border border-emerald-200 shadow-sm">2. การคิดวิเคราะห์</span>
                  <span className="px-3 py-1 bg-white rounded-lg border border-emerald-200 shadow-sm">3. การแก้ปัญหาเชิงซ้อน</span>
                  <span className="px-3 py-1 bg-white rounded-lg border border-emerald-200 shadow-sm">4. การใช้ทักษะชีวิต</span>
                  <span className="px-3 py-1 bg-white rounded-lg border border-emerald-200 shadow-sm">5. การใช้เทคโนโลยีสารสนเทศ</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-base font-bold text-school-green">Critical Thinking</div>
                  <div className="text-xs text-slate-500 mt-1">การคิดวิพากษ์และให้เหตุผล</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-base font-bold text-school-green">Creativity</div>
                  <div className="text-xs text-slate-500 mt-1">& Innovation การสร้างสรรค์</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-base font-bold text-school-green">Cross-cultural</div>
                  <div className="text-xs text-slate-500 mt-1">Understanding ความเข้าใจสากล</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-base font-bold text-school-green">Collaboration</div>
                  <div className="text-xs text-slate-500 mt-1">& Leadership ทำงานเป็นทีม</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-base font-bold text-school-green">Computing & ICT</div>
                  <div className="text-xs text-slate-500 mt-1">การรู้เท่าทันสื่อดิจิทัล</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Structure & Goals */}
        {activeTab === 'structure' && (
          <div className="space-y-8 animate-fadeIn">
            {/* 5 Program Goals */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-card border border-slate-200 space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-school-green" />
                จุดมุ่งหมายของหลักสูตร (Curriculum Objectives)
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 hover:bg-emerald-50/60 transition-colors border border-slate-200">
                  <CheckCircle className="w-5 h-5 text-school-green shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-medium text-slate-800">
                    <strong>1. ยกระดับความสามารถทางวิชาการสู่ความเป็นเลิศ:</strong> พัฒนาศักยภาพนักเรียนด้านวิทยาศาสตร์ คณิตศาสตร์ และภาษาอังกฤษเพื่อการแข่งขันระดับชาติ
                  </span>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 hover:bg-emerald-50/60 transition-colors border border-slate-200">
                  <CheckCircle className="w-5 h-5 text-school-green shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-medium text-slate-800">
                    <strong>2. ขยายโลกทัศน์และการเรียนรู้เชิงประจักษ์:</strong> จัดกิจกรรมค่ายวิชาการ การศึกษาดูงานในสถาบันวิจัย และห้องปฏิบัติการมหาวิทยาลัยชั้นนำ
                  </span>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 hover:bg-emerald-50/60 transition-colors border border-slate-200">
                  <CheckCircle className="w-5 h-5 text-school-green shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-medium text-slate-800">
                    <strong>3. เตรียมความพร้อมสู่สายวิทย์-คณิต ระดับ ม.ปลาย:</strong> สร้างแรงบันดาลใจและฐานความรู้ที่แข็งแกร่ง รองรับการเข้าศึกษาต่อในโรงเรียนชั้นนำและสายอาชีพสะเต็ม
                  </span>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 hover:bg-emerald-50/60 transition-colors border border-slate-200">
                  <CheckCircle className="w-5 h-5 text-school-green shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-medium text-slate-800">
                    <strong>4. พัฒนานวัตกรรมการจัดการเรียนรู้เชิงรุก (Active Learning):</strong> นำการสืบเสาะหาความรู้ โครงงานวิจัย และการแก้ปัญหาจริงมาเป็นแกนกลาง
                  </span>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 hover:bg-emerald-50/60 transition-colors border border-slate-200">
                  <CheckCircle className="w-5 h-5 text-school-green shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base font-medium text-slate-800">
                    <strong>5. พัฒนาสภาพแวดล้อมและนิเวศแห่งการเรียนรู้:</strong> ยกระดับห้องปฏิบัติการทางวิทยาศาสตร์ คอมพิวเตอร์ และอุปกรณ์ทดลองให้ได้มาตรฐานสากล
                  </span>
                </div>
              </div>
            </div>

            {/* Level by Level Progression */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-card border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-school-green" />
                เส้นทางการพัฒนาผู้เรียนระดับ ม.1 – ม.3
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-emerald-50/70 border-2 border-emerald-200 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="inline-block px-3 py-1 rounded-full bg-school-green text-white text-xs font-bold">
                      มัธยมศึกษาปีที่ 1
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">การวางรากฐานและการปรับตัว</h4>
                    <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside leading-relaxed">
                      <li>ปูพื้นฐานทักษะปฏิบัติการแล็บวิทย์ ฟิสิกส์-เคมี-ชีววิทยา</li>
                      <li>Genius Math 1-2 & เสริมทักษะคณิตศาสตร์เข้มข้น</li>
                      <li>Intensive Reading & Writing 1-2</li>
                      <li>วิชาคอมพิวเตอร์กราฟิก 1-2</li>
                    </ul>
                  </div>
                  <div className="mt-6 pt-4 border-t border-emerald-200 text-xs font-semibold text-school-green">
                    เป้าหมาย: ปรับพื้นฐานวิชาการและทักษะการสืบเสาะ
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-amber-50/70 border-2 border-amber-200 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="inline-block px-3 py-1 rounded-full bg-amber-600 text-white text-xs font-bold">
                      มัธยมศึกษาปีที่ 2
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">เจาะลึกและการทำโครงงาน</h4>
                    <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside leading-relaxed">
                      <li>การจัดทำ Math Project เพื่อบูรณาการความรู้</li>
                      <li>การทดลองเฉพาะสาขาวิทยาศาสตร์อัจฉริยะ 3-4</li>
                      <li>Intensive Reading & Writing 3-4</li>
                      <li>การผลิตสื่อนำเสนอ 1-2 (Presentation Media)</li>
                      <li>เข้าร่วมค่ายวิทยาศาสตร์-คณิตศาสตร์บูรณาการ</li>
                    </ul>
                  </div>
                  <div className="mt-6 pt-4 border-t border-amber-200 text-xs font-semibold text-amber-800">
                    เป้าหมาย: เริ่มการวิจัยโครงงานและการแข่งขันภายนอก
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-blue-50/70 border-2 border-blue-200 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="inline-block px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold">
                      มัธยมศึกษาปีที่ 3
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">ความเชี่ยวชาญและการต่อยอด</h4>
                    <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside leading-relaxed">
                      <li>โครงงานวิจัยฉบับสมบูรณ์ และการนำเสนอผลงาน (IS)</li>
                      <li>Genius Math 5-6 ตะลุยโจทย์ประยุกต์ขั้นสูง</li>
                      <li>การผลิตสื่อสิ่งพิมพ์ 1-2 (Publication Design)</li>
                      <li>เตรียมความพร้อมสู่สนามสอบคัดเลือก ม.ปลาย ชั้นนำ</li>
                    </ul>
                  </div>
                  <div className="mt-6 pt-4 border-t border-blue-200 text-xs font-semibold text-blue-800">
                    เป้าหมาย: ความเป็นเลิศ 100% สู่ระดับ ม.ปลาย
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Core Subjects Deep Dive */}
        {activeTab === 'subjects' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Header statement */}
            <div className="bg-white p-6 rounded-2xl shadow-card border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                เส้นทางรายวิชาอัจฉริยภาพ ม.ต้น (Gifted Core Subjects)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                หลักสูตรเฉพาะทางที่ออกแบบเพื่อเสริมสร้างความลุ่มลึกทั้ง 3 เสาหลักวิชาการ: คณิตศาสตร์เข้มข้น วิทยาศาสตร์แยกสาขา และภาษาอังกฤษ-เทคโนโลยี
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Mathematics Column */}
              <div className="bg-white rounded-2xl shadow-card border border-slate-200 overflow-hidden flex flex-col">
                <div className="bg-amber-600 text-white p-5">
                  <div className="flex items-center gap-3">
                    <Binary className="w-7 h-7" />
                    <div>
                      <h4 className="font-bold text-lg">กลุ่มคณิตศาสตร์อัจฉริยภาพ</h4>
                      <p className="text-xs text-amber-100">ม.1 – ม.3 (เทอมละ 2.0 นก.)</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-1">
                  <div className="space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-amber-600" />
                      Genius Math 1 – 6
                    </div>
                    <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                      ฝึกแก้โจทย์ปัญหาซับซ้อน ทฤษฎีจำนวน พีชคณิต เรขาคณิตขั้นสูง และการประยุกต์ใช้เพื่อการแข่งขัน
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-amber-600" />
                      เสริมทักษะคณิตศาสตร์ 1 – 6
                    </div>
                    <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                      ปูพื้นฐานเนื้อหาเชิงลึกทั้ง 6 ภาคเรียน เสริมกระบวนการให้เหตุผลเชิงคณิตศาสตร์อย่างเป็นระบบ
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-amber-600" />
                      Math Project (ระดับ ม.2)
                    </div>
                    <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                      การจัดทำโครงงานคณิตศาสตร์เพื่อบูรณาการความรู้สู่การสร้างสรรค์สิ่งประดิษฐ์และนวัตกรรม
                    </p>
                  </div>
                </div>
              </div>

              {/* Science Column */}
              <div className="bg-white rounded-2xl shadow-card border border-slate-200 overflow-hidden flex flex-col">
                <div className="bg-school-green text-white p-5">
                  <div className="flex items-center gap-3">
                    <Microscope className="w-7 h-7" />
                    <div>
                      <h4 className="font-bold text-lg">กลุ่มวิทยาศาสตร์อัจฉริยภาพ</h4>
                      <p className="text-xs text-emerald-100">แยกเรียนเฉพาะสาขาตั้งแต่ ม.1</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-1">
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    เตรียมความพร้อมสู่สายวิทย์ ม.ปลาย ด้วยเนื้อหาเฉพาะด้าน:
                  </p>

                  <div className="space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-school-green" />
                      ฟิสิกส์อัจฉริยะ 1 – 4
                    </div>
                    <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                      กลศาสตร์ แรง การเคลื่อนที่ พลังงาน คลื่น แสง เสียง และวงจรไฟฟ้าขั้นสูง
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-school-green" />
                      เคมีอัจฉริยะ 1 – 4
                    </div>
                    <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                      โครงสร้างอะตอม ตารางธาตุ พันธะเคมี ปฏิกิริยาเคมี สารประกอบและกรด-เบส
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-school-green" />
                      ชีววิทยาอัจฉริยะ 1 – 4
                    </div>
                    <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                      ชีววิทยาของเซลล์ กระบวนการดำรงชีวิต พันธุศาสตร์ ดีเอ็นเอ และระบบนิเวศ
                    </p>
                  </div>
                </div>
              </div>

              {/* English & Tech Column */}
              <div className="bg-white rounded-2xl shadow-card border border-slate-200 overflow-hidden flex flex-col">
                <div className="bg-blue-700 text-white p-5">
                  <div className="flex items-center gap-3">
                    <Languages className="w-7 h-7" />
                    <div>
                      <h4 className="font-bold text-lg">ภาษาอังกฤษ & เทคโนโลยี</h4>
                      <p className="text-xs text-blue-100">ทักษะศตวรรษที่ 21 ทุกภาคเรียน</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-1">
                  <div className="space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      Intensive Reading & Writing
                    </div>
                    <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                      เจาะลึกทักษะอ่าน-เขียนภาษาอังกฤษเชิงวิชาการอย่างเข้มข้นตลอดหลักสูตร (เทอมละ 1.0 นก.) เพื่อการสื่อสารระดับสากล
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      วิชาคอมพิวเตอร์สร้างสรรค์
                    </div>
                    <div className="text-xs text-slate-600 pl-6 space-y-1.5 leading-relaxed">
                      <div>• <strong>ม.1:</strong> คอมพิวเตอร์กราฟิก 1-2</div>
                      <div>• <strong>ม.2:</strong> การผลิตสื่อนำเสนอ 1-2</div>
                      <div>• <strong>ม.3:</strong> การผลิตสื่อสิ่งพิมพ์ 1-2</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: World-Class Standard & Local Context */}
        {activeTab === 'worldclass' && (
          <div className="space-y-8 animate-fadeIn">
            {/* World-Class Standard School 5 Indicators */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-card border border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold inline-block mb-1">
                    World-Class Standard School
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">
                    ตัวชี้วัดมาตรฐานสากล 5 ด้าน
                  </h3>
                </div>
                <div className="px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 font-bold text-xs">
                  เป้าหมายความสำเร็จ 100%
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-school-green">ด้านที่ 1</span>
                    <h5 className="font-bold text-slate-900 text-sm">เป็นเลิศวิชาการ</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      ศักยภาพแข่งขันระดับชาติ/นานาชาติ และเข้าศึกษาต่อ ม.ปลาย ชั้นนำ
                    </p>
                  </div>
                  <div className="text-2xl font-black text-school-green pt-4">100%</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-school-green">ด้านที่ 2</span>
                    <h5 className="font-bold text-slate-900 text-sm">สื่อสาร 2 ภาษา</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      ภาษาไทยและอังกฤษ Intensive Reading & Writing เต็มรูปแบบ
                    </p>
                  </div>
                  <div className="text-2xl font-black text-school-green pt-4">100%</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-school-green">ด้านที่ 3</span>
                    <h5 className="font-bold text-slate-900 text-sm">ล้ำหน้าทางความคิด</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      จัดทำ Math Project, IS1-IS3 และทักษะวิจัยเบื้องต้นอย่างเป็นระบบ
                    </p>
                  </div>
                  <div className="text-2xl font-black text-school-green pt-4">100%</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-school-green">ด้านที่ 4</span>
                    <h5 className="font-bold text-slate-900 text-sm">ผลิตงานสร้างสรรค์</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      สร้างกราฟิก สื่อนำเสนอ และสื่อสิ่งพิมพ์ด้วยเทคโนโลยีสารสนเทศ
                    </p>
                  </div>
                  <div className="text-2xl font-black text-school-green pt-4">100%</div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-school-green">ด้านที่ 5</span>
                    <h5 className="font-bold text-slate-900 text-sm">รับผิดชอบต่อสังคมโลก</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      วิเคราะห์ทรัพยากร สิ่งแวดล้อม และบทบาทพลเมืองดิจิทัลระดับสากล
                    </p>
                  </div>
                  <div className="text-2xl font-black text-school-green pt-4">100%</div>
                </div>
              </div>
            </div>

            {/* Local Context Integration */}
            <div className="bg-gradient-to-r from-emerald-900 to-school-dark text-white p-6 sm:p-8 rounded-2xl shadow-card border border-emerald-800">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shrink-0">
                  <MapPin className="w-10 h-10 text-school-yellow" />
                </div>
                <div className="space-y-2">
                  <div className="inline-block px-3 py-1 rounded-full bg-school-yellow text-slate-900 text-xs font-bold">
                    Local Context Integration
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    การบูรณาการบริบทท้องถิ่น (เขตจตุจักรและพื้นที่ใกล้เคียง)
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed max-w-4xl">
                    โครงการ GIFTED นำประเด็นปัญหาสิ่งแวดล้อม การคมนาคม และผังเมืองในเขตจตุจักรและพื้นที่ใกล้เคียง (เช่น มหาวิทยาลัยเกษตรศาสตร์, ถนนพหลโยธิน, แขวงเสนานิคม/ลาดยาว) มาเป็นโจทย์ท้าทายจริงในการทำโครงงานวิทยาศาสตร์และสะเต็มศึกษา (STEM Education) ทำให้นักเรียนได้นำความรู้ในห้องเรียนไปแก้ไขปัญหาชุมชนอย่างแท้จริง
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};