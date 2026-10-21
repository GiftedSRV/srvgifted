import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-card border border-slate-200 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
          <FileQuestion className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          404 - ไม่พบหน้าที่ต้องการ
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          หน้าเว็บที่คุณกำลังพยายามเข้าถึงอาจถูกย้าย ลบ หรือไม่มีอยู่ในระบบ
        </p>

        <div className="pt-4 flex gap-2 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-school-green text-white text-xs font-semibold hover:bg-school-dark"
          >
            <Home className="w-4 h-4" />
            กลับสู่หน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
};
