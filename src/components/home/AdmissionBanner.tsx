import React from 'react';
import { useData } from '@/context/DataContext';
import { Megaphone, FileText, ArrowRight, CheckCircle, Calendar, Sparkles } from 'lucide-react';

export const AdmissionBanner: React.FC = () => {
  const { settings } = useData();

  if (!settings.admission_active || !settings.admission_title) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-emerald-900 via-school-dark to-emerald-950 text-white border-y-4 border-school-yellow py-6 px-4 sm:px-8 shadow-elevated">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-school-yellow text-slate-900 text-xs font-bold shadow-sm flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {settings.admission_badge || 'ประกาศการรับนักเรียน'}
            </span>
            <span className="text-xs text-emerald-200">
              ปีการศึกษา 2568
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
            {settings.admission_title}
          </h3>

          {settings.admission_desc && (
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {settings.admission_desc}
            </p>
          )}
        </div>

        {settings.admission_link_label && (
          <div className="shrink-0 flex items-center gap-2 w-full md:w-auto">
            <a
              href={settings.admission_link_url || '#'}
              target={settings.admission_link_url?.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-school-yellow text-slate-900 hover:bg-yellow-400 font-bold text-xs sm:text-sm shadow-md transition-all w-full md:w-auto"
            >
              <FileText className="w-4 h-4 text-slate-900" />
              <span>{settings.admission_link_label}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
