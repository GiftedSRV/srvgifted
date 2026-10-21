import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { Search, Calendar, Tag, ArrowRight, Bookmark } from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

export const NewsPage: React.FC = () => {
  const { publishedNews, categories } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const searchParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'all';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);

  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [currentPage, setCurrentPage] = useState(pageParam);

  const newsCategories = categories.filter((c) => c.category_type === 'news');

  const filteredNews = useMemo(() => {
    return publishedNews.filter((article) => {
      const matchSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.english_title && article.english_title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory =
        selectedCategory === 'all' || article.category_id === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [publishedNews, searchTerm, selectedCategory]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage) || 1;
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
    setSearchParams((prev) => {
      if (val) prev.set('q', val);
      else prev.delete('q');
      prev.set('page', '1');
      return prev;
    });
  };

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setCurrentPage(1);
    setSearchParams((prev) => {
      if (catId !== 'all') prev.set('category', catId);
      else prev.delete('category');
      prev.set('page', '1');
      return prev;
    });
  };

  const handlePageChange = (p: number) => {
    setCurrentPage(p);
    setSearchParams((prev) => {
      prev.set('page', p.toString());
      return prev;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Header banner */}
      <div className="bg-school-dark text-white py-12 border-b-4 border-school-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900 text-school-yellow text-xs font-semibold">
              <Bookmark className="w-3.5 h-3.5 fill-school-yellow" /> ข่าวประชาสัมพันธ์
            </div>
            <h1 className="text-3xl font-bold tracking-tight">ข่าวสารและประกาศ</h1>
            <p className="text-sm text-slate-300">
              ติดตามประกาศทางการ ผลการแข่งขัน และกำหนดการกิจกรรมของโครงการ GIFTED
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* Search & Category Filter Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-card border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ค้นหาตามชื่อข่าว หรือเนื้อหา..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-school-green focus:border-school-green"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-school-green text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              ทุกหมวดหมู่ ({publishedNews.length})
            </button>
            {newsCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-school-green text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        {paginatedNews.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-slate-200">
            <p className="text-slate-500 text-sm">ไม่พบข่าวสารที่ตรงกับเงื่อนไขการค้นหา</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedNews.map((article) => {
              const formattedDate = format(
                new Date(article.published_at || article.created_at),
                'dd MMMM yyyy',
                { locale: th }
              );
              return (
                <article
                  key={article.id}
                  className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={article.cover_image_path}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {article.is_featured && (
                        <span className="px-2.5 py-0.5 rounded-full bg-school-yellow text-school-dark text-xs font-bold shadow-sm">
                          ข่าวเด่น
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 rounded-full bg-school-dark/90 text-white text-xs font-medium backdrop-blur-sm">
                        {article.category_name || 'ทั่วไป'}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Calendar className="w-3.5 h-3.5 text-school-green" />
                        <span>{formattedDate}</span>
                      </div>

                      <h2 className="text-base font-bold text-slate-900 group-hover:text-school-green transition-colors line-clamp-2">
                        <Link to={`/news/${article.slug}`}>
                          {article.title}
                        </Link>
                      </h2>

                      {article.english_title && (
                        <div className="text-xs text-slate-500 font-medium italic line-clamp-1">
                          {article.english_title}
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-school-green">
                      <Link
                        to={`/news/${article.slug}`}
                        className="inline-flex items-center gap-1 hover:underline"
                      >
                        อ่านต่อ <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <span className="text-slate-400 font-normal">{article.author_name}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 pt-6">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold disabled:opacity-40 hover:bg-white"
            >
              ก่อนหน้า
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => handlePageChange(p)}
                className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                  currentPage === p
                    ? 'bg-school-green text-white shadow-sm'
                    : 'border border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold disabled:opacity-40 hover:bg-white"
            >
              ถัดไป
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
