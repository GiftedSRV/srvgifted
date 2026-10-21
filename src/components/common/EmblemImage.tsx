import React, { useState } from 'react';
import { BRAND } from '@/constants/brand';
import { AlertCircle, RefreshCw, UploadCloud } from 'lucide-react';

interface EmblemImageProps {
  type: 'program' | 'school';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
}

export const EmblemImage: React.FC<EmblemImageProps> = ({
  type,
  className = '',
  size = 'md',
  showLabel = false,
}) => {
  const [hasError, setHasError] = useState(false);
  const [customUrl, setCustomUrl] = useState<string | null>(null);
  const [showUploadHelp, setShowUploadHelp] = useState(false);

  const defaultUrl = type === 'program' 
    ? BRAND.PROGRAM_EMBLEM_URL 
    : BRAND.SCHOOL_EMBLEM_URL;

  const title = type === 'program' 
    ? 'ตราสัญลักษณ์โครงการ GIFTED' 
    : 'ตราประจำโรงเรียนสารวิทยา';

  const sizeClasses = {
    sm: 'h-10 w-auto max-w-[48px]',
    md: 'h-14 w-auto max-w-[64px]',
    lg: 'h-20 w-auto max-w-[96px]',
    xl: 'h-28 w-auto max-w-[128px]',
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setCustomUrl(localUrl);
      setHasError(false);
      setShowUploadHelp(false);
    }
  };

  if (hasError && !customUrl) {
    return (
      <div className={`flex flex-col items-center justify-center p-2 rounded border border-amber-300 bg-amber-50 text-amber-800 text-xs text-center ${className}`}>
        <AlertCircle className="w-5 h-5 text-amber-600 mb-1" />
        <span className="font-semibold">รูปภาพโหลดไม่สำเร็จ</span>
        <span className="text-[10px] text-amber-700 mt-0.5 max-w-[140px] leading-tight">
          (กล่องแสดงแทนชั่วคราว - ไม่ใช่ตราสัญลักษณ์ทางการ)
        </span>
        <div className="flex gap-1 mt-2">
          <button 
            type="button"
            onClick={() => setHasError(false)}
            className="flex items-center gap-1 px-2 py-0.5 bg-white border border-amber-400 rounded text-[10px] hover:bg-amber-100"
            title="ลองโหลดใหม่"
          >
            <RefreshCw className="w-3 h-3" /> ลองใหม่
          </button>
          <label className="flex items-center gap-1 px-2 py-0.5 bg-school-green text-white rounded text-[10px] cursor-pointer hover:bg-school-dark">
            <UploadCloud className="w-3 h-3" /> อัปโหลด
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col items-center">
      <img
        src={customUrl || defaultUrl}
        alt={title}
        title={title}
        loading="lazy"
        onError={() => setHasError(true)}
        className={`object-contain transition-transform duration-200 ${sizeClasses[size]} ${className}`}
        style={{ aspectRatio: 'auto' }}
      />
      {showLabel && (
        <span className="text-[11px] font-medium text-slate-600 mt-1 text-center">
          {title}
        </span>
      )}
    </div>
  );
};
