import React, { useState } from 'react';
import { BRAND } from '@/constants/brand';
import { MapPin, Phone, Globe, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Top Banner */}
      <div className="bg-school-dark text-white py-12 border-b-4 border-school-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900 text-school-yellow text-xs font-semibold">
              <Mail className="w-3.5 h-3.5" /> {BRAND.DEPARTMENT_NAME}
            </div>
            <h1 className="text-3xl font-bold tracking-tight">ติดต่อ {BRAND.DEPARTMENT_NAME}</h1>
            <p className="text-sm text-slate-300">
              {BRAND.PROGRAM_NAME_TH} {BRAND.SCHOOL_NAME_TH}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Official Verified Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-card border border-slate-200 space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b pb-3">
                ข้อมูลการติดต่อทางการ
              </h2>

              <ul className="space-y-4 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-school-soft text-school-green shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">ที่ตั้งสถานศึกษา</span>
                    <span className="leading-relaxed text-slate-600">{BRAND.CONTACT.ADDRESS_TH}</span>
                    <span className="block text-xs text-slate-400 mt-0.5">{BRAND.CONTACT.ADDRESS_EN}</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-school-soft text-school-green shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">หมายเลขโทรศัพท์</span>
                    <div className="text-slate-600">
                      <span>{BRAND.CONTACT.PHONE}</span>, <span>{BRAND.CONTACT.PHONE_SECONDARY}</span>
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-school-soft text-school-green shrink-0 mt-0.5">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">เว็บไซต์ทางการ</span>
                    <a
                      href={BRAND.CONTACT.OFFICIAL_WEBSITE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-school-green hover:underline font-medium"
                    >
                      {BRAND.CONTACT.OFFICIAL_WEBSITE}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-school-soft text-school-green shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-0.5">เวลาทำการ</span>
                    <span className="text-slate-600">วันจันทร์ – วันศุกร์ เวลา 08:00 – 16:30 น.</span>
                    <span className="block text-[11px] text-slate-400">(เว้นวันหยุดราชการและวันหยุดนักขัตฤกษ์)</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Note about program */}
            <div className="p-5 rounded-2xl bg-school-soft border border-school-green/20 text-xs text-school-dark leading-relaxed">
              <strong>หมายเหตุ:</strong> โครงการห้องเรียนพิเศษวิทยาศาสตร์–คณิตศาสตร์ ระดับชั้นมัธยมศึกษาตอนต้น (GIFTED) 
              ตั้งอยู่ ณ อาคารเรียนโครงการพิเศษ โรงเรียนสารวิทยา
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-card border border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-1">
                แบบฟอร์มติดต่อสอบถาม
              </h2>
              <p className="text-xs text-slate-500 mb-6">
                ส่งข้อความสอบถามข้อมูลการรับสมัคร กิจกรรม หรือข้อมูลทางวิชาการ
              </p>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h3 className="text-base font-bold text-emerald-900">ส่งข้อความเรียบร้อยแล้ว</h3>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto leading-relaxed">
                    เจ้าหน้าที่โครงการได้รับข้อมูลของท่านแล้ว และจะติดต่อกลับตามข้อมูลการติดต่อที่ท่านได้ระบุไว้โดยเร็วที่สุด
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                    }}
                    className="px-4 py-2 rounded-lg bg-school-green text-white text-xs font-semibold hover:bg-school-dark"
                  >
                    ส่งข้อความอื่นเพิ่มเติม
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        ชื่อ - นามสกุล <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="ระบุชื่อและนามสกุล"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green focus:border-school-green"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        อีเมลสำหรับติดต่อกลับ <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="example@mail.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green focus:border-school-green"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        เบอร์โทรศัพท์ติดต่อ
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="08X-XXX-XXXX"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green focus:border-school-green"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        หัวข้อการติดต่อ <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green focus:border-school-green"
                      >
                        <option value="">เลือกหัวข้อ</option>
                        <option value="admission">สอบถามการรับสมัครนักเรียน</option>
                        <option value="curriculum">สอบถามหลักสูตรและการจัดการเรียนการสอน</option>
                        <option value="events">สอบถามกิจกรรม ค่ายวิชาการ และการแข่งขัน</option>
                        <option value="resources">สอบถามคลังเอกสารและงานวิจัย</option>
                        <option value="other">เรื่องอื่นๆ</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      ข้อความ / รายละเอียด <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="กรอกรายละเอียดที่ต้องการสอบถาม..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green focus:border-school-green leading-relaxed"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-school-green text-white font-semibold text-xs hover:bg-school-dark transition-all shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>ส่งข้อความติดต่อ</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
