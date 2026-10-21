import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { NewsArticle, ContentStatus } from '@/types';
import { ImageGalleryInput } from '@/components/common/ImageGalleryInput';
import { 
  Newspaper, Plus, Search, Edit3, Trash2, Eye, 
  CheckCircle, Clock, Archive, Sparkles, X, Check, Image as ImageIcon, Upload 
} from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

export const AdminNews: React.FC = () => {
  const { news, addNews, updateNews, deleteNews, categories } = useData();
  const { profile } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [englishTitle, setEnglishTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('cat-news-1');
  const [coverImage, setCoverImage] = useState('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [status, setStatus] = useState<ContentStatus>('published');
  const [isFeatured, setIsFeatured] = useState(false);

  const newsCategories = categories.filter((c) => c.category_type === 'news');

  const filtered = news.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const openCreateModal = () => {
    setEditingArticle(null);
    setTitle('');
    setEnglishTitle('');
    setSlug('news-' + Date.now());
    setSummary('');
    setContent('');
    setCategoryId('cat-news-1');
    setCoverImage('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80');
    setGalleryImages([]);
    setStatus('published');
    setIsFeatured(false);
    setModalOpen(true);
  };

  const openEditModal = (article: NewsArticle) => {
    setEditingArticle(article);
    setTitle(article.title);
    setEnglishTitle(article.english_title || '');
    setSlug(article.slug);
    setSummary(article.summary);
    setContent(article.content);
    setCategoryId(article.category_id);
    setCoverImage(article.cover_image_path);
    setGalleryImages(article.gallery_image_paths || []);
    setStatus(article.status);
    setIsFeatured(article.is_featured);
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
    if (!title.trim() || !summary.trim() || !content.trim()) return;

    const catObj = categories.find((c) => c.id === categoryId);
    const categoryName = catObj ? catObj.name : 'ข่าวประกาศโครงการ';

    if (editingArticle) {
      await updateNews(editingArticle.id, {
        title,
        english_title: englishTitle || undefined,
        slug: slug || editingArticle.slug,
        summary,
        content,
        category_id: categoryId,
        category_name: categoryName,
        cover_image_path: coverImage || editingArticle.cover_image_path,
        gallery_image_paths: galleryImages,
        status,
        is_featured: isFeatured,
        published_at: status === 'published' ? new Date().toISOString() : undefined,
      });
    } else {
      await addNews({
        title,
        english_title: englishTitle || undefined,
        slug: slug || 'news-' + Date.now(),
        summary,
        content,
        category_id: categoryId,
        category_name: categoryName,
        cover_image_path: coverImage || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
        gallery_image_paths: galleryImages,
        author_id: profile?.id || 'admin-1',
        author_name: profile?.display_name || 'กลุ่มบริหารวิชาการ',
        status,
        is_featured: isFeatured,
        published_at: status === 'published' ? new Date().toISOString() : undefined,
      });
    }

    setModalOpen(false);
  };

  const handleDelete = async (id: string, articleTitle: string) => {
    if (window.confirm(`ยืนยันการลบข่าวสาร: "${articleTitle}" หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้`)) {
      await deleteNews(id);
    }
  };

  const getStatusBadge = (st: ContentStatus) => {
    if (st === 'published') {
      return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">เผยแพร่แล้ว</span>;
    }
    if (st === 'draft') {
      return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">แบบร่าง (Draft)</span>;
    }
    return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">เก็บถาวร</span>;
  };

  return (
    <DashboardLayout
      title="จัดการข่าวสารและประกาศ (News Management)"
      subtitle="สร้าง แก้ไข เผยแพร่ แนบรูปภาพหลายภาพ และจัดเก็บข่าวประชาสัมพันธ์ของโครงการ"
    >
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Actions bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-school-green text-white text-xs font-bold hover:bg-school-dark transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>เขียนข่าวสารใหม่</span>
            </button>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-school-green"
            >
              <option value="all">ทุกสถานะ ({news.length})</option>
              <option value="published">เผยแพร่แล้ว (Published)</option>
              <option value="draft">แบบร่าง (Draft)</option>
              <option value="archived">เก็บถาวร (Archived)</option>
            </select>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาตามชื่อข่าว หรือเนื้อหา..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
            />
          </div>
        </div>

        {/* News Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">หัวข้อข่าว</th>
                  <th className="px-6 py-3.5">หมวดหมู่</th>
                  <th className="px-6 py-3.5">สถานะ</th>
                  <th className="px-6 py-3.5">รูปภาพที่แนบ</th>
                  <th className="px-6 py-3.5">ข่าวเด่น</th>
                  <th className="px-6 py-3.5">วันที่เผยแพร่/สร้าง</th>
                  <th className="px-6 py-3.5 text-right">การจัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3.5 max-w-sm">
                      <div className="font-bold text-slate-900 line-clamp-1">{item.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 font-mono">slug: {item.slug}</div>
                    </td>
                    <td className="px-6 py-3.5 text-slate-600 whitespace-nowrap">
                      {item.category_name || 'ทั่วไป'}
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                        <ImageIcon className="w-3.5 h-3.5 text-school-green" />
                        <span>{1 + (item.gallery_image_paths?.length || 0)} รูป</span>
                      </span>
                    </td>
                    <td className="px-6 py-3.5 whitespace-nowrap">
                      {item.is_featured ? (
                        <span className="text-school-yellow font-bold flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5" /> ใช่
                        </span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-3.5 text-slate-500 whitespace-nowrap">
                      {format(new Date(item.published_at || item.created_at), 'dd MMM yyyy', { locale: th })}
                    </td>
                    <td className="px-6 py-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-school-green hover:bg-slate-100"
                          title="แก้ไข"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50"
                          title="ลบ"
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

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">
                {editingArticle ? 'แก้ไขบทความข่าวสาร' : 'เขียนบทความข่าวสารใหม่'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 mt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  หัวข้อข่าวสาร (ภาษาไทย) *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  หัวข้อข่าวสาร (English Title - ไม่บังคับ)
                </label>
                <input
                  type="text"
                  value={englishTitle}
                  onChange={(e) => setEnglishTitle(e.target.value)}
                  placeholder="Optional English Title"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Slug (URL ที่ปลอดภัย) *
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs font-mono focus:ring-2 focus:ring-school-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    หมวดหมู่ข่าวสาร *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  >
                    {newsCategories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  สรุปเนื้อหาเบื้องต้น (Summary) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  เนื้อหาฉบับเต็ม *
                </label>
                <textarea
                  required
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green leading-relaxed"
                />
              </div>

              {/* 1. Cover Image Section */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800">
                    รูปภาพหน้าปกหลัก (Cover Image)
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
                  placeholder="วาง URL รูปภาพหน้าปก หรือเลือกอัปโหลดจากเครื่อง..."
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-school-green"
                />

                {coverImage && (
                  <div className="relative rounded-lg overflow-hidden border border-slate-200 aspect-video max-h-40 w-fit">
                    <img
                      src={coverImage}
                      alt="Cover Preview"
                      className="h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* 2. Multiple Gallery Images Section */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <ImageGalleryInput
                  label="รูปภาพประกอบข่าวสารเพิ่มเติม (Gallery Images)"
                  helperText="แนบรูปภาพบรรยากาศกิจกรรม รูปผลงาน หรือภาพเพิ่มเติมได้หลายรูป"
                  images={galleryImages}
                  onChange={setGalleryImages}
                  maxImages={12}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    สถานะการเผยแพร่ *
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
                  >
                    <option value="published">เผยแพร่สู่สาธารณะ (Published)</option>
                    <option value="draft">บันทึกเป็นแบบร่าง (Draft)</option>
                    <option value="archived">จัดเก็บถาวร (Archived)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="featured-check"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-school-green rounded border-slate-300 focus:ring-school-green"
                  />
                  <label htmlFor="featured-check" className="text-xs font-bold text-slate-700 cursor-pointer">
                    กำหนดเป็นข่าวเด่นหน้าแรก (Featured News)
                  </label>
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
                  {editingArticle ? 'บันทึกการแก้ไข' : 'สร้างบทความ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};