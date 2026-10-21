import React, { useState } from 'react';
import { Image as ImageIcon, Plus, Trash2, Upload, ExternalLink } from 'lucide-react';

interface ImageGalleryInputProps {
  label: string;
  helperText?: string;
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export const ImageGalleryInput: React.FC<ImageGalleryInputProps> = ({
  label,
  helperText = 'สามารถใส่ URL รูปภาพ หรือเลือกรูปจากเครื่องคอมพิวเตอร์',
  images,
  onChange,
  maxImages = 10,
}) => {
  const [urlInput, setUrlInput] = useState('');

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    if (images.length >= maxImages) {
      alert(`แนบรูปภาพได้สูงสุด ${maxImages} รูป`);
      return;
    }
    onChange([...images, urlInput.trim()]);
    setUrlInput('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = maxImages - images.length;
    if (remainingSlots <= 0) {
      alert(`แนบรูปภาพได้สูงสุด ${maxImages} รูป`);
      return;
    }

    const filesToRead = Array.from(files).slice(0, remainingSlots);
    const newImagePromises: Promise<string>[] = [];

    filesToRead.forEach((file) => {
      // Check file type
      if (!file.type.startsWith('image/')) return;

      const promise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            resolve(event.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      });
      newImagePromises.push(promise);
    });

    Promise.all(newImagePromises).then((newUrls) => {
      onChange([...images, ...newUrls]);
    });

    // Reset input
    e.target.value = '';
  };

  const handleRemoveImage = (indexToRemove: number) => {
    onChange(images.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700">
          {label} ({images.length}/{maxImages})
        </label>
        <span className="text-[11px] text-slate-400">{helperText}</span>
      </div>

      {/* Input bar: URL + Local File Button */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddUrl();
              }
            }}
            placeholder="วางลิงก์รูปภาพ (https://...) แล้วกดเพิ่มรูป"
            className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-school-green"
          />
        </div>

        <button
          type="button"
          onClick={handleAddUrl}
          disabled={!urlInput.trim()}
          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>เพิ่ม URL</span>
        </button>

        <label className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-school-green text-white text-xs font-semibold hover:bg-school-dark transition-all cursor-pointer shrink-0 shadow-sm">
          <Upload className="w-3.5 h-3.5" />
          <span>เลือกรูปจากเครื่อง</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Thumbnails Grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 pt-2">
          {images.map((imgUrl, index) => (
            <div
              key={index}
              className="group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video shadow-sm"
            >
              <img
                src={imgUrl}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80';
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow-md transition-transform transform hover:scale-110"
                  title="ลบรูปภาพนี้"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-mono">
                #{index + 1}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 rounded-xl border-2 border-dashed border-slate-200 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <ImageIcon className="w-4 h-4 text-slate-300" />
          <span>ยังไม่มีรูปภาพที่แนบ (สามารถแนบได้หลายรูป)</span>
        </div>
      )}
    </div>
  );
};