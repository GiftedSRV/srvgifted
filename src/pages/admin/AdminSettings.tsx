import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useData } from '@/context/DataContext';
import { BRAND } from '@/constants/brand';
import { Settings, Save, CheckCircle, Megaphone, Phone, Mail, Sparkles, FileText, Globe } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { settings, updateSettings } = useData();

  const [bannerActive, setBannerActive] = useState(settings.announcement_banner_active);
  const [bannerText, setBannerText] = useState(settings.announcement_banner_text || '');
  
  // Seasonal admission announcement
  const [admissionActive, setAdmissionActive] = useState(settings.admission_active);
  const [admissionBadge, setAdmissionBadge] = useState(settings.admission_badge || 'ประกาศการรับนักเรียน');
  const [admissionTitle, setAdmissionTitle] = useState(settings.admission_title || '');
  const [admissionDesc, setAdmissionDesc] = useState(settings.admission_desc || '');
  const [admissionLinkLabel, setAdmissionLinkLabel] = useState(settings.admission_link_label || 'ดูรายละเอียดประกาศ');
  const [admissionLinkUrl, setAdmissionLinkUrl] = useState(settings.admission_link_url || '');

  const [phone, setPhone] = useState(settings.contact_phone);
  const [email, setEmail] = useState(settings.contact_email);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings({
      announcement_banner_active: bannerActive,
      announcement_banner_text: bannerText,
      admission_active: admissionActive,
      admission_badge: admissionBadge,
      admission_title: admissionTitle,
      admission_desc: admissionDesc,
      admission_link_label: admissionLinkLabel,
      admission_link_url: admissionLinkUrl,
      contact_phone: phone,
      contact_email: email,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout
      title="การตั้งค่าเว็บไซต์ (Website Settings)"
      subtitle="จัดการแถบประกาศด่วน ส่วนประกาศรับนักเรียนตามฤดูกาล และข้อมูลติดต่อทางการ"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {saved && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-fade-in shadow-sm">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>บันทึกการตั้งค่าเว็บไซต์เรียบร้อยแล้ว</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* 1. Seasonal Admission Announcement Section */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-card space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-school-green" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    ส่วนประกาศตามช่วงเวลา / ฤดูกาล (Seasonal Announcement Banner)
                  </h3>
                  <p className="text-xs text-slate-500">
                    เช่น ประกาศรับสมัครนักเรียน, ประกาศรายชื่อผู้ผ่านการคัดเลือก (ตัวจริง/สำรอง), ประกาศกำหนดการรายงานตัว
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <input
                type="checkbox"
                id="admission-toggle"
                checked={admissionActive}
                onChange={(e) => setAdmissionActive(e.target.checked)}
                className="w-5 h-5 text-school-green rounded border-slate-300 focus:ring-school-green"
              />
              <label htmlFor="admission-toggle" className="text-xs sm:text-sm font-bold text-slate-800 cursor-pointer">
                เปิดแสดงส่วนประกาศนี้บนหน้าหลัก (หากปิดไว้ หรือไม่มีข้อความ ส่วนนี้จะถูกซ่อนออกจากหน้าหลักทันที)
              </label>
            </div>

            {admissionActive && (
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ป้ายกำกับประกาศ (Badge)
                    </label>
                    <input
                      type="text"
                      value={admissionBadge}
                      onChange={(e) => setAdmissionBadge(e.target.value)}
                      placeholder="เช่น ประกาศรับนักเรียน, ประกาศผลตัวจริง-สำรอง"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      หัวข้อประกาศหลัก <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required={admissionActive}
                      value={admissionTitle}
                      onChange={(e) => setAdmissionTitle(e.target.value)}
                      placeholder="เช่น ประกาศรายชื่อผู้มีสิทธิ์เข้าศึกษาต่อ ม.1 โครงการ GIFTED ปีการศึกษา 2568"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green font-semibold text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    คำอธิบายรายละเอียดประกาศ / กำหนดการที่สำคัญ
                  </label>
                  <textarea
                    rows={2}
                    value={admissionDesc}
                    onChange={(e) => setAdmissionDesc(e.target.value)}
                    placeholder="เช่น ให้นักเรียนที่มีรายชื่อตัวจริงมารายงานตัวและยืนยันสิทธิ์ ณ หอประชุมโรงเรียนสารวิทยา..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ข้อความบนปุ่มกด (Button Label)
                    </label>
                    <input
                      type="text"
                      value={admissionLinkLabel}
                      onChange={(e) => setAdmissionLinkLabel(e.target.value)}
                      placeholder="เช่น ตรวจสอบรายชื่อและดาวน์โหลดประกาศ (PDF)"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ลิงก์ปลายทาง / เอกสารแนบ (URL หรือ Path)
                    </label>
                    <input
                      type="text"
                      value={admissionLinkUrl}
                      onChange={(e) => setAdmissionLinkUrl(e.target.value)}
                      placeholder="https://... หรือ /news/... หรือลิงก์ไฟล์ PDF"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green font-mono"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. Top Emergency Announcement Bar */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-card space-y-4">
            <div className="flex items-center gap-2 border-b pb-3">
              <Megaphone className="w-5 h-5 text-school-green" />
              <div>
                <h3 className="text-base font-bold text-slate-900">แถบประกาศด่วนด้านบนสุด (Top Announcement Bar)</h3>
                <p className="text-xs text-slate-500">แถบสีเข้ม/เหลืองบางๆ เหนือแถบเมนูหลัก</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="banner-toggle"
                checked={bannerActive}
                onChange={(e) => setBannerActive(e.target.checked)}
                className="w-4 h-4 text-school-green rounded border-slate-300 focus:ring-school-green"
              />
              <label htmlFor="banner-toggle" className="text-xs font-bold text-slate-700 cursor-pointer">
                เปิดใช้งานแถบประกาศด่วนด้านบนเว็บไซต์
              </label>
            </div>

            {bannerActive && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ข้อความประกาศด่วน
                </label>
                <input
                  type="text"
                  value={bannerText}
                  onChange={(e) => setBannerText(e.target.value)}
                  placeholder="พิมพ์ข้อความประกาศด่วน..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                />
              </div>
            )}
          </div>

          {/* 3. Official Contact Settings */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-card space-y-4">
            <div className="flex items-center gap-2 border-b pb-3">
              <Phone className="w-5 h-5 text-school-green" />
              <div>
                <h3 className="text-base font-bold text-slate-900">ข้อมูลการติดต่อทางการของสถานศึกษา</h3>
                <p className="text-xs text-slate-500">กลุ่มบริหารวิชาการ โครงการห้องเรียนพิเศษ GIFTED โรงเรียนสารวิทยา</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  หมายเลขโทรศัพท์หลัก
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  อีเมลติดต่อกลุ่มบริหารวิชาการ / โครงการ
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ที่ตั้งสถานศึกษา (ข้อมูลทางการที่ผ่านการตรวจสอบแล้ว)
              </label>
              <textarea
                rows={2}
                disabled
                value={BRAND.CONTACT.ADDRESS_TH}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-600 font-medium cursor-not-allowed"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                * พิกัด: {BRAND.CONTACT.ADDRESS_TH} (เขตจตุจักร กรุงเทพมหานคร 10900)
              </span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-school-green text-white font-bold text-xs hover:bg-school-dark transition-all shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>บันทึกการตั้งค่าทั้งหมด</span>
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};