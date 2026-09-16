'use client';

import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUploader({ value, onChange, label = 'UPLOAD GAMBAR' }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string>(value);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Batasi ukuran file (misal maksimal 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran file terlalu besar! Maksimal 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreview(base64String);
      onChange(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-[10px] font-mono font-bold text-slate-400 uppercase">{label}</label>}
      
      {preview ? (
        <div className="relative w-32 h-32 rounded-lg border border-slate-800 bg-[#030712] overflow-hidden group">
          <img src={preview} alt="Upload preview" className="w-full h-full object-contain p-2" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-1 right-1 bg-red-600 hover:bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={12} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-800 hover:border-blue-500/50 rounded-lg cursor-pointer bg-[#030712] transition-all p-4">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-6 h-6 text-slate-400 mb-2" />
            <p className="text-xs text-slate-400 font-semibold">Klik untuk memilih file PNG/JPG</p>
            <p className="text-[10px] text-slate-500 mt-1">Maksimal 2MB</p>
          </div>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      )}
    </div>
  );
}