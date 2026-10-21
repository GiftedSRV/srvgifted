import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const AccessDeniedPage: React.FC = () => {
  const { role, profile } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-card border border-slate-200 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 mx-auto flex items-center justify-center">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <h1 className="text-xl font-bold text-slate-900">
          ปฏิเสธการเข้าถึง (Access Denied)
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          บัญชีของคุณ ({profile?.email || 'Guest'}) ในฐานะ <strong>{role || 'ผู้ใช้ทั่วไป'}</strong> ไม่มีสิทธิ์ในการเข้าถึงหน้านี้
          ตามนโยบายความปลอดภัยและการจำกัดสิทธิ์ (Role-Based Access Control)
        </p>

        <div className="pt-4 flex flex-col sm:flex-row gap-2 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-school-green text-white text-xs font-semibold hover:bg-school-dark"
          >
            <Home className="w-4 h-4" />
            กลับสู่หน้าหลัก
          </Link>
          <Link
            to={role === 'admin' ? '/admin' : role === 'teacher' ? '/teacher' : '/student'}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
          >
            ไปยังแดชบอร์ดของคุณ
          </Link>
        </div>
      </div>
    </div>
  );
};
