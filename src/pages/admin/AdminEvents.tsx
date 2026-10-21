import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { CalendarEvent, ContentStatus } from '@/types';
import { ImageGalleryInput } from '@/components/common/ImageGalleryInput';
import { Calendar, Plus, Search, Edit3, Trash2, Clock, MapPin, X, Upload, Image as ImageIcon } from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

export const AdminEvents: React.FC = () => {
  const { events, addEvent, updateEvent, deleteEvent, categories } = useData();
  const { profile } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');
  const [categoryId, setCategoryId] = useState('cat-event-1');
  const [registrationUrl, setRegistrationUrl] = useState('');
  const [visibility, setVisibility] = useState<'public' | 'student_only' | 'staff_only'>('public');
  const [status, setStatus] = useState<ContentStatus>('published');
  const [coverImage, setCoverImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  const eventCategories = categories.filter((c) => c.category_type === 'event');

  const filtered = events.filter((e) =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openCreateModal = () => {
    setEditingEvent(null);
    setTitle('');
    setDescription('');
    setLocation('โรงเรียนสารวิทยา');
    setStartAt(new Date().toISOString().slice(0, 16));
    setEndAt(new Date(Date.now() + 3600000 * 3).toISOString().slice(0, 16));
    setCategoryId('cat-event-1');
    setRegistrationUrl('');
    setVisibility('public');
    setStatus('published');
    setCoverImage('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80');
    setGalleryImages([]);
    setModalOpen(true);
  };

  const openEditModal = (evt: CalendarEvent) => {
    setEditingEvent(evt);
    setTitle(evt.title);
    setDescription(evt.description);
    setLocation(evt.location);
    setStartAt(new Date(evt.start_at).toISOString().slice(0, 16));
    setEndAt(new Date(evt.end_at).toISOString().slice(0, 16));
    setCategoryId(evt.category_id);
    setRegistrationUrl(evt.registration_url || '');
    setVisibility(evt.visibility);
    setStatus(evt.status);
    setCoverImage(evt.cover_image_path || '');
    setGalleryImages(evt.gallery_image_paths || []);
    setModalOpen(true);
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCoverImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !location.trim() || !startAt || !endAt) return;

    const catObj = categories.find((c) => c.id === categoryId);
    const categoryName = catObj ? catObj.name : 'กิจกรรม';

    if (editingEvent) {
      await updateEvent(editingEvent.id, {
        title,
        description,
        location,
        start_at: new Date(startAt).toISOString(),
        end_at: new Date(endAt).toISOString(),
        category_id: categoryId,
        category_name: categoryName,
        registration_url: registrationUrl || undefined,
        visibility,
        status,
        cover_image_path: coverImage || undefined,
        gallery_image_paths: galleryImages,
      });
    } else {
      await addEvent({
        title,
        description,
        location,
        start_at: new Date(startAt).toISOString(),
        end_at: new Date(endAt).toISOString(),
        category_id: categoryId,
        category_name: categoryName,
        organizer_id: profile?.id || 'admin-1',
        organizer_name: profile?.display_name || 'กลุ่มบริหารวิชาการ',
        registration_url: registrationUrl || undefined,
        visibility,
        status,
        cover_image_path: coverImage || undefined,
        gallery_image_paths: galleryImages,
      });
    }

    setModalOpen(false);
  };

  const handleDelete = async (id: string, evtTitle: string) => {
    if (window.confirm(`ยืนยันการลบกิจกรรม: "${evtTitle}"?`)) {
      await deleteEvent(id);
    }
  };

  return (
    <DashboardLayout
      title="จัดการปฏิทินกิจกรรม (Events Management)"
      subtitle="เพิ่ม แก้ไข กิจกรรมค่ายวิชาการ การสอบ และแนบรูปภาพกิจกรรม"
    >
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-school-green text-white text-xs font-bold hover:bg-school-dark transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>สร้างกิจกรรมใหม่</span>
          </button>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหากิจกรรม หรือสถานที่จัด..."
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
                  <th className="px-6 py-3.5">ชื่อกิจกรรม</th>
                  <th className="px-6 py-3.5">หมวดหมู่</th>
                  <th className="px-6 py-3.5">วันเวลาจัดกิจกรรม</th>
                  <th className="px-6 py-3.5">สถานที่</th>
                  <th className="px-6 py-3.5">รูปภาพที่แนบ</th>
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
                      {item.category_name || 'ทั่วไป'}
                    </td>
                    <td className="px-6 py-3.5 text-slate-500 whitespace-nowrap">
                      {format(new Date(item.start_at), 'dd MMM yyyy HH:mm', { locale: th })}
                    </td>
                    <td className="px-6 py-3.5 text-slate-600 max-w-xs truncate">
                      {item.location}
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                        <ImageIcon className="w-3.5 h-3.5 text-school-green" />
                        <span>{(item.cover_image_path ? 1 : 0) + (item.gallery_image_paths?.length || 0)} รูป</span>
                      </span>
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
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">
                {editingEvent ? 'แก้ไขกิจกรรม' : 'สร้างกิจกรรมใหม่'}
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
                  ชื่อกิจกรรม *
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
                    สถานที่จัดกิจกรรม *
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    หมวดหมู่กิจกรรม *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  >
                    {eventCategories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    เวลาเริ่มต้น *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={startAt}
                    onChange={(e) => setStartAt(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    เวลาสิ้นสุด *
                  </label>
                  <input
                    type="datetime-local"
                    required
                    value={endAt}
                    onChange={(e) => setEndAt(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  รายละเอียดกิจกรรม
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green leading-relaxed"
                />
              </div>

              {/* Cover Image Section */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800">
                    รูปภาพหน้าปกกิจกรรม (Cover Image)
                  </label>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-school-green text-white text-xs font-medium cursor-pointer hover:bg-school-dark transition-all">
                    <Upload className="w-3.5 h-3.5" />
                    <span>อัปโหลดจากเครื่อง</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="วาง URL รูปภาพหน้าปก..."
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-school-green"
                />

                {coverImage && (
                  <div className="relative rounded-lg overflow-hidden border border-slate-200 aspect-video max-h-36 w-fit">
                    <img
                      src={coverImage}
                      alt="Cover Preview"
                      className="h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Gallery Images Section */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <ImageGalleryInput
                  label="รูปภาพบรรยากาศ / โปสเตอร์กิจกรรมเพิ่มเติม (Gallery Images)"
                  helperText="แนบรูปภาพสถานที่ ภาพปีก่อนหน้า หรือภาพประกอบกิจกรรมได้หลายรูป"
                  images={galleryImages}
                  onChange={setGalleryImages}
                  maxImages={10}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ลิงก์ลงทะเบียนเข้าร่วม (Optional URL)
                  </label>
                  <input
                    type="url"
                    value={registrationUrl}
                    onChange={(e) => setRegistrationUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    การมองเห็น (Visibility)
                  </label>
                  <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  >
                    <option value="public">สาธารณะ (ทุกคนเข้าถึงได้)</option>
                    <option value="student_only">เฉพาะนักเรียนในโครงการ</option>
                    <option value="staff_only">เฉพาะบุคลากร/อาจารย์</option>
                  </select>
                </div>
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
                  {editingEvent ? 'บันทึกการแก้ไข' : 'สร้างกิจกรรม'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};