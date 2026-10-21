import React, { useState } from 'react';
import { isSupabaseConfigured, SUPABASE_URL } from '@/lib/supabase';
import { Database, CheckCircle, AlertTriangle, Copy, Check, ExternalLink, X, Terminal } from 'lucide-react';

interface SupabaseSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseSetupModal: React.FC<SupabaseSetupModalProps> = ({ isOpen, onClose }) => {
  const [urlInput, setUrlInput] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('gifted_supabase_url') || '' : ''
  );
  const [keyInput, setKeyInput] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('gifted_supabase_anon_key') || '' : ''
  );
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const isConfigured = isSupabaseConfigured();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('gifted_supabase_url', urlInput.trim());
    localStorage.setItem('gifted_supabase_anon_key', keyInput.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const handleClear = () => {
    localStorage.removeItem('gifted_supabase_url');
    localStorage.removeItem('gifted_supabase_anon_key');
    setUrlInput('');
    setKeyInput('');
    window.location.reload();
  };

  const sqlPath = 'supabase/migrations/20261019000000_init_schema.sql';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${isConfigured ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                สถานะการเชื่อมต่อฐานข้อมูล Supabase (Database Setup)
              </h3>
              <p className="text-xs text-slate-500">
                ตรวจสอบและตั้งค่าฐานข้อมูล PostgreSQL & Supabase Auth สำหรับระบบ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status banner */}
        <div className="my-5 p-4 rounded-xl border flex items-start gap-3 text-sm">
          {isConfigured ? (
            <>
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-emerald-900">เชื่อมต่อ Supabase สำเร็จแล้ว</div>
                <div className="text-xs text-emerald-700 mt-0.5">
                  ระบบเชื่อมต่อไปยัง: <span className="font-mono">{SUPABASE_URL}</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-amber-900">กำลังทำงานในโหมดตัวอย่าง (Offline / Demo Mode)</div>
                <div className="text-xs text-amber-700 mt-0.5 leading-relaxed">
                  ระบบยังไม่ได้ระบุ Supabase URL และ Anon Key ข้อมูลทั้งหมดจะถูกจัดการผ่าน Local Storage สำหรับทดสอบและสาธิต 
                  เมื่อต้องการใช้งานจริง สามารถกรอกการเชื่อมต่อด้านล่างได้ทันที
                </div>
              </div>
            </>
          )}
        </div>

        {/* Configuration Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Project URL (VITE_SUPABASE_URL)
            </label>
            <input
              type="url"
              placeholder="https://xyzcompany.supabase.co"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-school-green focus:border-school-green font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Anon Public API Key (VITE_SUPABASE_ANON_KEY)
            </label>
            <input
              type="password"
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-school-green focus:border-school-green font-mono"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-school-green text-white text-sm font-semibold hover:bg-school-dark transition-all shadow-sm"
            >
              บันทึกและเชื่อมต่อฐานข้อมูล
            </button>
            {isConfigured && (
              <button
                type="button"
                onClick={handleClear}
                className="px-4 py-2.5 rounded-lg border border-red-300 text-red-700 text-sm font-medium hover:bg-red-50"
              >
                ตัดการเชื่อมต่อ (กลับสู่โหมดตัวอย่าง)
              </button>
            )}
          </div>
        </form>

        {/* Steps to setup in Supabase SQL editor */}
        <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-school-green" /> ขั้นตอนสร้างตารางใน Supabase:
          </h4>
          <ol className="text-xs text-slate-600 space-y-2 list-decimal list-inside leading-relaxed">
            <li>สร้างโปรเจกต์ใหม่ใน <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-school-green underline font-medium">Supabase Dashboard <ExternalLink className="w-3 h-3 inline" /></a></li>
            <li>ไปที่เมนู <strong>SQL Editor</strong> ในหน้าต่างโปรเจกต์ Supabase</li>
            <li>คัดลอกคำสั่ง SQL ทั้งหมดจากไฟล์ <code className="bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded font-mono">{sqlPath}</code> ไปวางแล้วกด <strong>Run</strong></li>
            <li>ระบบจะสร้างตาราง <code className="font-mono">profiles, news_articles, events, learning_resources, achievements, audit_logs</code> พร้อมนโยบายรักษาความปลอดภัย <strong>Row Level Security (RLS)</strong> ให้เรียบร้อย</li>
            <li>นำ URL และ Anon Key จากหน้า <strong>Project Settings → API</strong> มาบันทึกด้านบน</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
