import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useData } from '@/context/DataContext';
import { Achievement, AchievementCategory, AchievementStatus } from '@/types';
import { ImageGalleryInput } from '@/components/common/ImageGalleryInput';
import { Award, Plus, Search, Edit3, Trash2, CheckCircle2, Clock, X, Sparkles, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

export const AdminAchievements: React.FC = () => {
  const { achievements, addAchievement, updateAchievement, deleteAchievement } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAch, setEditingAch] = useState<Achievement | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [eventName, setEventName] = useState('');
  const [category, setCategory] = useState<AchievementCategory>('Science competitions');
  const [academicYear, setAcademicYear] = useState('2567');
  const [achievementDate, setAchievementDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState('');
  const [studentNames, setStudentNames] = useState('');
  const [description, setDescription] = useState('');
  const [imagePaths, setImagePaths] = useState<string[]>([]);
  const [status, setStatus] = useState<AchievementStatus>('published');

  const filtered = achievements.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.event_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.result.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreateModal = () => {
    setEditingAch(null);
    setTitle('');
    setEventName('');
    setCategory('Science competitions');
    setAcademicYear('2567');
    setAchievementDate(new Date().toISOString().split('T')[0]);
    setResult('รางวัลชนะเลิศ เหรียญทอง');
    setStudentNames('ตัวแทนนักเรียนโครงการ GIFTED');
    setDescription('');
    setImagePaths(['https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80']);
    setStatus('published');
    setModalOpen(true);
  };

  const openEditModal = (ach: Achievement) => {
    setEditingAch(ach);
    setTitle(ach.title);
    setEventName(ach.event_name);
    setCategory(ach.category);
    setAcademicYear(ach.academic_year);
    setAchievementDate(ach.achievement_date);
    setResult(ach.result);
    setStudentNames(ach.student_names || '');
    setDescription(ach.description);
    setImagePaths(ach.image_paths || []);
    setStatus(ach.status);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !eventName.trim()) return;

    const finalImages = imagePaths.length > 0 
      ? imagePaths 
      : ['https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80'];

    if (editingAch) {
      await updateAchievement(editingAch.id, {
        title,
        event_name: eventName,
        category,
        academic_year: academicYear,
        achievement_date: achievementDate,
        result,
        student_names: studentNames,
        description,
        image_paths: finalImages,
        status,
      });
    } else {
      await addAchievement({
        title,
        event_name: eventName,
        category,
        academic_year: academicYear,
        achievement_date: achievementDate,
        result,
        student_names: studentNames,
        description,
        image_paths: finalImages,
        submitted_by: 'admin-1',
        submitter_name: 'กลุ่มบริหารวิชาการ',
        status,
      });
    }

    setModalOpen(false);
  };

  const handleApprove = async (id: string) => {
    await updateAchievement(id, { status: 'published' });
  };

  const handleDelete = async (id: string, achTitle: string) => {
    if (window.confirm(`ยืนยันการลบผลงาน: "${achTitle}"?`)) {
      await deleteAchievement(id);
    }
  };

  return (
    <DashboardLayout
      title="จัดการผลงานและรางวัล (Achievements Management)"
      subtitle="ตรวจสอบ อนุมัติผลงาน แนบรูปภาพเกียรติบัตร/พิธีมอบรางวัล และจัดการหอเกียรติยศนักเรียน"
    >
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-school-green text-white text-xs font-bold hover:bg-school-dark transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>เพิ่มผลงานใหม่</span>
          </button>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาชื่อผลงาน การแข่งขัน หรือรางวัล..."
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
                  <th className="px-6 py-3.5">ชื่อผลงาน / รางวัล</th>
                  <th className="px-6 py-3.5">รายการแข่งขัน</th>
                  <th className="px-6 py-3.5">ปีการศึกษา</th>
                  <th className="px-6 py-3.5">ผลรางวัล</th>
                  <th className="px-6 py-3.5">รูปภาพที่แนบ</th>
                  <th className="px-6 py-3.5">สถานะ</th>
                  <th className="px-6 py-3.5 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3.5 font-bold text-slate-900 max-w-xs truncate">
                      {item.title}
                    </td>
                    <td className="px-6 py-3.5 text-slate-600 whitespace-nowrap">
                      {item.event_name}
                    </td>
                    <td className="px-6 py-3.5 text-slate-500 whitespace-nowrap">
                      ปี {item.academic_year}
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap font-bold text-school-dark">
                      {item.result}
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                        <ImageIcon className="w-3.5 h-3.5 text-school-green" />
                        <span>{item.image_paths?.length || 0} รูป</span>
                      </span>
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap">
                      {item.status === 'published' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          เผยแพร่แล้ว
                        </span>
                      ) : item.status === 'pending_review' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1 w-fit">
                          <Clock className="w-3.5 h-3.5" /> รอการอนุมัติ
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                          แบบร่าง
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        {item.status === 'pending_review' && (
                          <button
                            onClick={() => handleApprove(item.id)}
                            className="px-2.5 py-1 rounded bg-emerald-600 text-white font-bold text-[10px] hover:bg-emerald-700 mr-1"
                            title="อนุมัติการเผยแพร่"
                          >
                            อนุมัติ
                          </button>
                        )}
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
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">
                {editingAch ? 'แก้ไขข้อมูลผลงานและรางวัล' : 'เพิ่มผลงานนักเรียนใหม่'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ชื่อผลงาน / โครงงาน / กิจกรรมที่ได้รับรางวัล *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    รายการแข่งขัน / เวทีวิชาการ *
                  </label>
                  <input
                    type="text"
                    required
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    หมวดหมู่ผลงาน *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  >
                    <option value="Science competitions">การแข่งขันวิทยาศาสตร์</option>
                    <option value="Mathematics competitions">การแข่งขันคณิตศาสตร์</option>
                    <option value="Science projects">โครงงานวิทยาศาสตร์</option>
                    <option value="Research presentations">การนำเสนองานวิจัย</option>
                    <option value="Academic awards">รางวัลทางวิชาการ</option>
                    <option value="School activities">กิจกรรมโรงเรียน</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ผลรางวัลที่ได้รับ *
                  </label>
                  <input
                    type="text"
                    required
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                    placeholder="เช่น รางวัลชนะเลิศ เหรียญทอง"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green font-semibold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ปีการศึกษา *
                  </label>
                  <input
                    type="text"
                    required
                    value={academicYear}
                    onChange={(e) => setAcademicYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    วันที่ได้รับรางวัล
                  </label>
                  <input
                    type="date"
                    value={achievementDate}
                    onChange={(e) => setAchievementDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  รายชื่อนักเรียนผู้ได้รับรางวัล (เป็นไปตามหลักคุ้มครองข้อมูลส่วนบุคคล)
                </label>
                <input
                  type="text"
                  value={studentNames}
                  onChange={(e) => setStudentNames(e.target.value)}
                  placeholder="เช่น นายรักเรียน เพียรวิทย์ และคณะ"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  รายละเอียดเพิ่มเติมเกี่ยวกับผลงาน
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green leading-relaxed"
                />
              </div>

              {/* Multiple Images Section */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <ImageGalleryInput
                  label="รูปภาพผลงาน เกียรติบัตร และภาพบรรยากาศพิธีมอบรางวัล"
                  helperText="สามารถแนบภาพเกียรติบัตร ภาพรับรางวัล หรือภาพโครงงานได้หลายภาพ"
                  images={imagePaths}
                  onChange={setImagePaths}
                  maxImages={10}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  สถานะการเผยแพร่ *
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                >
                  <option value="published">อนุมัติและเผยแพร่สู่หอเกียรติยศ (Published)</option>
                  <option value="pending_review">รอการตรวจสอบ (Pending Review)</option>
                  <option value="draft">บันทึกเป็นแบบร่าง (Draft)</option>
                  <option value="archived">จัดเก็บถาวร (Archived)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-school-green text-white text-xs font-bold hover:bg-school-dark transition-all shadow-sm"
                >
                  {editingAch ? 'บันทึกการแก้ไข' : 'บันทึกผลงาน'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};