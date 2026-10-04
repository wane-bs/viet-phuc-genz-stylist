import React, { useState } from 'react';
import { StylingConfig, CulturalEvaluation } from '../types';
import { Sparkles, AlertTriangle, ShieldCheck, Info, Camera, User } from 'lucide-react';
import { AnywearVirtualFitting } from './AnywearVirtualFitting';

interface GarmentVisualizerProps {
  config: StylingConfig;
  evaluation: CulturalEvaluation;
  outfitTitle: string;
  viewMode?: 'mannequin' | 'anywear_camera';
  onViewModeChange?: (mode: 'mannequin' | 'anywear_camera') => void;
}

export const GarmentVisualizer: React.FC<GarmentVisualizerProps> = ({
  config,
  evaluation,
  outfitTitle,
  viewMode: propViewMode,
  onViewModeChange
}) => {
  const [internalViewMode, setInternalViewMode] = useState<'mannequin' | 'anywear_camera'>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('viet_phuc_visualizer_mode');
        if (saved === 'mannequin' || saved === 'anywear_camera') {
          return saved;
        }
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }
    }
    return 'anywear_camera'; // Default to camera as requested
  });

  const viewMode = propViewMode !== undefined ? propViewMode : internalViewMode;

  const setViewMode = (mode: 'mannequin' | 'anywear_camera') => {
    if (onViewModeChange) {
      onViewModeChange(mode);
    } else {
      setInternalViewMode(mode);
    }
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('viet_phuc_visualizer_mode', mode);
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }
    }
  };

  const [activePin, setActivePin] = useState<string | null>(null);

  const isLeftLapelError = config.lapelDirection === 'left';
  const isDanger = evaluation.level === 'DANGER';
  const isWarning = evaluation.level === 'WARNING';

  // Primary and accent colors
  const primary = config.primaryColor || '#1E293B';
  const accent = config.accentColor || '#06B6D4';

  if (viewMode === 'anywear_camera') {
    return (
      <div className="space-y-3">
        {/* Toggle Mode Tab */}
        <div className="flex items-center justify-between p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            onClick={() => setViewMode('mannequin')}
            className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5"
          >
            <User className="w-3.5 h-3.5" />
            <span>Mannequin HUD 3D</span>
          </button>

          <button
            onClick={() => setViewMode('anywear_camera')}
            className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold bg-cyan-500 text-black shadow-md transition-colors flex items-center justify-center gap-1.5"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>📸 Anywear Camera Mặc Thử</span>
          </button>
        </div>

        <AnywearVirtualFitting
          config={config}
          evaluation={evaluation}
          outfitTitle={outfitTitle}
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Toggle Mode Tab */}
      <div className="flex items-center justify-between p-1 bg-slate-900 border border-slate-800 rounded-xl">
        <button
          onClick={() => setViewMode('mannequin')}
          className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold bg-amber-500 text-black shadow-md transition-colors flex items-center justify-center gap-1.5"
        >
          <User className="w-3.5 h-3.5" />
          <span>Mannequin HUD 3D</span>
        </button>

        <button
          onClick={() => setViewMode('anywear_camera')}
          className="flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1.5"
        >
          <Camera className="w-3.5 h-3.5 text-cyan-400" />
          <span>📸 Anywear Camera Mặc Thử</span>
        </button>
      </div>

      <div className="relative w-full rounded-2xl bg-gradient-to-b from-[#111827]/90 via-[#0d121f]/90 to-[#080c14]/90 border border-slate-800/80 p-5 overflow-hidden flex flex-col items-center justify-between shadow-2xl">
        {/* Ambient background glow */}
        <div 
          className={`absolute inset-0 opacity-20 pointer-events-none transition-all duration-700 blur-3xl ${
            isDanger 
              ? 'bg-red-600/30' 
              : isWarning 
              ? 'bg-amber-500/25' 
              : 'bg-emerald-500/25'
          }`}
        />

        {/* Top Header inside Visualizer */}
        <div className="w-full flex items-center justify-between z-10 pb-3 border-b border-slate-800/60 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-400">MANNEQUIN HUD 3D</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300 font-medium">{config.gender.toUpperCase()}</span>
            <span className="text-slate-600">·</span>
            <span className="text-amber-400 font-mono">1744 - 2026</span>
          </div>

          <div className="flex items-center gap-1.5">
            {isDanger ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-red-950/80 border border-red-700/80 text-red-300 font-mono text-[11px] font-semibold animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                LỖI TỬ PHỤC (VẠT TRÁI)
              </span>
            ) : isWarning ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-950/80 border border-amber-700/80 text-amber-300 font-mono text-[11px] font-semibold">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                CẢNH BÁO HOA VĂN / BỐI CẢNH
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-700/80 text-emerald-300 font-mono text-[11px] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                HỢP LỄ HỮU NHẬM 100%
              </span>
            )}
          </div>
        </div>

        {/* SVG Canvas Stage */}
        <div className="relative w-full max-w-[340px] h-[450px] my-2 flex items-center justify-center">
          {/* Glow Halo behind mannequin */}
          <div 
            className="absolute w-56 h-72 rounded-full filter blur-2xl opacity-30 transition-all duration-500"
            style={{
              backgroundColor: isDanger ? '#EF4444' : isWarning ? '#F59E0B' : accent
            }}
          />

          {/* Scalable SVG Render of the Vietnamese Heritage Garment */}
          <svg
            viewBox="0 0 320 460"
            className="w-full h-full drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] select-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={primary} />
                <stop offset="100%" stopColor="#0a0e17" />
              </linearGradient>

              <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={accent} />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>

              <linearGradient id="goldSilk" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FCD34D" />
                <stop offset="50%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>

              <linearGradient id="nguSac1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="25%" stopColor="#EAB308" />
                <stop offset="50%" stopColor="#FAFAF9" />
                <stop offset="75%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="#16A34A" />
              </linearGradient>

              <pattern id="brocadePattern" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 0,10 Q 10,0 20,10 Q 10,20 0,10" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <circle cx="10" cy="10" r="1.5" fill="rgba(255,215,0,0.15)" />
              </pattern>
            </defs>

            {/* Pedestal / Shadow Base */}
            <ellipse cx="160" cy="438" rx="80" ry="12" fill="#030712" opacity="0.8" />
            <ellipse cx="160" cy="438" rx="60" ry="8" fill={isDanger ? '#7F1D1D' : '#1E293B'} opacity="0.4" />

            {/* 1. LOWER BODY: Lower Garments */}
            <g id="lower-garment">
              {config.lowerGarment === 'cargo_pants' && (
                <g>
                  <path d="M125 250 L115 390 L145 390 L158 280 L162 280 L175 390 L205 390 L195 250 Z" fill="#18181B" stroke="#27272A" strokeWidth="1.5" />
                  <rect x="110" y="295" width="20" height="26" rx="3" fill="#27272A" stroke="#3F3F46" strokeWidth="1" />
                  <path d="M110 302 L130 302" stroke="#52525B" strokeWidth="1" />
                  <rect x="190" y="295" width="20" height="26" rx="3" fill="#27272A" stroke="#3F3F46" strokeWidth="1" />
                  <path d="M190 302 L210 302" stroke="#52525B" strokeWidth="1" />
                  <path d="M120 340 Q130 345 142 340" stroke="#3F3F46" strokeWidth="1.5" fill="none" />
                  <path d="M178 340 Q190 345 200 340" stroke="#3F3F46" strokeWidth="1.5" fill="none" />
                </g>
              )}

              {config.lowerGarment === 'silk_wide_pants' && (
                <g>
                  <path d="M126 240 L108 400 L148 400 L159 270 L161 270 L172 400 L212 400 L194 240 Z" fill="#F4F4F5" stroke="#E4E4E7" strokeWidth="1" />
                  <path d="M128 260 L122 395" stroke="#E4E4E7" strokeWidth="1" opacity="0.6" />
                  <path d="M192 260 L198 395" stroke="#E4E4E7" strokeWidth="1" opacity="0.6" />
                </g>
              )}

              {config.lowerGarment === 'dress_trousers' && (
                <g>
                  <path d="M126 245 L118 395 L146 395 L158 275 L162 275 L174 395 L202 395 L194 245 Z" fill="#27272A" stroke="#3F3F46" strokeWidth="1.2" />
                  <line x1="132" y1="260" x2="132" y2="395" stroke="#52525B" strokeWidth="1" />
                  <line x1="188" y1="260" x2="188" y2="395" stroke="#52525B" strokeWidth="1" />
                </g>
              )}

              {config.lowerGarment === 'pleated_skirt' && (
                <g>
                  <path d="M130 245 L102 395 L218 395 L190 245 Z" fill="#1E293B" stroke="#334155" strokeWidth="1.5" />
                  {[115, 128, 142, 155, 168, 182, 195, 205].map((x, idx) => (
                    <line key={idx} x1={130 + idx * 8} y1="248" x2={x} y2="395" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  ))}
                </g>
              )}

              {config.lowerGarment === 'culottes' && (
                <g>
                  <path d="M127 245 L112 355 L147 355 L158 275 L162 275 L173 355 L208 355 L193 245 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.2" />
                  <line x1="130" y1="260" x2="128" y2="355" stroke="#94A3B8" strokeWidth="1" />
                  <line x1="190" y1="260" x2="192" y2="355" stroke="#94A3B8" strokeWidth="1" />
                </g>
              )}

              {config.lowerGarment === 'short_mini' && (
                <g>
                  <path d="M130 245 L120 290 L148 290 L158 265 L162 265 L172 290 L200 290 L190 245 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1" />
                  <rect x="126" y="290" width="16" height="100" rx="6" fill="#FBCFE8" opacity="0.8" />
                  <rect x="178" y="290" width="16" height="100" rx="6" fill="#FBCFE8" opacity="0.8" />
                </g>
              )}
            </g>

            {/* 2. FOOTWEAR */}
            <g id="footwear">
              {config.footwear === 'chunky_sneaker' && (
                <g>
                  <path d="M110 395 L144 395 L146 422 L104 422 Q100 415 110 395 Z" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
                  <path d="M100 415 L148 415 L148 424 L98 424 Z" fill="#0F172A" />
                  <path d="M176 395 L210 395 Q220 415 216 422 L174 422 L176 395 Z" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" />
                  <path d="M172 415 L222 415 L222 424 L172 424 Z" fill="#0F172A" />
                </g>
              )}

              {config.footwear === 'leather_loafer' && (
                <g>
                  <path d="M112 395 L144 395 L144 418 L106 418 Q102 410 112 395 Z" fill="#09090B" stroke="#27272A" strokeWidth="1" />
                  <rect x="120" y="402" width="12" height="4" rx="1" fill="#EAB308" />
                  <path d="M176 395 L208 395 Q218 410 214 418 L176 418 L176 395 Z" fill="#09090B" stroke="#27272A" strokeWidth="1" />
                  <rect x="188" y="402" width="12" height="4" rx="1" fill="#EAB308" />
                </g>
              )}

              {config.footwear === 'high_boots' && (
                <g>
                  <path d="M114 360 L144 360 L144 422 L104 422 Q102 400 114 360 Z" fill="#18181B" stroke="#3F3F46" strokeWidth="1.5" />
                  <path d="M176 360 L206 360 Q218 400 216 422 L176 422 L176 360 Z" fill="#18181B" stroke="#3F3F46" strokeWidth="1.5" />
                </g>
              )}

              {config.footwear === 'wooden_clogs' && (
                <g>
                  <rect x="108" y="414" width="36" height="7" rx="2" fill="#B45309" />
                  <rect x="114" y="421" width="7" height="6" fill="#78350F" />
                  <rect x="131" y="421" width="7" height="6" fill="#78350F" />
                  <path d="M112 414 Q126 400 140 414" stroke="#DC2626" strokeWidth="3" fill="none" />

                  <rect x="176" y="414" width="36" height="7" rx="2" fill="#B45309" />
                  <rect x="182" y="421" width="7" height="6" fill="#78350F" />
                  <rect x="199" y="421" width="7" height="6" fill="#78350F" />
                  <path d="M180 414 Q194 400 208 414" stroke="#DC2626" strokeWidth="3" fill="none" />
                </g>
              )}

              {config.footwear === 'mule_sandals' && (
                <g>
                  <rect x="108" y="415" width="36" height="4" rx="2" fill="#475569" />
                  <path d="M110 415 Q125 403 140 415" stroke="#1E293B" strokeWidth="4" fill="none" />
                  <rect x="176" y="415" width="36" height="4" rx="2" fill="#475569" />
                  <path d="M178 415 Q193 403 208 415" stroke="#1E293B" strokeWidth="4" fill="none" />
                </g>
              )}
            </g>

            {/* 3. HEAD & NECK BASE */}
            <g id="head-neck">
              <rect x="150" y="85" width="20" height="25" rx="3" fill="#FED7AA" />
              <ellipse cx="160" cy="65" rx="22" ry="26" fill="#FED7AA" />
              {config.gender === 'nu' ? (
                <g>
                  <path d="M136 60 Q160 35 184 60 Q188 78 184 88 Q160 70 136 88 Z" fill="#18181B" />
                  <ellipse cx="160" cy="38" rx="14" ry="7" fill="#18181B" />
                </g>
              ) : (
                <path d="M136 62 Q160 40 184 62 Q186 52 160 45 Q134 52 136 62 Z" fill="#18181B" />
              )}
              <circle cx="152" cy="66" r="1.5" fill="#334155" />
              <circle cx="168" cy="66" r="1.5" fill="#334155" />
              <path d="M157 75 Q160 77 163 75" stroke="#334155" strokeWidth="1" fill="none" />
            </g>

            {/* 4. UPPER BODY: Base Garments Rendering */}
            <g id="base-garment-body">
              {config.baseGarment === 'ngu_than_tay_chen' && (
                <g>
                  <path
                    d="M134 100 L186 100 L205 130 L220 280 L185 280 L160 282 L135 280 L100 280 L115 130 Z"
                    fill="url(#primaryGrad)"
                    stroke={accent}
                    strokeWidth="1.5"
                  />
                  <path d="M134 100 L186 100 L205 130 L220 280 L185 280 L160 282 L135 280 L100 280 L115 130 Z" fill="url(#brocadePattern)" />

                  <path d="M134 100 L95 140 L70 215 L88 220 L112 160 L115 130 Z" fill={primary} stroke={accent} strokeWidth="1" />
                  <circle cx="79" cy="217" r="7" fill="#FED7AA" />
                  <path d="M186 100 L225 140 L250 215 L232 220 L208 160 L205 130 Z" fill={primary} stroke={accent} strokeWidth="1" />
                  <circle cx="241" cy="217" r="7" fill="#FED7AA" />

                  <rect x="146" y="94" width="28" height="14" rx="2" fill={primary} stroke={accent} strokeWidth="1.5" />

                  {!isLeftLapelError ? (
                    <g>
                      <path d="M160 108 L180 125 L190 190 L195 280" stroke="#FCD34D" strokeWidth="2.5" fill="none" />
                      <circle cx="160" cy="108" r="3.5" fill="url(#goldSilk)" stroke="#FFF" strokeWidth="0.8" />
                      <circle cx="170" cy="116" r="3.5" fill="url(#goldSilk)" stroke="#FFF" strokeWidth="0.8" />
                      <circle cx="180" cy="128" r="3.5" fill="url(#goldSilk)" stroke="#FFF" strokeWidth="0.8" />
                      <circle cx="186" cy="155" r="3.5" fill="url(#goldSilk)" stroke="#FFF" strokeWidth="0.8" />
                      <circle cx="190" cy="185" r="3.5" fill="url(#goldSilk)" stroke="#FFF" strokeWidth="0.8" />
                    </g>
                  ) : (
                    <g className="animate-pulse">
                      <path d="M160 108 L140 125 L130 190 L125 280" stroke="#EF4444" strokeWidth="3" strokeDasharray="4,2" fill="none" />
                      <circle cx="160" cy="108" r="4" fill="#EF4444" stroke="#7F1D1D" strokeWidth="1" />
                      <circle cx="150" cy="116" r="4" fill="#EF4444" stroke="#7F1D1D" strokeWidth="1" />
                      <circle cx="140" cy="128" r="4" fill="#EF4444" stroke="#7F1D1D" strokeWidth="1" />
                      <circle cx="134" cy="155" r="4" fill="#EF4444" stroke="#7F1D1D" strokeWidth="1" />
                      <circle cx="130" cy="185" r="4" fill="#EF4444" stroke="#7F1D1D" strokeWidth="1" />
                    </g>
                  )}
                </g>
              )}

              {config.baseGarment === 'ao_tac' && (
                <g>
                  <path
                    d="M130 100 L190 100 L220 140 L235 300 L190 300 L160 302 L130 300 L85 300 L100 140 Z"
                    fill="url(#primaryGrad)"
                    stroke={accent}
                    strokeWidth="1.5"
                  />
                  <path d="M130 100 L190 100 L220 140 L235 300 L190 300 L160 302 L130 300 L85 300 L100 140 Z" fill="url(#brocadePattern)" />
                  <path d="M130 100 L70 145 L50 280 L105 260 L100 140 Z" fill={primary} stroke={accent} strokeWidth="1.5" />
                  <path d="M190 100 L250 145 L270 280 L215 260 L220 140 Z" fill={primary} stroke={accent} strokeWidth="1.5" />
                  <rect x="146" y="94" width="28" height="14" rx="2" fill={primary} stroke={accent} strokeWidth="1.5" />
                  <path d="M160 108 L184 130 L196 200 L200 300" stroke="#FCD34D" strokeWidth="2.5" fill="none" />
                  <circle cx="160" cy="108" r="3.5" fill="url(#goldSilk)" stroke="#FFF" strokeWidth="0.8" />
                  <circle cx="172" cy="118" r="3.5" fill="url(#goldSilk)" stroke="#FFF" strokeWidth="0.8" />
                  <circle cx="184" cy="132" r="3.5" fill="url(#goldSilk)" stroke="#FFF" strokeWidth="0.8" />
                  <circle cx="191" cy="162" r="3.5" fill="url(#goldSilk)" stroke="#FFF" strokeWidth="0.8" />
                  <circle cx="196" cy="195" r="3.5" fill="url(#goldSilk)" stroke="#FFF" strokeWidth="0.8" />
                </g>
              )}

              {config.baseGarment === 'ao_nhat_binh' && (
                <g>
                  <path d="M130 100 L190 100 L215 135 L225 290 L185 290 L160 292 L135 290 L95 290 L105 135 Z" fill="url(#primaryGrad)" stroke="#D97706" strokeWidth="1.5" />
                  <path d="M130 100 L190 100 L215 135 L225 290 L185 290 L160 292 L135 290 L95 290 L105 135 Z" fill="url(#brocadePattern)" />
                  <path d="M130 100 L85 140 L65 230 L95 230 L105 135 Z" fill={primary} stroke="#D97706" strokeWidth="1" />
                  <rect x="65" y="215" width="30" height="15" fill="url(#nguSac1)" stroke="#FFF" strokeWidth="0.5" />
                  <path d="M190 100 L235 140 L255 230 L225 230 L215 135 Z" fill={primary} stroke="#D97706" strokeWidth="1" />
                  <rect x="225" y="215" width="30" height="15" fill="url(#nguSac1)" stroke="#FFF" strokeWidth="0.5" />
                  <path d="M140 98 L180 98 L180 185 L170 185 L170 115 L150 115 L150 185 L140 185 Z" fill="#DC2626" stroke="#FCD34D" strokeWidth="2" />
                  <rect x="154" y="180" width="12" height="14" rx="2" fill="url(#goldSilk)" stroke="#FFF" strokeWidth="1" />
                </g>
              )}

              {config.baseGarment === 'ao_tu_than' && (
                <g>
                  <polygon points="145,100 175,100 185,145 160,165 135,145" fill="#F43F5E" stroke="#E11D48" strokeWidth="1" />
                  <path d="M130 100 L145 100 L138 280 L115 280 L105 135 Z" fill="url(#primaryGrad)" stroke={accent} strokeWidth="1.5" />
                  <path d="M190 100 L175 100 L182 280 L205 280 L215 135 Z" fill="url(#primaryGrad)" stroke={accent} strokeWidth="1.5" />
                  <path d="M142 165 Q160 175 160 190 Q150 215 142 245" stroke="#F59E0B" strokeWidth="5" fill="none" strokeLinecap="round" />
                  <path d="M178 165 Q160 175 160 190 Q170 215 178 245" stroke="#F59E0B" strokeWidth="5" fill="none" strokeLinecap="round" />
                </g>
              )}

              {config.baseGarment === 'ao_giao_linh' && (
                <g>
                  {/* Giao Lĩnh - Cổ chéo giao nhau, vạt trái đè vạt phải */}
                  <path
                    d="M130 100 L190 100 L215 135 L228 290 L185 290 L160 292 L135 290 L92 290 L105 135 Z"
                    fill="url(#primaryGrad)"
                    stroke={accent}
                    strokeWidth="1.5"
                  />
                  <path d="M130 100 L190 100 L215 135 L228 290 L185 290 L160 292 L135 290 L92 290 L105 135 Z" fill="url(#brocadePattern)" />
                  {/* Sleeves */}
                  <path d="M130 100 L85 140 L55 240 L90 240 L105 135 Z" fill={primary} stroke={accent} strokeWidth="1.2" />
                  <path d="M190 100 L235 140 L265 240 L230 240 L215 135 Z" fill={primary} stroke={accent} strokeWidth="1.2" />
                  
                  {!isLeftLapelError ? (
                    <g>
                      {/* Vạt trái đè vạt phải (Hữu nhậm) */}
                      <path d="M138 100 L195 160 L195 290" stroke="#FCD34D" strokeWidth="3" fill="none" />
                      <path d="M182 100 L160 128" stroke="#FCD34D" strokeWidth="2.5" fill="none" />
                      {/* Dải buộc dây bên sườn phải */}
                      <path d="M195 160 Q210 170 205 195" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" />
                      <path d="M195 160 Q215 175 212 205" stroke="#F59E0B" strokeWidth="3" fill="none" strokeLinecap="round" />
                    </g>
                  ) : (
                    <g className="animate-pulse">
                      {/* Lỗi vạt phải đè vạt trái (Tả nhậm) */}
                      <path d="M182 100 L125 160 L125 290" stroke="#EF4444" strokeWidth="3" strokeDasharray="4,2" fill="none" />
                      <path d="M138 100 L160 128" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="4,2" fill="none" />
                    </g>
                  )}
                </g>
              )}

              {config.baseGarment === 'ao_dai_raglan' && (
                <g>
                  {/* Áo Dài Raglan - Cắt ráp raglan chéo tôn dáng, tà xẻ cao */}
                  <path
                    d="M138 98 L182 98 L198 128 L212 285 L180 285 L160 287 L140 285 L108 285 L122 128 Z"
                    fill="url(#primaryGrad)"
                    stroke={accent}
                    strokeWidth="1.5"
                  />
                  {/* Raglan sleeves with diagonal seams from collar to armpit */}
                  <path d="M138 98 L100 135 L75 220 L92 225 L122 128 Z" fill={primary} stroke={accent} strokeWidth="1" />
                  <path d="M182 98 L220 135 L245 220 L228 225 L198 128 Z" fill={primary} stroke={accent} strokeWidth="1" />
                  
                  {/* Diagonal raglan seam lines */}
                  <line x1="144" y1="98" x2="122" y2="128" stroke={accent} strokeWidth="1.5" strokeDasharray="2 2" />
                  <line x1="176" y1="98" x2="198" y2="128" stroke={accent} strokeWidth="1.5" strokeDasharray="2 2" />
                  
                  {/* Collar & Snap buttons on right collarbone */}
                  <rect x="148" y="92" width="24" height="12" rx="2" fill={primary} stroke={accent} strokeWidth="1.5" />
                  <circle cx="165" cy="98" r="2.5" fill="#FCD34D" />
                  <circle cx="174" cy="108" r="2.5" fill="#FCD34D" />
                  <circle cx="182" cy="120" r="2.5" fill="#FCD34D" />
                  
                  {/* High side slit line */}
                  <line x1="126" y1="200" x2="114" y2="285" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <line x1="194" y1="200" x2="206" y2="285" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                </g>
              )}
            </g>

            {/* 5. ACCESSORIES OVERLAY */}
            <g id="accessories-overlay">
              {config.accessories.includes('silver_kieng') && (
                <g>
                  <ellipse cx="160" cy="106" rx="16" ry="7" fill="none" stroke="#E2E8F0" strokeWidth="3" />
                  <ellipse cx="160" cy="106" rx="16" ry="7" fill="none" stroke="#FFF" strokeWidth="1" opacity="0.8" />
                </g>
              )}

              {config.accessories.includes('slim_sunglasses') && (
                <g>
                  <rect x="146" y="63" width="11" height="5" rx="1" fill="#09090B" stroke="#71717A" strokeWidth="0.8" />
                  <rect x="163" y="63" width="11" height="5" rx="1" fill="#09090B" stroke="#71717A" strokeWidth="0.8" />
                  <line x1="157" y1="65" x2="163" y2="65" stroke="#71717A" strokeWidth="1" />
                </g>
              )}

              {config.accessories.includes('folding_fan') && (
                <g>
                  <path d="M236 215 L265 190 A25 25 0 0 1 275 220 Z" fill="#B45309" stroke="#78350F" strokeWidth="1" />
                </g>
              )}

              {config.accessories.includes('non_quai_thao') && (
                <g>
                  <ellipse cx="90" cy="190" rx="24" ry="12" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
                  <path d="M72 195 Q90 230 108 215" stroke="#F43F5E" strokeWidth="2.5" fill="none" />
                </g>
              )}
            </g>

            {/* Interactive Annotation Hotspots */}
            <g id="interactive-hotspots">
              <g className="cursor-pointer" onClick={() => setActivePin(activePin === 'collar' ? null : 'collar')}>
                <circle cx="178" cy="120" r="8" fill="rgba(6,182,212,0.2)" stroke="#06B6D4" strokeWidth="1.5" className="animate-ping" />
                <circle cx="178" cy="120" r="4" fill="#06B6D4" />
              </g>

              <g className="cursor-pointer" onClick={() => setActivePin(activePin === 'waist' ? null : 'waist')}>
                <circle cx="160" cy="240" r="8" fill="rgba(245,158,11,0.2)" stroke="#F59E0B" strokeWidth="1.5" />
                <circle cx="160" cy="240" r="4" fill="#F59E0B" />
              </g>
            </g>
          </svg>

          {/* Hotspot Floating Tooltip */}
          {activePin && (
            <div className="absolute z-20 top-4 left-4 right-4 bg-slate-900/95 border border-slate-700 rounded-xl p-3 shadow-2xl backdrop-blur-md text-xs animate-in fade-in zoom-in duration-200">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800 font-semibold text-amber-400">
                <span>
                  {activePin === 'collar' && '1. Cổ Lập Lĩnh & 5 Cúc Ngũ Thường'}
                  {activePin === 'waist' && '2. Cấu Trúc Ngũ Thân & Tà Áo'}
                </span>
                <button 
                  onClick={() => setActivePin(null)} 
                  className="text-slate-400 hover:text-white p-0.5 text-xs font-mono"
                >
                  ✕
                </button>
              </div>
              <p className="pt-1.5 text-slate-300 leading-relaxed">
                {activePin === 'collar' && (
                  isLeftLapelError 
                    ? '⚠️ LỖI: Vạt cài sang trái vi phạm quy chuẩn tử phục. Bắt buộc phải đè vạt trái lên vạt phải!'
                    : '✅ Đúng chuẩn 1744: 5 hạt cúc đại diện cho Ngũ Thường (Nhân, Lễ, Nghĩa, Trí, Tín) cài dọc nách phải.'
                )}
                {activePin === 'waist' && 'Thân áo dài xẻ tà cong hình cánh cung uyển chuyển, 4 thân ngoài che chở thân thứ 5 bên trong.'}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Visualizer Bar */}
        <div className="w-full z-10 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-1 text-slate-400">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span>Chuyển tab "📸 Anywear Camera Mặc Thử" để ướm thử lên ảnh bản thân</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Remix Index:</span>
            <span className="font-mono font-semibold text-cyan-300">{evaluation.remixPercentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
