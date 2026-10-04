import React from 'react';
import { PRESET_LOOKBOOKS } from '../data/presetLookbooks';
import { PresetLookbook, StylingConfig } from '../types';
import { Sparkles, ShieldCheck, AlertTriangle, ArrowRight, Flame, Trophy } from 'lucide-react';

interface PresetLookbookGalleryProps {
  onSelectPreset: (preset: PresetLookbook) => void;
  currentConfig: StylingConfig;
}

export const PresetLookbookGallery: React.FC<PresetLookbookGalleryProps> = ({
  onSelectPreset
}) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <Trophy className="w-3.5 h-3.5" />
            <span>PRESET LOOKBOOKS ĐƯƠNG ĐẠI</span>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Bộ Sưu Tập Việt Phục Tuyển Chọn
          </h3>
        </div>
        <p className="text-xs text-slate-400">
          Nhấp để nạp toàn bộ thông số phối đồ và kiểm định văn hóa tự động
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {PRESET_LOOKBOOKS.map((preset) => {
          const isDanger = preset.level === 'DANGER';
          const isWarning = preset.level === 'WARNING';

          return (
            <div
              key={preset.id}
              className={`rounded-2xl p-4 border transition-all duration-300 flex flex-col justify-between group hover:scale-[1.02] cursor-pointer ${
                isDanger
                  ? 'bg-red-950/40 border-red-800/80 hover:border-red-500'
                  : isWarning
                  ? 'bg-amber-950/30 border-amber-800/80 hover:border-amber-500'
                  : 'bg-slate-900/80 border-slate-800 hover:border-cyan-500/80 hover:shadow-cyan-500/10 hover:shadow-xl'
              }`}
              onClick={() => onSelectPreset(preset)}
            >
              <div className="space-y-2.5">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded uppercase tracking-wider ${
                      isDanger
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : isWarning
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    }`}
                  >
                    {preset.badge}
                  </span>

                  <span className="text-xs font-mono font-bold text-slate-300">
                    {preset.score}/100
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {preset.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                    {preset.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {preset.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Quick CTA */}
              <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 group-hover:text-slate-200">
                  Thử Set Đồ Này
                </span>
                <div className="w-6 h-6 rounded-full bg-slate-800 group-hover:bg-cyan-500 group-hover:text-black flex items-center justify-center transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
