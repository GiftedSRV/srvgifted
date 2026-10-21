import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useData } from '@/context/DataContext';
import { UserProfile, UserRole, AccountStatus } from '@/types';
import { Users, Search, ShieldCheck, UserCheck, GraduationCap, CheckCircle2, AlertTriangle, X } from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

export const AdminUsers: React.FC = () => {
  const { users, updateUserRole, updateUserStatus } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const filtered = users.filter((u) => {
    const matchSearch =
      u.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleRoleChange = async (userId: string, newRole: UserRole, userName: string) => {
    if (window.confirm(`ยืนยันการเปลี่ยนบทบาทของ "${userName}" เป็น ${newRole.toUpperCase()} หรือไม่?`)) {
      await updateUserRole(userId, newRole);
      setStatusMessage(`ปรับบทบาทของ ${userName} เป็น ${newRole} สำเร็จ`);
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleStatusToggle = async (userId: string, currentStatus: AccountStatus, userName: string) => {
    const newStatus: AccountStatus = currentStatus === 'active' ? 'suspended' : 'active';
    if (window.confirm(`ยืนยันการปรับสถานะบัญชีของ "${userName}" เป็น ${newStatus.toUpperCase()}?`)) {
      await updateUserStatus(userId, newStatus);
      setStatusMessage(`ปรับสถานะบัญชีของ ${userName} เป็น ${newStatus} สำเร็จ`);
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const getRoleBadge = (role: UserRole) => {
    if (role === 'admin') {
      return (
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-100 text-red-800 flex items-center gap-1 w-fit">
          <ShieldCheck className="w-3 h-3 text-red-600" /> ผู้ดูแลระบบ (Admin)
        </span>
      );
    }
    if (role === 'teacher') {
      return (
        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 w-fit">
          <UserCheck className="w-3 h-3 text-emerald-600" /> อาจารย์ผู้สอน (Teacher)
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 flex items-center gap-1 w-fit">
        <GraduationCap className="w-3 h-3 text-blue-600" /> นักเรียน (Student)
      </span>
    );
  };

  return (
    <DashboardLayout
      title="จัดการบัญชีผู้ใช้งานและบทบาท (Users & Roles Management)"
      subtitle="กำหนดสิทธิ์การเข้าถึง (RBAC) ระหว่างนักเรียน อาจารย์ และผู้ดูแลระบบ"
    >
      <div className="space-y-6 max-w-7xl mx-auto">
        {statusMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-school-green"
            >
              <option value="all">ทุกบทบาท ({users.length})</option>
              <option value="admin">ผู้ดูแลระบบ (Admin)</option>
              <option value="teacher">อาจารย์ผู้สอน (Teacher)</option>
              <option value="student">นักเรียน (Student)</option>
            </select>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาชื่อผู้ใช้ หรืออีเมล..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">ชื่อผู้ใช้งาน</th>
                  <th className="px-6 py-3.5">อีเมลสถานศึกษา</th>
                  <th className="px-6 py-3.5">บทบาท (Role)</th>
                  <th className="px-6 py-3.5">สถานะบัญชี</th>
                  <th className="px-6 py-3.5">วันที่สร้าง</th>
                  <th className="px-6 py-3.5 text-right">ปรับเปลี่ยนสิทธิ์</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3.5 font-bold text-slate-900 whitespace-nowrap">
                      {u.display_name}
                      {u.class_name && (
                        <div className="text-[10px] text-slate-400 font-normal mt-0.5">{u.class_name}</div>
                      )}
                    </td>
                    <td className="px-6 py-3.5 text-slate-600 whitespace-nowrap font-mono">
                      {u.email}
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap">
                      {getRoleBadge(u.role)}
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        u.account_status === 'active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {u.account_status === 'active' ? 'ปกติ (Active)' : 'ระงับ (Suspended)'}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-slate-500 whitespace-nowrap">
                      {format(new Date(u.created_at), 'dd MMM yyyy', { locale: th })}
                    </td>
                    <td className="px-6 py-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        {/* Role selector dropdown */}
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole, u.display_name)}
                          className="px-2 py-1 rounded border border-slate-300 text-[10px] font-bold bg-white text-slate-700 focus:ring-1 focus:ring-school-green"
                        >
                          <option value="student">นักเรียน (Student)</option>
                          <option value="teacher">ครู (Teacher)</option>
                          <option value="admin">แอดมิน (Admin)</option>
                        </select>

                        {/* Status Toggle Button */}
                        <button
                          onClick={() => handleStatusToggle(u.id, u.account_status, u.display_name)}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                            u.account_status === 'active'
                              ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                          }`}
                        >
                          {u.account_status === 'active' ? 'ระงับบัญชี' : 'เปิดใช้งาน'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
