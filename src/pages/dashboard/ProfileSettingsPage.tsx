import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import { 
  User, 
  Lock, 
  KeyRound, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  UserCheck, 
  GraduationCap, 
  Mail, 
  Calendar,
  Sparkles
} from 'lucide-react';

export const ProfileSettingsPage: React.FC = () => {
  const { profile, user, updateProfile, changePassword } = useAuth();

  // Profile Form State
  const [displayName, setDisplayName] = useState(profile?.display_name || '');
  const [className, setClassName] = useState(profile?.class_name || '');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Password Form State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSuccess(null);
    setProfileError(null);

    if (!displayName.trim()) {
      setProfileError('กรุณากรอกชื่อ-นามสกุล หรือชื่อแสดงผล');
      return;
    }

    setProfileSaving(true);
    const { error } = await updateProfile({
      display_name: displayName.trim(),
      class_name: className.trim() || undefined,
    });
    setProfileSaving(false);

    if (error) {
      setProfileError(error.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } else {
      setProfileSuccess('บันทึกข้อมูลส่วนตัวเรียบร้อยแล้ว');
      setTimeout(() => setProfileSuccess(null), 4000);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSuccess(null);
    setPasswordError(null);

    if (!newPassword || newPassword.length < 6) {
      setPasswordError('รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    setPasswordSaving(true);
    const { error } = await changePassword(newPassword);
    setPasswordSaving(false);

    if (error) {
      setPasswordError(error.message || 'ไม่สามารถเปลี่ยนรหัสผ่านได้');
    } else {
      setPasswordSuccess('เปลี่ยนรหัสผ่านสำเร็จแล้ว! กรุณาใช้รหัสผ่านใหม่ในการเข้าสู่ระบบครั้งถัดไป');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordSuccess(null), 5000);
    }
  };

  const getRoleBadge = (role?: string) => {
    if (role === 'admin') {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200 inline-flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-red-600" /> ผู้ดูแลระบบ (Admin)
        </span>
      );
    }
    if (role === 'teacher') {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 inline-flex items-center gap-1.5">
          <UserCheck className="w-4 h-4 text-emerald-600" /> อาจารย์ผู้สอน (Teacher)
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 inline-flex items-center gap-1.5">
        <GraduationCap className="w-4 h-4 text-blue-600" /> นักเรียน (Student)
      </span>
    );
  };

  return (
    <DashboardLayout
      title="ข้อมูลส่วนตัวและความปลอดภัย (Profile & Security)"
      subtitle="จัดการข้อมูลประจำตัว ชื่อที่แสดง และเปลี่ยนรหัสผ่านความปลอดภัยของท่าน"
    >
      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Account Identity Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-school-green text-school-yellow font-black text-2xl flex items-center justify-center border-2 border-school-yellow shadow-md shrink-0">
              {profile?.display_name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900 leading-snug">
                {profile?.display_name || 'ผู้ใช้งาน'}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <Mail className="w-3.5 h-3.5 text-school-green" />
                <span>{profile?.email || user?.email}</span>
              </div>
              <div className="text-[11px] text-slate-400">
                UID: {profile?.id || user?.id || 'N/A'}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            {getRoleBadge(profile?.role)}
            <span className="text-[11px] text-slate-400">
              สถานะบัญชี: <strong className="text-emerald-700">ปกติ (Active)</strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Section 1: Edit Profile Form */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
                <User className="w-5 h-5 text-school-green" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">แก้ไขข้อมูลประจำตัว</h3>
                  <p className="text-xs text-slate-500">ปรับเปลี่ยนชื่อ-นามสกุล หรือข้อมูลการศึกษาของท่าน</p>
                </div>
              </div>

              {profileSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{profileSuccess}</span>
                </div>
              )}

              {profileError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-800 flex items-center gap-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{profileError}</span>
                </div>
              )}

              <form id="profile-form" onSubmit={handleUpdateProfile} className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    อีเมลประจำตัว (ไม่สามารถแก้ไขได้)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={profile?.email || user?.email || ''}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-mono text-slate-500 cursor-not-allowed"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    * ผูกกับบัญชีผู้ใช้ในระบบฐานข้อมูล Supabase Auth
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ชื่อ - นามสกุล หรือชื่อแสดงผล *
                  </label>
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="เช่น นายรักเรียน เพียรวิทย์"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green font-medium text-slate-900"
                  />
                </div>

                {profile?.role === 'student' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ระดับชั้น / ห้องเรียน
                    </label>
                    <input
                      type="text"
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                      placeholder="เช่น ม.1/1, ม.2/1, ม.3/1"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                    />
                  </div>
                )}
              </form>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                form="profile-form"
                disabled={profileSaving}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-school-green text-white text-xs font-bold hover:bg-school-dark transition-all shadow-sm disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{profileSaving ? 'กำลังบันทึก...' : 'บันทึกข้อมูลส่วนตัว'}</span>
              </button>
            </div>
          </div>

          {/* Section 2: Change Password Form */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-card flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200">
                <KeyRound className="w-5 h-5 text-school-green" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">เปลี่ยนรหัสผ่านความปลอดภัย</h3>
                  <p className="text-xs text-slate-500">กำหนดรหัสผ่านใหม่เพื่อความปลอดภัยของบัญชี</p>
                </div>
              </div>

              {passwordSuccess && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{passwordSuccess}</span>
                </div>
              )}

              {passwordError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-semibold text-red-800 flex items-center gap-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              <form id="password-form" onSubmit={handleChangePassword} className="space-y-4 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    รหัสผ่านใหม่ (อย่างน้อย 6 ตัวอักษร) *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ยืนยันรหัสผ่านใหม่อีกครั้ง *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 space-y-1 leading-relaxed">
                  <div className="font-semibold text-slate-700">ข้อกำหนดความปลอดภัย:</div>
                  <div>• รหัสผ่านต้องมีความยาวไม่น้อยกว่า 6 ตัวอักษร</div>
                  <div>• เฉพาะท่านในฐานะเจ้าของบัญชีเท่านั้นที่สามารถเปลี่ยนรหัสผ่านนี้ได้</div>
                </div>
              </form>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                form="password-form"
                disabled={passwordSaving}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-school-green text-white text-xs font-bold hover:bg-school-dark transition-all shadow-sm disabled:opacity-50"
              >
                <KeyRound className="w-4 h-4" />
                <span>{passwordSaving ? 'กำลังเปลี่ยนรหัสผ่าน...' : 'อัปเดตรหัสผ่านใหม่'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};