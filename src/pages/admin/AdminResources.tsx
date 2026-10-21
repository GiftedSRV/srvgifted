import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { LearningResource, ResourceSubject, ResourceType, AccessLevel, ContentStatus } from '@/types';
import { BookOpen, Plus, Search, Edit3, Trash2, Download, Lock, X } from 'lucide-react';

export const AdminResources: React.FC = () => {
  const { resources, addResource, updateResource, deleteResource } = useData();
  const { profile } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRes, setEditingRes] = useState<LearningResource | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState<ResourceSubject>('Physics');
  const [resourceType, setResourceType] = useState<ResourceType>('PDF');
  const [accessLevel, setAccessLevel] = useState<AccessLevel>('public');
  const [status, setStatus] = useState<ContentStatus>('published');
  const [fileSize, setFileSize] = useState('2.4 MB');

  const filtered = resources.filter((r) =>
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreateModal = () => {
    setEditingRes(null);
    setTitle('');
    setDescription('');
    setSubject('Physics');
    setResourceType('PDF');
    setAccessLevel('public');
    setStatus('published');
    setFileSize('2.5 MB');
    setModalOpen(true);
  };

  const openEditModal = (res: LearningResource) => {
    setEditingRes(res);
    setTitle(res.title);
    setDescription(res.description);
    setSubject(res.subject);
    setResourceType(res.resource_type);
    setAccessLevel(res.access_level);
    setStatus(res.status);
    setFileSize(res.file_size || '2.0 MB');
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingRes) {
      await updateResource(editingRes.id, {
        title,
        description,
        subject,
        resource_type: resourceType,
        access_level: accessLevel,
        status,
        file_size: fileSize,
      });
    } else {
      await addResource({
        title,
        description,
        subject,
        resource_type: resourceType,
        access_level: accessLevel,
        author_id: profile?.id || 'admin-1',
        author_name: profile?.display_name || 'ผู้ดูแลระบบ',
        status,
        file_size: fileSize,
      });
    }

    setModalOpen(false);
  };

  const handleDelete = async (id: string, resTitle: string) => {
    if (window.confirm(`ยืนยันการลบทรัพยากร: "${resTitle}"?`)) {
      await deleteResource(id);
    }
  };

  return (
    <DashboardLayout
      title="จัดการคลังความรู้ทางวิชาการ (Learning Resources)"
      subtitle="จัดการเอกสารประกอบการเรียน ใบงาน สไลด์บรรยาย และระดับสิทธิ์การดาวน์โหลด"
    >
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-school-green text-white text-xs font-bold hover:bg-school-dark transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>เพิ่มเอกสารใหม่</span>
          </button>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาชื่อเอกสาร หรือคำอธิบาย..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">ชื่อเอกสาร</th>
                  <th className="px-6 py-3.5">สาขาวิชา</th>
                  <th className="px-6 py-3.5">ประเภท</th>
                  <th className="px-6 py-3.5">ระดับการเข้าถึง</th>
                  <th className="px-6 py-3.5">ดาวน์โหลด</th>
                  <th className="px-6 py-3.5 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3.5 font-bold text-slate-900 max-w-xs truncate">
                      {item.title}
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-school-soft text-school-green">
                        {item.subject}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-slate-500 whitespace-nowrap uppercase">
                      {item.resource_type}
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.access_level === 'public'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.access_level === 'public' ? 'สาธารณะ (Public)' : 'เฉพาะนักเรียน (Student)'}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-slate-600 whitespace-nowrap">
                      {item.downloads_count || 0} ครั้ง
                    </td>
                    <td className="px-6 py-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-school-green hover:bg-slate-100"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">
                {editingRes ? 'แก้ไขข้อมูลเอกสาร' : 'เพิ่มเอกสารในคลังความรู้'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1.5 rounded text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ชื่อเอกสาร *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">สาขาวิชา *</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Scientific Research">Scientific Research</option>
                    <option value="STEM">STEM</option>
                    <option value="Worksheets">Worksheets</option>
                    <option value="Learning Documents">Learning Documents</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ประเภทเอกสาร *</label>
                  <select
                    value={resourceType}
                    onChange={(e) => setResourceType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  >
                    <option value="PDF">PDF</option>
                    <option value="Document">Word Document</option>
                    <option value="Presentation">PowerPoint</option>
                    <option value="Spreadsheet">Excel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ระดับสิทธิ์ *</label>
                  <select
                    value={accessLevel}
                    onChange={(e) => setAccessLevel(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  >
                    <option value="public">สาธารณะ (Public)</option>
                    <option value="student">เฉพาะนักเรียน (Student)</option>
                    <option value="teacher">เฉพาะครู (Teacher)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">คำอธิบาย</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-school-green text-white text-xs font-bold hover:bg-school-dark"
                >
                  บันทึกข้อมูล
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
