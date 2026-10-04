import React from 'react';
import { CulturalEvaluation } from '../types';
import { ShieldCheck, AlertTriangle, XCircle, CheckCircle2, Award } from 'lucide-react';

interface CulturalScoreGaugeProps {
  evaluation: CulturalEvaluation;
}

export const CulturalScoreGauge: React.FC<CulturalScoreGaugeProps> = ({ evaluation }) => {
  const { score, level, findings, isLapelValid, remixPercentage, maxRecommendedRemix } = evaluation;

  // SVG Gauge calculations
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const colorScheme = level === 'DANGER'
    ? { stroke: '#EF4444', text: 'text-red-400', bg: 'bg-red-950/40 border-red-800/60', badge: 'bg-red-500/20 text-red-300 border-red-500/40' }
    : level === 'WARNING'
    ? { stroke: '#F59E0B', text: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-800/60', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40' }
    : { stroke: '#10B981', text: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-800/60', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' };

  return (
    <div className={`w-full rounded-2xl border ${colorScheme.bg} p-5 backdrop-blur-sm transition-all duration-500`}>
      {/* Header section with gauge */}
      <div className="flex flex-col sm:flex-row items-center gap-5">
        {/* SVG Circular Gauge */}
        <div className="relative w-28 h-28 flex-shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            {/* Background track */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#1E293B"
              strokeWidth="9"
              fill="none"
            />
            {/* Progress Bar with neon effect */}
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke={colorScheme.stroke}
              strokeWidth="9"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className={`text-2xl font-black font-mono tracking-tight ${colorScheme.text}`}>
              {score}
            </span>
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
              / 100 ĐIỂM
            </span>
          </div>
        </div>

        {/* Title, Badge & Quick Status */}
        <div className="flex-1 text-center sm:text-left space-y-1.5">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h3 className="text-base font-bold text-white tracking-wide">
              Thang Đo Chuẩn Mực Văn Hóa
            </h3>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorScheme.badge} inline-flex items-center gap-1`}>
              {level === 'SAFE' && <ShieldCheck className="w-3.5 h-3.5" />}
              {level === 'WARNING' && <AlertTriangle className="w-3.5 h-3.5" />}
              {level === 'DANGER' && <XCircle className="w-3.5 h-3.5" />}
              {evaluation.statusLabel}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {evaluation.summary}
          </p>

          <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-400 font-mono">
            <span>Tỷ lệ Remix: <b className="text-white">{remixPercentage}%</b></span>
            <span>·</span>
            <span>Ngưỡng Khuyến Nghị: <b className="text-cyan-400">&le;{maxRecommendedRemix}%</b></span>
            <span>·</span>
            <span>Quy Cách Vạt: <b className={isLapelValid ? 'text-emerald-400' : 'text-red-400'}>{isLapelValid ? 'Hữu Nhậm (Phải)' : 'Tả Nhậm (Trái - Lỗi)'}</b></span>
          </div>
        </div>
      </div>

      {/* Cultural Findings List */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2.5">
        <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>Báo Cáo Đánh Giá Ranh Giới Văn Hóa Chi Tiết</span>
        </div>

        <div className="space-y-2">
          {findings.map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-xl text-xs border ${
                item.level === 'DANGER'
                  ? 'bg-red-950/60 border-red-800 text-red-200'
                  : item.level === 'WARNING'
                  ? 'bg-amber-950/60 border-amber-800 text-amber-200'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-start gap-2">
                {item.level === 'DANGER' && <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />}
                {item.level === 'WARNING' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
                {item.level === 'SAFE' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}

                <div className="space-y-1">
                  <div className="font-semibold text-slate-100 flex items-center gap-2">
                    <span>{item.title}</span>
                  </div>
                  <p className="leading-relaxed opacity-90">{item.description}</p>
                  
                  {item.historicalCitation && (
                    <div className="pt-1 text-[11px] text-slate-400 italic">
                      📜 <span className="font-medium">Cơ sở sử liệu:</span> {item.historicalCitation}
                    </div>
                  )}

                  {item.suggestion && item.level !== 'SAFE' && (
                    <div className="pt-1 text-[11px] text-cyan-300 font-medium">
                      💡 <span className="underline">Giải pháp điều chỉnh:</span> {item.suggestion}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
