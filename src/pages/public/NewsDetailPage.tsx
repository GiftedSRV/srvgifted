import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { Calendar, User, ArrowLeft, Share2, Tag, Bookmark, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { news, publishedNews } = useData();
  const { role } = useAuth();

  const article = news.find((n) => n.slug === slug);

  // Authorization check: public can only view published articles
  const isAuthorized = article && (article.status === 'published' || role === 'admin' || role === 'teacher');

  if (!article || !isAuthorized) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">ไม่พบข่าวสารนี้</h2>
        <p className="text-sm text-slate-500 mb-6">
          บทความข่าวอาจถูกลบ ย้าย หรือยังไม่ได้เผยแพร่สู่สาธารณะ
        </p>
        <Link
          to="/news"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-school-green text-white text-sm font-semibold hover:bg-school-dark"
        >
          <ArrowLeft className="w-4 h-4" />
          กลับสู่หน้ารวมข่าวสาร
        </Link>
      </div>
    );
  }

  const formattedDate = format(
    new Date(article.published_at || article.created_at),
    'dd MMMM yyyy HH:mm น.',
    { locale: th }
  );

  const relatedArticles = publishedNews
    .filter((n) => n.id !== article.id && n.category_id === article.category_id)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('คัดลอกลิงก์บทความเรียบร้อยแล้ว');
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Top Breadcrumb & Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between text-xs text-slate-500">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 font-semibold text-school-green hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> ย้อนกลับ
          </button>
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:underline">หน้าหลัก</Link>
            <span>/</span>
            <Link to="/news" className="hover:underline">ข่าวสาร</Link>
            <span>/</span>
            <span className="text-slate-800 truncate max-w-[200px]">{article.title}</span>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 mt-8">
        <div className="bg-white rounded-2xl shadow-card border border-slate-200 overflow-hidden">
          {/* Cover Image */}
          {article.cover_image_path && (
            <div className="h-72 sm:h-96 w-full bg-slate-100 overflow-hidden relative">
              <img
                src={article.cover_image_path}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              {article.status === 'draft' && (
                <div className="absolute top-4 left-4 bg-amber-500 text-slate-900 font-bold px-3 py-1 rounded-full text-xs shadow-md">
                  แบบร่าง (Draft - มองเห็นเฉพาะบุคลากร)
                </div>
              )}
            </div>
          )}

          <div className="p-6 sm:p-10 space-y-6">
            {/* Meta info */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-3 text-slate-500">
                <span className="px-2.5 py-0.5 rounded-full bg-school-soft text-school-green font-semibold">
                  {article.category_name || 'ทั่วไป'}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-school-green" />
                  {formattedDate}
                </span>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
              >
                <Share2 className="w-3.5 h-3.5" />
                แชร์ข่าวนี้
              </button>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                {article.title}
              </h1>
              {article.english_title && (
                <h2 className="text-base sm:text-lg text-slate-500 font-medium italic mt-1">
                  {article.english_title}
                </h2>
              )}
            </div>

            {/* Summary Highlight Box */}
            <div className="p-4 rounded-xl bg-school-soft/60 border-l-4 border-school-green text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
              {article.summary}
            </div>

            {/* Full Body Content */}
            <div className="prose max-w-none text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line pt-2">
              {article.content}
            </div>

            {/* Gallery Images */}
            {article.gallery_image_paths && article.gallery_image_paths.length > 0 && (
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">
                  รูปภาพประกอบข่าวสาร ({article.gallery_image_paths.length} รูป)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {article.gallery_image_paths.map((imgUrl, idx) => (
                    <a
                      key={idx}
                      href={imgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-xl overflow-hidden border border-slate-200 aspect-video shadow-sm hover:shadow-md transition-all relative"
                    >
                      <img
                        src={imgUrl}
                        alt={`ภาพประกอบ ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Author Footer */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-school-green" />
                <span>ผู้เขียน / ผู้เผยแพร่: <strong>{article.author_name || 'คณะทำงานโครงการ'}</strong></span>
              </div>
              <span>โครงการห้องเรียนพิเศษวิทยาศาสตร์–คณิตศาสตร์</span>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mt-12 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">ข่าวสารอื่นในหมวดเดียวกัน</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/news/${rel.slug}`}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-card transition-all block group"
                >
                  <h4 className="text-sm font-bold text-slate-800 group-hover:text-school-green line-clamp-2">
                    {rel.title}
                  </h4>
                  <div className="text-[11px] text-slate-400 mt-2">
                    {format(new Date(rel.published_at || rel.created_at), 'dd MMM yyyy', { locale: th })}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
