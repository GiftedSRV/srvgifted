import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { useData } from '@/context/DataContext';
import { Megaphone } from 'lucide-react';

export const PublicLayout: React.FC = () => {
  const { settings } = useData();

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6F4]">
      {/* Optional Top Announcement Banner */}
      {settings.announcement_banner_active && settings.announcement_banner_text && (
        <div className="bg-school-yellow text-slate-900 text-xs py-2 px-4 font-medium flex items-center justify-center gap-2 text-center border-b border-amber-300">
          <Megaphone className="w-4 h-4 text-slate-900 shrink-0" />
          <span>{settings.announcement_banner_text}</span>
        </div>
      )}

      {/* Main Header */}
      <Header />

      {/* Main View Area */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer (containing the single authoritative login entry) */}
      <Footer />
    </div>
  );
};
