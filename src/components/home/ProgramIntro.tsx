import React, { useState } from 'react';
import { BRAND } from '@/constants/brand';
import { 
  Compass, Microscope, Brain, Languages, Lightbulb, 
  Target, BarChart3, Rocket, Globe2, CheckCircle2, Sparkles, MapPin 
} from 'lucide-react';

export const ProgramIntro: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vision' | 'curriculum' | 'subjects' | 'standards'>('vision');

  return (
    <section className="py-16 md:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-school-soft text-school-green text-xs font-bold uppercase tracking-wider border border-school-green/20">
            <Compass className="w-3.5 h-3.5" /> ข้อมูลโครงการและหลักสูตร
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-school-dark tracking-tight">
            จุดเน้นสมรรถนะหลักสูตร
          </h2>
          <p className="text-base sm:text-lg font-semibold text-school-green">
            Inquiry • Sci-Math • English
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            โครงการห้องเรียนพิเศษวิทยาศาสตร์–คณิตศาสตร์ ระดับชั้นมัธยมศึกษาตอนต้น โรงเรียนสารวิทยา
            มุ่งเน้นการพัฒนากระบวนการคิด การทดลองทางวิทยาศาสตร์ และการให้เหตุผลทางคณิตศาสตร์เข้มข้น
          </p>
        </div>

        {/* 4 Core Pillars Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-school-green hover:shadow-card transition-all">
            <div className="text-3xl mb-3">🔬</div>
            <h3 className="text-base font-bold text-slate-900">เจาะลึก 3 สาขา</h3>
            <div className="text-xs font-semibold text-school-green mt-1">ฟิสิกส์ • เคมี • ชีววิทยา อัจฉริยะ</div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              แยกเรียนเฉพาะสาขาวิชาตั้งแต่ชั้น ม.1 ในห้องปฏิบัติการมาตรฐานสากล
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-school-green hover:shadow-card transition-all">
            <div className="text-3xl mb-3">📐</div>
            <h3 className="text-base font-bold text-slate-900">Genius Math</h3>
            <div className="text-xs font-semibold text-school-green mt-1">คณิตศาสตร์อัจฉริยภาพ 1-6</div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              ฝึกแก้โจทย์ปัญหาซับซ้อนและการประยุกต์ใช้ขั้นสูง พร้อมจัดทำ Math Project
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-school-green hover:shadow-card transition-all">
            <div className="text-3xl mb-3">🇬🇧</div>
            <h3 className="text-base font-bold text-slate-900">Intensive Eng</h3>
            <div className="text-xs font-semibold text-school-green mt-1">Reading & Writing เต็มรูปแบบ</div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              ยกระดับทักษะการอ่านและเขียนภาษาอังกฤษเชิงวิชาการตลอดทั้งหลักสูตร
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-school-green hover:shadow-card transition-all">
            <div className="text-3xl mb-3">💡</div>
            <h3 className="text-base font-bold text-slate-900">Project-Based</h3>
            <div className="text-xs font-semibold text-school-green mt-1">ทำโครงงานวิจัยตั้งแต่ ม.ต้น</div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              สร้างสรรค์ผลงานนวัตกรรม การนำเสนอผลงาน และการศึกษาดูงานในสถาบันวิจัย
            </p>
          </div>
        </div>

        {/* Interactive Tabs Header */}
        <div className="bg-slate-100 p-1.5 rounded-2xl flex flex-wrap gap-1 border border-slate-200">
          {[
            { id: 'vision', label: 'วิสัยทัศน์ & ธรรมชาติหลักสูตร', icon: '🎯' },
            { id: 'curriculum', label: 'โครงสร้างหลักสูตร (ม.1 – ม.3)', icon: '📊' },
            { id: 'subjects', label: 'เจาะลึกวิชาวิทย์-คณิต-อังกฤษ', icon: '🚀' },
            { id: 'standards', label: 'มาตรฐานสากล & บริบทท้องถิ่น', icon: '🌍' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[200px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-school-green text-white shadow-md'
                  : 'text-slate-700 hover:bg-white/80'
              }`}
            >
              <span className="text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab 1: วิสัยทัศน์ & ธรรมชาติหลักสูตร */}
        {activeTab === 'vision' && (
          <div className="space-y-8 animate-fade-in">
            <div className="p-6 sm:p-8 rounded-2xl bg-school-soft/70 border border-school-green/30 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                <h3 className="text-lg sm:text-xl font-bold text-school-dark">
                  วิสัยทัศน์หลักสูตร (Curriculum Vision)
                </h3>
              </div>
              <p className="text-base sm:text-lg text-slate-800 font-semibold leading-relaxed">
                {BRAND.SUPPORTING_STATEMENT}
              </p>
              <div className="p-4 rounded-xl bg-white border border-school-green/20 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-3">
                <span className="text-lg shrink-0">💡</span>
                <div>
                  <strong>จุดเน้นสำคัญของห้องเรียน GIFTED ม.ต้น:</strong> เตรียมความพร้อมสู่ระดับอุดมศึกษาอย่างมั่นคงโดยเริ่มตั้งแต่ ม.ต้น ด้วยการเรียนรู้แบบโครงงานวิจัย (Research-based Learning) จัดค่ายบูรณาการ และฝึกปฏิบัติในห้องแล็บที่ทันสมัยหรือมหาวิทยาลัยชั้นนำ
                </div>
              </div>
            </div>

            {/* 4 Characteristics */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-slate-900">4 ลักษณะเฉพาะของหลักสูตร</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-sm mb-1">1. เพิ่มความรู้ & ประสบการณ์</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    เนื้อหาลึกซึ้งกว่ามาตรฐานแกนกลาง พร้อมก้าวสู่เวทีแข่งขันวิชาการระดับชาติและนานาชาติ
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-sm mb-1">2. การวิจัยเป็นฐาน (Research-Based)</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    การจัดทำโครงงานวิทยาศาสตร์และคณิตศาสตร์เป็นหัวใจสำคัญ เสริมสร้างกระบวนการคิดวิเคราะห์
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-sm mb-1">3. ทักษะศตวรรษที่ 21</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ใช้เทคโนโลยีสารสนเทศในการสืบค้น สื่อสารภาษาอังกฤษทางวิชาการ และทำงานร่วมกันเป็นทีม
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="font-bold text-slate-900 text-sm mb-1">4. เรียนรู้นอกห้องเรียน</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    จัดค่ายวิชาการเข้มข้น และศึกษาดูงานในสถาบันวิจัยรวมถึงมหาวิทยาลัยชั้นนำของประเทศ
                  </p>
                </div>
              </div>
            </div>

            {/* Curriculum Goals & 5 Core Competencies */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-school-dark uppercase tracking-wider">
                  จุดมุ่งหมายของหลักสูตร 5 ประการ
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-school-green shrink-0 mt-0.5" />
                    <span>ยกระดับความสามารถทางวิชาการสู่ความเป็นเลิศ (วิทย์-คณิต-อังกฤษ)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-school-green shrink-0 mt-0.5" />
                    <span>ขยายโลกทัศน์และการเรียนรู้เชิงประจักษ์จากแหล่งเรียนรู้ภายนอก</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-school-green shrink-0 mt-0.5" />
                    <span>สร้างแรงบันดาลใจและเตรียมความพร้อมสู่สายวิทย์-คณิต ในระดับ ม.ปลาย</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-school-green shrink-0 mt-0.5" />
                    <span>พัฒนานวัตกรรมการจัดการเรียนรู้เชิงรุก (Active Learning)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-school-green shrink-0 mt-0.5" />
                    <span>พัฒนาสภาพแวดล้อมและนิเวศแห่งการเรียนรู้ผ่านห้องปฏิบัติการมาตรฐานสากล</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-school-dark uppercase tracking-wider">
                  สมรรถนะสำคัญ 5 ประการ & ทักษะศตวรรษที่ 21
                </h4>
                <p className="text-xs text-slate-600">
                  <strong>5 สมรรถนะหลัก:</strong> การสื่อสาร • การคิด • การแก้ปัญหา • การใช้ทักษะชีวิต • การใช้เทคโนโลยี
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  <span className="p-2 rounded bg-slate-50 text-[11px] font-semibold text-slate-800 border">
                    • Critical Thinking
                  </span>
                  <span className="p-2 rounded bg-slate-50 text-[11px] font-semibold text-slate-800 border">
                    • Creativity & Innovation
                  </span>
                  <span className="p-2 rounded bg-slate-50 text-[11px] font-semibold text-slate-800 border">
                    • Cross-cultural Understanding
                  </span>
                  <span className="p-2 rounded bg-slate-50 text-[11px] font-semibold text-slate-800 border">
                    • Collaboration & Leadership
                  </span>
                  <span className="p-2 rounded bg-slate-50 text-[11px] font-semibold text-slate-800 border sm:col-span-2">
                    • Computing & ICT Literacy
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: โครงสร้างหลักสูตร (ม.1 – ม.3) */}
        {activeTab === 'curriculum' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border-2 border-school-green/30 shadow-sm space-y-3">
                <div className="px-3 py-1 rounded-full bg-school-soft text-school-green text-xs font-bold w-fit">
                  ชั้นมัธยมศึกษาปีที่ 1
                </div>
                <h4 className="text-base font-bold text-slate-900">ปูรากฐานอัจฉริยภาพ</h4>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li>• Genius Math 1 - 2 & เสริมทักษะคณิตศาสตร์ 1 - 2</li>
                  <li>• เริ่มแยกเรียน ฟิสิกส์ เคมี ชีววิทยา ในห้องแล็บ</li>
                  <li>• Intensive Reading & Writing 1 - 2</li>
                  <li>• วิชาคอมพิวเตอร์กราฟิก 1 - 2</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-white border-2 border-school-green/30 shadow-sm space-y-3">
                <div className="px-3 py-1 rounded-full bg-school-soft text-school-green text-xs font-bold w-fit">
                  ชั้นมัธยมศึกษาปีที่ 2
                </div>
                <h4 className="text-base font-bold text-slate-900">ต่อยอดทักษะวิจัย</h4>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li>• Genius Math 3 - 4 & Math Project (โครงงานคณิต)</li>
                  <li>• ฟิสิกส์ เคมี ชีววิทยา อัจฉริยะ ระดับลึกซึ้ง</li>
                  <li>• Intensive Reading & Writing 3 - 4</li>
                  <li>• การผลิตสื่อนำเสนอสร้างสรรค์ 1 - 2</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-white border-2 border-school-green/30 shadow-sm space-y-3">
                <div className="px-3 py-1 rounded-full bg-school-soft text-school-green text-xs font-bold w-fit">
                  ชั้นมัธยมศึกษาปีที่ 3
                </div>
                <h4 className="text-base font-bold text-slate-900">สู่ความเป็นเลิศ ม.ปลาย</h4>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li>• Genius Math 5 - 6 & โครงงานวิจัยเต็มรูปแบบ</li>
                  <li>• ปฏิบัติการทดลองขั้นสูง เตรียมโอลิมปิกวิชาการ</li>
                  <li>• Intensive Reading & Writing 5 - 6</li>
                  <li>• การผลิตสื่อสิ่งพิมพ์ดิจิทัล 1 - 2</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: เจาะลึกวิชาวิทย์-คณิต-อังกฤษ */}
        {activeTab === 'subjects' && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>🚀</span> เส้นทางรายวิชาอัจฉริยภาพ ม.ต้น (Gifted Core Subjects)
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Math Group */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📐</span>
                  <h4 className="text-base font-bold text-slate-900">กลุ่มคณิตศาสตร์อัจฉริยภาพ</h4>
                </div>
                <span className="inline-block px-2.5 py-1 rounded bg-amber-100 text-amber-900 text-xs font-bold">
                  ม.1 – ม.3 (เทอมละ 2.0 นก.)
                </span>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li><strong>• Genius Math 1 – 6:</strong> ฝึกแก้โจทย์ปัญหาซับซ้อนและการประยุกต์ใช้ขั้นสูง</li>
                  <li><strong>• เสริมทักษะคณิตศาสตร์ 1 – 6:</strong> ปูพื้นฐานลึกซึ้งทั้ง 6 ภาคเรียน</li>
                  <li><strong>• Math Project:</strong> การจัดทำโครงงานคณิตศาสตร์เพื่อบูรณาการความรู้ (ม.2)</li>
                </ul>
              </div>

              {/* Science Group */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔬</span>
                  <h4 className="text-base font-bold text-slate-900">กลุ่มวิทยาศาสตร์อัจฉริยภาพ</h4>
                </div>
                <span className="inline-block px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 text-xs font-bold">
                  แยกเรียนเฉพาะสาขาตั้งแต่ ม.1
                </span>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li><strong>• ฟิสิกส์อัจฉริยะ 1 – 4:</strong> กลศาสตร์ พลังงาน คลื่น ไฟฟ้า</li>
                  <li><strong>• เคมีอัจฉริยะ 1 – 4:</strong> โครงสร้างอะตอม ปฏิกิริยาเคมี สารประกอบ</li>
                  <li><strong>• ชีววิทยาอัจฉริยะ 1 – 4:</strong> เซลล์ พันธุศาสตร์ ระบบนิเวศ</li>
                </ul>
              </div>

              {/* English & Tech */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇬🇧</span>
                  <h4 className="text-base font-bold text-slate-900">กลุ่มภาษาอังกฤษ & เทคโนโลยี</h4>
                </div>
                <span className="inline-block px-2.5 py-1 rounded bg-blue-100 text-blue-900 text-xs font-bold">
                  เพิ่มทักษะศตวรรษที่ 21 ทุกภาคเรียน
                </span>
                <ul className="text-xs text-slate-600 space-y-2">
                  <li><strong>• Intensive Reading & Writing:</strong> อ่าน-เขียนภาษาอังกฤษเข้มข้นตลอดหลักสูตร (เทอมละ 1.0 นก.)</li>
                  <li><strong>• วิชาคอมพิวเตอร์สร้างสรรค์:</strong> คอมพิวเตอร์กราฟิก 1-2 (ม.1), ผลิตสื่อนำเสนอ 1-2 (ม.2), ผลิตสื่อสิ่งพิมพ์ 1-2 (ม.3)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: มาตรฐานสากล & บริบทท้องถิ่น */}
        {activeTab === 'standards' && (
          <div className="space-y-8 animate-fade-in">
            {/* 5 World-Class Standards */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>🌍</span> ตัวชี้วัดมาตรฐานสากล 5 ด้าน (World-Class Standard School)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                  <div className="text-lg font-extrabold text-school-green">100%</div>
                  <div className="text-xs font-bold text-slate-900 mt-1">1. เป็นเลิศวิชาการ</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">แข่งขันระดับชาติ/นานาชาติ และเข้าศึกษาต่อ ม.ปลาย</div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                  <div className="text-lg font-extrabold text-school-green">100%</div>
                  <div className="text-xs font-bold text-slate-900 mt-1">2. สื่อสาร 2 ภาษา</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">ไทย / อังกฤษ Intensive Reading & Writing</div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                  <div className="text-lg font-extrabold text-school-green">100%</div>
                  <div className="text-xs font-bold text-slate-900 mt-1">3. ล้ำหน้าทางความคิด</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">จัดทำ Math Project, IS1-IS3 และทักษะวิจัย</div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                  <div className="text-lg font-extrabold text-school-green">100%</div>
                  <div className="text-xs font-bold text-slate-900 mt-1">4. ผลิตงานสร้างสรรค์</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">สร้างกราฟิก สื่อนำเสนอ และสิ่งพิมพ์ดิจิทัล</div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                  <div className="text-lg font-extrabold text-school-green">100%</div>
                  <div className="text-xs font-bold text-slate-900 mt-1">5. รับผิดชอบต่อสังคม</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">วิเคราะห์ทรัพยากร สิ่งแวดล้อม และพลเมืองดิจิทัล</div>
                </div>
              </div>
            </div>

            {/* Local Integration */}
            <div className="p-6 sm:p-8 rounded-2xl bg-school-soft/60 border border-school-green/20 space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-school-dark flex items-center gap-2">
                <MapPin className="w-5 h-5 text-school-green" /> การบูรณาการท้องถิ่น (เขตจตุจักร & บางเขน)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                ห้องเรียน GIFTED ม.ต้น โรงเรียนสารวิทยา เน้นนำองค์ความรู้มาประยุกต์ใช้กับชุมชนและสังคมรอบตัว:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="font-bold text-xs text-school-green mb-1">วิทยาศาสตร์ & คณิตศาสตร์</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    คำนวณความหนาแน่นประชากร ปริมาณขยะรีไซเคิล ฝุ่น PM 2.5 และความสัมพันธ์ของสิ่งแวดล้อมในเขตจตุจักร
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="font-bold text-xs text-school-green mb-1">สังคมศึกษา & ประวัติศาสตร์</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ศึกษาประวัติความเป็นมาของบุคคลสำคัญและวัดเสมียนนารี (เขตจตุจักร)
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="font-bold text-xs text-school-green mb-1">เทคโนโลยี & กราฟิก</div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    ออกแบบสื่อสิ่งพิมพ์ โลโก้ และสินค้า OTOP ที่สอดคล้องกับแหล่งท่องเที่ยวในท้องถิ่น
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
