import React, { useState } from 'react';
import { OutfitRemixResult } from '../types';
import { 
  Layers, 
  BookOpen, 
  Sparkles, 
  Copy, 
  Check, 
  Share2, 
  Palette, 
  Shirt, 
  Scissors, 
  Glasses, 
  Lightbulb, 
  ScrollText
} from 'lucide-react';

interface ShowcaseCardProps {
  outfit: OutfitRemixResult;
  onOpenHeritageGuide: () => void;
}

export const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ 
  outfit,
  onOpenHeritageGuide
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'layers' | 'history' | 'tips'>('layers');

  const {
    outfitTitle,
    conceptTagline,
    colorPalette,
    layers,
    historicalInsight,
    stylingTips,
    evaluation
  } = outfit;

  const handleCopyRecipe = () => {
    const text = `🇻🇳 VIỆT PHỤC REMIX: ${outfitTitle}\n` +
      `⚡ Điểm Chuẩn Mực Văn Hóa: ${evaluation.score}/100 (${evaluation.statusLabel})\n` +
      `👗 Thượng Y: ${layers.top.name} - ${layers.top.material}\n` +
      `👖 Hạ Y: ${layers.bottom.name}\n` +
      `👟 Giày & Phụ Kiện: ${layers.footwearAndAcc.name}\n` +
      `🎨 Bảng Màu: ${colorPalette.map(c => `${c.traditionalName} (${c.hex})`).join(', ')}\n` +
      `💡 Styling Tip: ${stylingTips.comfortMovement}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-5 backdrop-blur-md shadow-2xl space-y-5">
      {/* 1. HERO TITLE & CONCEPT */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400 font-semibold tracking-wider uppercase">
              LOOKBOOK SHOWCASE
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400 font-mono">GEN Z HERITAGE</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {outfitTitle}
          </h2>

          <p className="text-xs text-slate-300 font-medium">
            {conceptTagline}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyRecipe}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{copied ? 'Đã Sao Chép' : 'Sao Chép Recipe'}</span>
          </button>

          <button
            onClick={onOpenHeritageGuide}
            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-medium flex items-center gap-1.5 transition-colors border border-amber-500/40"
          >
            <ScrollText className="w-3.5 h-3.5" />
            <span>Tra Cứu Điển Lễ</span>
          </button>
        </div>
      </div>

      {/* 2. COLOR PALETTE SWATCHES */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Palette className="w-3.5 h-3.5 text-cyan-400" />
            Bảng Màu Chủ Đạo (Color Palette Swatches)
          </span>
          <span className="text-[11px] font-mono">Mã màu HEX & Ý nghĩa truyền thống</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {colorPalette.map((color, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center gap-3 group hover:border-slate-700 transition-colors"
            >
              <div
                className="w-8 h-8 rounded-lg border border-white/20 shadow-inner shrink-0"
                style={{ backgroundColor: color.hex }}
              />
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">{color.traditionalName}</div>
                <div className="text-[10px] font-mono text-cyan-400">{color.hex}</div>
                <div className="text-[10px] text-slate-400 truncate">{color.symbolism}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. TABS NAVIGATION */}
      <div className="flex items-center gap-2 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
        <button
          onClick={() => setActiveTab('layers')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'layers'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>Bóc Tách 3 Tầng Phục Trang</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'history'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>Tri Thức Văn Hóa & Niên Đại</span>
        </button>

        <button
          onClick={() => setActiveTab('tips')}
          className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'tips'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />
          <span>Lời Khuyên Styling Gen Z</span>
        </button>
      </div>

      {/* 4. TAB CONTENTS */}
      {/* TAB 1: 3-LAYER BREAKDOWN */}
      {activeTab === 'layers' && (
        <div className="space-y-3 animate-in fade-in duration-200">
          {/* Layer 1: Top */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/90 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-mono font-bold">
                  01
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{layers.top.category}</h4>
                  <div className="text-xs text-cyan-300 font-semibold">{layers.top.name}</div>
                </div>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{layers.top.material}</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {layers.top.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <span className="font-semibold text-amber-400 block mb-0.5">📜 Ý nghĩa Cổ phục:</span>
                {layers.top.culturalNote}
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <span className="font-semibold text-cyan-400 block mb-0.5">⚡ Biến tấu Remix:</span>
                {layers.top.modernTwist}
              </div>
            </div>
          </div>

          {/* Layer 2: Bottom */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/90 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-mono font-bold">
                  02
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{layers.bottom.category}</h4>
                  <div className="text-xs text-amber-300 font-semibold">{layers.bottom.name}</div>
                </div>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{layers.bottom.material}</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {layers.bottom.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <span className="font-semibold text-amber-400 block mb-0.5">🏛️ Tính Thực Dụng:</span>
                {layers.bottom.culturalNote}
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <span className="font-semibold text-cyan-400 block mb-0.5">⚡ Điểm Nhấn Gen Z:</span>
                {layers.bottom.modernTwist}
              </div>
            </div>
          </div>

          {/* Layer 3: Footwear & Accessories */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/90 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-mono font-bold">
                  03
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">{layers.footwearAndAcc.category}</h4>
                  <div className="text-xs text-emerald-300 font-semibold">{layers.footwearAndAcc.name}</div>
                </div>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{layers.footwearAndAcc.material}</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {layers.footwearAndAcc.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <span className="font-semibold text-amber-400 block mb-0.5">💍 Chi Tiết Truyền Thống:</span>
                {layers.footwearAndAcc.culturalNote}
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <span className="font-semibold text-cyan-400 block mb-0.5">👟 Vận Động Hiện Đại:</span>
                {layers.footwearAndAcc.modernTwist}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: HISTORICAL INSIGHT */}
      {activeTab === 'history' && (
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3.5 animate-in fade-in duration-200 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              Khảo Cứu Điển Chế & Niên Đại Lịch Sử
            </span>
            <span className="font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60">
              {historicalInsight.decreeYear}
            </span>
          </div>

          <div className="space-y-2 leading-relaxed text-slate-300">
            <div>
              <span className="font-semibold text-white">Niên đại & Thời kỳ: </span>
              {historicalInsight.era}
            </div>

            <div>
              <span className="font-semibold text-white">Bối cảnh khai sinh: </span>
              {historicalInsight.origin}
            </div>

            <div>
              <span className="font-semibold text-white">Triết lý nếp áo: </span>
              {historicalInsight.philosophicalMeaning}
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 italic">
            📖 <span className="font-semibold not-italic text-slate-200">Trích lục thư tịch cổ:</span> {historicalInsight.citation}
          </div>
        </div>
      )}

      {/* TAB 3: GEN Z STYLING TIPS */}
      {activeTab === 'tips' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in duration-200 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="font-bold text-cyan-400 flex items-center gap-1.5">
              <span>🛵 Đi Lại & Vận Động Thực Tế</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              {stylingTips.comfortMovement}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="font-bold text-amber-400 flex items-center gap-1.5">
              <span>📸 Góc Chụp Sống Ảo Tôn Dáng</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              {stylingTips.photoAngle}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <span>👔 Bảo Quản & Giặt Ủi Vải Tơ Tằm</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              {stylingTips.weatherMaintenance}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="font-bold text-rose-400 flex items-center gap-1.5">
              <span>⛩️ Ứng Xử & Lễ Nghi Đi Kèm</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              {stylingTips.etiquetteNote}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
