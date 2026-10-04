import React from 'react';
import { Scroll, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#080c14] py-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
          <span className="font-['Cinzel',serif] font-bold text-amber-400 text-sm">
            VIỆT PHỤC REMIX
          </span>
          <span className="hidden sm:inline text-slate-600">·</span>
          <span>Nền tảng Cố vấn Phong cách Việt phục Đương đại & Giám sát Ranh giới Văn hóa cho Gen Z.</span>
        </div>

        <div className="flex items-center gap-4 text-slate-500 text-[11px]">
          <span>Định chế 1744 Vũ Vương Nguyễn Phúc Khoát</span>
          <span>·</span>
          <span>Khâm Định Đại Nam Hội Điển Sự Lệ</span>
        </div>
      </div>
    </footer>
  );
};
