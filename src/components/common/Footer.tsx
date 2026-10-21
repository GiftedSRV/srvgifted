import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '@/constants/brand';
import { EmblemImage } from './EmblemImage';
import { MapPin, Phone, Globe, ExternalLink, Mail, LogIn } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-school-dark text-white border-t-4 border-school-yellow pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-emerald-800/60">
          {/* Column 1: Identity & Emblems */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded bg-white">
                <EmblemImage type="school" size="md" />
              </div>
              <div className="p-1 rounded bg-white">
                <EmblemImage type="program" size="md" />
              </div>
            </div>

            <div>
              <div className="text-xl font-bold text-school-yellow">
                {BRAND.PROGRAM_SHORT_EN}
              </div>
              <div className="text-sm font-medium text-emerald-200">
                {BRAND.PROGRAM_FULL_EN}
              </div>
              <div className="text-xs text-slate-300 mt-1 leading-relaxed">
                {BRAND.PROGRAM_NAME_TH}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {BRAND.SCHOOL_NAME_TH} | {BRAND.SCHOOL_NAME_EN}
              </div>
            </div>

            <p className="text-xs text-slate-300 italic leading-relaxed pt-1 border-t border-emerald-800/40">
              {BRAND.SUPPORTING_STATEMENT}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-school-yellow">
              เมนูหลัก
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  หน้าหลัก
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  ข้อมูลโครงการและหลักสูตร
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-white transition-colors">
                  ข่าวสารและประกาศ
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="hover:text-white transition-colors">
                  ปฏิทินกิจกรรม
                </Link>
              </li>
              <li>
                <Link to="/achievements" className="hover:text-white transition-colors">
                  ผลงานและรางวัล
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  ติดต่อเรา
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details (Strictly verified) */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-school-yellow">
              ข้อมูลการติดต่อทางการ
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-school-yellow shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {BRAND.CONTACT.ADDRESS_TH}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-school-yellow shrink-0" />
                <span>โทรศัพท์: {BRAND.CONTACT.PHONE}, {BRAND.CONTACT.PHONE_SECONDARY}</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-school-yellow shrink-0" />
                <a 
                  href={BRAND.CONTACT.OFFICIAL_WEBSITE} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  เว็บไซต์โรงเรียนสารวิทยา <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-school-yellow shrink-0" />
                <span>{BRAND.CONTACT.DEPARTMENT} โรงเรียนสารวิทยา</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Portals & Access (Single authoritative Login point) */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-school-yellow">
              ระบบสารสนเทศภายใน
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              ระบบจัดการและติดตามกิจกรรมสำหรับนักเรียน ครูผู้สอน และคณะกรรมการบริหารโครงการ
            </p>
            <div className="space-y-2 pt-1">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-school-green text-white text-xs font-bold hover:bg-emerald-600 transition-colors shadow-sm"
              >
                <LogIn className="w-4 h-4" />
                <span>เข้าสู่ระบบสารสนเทศ</span>
              </Link>
              <div className="text-[11px] text-slate-400 text-center">
                สำหรับนักเรียน ครู และผู้ดูแลระบบ
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2">
          <div>
            © {new Date().getFullYear()} {BRAND.PROGRAM_NAME_TH} {BRAND.SCHOOL_NAME_TH}. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>{BRAND.PROGRAM_FULL_TITLE}</span>
            <span>•</span>
            <span>{BRAND.CONTACT.DEPARTMENT}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
