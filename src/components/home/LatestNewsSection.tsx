import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { Calendar, ArrowRight, Tag, Bookmark } from 'lucide-react';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

export const LatestNewsSection: React.FC = () => {
  const { publishedNews } = useData();

  // Sort by published_at or created_at desc
  const sortedNews = [...publishedNews].sort(
    (a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime()
  );

  const displayNews = sortedNews.slice(0, 3);

  if (displayNews.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-school-soft/50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-school-green text-xs font-semibold uppercase tracking-wider border border-school-green/20 mb-2">
              <Bookmark className="w-3.5 h-3.5 text-school-yellow fill-school-yellow" /> ข่าวสารล่าสุด
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-school-dark">
              ข่าวสารและประกาศโครงการ
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              ติดตามข่าวสาร กิจกรรม และประกาศสำคัญของโครงการ GIFTED
            </p>
          </div>

          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-school-green hover:text-school-dark transition-colors group"
          >
            <span>ดูข่าวทั้งหมด</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayNews.map((article) => {
            const formattedDate = format(new Date(article.published_at || article.created_at), 'dd MMMM yyyy', { locale: th });
            return (
              <article
                key={article.id}
                className="bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col group"
              >
                {/* Cover Image */}
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

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-school-green" />
                      <span>{formattedDate}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-school-green transition-colors line-clamp-2">
                      <Link to={`/news/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-school-green">
                    <Link
                      to={`/news/${article.slug}`}
                      className="inline-flex items-center gap-1 hover:underline"
                    >
                      อ่านรายละเอียด <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    <span className="text-slate-400 font-normal">{article.author_name}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
