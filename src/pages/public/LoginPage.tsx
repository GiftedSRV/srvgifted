import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { BRAND } from '@/constants/brand';
import { EmblemImage } from '@/components/common/EmblemImage';
import { 
  LogIn, Lock, Mail, AlertCircle, CheckCircle, 
  ArrowLeft, ShieldCheck 
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, role, isSupabaseLive } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetRequested, setResetRequested] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!email.trim() || !password.trim()) {
      setErrorMsg('กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน');
      return;
    }

    setLoading(true);
    const { error, profile: loggedInProfile } = await signIn(email, password);
    setLoading(false);

    if (error) {
      setErrorMsg(error.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    } else {
      const targetRole = loggedInProfile?.role || 'student';
      const targetPath = (location.state as any)?.from?.pathname || (
        targetRole === 'admin' ? '/admin' : targetRole === 'teacher' ? '/teacher' : '/student'
      );
      navigate(targetPath, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Emblems */}
        <div className="flex justify-center items-center gap-4 mb-4">
          <div className="p-1.5 rounded-xl bg-white shadow-subtle border border-slate-200">
            <EmblemImage type="school" size="md" />
          </div>
          <div className="p-1.5 rounded-xl bg-white shadow-subtle border border-slate-200">
            <EmblemImage type="program" size="md" />
          </div>
        </div>

        <h2 className="text-2xl font-extrabold text-school-dark">
          เข้าสู่ระบบสารสนเทศ
        </h2>
        <div className="text-xs font-semibold text-school-green mt-1">
          {BRAND.PROGRAM_FULL_TITLE}
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          {BRAND.PROGRAM_NAME_TH} • {BRAND.SCHOOL_NAME_TH}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-elevated rounded-2xl border border-slate-200 space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2 text-xs text-red-800 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{errorMsg}</span>
            </div>
          )}

          {resetRequested && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2 text-xs text-emerald-800 animate-fadeIn">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>หากบัญชีของท่านมีอยู่ในระบบ ทางสถานศึกษาจะจัดส่งคำแนะนำในการตั้งรหัสผ่านใหม่ให้ทางอีเมล</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                อีเมลประจำตัวผู้ใช้งาน (Email) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@srv.ac.th หรืออีเมลที่ลงทะเบียน"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green focus:border-school-green font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  รหัสผ่าน (Password) <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setResetRequested(true)}
                  className="text-[11px] text-school-green hover:underline font-medium"
                >
                  ลืมรหัสผ่าน?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green focus:border-school-green"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-school-green text-white font-bold text-xs hover:bg-school-dark transition-all shadow-md disabled:opacity-50 mt-2"
            >
              <LogIn className="w-4 h-4" />
              <span>{loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <Link to="/" className="inline-flex items-center gap-1 hover:text-school-green font-medium">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>กลับสู่หน้าหลัก</span>
            </Link>
            <span className="text-[11px] text-slate-400">
              {BRAND.DEPARTMENT_NAME}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};