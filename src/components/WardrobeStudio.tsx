import React, { useState, useMemo } from 'react';
import { 
  StylingConfig, 
  BaseGarmentType, 
  LapelDirection, 
  LowerGarmentType, 
  FootwearType, 
  AccessoryType, 
  EventContext 
} from '../types';
import { evaluateCulturalGuardrails } from '../services/culturalGuardrailEngine';
import { 
  ShieldCheck, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  BookOpen, 
  RotateCcw, 
  ArrowRight,
  Flame,
  Check
} from 'lucide-react';

interface WardrobeStudioProps {
  onReplayGame: () => void;
  onOpenHandbook: () => void;
}

export const WardrobeStudio: React.FC<WardrobeStudioProps> = ({
  onReplayGame,
  onOpenHandbook
}) => {
  // Current Outfit Configuration
  const [config, setConfig] = useState<StylingConfig>({
    gender: 'unisex',
    eventContext: 'street_cafe',
    aestheticVibe: 'streetwear',
    baseGarment: 'ngu_than_tay_chen',
    lapelDirection: 'right', // Hợp lễ
    lowerGarment: 'cargo_pants',
    footwear: 'chunky_sneaker',
    accessories: ['slim_sunglasses', 'silver_kieng'],
    pattern: 'van_may_thuy_ba',
    fabric: 'gam_to_tam',
    primaryColor: '#F59E0B', // Hoàng kim
    accentColor: '#10B981'
  });

  // Active step in simple 1-choice curating bar
  const [activeStep, setActiveStep] = useState<'garment' | 'lapel' | 'color' | 'bottom' | 'acc' | 'context'>('garment');

  // Cultural guardrail live evaluation
  const evaluation = useMemo(() => {
    return evaluateCulturalGuardrails(config);
  }, [config]);

  const isLeftLapel = config.lapelDirection === 'left';
  const isDanger = evaluation.level === 'DANGER';
  const isWarning = evaluation.level === 'WARNING';

  // Traditional color palette choices
  const COLOR_OPTIONS = [
    { name: 'Hoàng Kim', hex: '#F59E0B', note: 'Vàng gấm cung đình' },
    { name: 'Lam Ngọc', hex: '#0EA5E9', note: 'Xanh ngọc sông Hương' },
    { name: 'Chu Sa', hex: '#E11D48', note: 'Đỏ son truyền thống' },
    { name: 'Huyền Sắc', hex: '#1E293B', note: 'Đen chàm huyền bí' },
    { name: 'Bạch Ngọc', hex: '#F8FAFC', note: 'Trắng lụa tơ tằm' }
  ];

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden select-none bg-[#090d16] text-slate-100">
      {/* Top Header: Simple Brand & Status */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800/80 text-xs backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center font-bold text-black text-xs font-mono">
              DK
            </div>
            <span className="font-['Cinzel',serif] tracking-wider font-black text-amber-300 text-sm">
              TỦ ĐỒ HOÀNG CUNG
            </span>
          </div>

          <span className="text-slate-600">·</span>
          <span className="text-slate-400 font-medium hidden sm:inline">Việt Phục Remix Đương Đại</span>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenHandbook}
            className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Sổ Tay Di Sản</span>
          </button>

          <button
            onClick={onReplayGame}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Chơi Lại Hồi I</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Viewport (Fits 100vh without page scroll) */}
      <div className="flex-1 w-full flex flex-col lg:flex-row items-stretch justify-between p-3 sm:p-5 gap-4 overflow-hidden">
        
        {/* LEFT COLUMN: Visual Mannequin & Direct Visual Feedback */}
        <div className="flex-1 relative rounded-3xl bg-gradient-to-b from-[#111827]/90 via-[#0d121f]/90 to-[#080c14]/90 border border-slate-800/80 p-4 flex flex-col items-center justify-between shadow-2xl overflow-hidden min-h-[340px]">
          
          {/* Ambient Lighting & Glitch Aura when left lapel */}
          <div 
            className={`absolute inset-0 pointer-events-none transition-all duration-700 blur-3xl ${
              isDanger 
                ? 'bg-red-600/30 animate-pulse' 
                : isWarning 
                ? 'bg-amber-500/20' 
                : 'bg-emerald-500/15'
            }`} 
          />

          {/* Top Score & Status Pill */}
          <div className="w-full flex items-center justify-between z-10 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-300">
                {config.baseGarment === 'ngu_than_tay_chen' ? 'Áo Ngũ Thân Tay Chẽn' : config.baseGarment === 'ao_tac' ? 'Áo Tấc Cung Đình' : 'Áo Nhật Bình'}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 font-mono text-[11px]">
                {config.eventContext === 'temple_worship' ? 'Đền Chùa Tôn Nghiêm' : config.eventContext === 'concert_festival' ? 'Concert Âm Nhạc' : 'Cà Phê Dạo Phố'}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${
                isDanger
                  ? 'bg-red-950/80 border-red-700 text-red-300'
                  : isWarning
                  ? 'bg-amber-950/80 border-amber-700 text-amber-300'
                  : 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
              }`}>
                {isDanger && <XCircle className="w-3.5 h-3.5 text-red-400" />}
                {isWarning && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
                {!isDanger && !isWarning && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{evaluation.score}/100 Điểm</span>
              </span>
            </div>
          </div>

          {/* Central Mannequin Figure (Custom SVG Rendering) */}
          <div className="relative w-48 sm:w-56 h-64 sm:h-72 my-auto flex items-center justify-center z-10">
            {/* Dark Glitch Silhouette when Left Lapel (Tả Nhậm) */}
            {isLeftLapel && (
              <div className="absolute inset-0 bg-red-950/30 rounded-full blur-xl animate-pulse pointer-events-none" />
            )}

            <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-2xl">
              {/* Head / Face */}
              <circle cx="100" cy="40" r="22" fill="#fed7aa" />
              <path d="M 80 40 Q 100 15 120 40 Z" fill="#1e293b" />
              {/* Eyes */}
              <circle cx="93" cy="38" r="2" fill="#0f172a" />
              <circle cx="107" cy="38" r="2" fill="#0f172a" />

              {/* Kiềng Bạc Accessory */}
              {config.accessories.includes('silver_kieng') && (
                <ellipse cx="100" cy="62" rx="14" ry="5" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
              )}

              {/* Sunglasses */}
              {config.accessories.includes('slim_sunglasses') && (
                <rect x="88" y="35" width="24" height="6" rx="2" fill="#020617" stroke="#475569" strokeWidth="1" />
              )}

              {/* Standing Collar (Cổ Lập Lĩnh) */}
              <rect x="88" y="58" width="24" height="12" rx="3" fill={config.primaryColor} stroke="#cbd5e1" strokeWidth="1.5" />

              {/* Lower Garment (Quần) */}
              {config.lowerGarment === 'cargo_pants' && (
                <g>
                  {/* Baggy cargo legs with side pockets */}
                  <rect x="76" y="160" width="20" height="90" rx="4" fill="#334155" />
                  <rect x="104" y="160" width="20" height="90" rx="4" fill="#334155" />
                  {/* Cargo pocket flaps */}
                  <rect x="72" y="190" width="8" height="16" rx="2" fill="#475569" />
                  <rect x="120" y="190" width="8" height="16" rx="2" fill="#475569" />
                </g>
              )}
              {config.lowerGarment === 'silk_wide_pants' && (
                <g>
                  {/* Elegant wide silk white pants */}
                  <rect x="74" y="160" width="23" height="90" rx="2" fill="#f8fafc" />
                  <rect x="103" y="160" width="23" height="90" rx="2" fill="#f8fafc" />
                </g>
              )}
              {config.lowerGarment === 'short_mini' && (
                <g>
                  {/* Short pants showing bare legs */}
                  <rect x="78" y="160" width="18" height="30" rx="2" fill="#0f172a" />
                  <rect x="104" y="160" width="18" height="30" rx="2" fill="#0f172a" />
                  <rect x="80" y="190" width="14" height="60" fill="#fed7aa" />
                  <rect x="106" y="190" width="14" height="60" fill="#fed7aa" />
                </g>
              )}

              {/* Shoes */}
              {config.footwear === 'chunky_sneaker' ? (
                <g>
                  <rect x="70" y="248" width="26" height="12" rx="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
                  <rect x="104" y="248" width="26" height="12" rx="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
                </g>
              ) : (
                <g>
                  <rect x="72" y="250" width="24" height="10" rx="3" fill="#78350f" />
                  <rect x="104" y="250" width="24" height="10" rx="3" fill="#78350f" />
                </g>
              )}

              {/* Main Robe Body */}
              <path
                d="M 65 70 L 88 68 L 112 68 L 135 70 L 140 180 L 60 180 Z"
                fill={config.primaryColor}
                stroke="#1e293b"
                strokeWidth="1.5"
              />

              {/* Sleeves */}
              {config.baseGarment === 'ao_tac' ? (
                // Wide flowing sleeves
                <g>
                  <path d="M 65 70 L 40 130 L 65 140 L 75 100 Z" fill={config.primaryColor} stroke="#1e293b" strokeWidth="1" />
                  <path d="M 135 70 L 160 130 L 135 140 L 125 100 Z" fill={config.primaryColor} stroke="#1e293b" strokeWidth="1" />
                </g>
              ) : (
                // Fitted narrow sleeves (Tay chẽn)
                <g>
                  <path d="M 65 70 L 52 140 L 64 140 L 76 95 Z" fill={config.primaryColor} stroke="#1e293b" strokeWidth="1" />
                  <path d="M 135 70 L 148 140 L 136 140 L 124 95 Z" fill={config.primaryColor} stroke="#1e293b" strokeWidth="1" />
                </g>
              )}

              {/* CRITICAL CORE FEATURE: LAPEL SEAM & 5 JADE BUTTONS */}
              {config.lapelDirection === 'right' ? (
                // VALID RIGHT LAPEL (Hữu nhậm - Left lapel folds over right)
                <g>
                  {/* Seam line running from collar diagonally down right side */}
                  <path d="M 100 70 Q 112 85 116 115 L 116 180" fill="none" stroke="#fef08a" strokeWidth="2.5" />
                  {/* 5 shining emerald buttons */}
                  {[72, 88, 106, 126, 148].map((yPos, i) => (
                    <circle 
                      key={i} 
                      cx={100 + (yPos > 100 ? 16 : (yPos - 70) * 0.45)} 
                      cy={yPos} 
                      r="3.5" 
                      fill="#10b981" 
                      stroke="#ffffff" 
                      strokeWidth="1" 
                    />
                  ))}
                </g>
              ) : (
                // FATAL ERROR: LEFT LAPEL (Tả nhậm - Right folds over left - SEAM TURNS GLOWING RED)
                <g>
                  {/* Crimson glowing seam line */}
                  <path d="M 100 70 Q 88 85 84 115 L 84 180" fill="none" stroke="#ef4444" strokeWidth="3" className="animate-pulse" />
                  {/* Red distorted buttons */}
                  {[72, 88, 106, 126, 148].map((yPos, i) => (
                    <circle 
                      key={i} 
                      cx={100 - (yPos > 100 ? 16 : (yPos - 70) * 0.45)} 
                      cy={yPos} 
                      r="4" 
                      fill="#ef4444" 
                      stroke="#ffffff" 
                      strokeWidth="1.2" 
                    />
                  ))}
                </g>
              )}
            </svg>
          </div>

          {/* Bottom Live Feedback Bar */}
          <div className="w-full z-10 pt-2 border-t border-slate-800/80 text-xs text-center">
            {isDanger ? (
              <div className="p-2 rounded-xl bg-red-950/70 border border-red-700/80 text-red-200 font-semibold flex items-center justify-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                <span>Vi phạm đỏ: Cài Vạt Trái là nếp tang ma tử phục! Điểm sụt còn 35.</span>
              </div>
            ) : isWarning ? (
              <div className="p-2 rounded-xl bg-amber-950/70 border border-amber-700/80 text-amber-200 font-medium flex items-center justify-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Cảnh báo: Cần điều chỉnh trang phục cho hòa hợp chốn tôn nghiêm.</span>
              </div>
            ) : (
              <div className="p-2 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-emerald-200 font-medium flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Tuyệt hảo: Vạt phải chuẩn mực định chế 1744 & phối đồ đương đại hài hòa!</span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Streamlined 1-Choice Step-by-Step Curating Bar */}
        <div className="w-full lg:w-[460px] flex flex-col justify-between rounded-3xl bg-slate-900/90 border border-slate-800 p-4 shadow-xl text-slate-200">
          
          {/* Step Selector Tabs (Zero-Pill Minimalist Segmented Bar) */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-2xl overflow-x-auto text-xs font-semibold">
            {[
              { id: 'garment', label: '1. Áo Gốc' },
              { id: 'lapel', label: '2. Nếp Vạt' },
              { id: 'color', label: '3. Màu Áo' },
              { id: 'bottom', label: '4. Thân Dưới' },
              { id: 'acc', label: '5. Phụ Kiện' },
              { id: 'context', label: '6. Ngữ Cảnh' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveStep(tab.id as typeof activeStep)}
                className={`flex-1 py-1.5 px-2 rounded-xl whitespace-nowrap transition-all cursor-pointer text-center ${
                  activeStep === tab.id
                    ? 'bg-amber-400 text-black shadow-md font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Step Content Area */}
          <div className="my-4 flex-1 flex flex-col justify-center space-y-3">
            
            {/* STEP 1: BASE GARMENT */}
            {activeStep === 'garment' && (
              <div className="space-y-2">
                <div className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                  Chọn Dòng Phục Trang Gốc:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'ngu_than_tay_chen', name: 'Áo Ngũ Thân Tay Chẽn', desc: 'Chuẩn mực 1744, tay gọn gàng linh hoạt' },
                    { id: 'ao_tac', name: 'Áo Tấc (Tay Thụng)', desc: 'Đại lễ phục trang trọng, tay rộng uy nghi' },
                    { id: 'ao_nhat_binh', name: 'Áo Nhật Bình', desc: 'Thường phục hậu phi, nẹp cổ chữ nhật' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setConfig(prev => ({ ...prev, baseGarment: item.id as BaseGarmentType }))}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        config.baseGarment === item.id
                          ? 'bg-amber-500/20 border-amber-500 text-white font-bold'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs">{item.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: LAPEL DIRECTION (CRITICAL CULTURAL RULE) */}
            {activeStep === 'lapel' && (
              <div className="space-y-2">
                <div className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                  Quy Cách Cài Vạt & Cúc Áo:
                </div>
                <div className="grid grid-cols-1 gap-2.5">
                  <button
                    onClick={() => setConfig(prev => ({ ...prev, lapelDirection: 'right' }))}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      config.lapelDirection === 'right'
                        ? 'bg-emerald-950/40 border-emerald-500 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-emerald-300 flex items-center justify-between">
                      <span>Vạt Phải (Hữu Nhậm - Chuẩn Mực Tuyệt Đối)</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                      Vạt trái đè lên vạt phải, cài cúc dọc xuống sườn bên phải. Đây là quy chuẩn y phục dành cho người sống theo định chế năm 1744.
                    </div>
                  </button>

                  <button
                    onClick={() => setConfig(prev => ({ ...prev, lapelDirection: 'left' }))}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                      config.lapelDirection === 'left'
                        ? 'bg-red-950/50 border-red-500 text-white'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-red-400 flex items-center justify-between">
                      <span>Vạt Trái (Tả Nhậm - Cấm Kỵ Tang Ma)</span>
                      <XCircle className="w-4 h-4 text-red-400" />
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      Vạt phải đè vạt trái. Tuyệt đối chỉ dùng khi khâm liệm người đã khuất. Chọn sai sẽ lập tức kích hoạt cảnh báo đỏ!
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: COLOR PALETTE */}
            {activeStep === 'color' && (
              <div className="space-y-2">
                <div className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                  Màu Sắc Cung Đình Truyền Thống:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setConfig(prev => ({ ...prev, primaryColor: c.hex }))}
                      className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        config.primaryColor === c.hex
                          ? 'border-amber-400 bg-slate-950'
                          : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full border border-white/20 shrink-0 shadow" style={{ backgroundColor: c.hex }} />
                      <div>
                        <div className="text-xs font-bold text-white">{c.name}</div>
                        <div className="text-[10px] text-slate-400">{c.note}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: LOWER GARMENT */}
            {activeStep === 'bottom' && (
              <div className="space-y-2">
                <div className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                  Phối Đồ Thân Dưới (Remix Đương Đại):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'cargo_pants', name: 'Quần Cargo Ống Suông', note: 'Streetwear cá tính' },
                    { id: 'silk_wide_pants', name: 'Quần Lụa Trắng', note: 'Truyền thống trang nghiêm' },
                    { id: 'dress_trousers', name: 'Quần Tây Âu Xếp Ly', note: 'Thanh lịch hiện đại' },
                    { id: 'short_mini', name: 'Quần Short Ngắn', note: 'Dễ phạm quy tôn nghiêm' }
                  ].map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setConfig(prev => ({ ...prev, lowerGarment: b.id as LowerGarmentType }))}
                      className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        config.lowerGarment === b.id
                          ? 'bg-amber-500/20 border-amber-500 text-white font-bold'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs">{b.name}</div>
                      <div className="text-[10px] text-slate-400">{b.note}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 5: ACCESSORIES & FOOTWEAR */}
            {activeStep === 'acc' && (
              <div className="space-y-2">
                <div className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                  Phụ Kiện & Giày Dép Gen Z:
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'chunky_sneaker', name: '👟 Chunky Sneaker', type: 'footwear' },
                    { id: 'wooden_clogs', name: '🪵 Guốc Mộc', type: 'footwear' },
                    { id: 'silver_kieng', name: '💍 Kiềng Bạc', type: 'acc' },
                    { id: 'slim_sunglasses', name: '🕶️ Kính Râm Retro', type: 'acc' }
                  ].map((item) => {
                    const isSelected = item.type === 'footwear'
                      ? config.footwear === item.id
                      : config.accessories.includes(item.id as AccessoryType);

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (item.type === 'footwear') {
                            setConfig(prev => ({ ...prev, footwear: item.id as FootwearType }));
                          } else {
                            setConfig(prev => ({
                              ...prev,
                              accessories: isSelected
                                ? prev.accessories.filter(a => a !== item.id)
                                : [...prev.accessories, item.id as AccessoryType]
                            }));
                          }
                        }}
                        className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-xs">{item.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 6: CONTEXT */}
            {activeStep === 'context' && (
              <div className="space-y-2">
                <div className="text-xs text-amber-300 font-semibold uppercase tracking-wider">
                  Ngữ Cảnh Xuất Hiện:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { id: 'street_cafe', name: 'Cà Phê Dạo Phố', rule: 'Biến tấu tự do 50-70%' },
                    { id: 'concert_festival', name: 'Concert & Sự Kiện', rule: 'Biến tấu cá tính 50-70%' },
                    { id: 'temple_worship', name: 'Đền Chùa / Lễ Gia Tiên', rule: 'Tôn nghiêm, biến tấu ≤20%' },
                    { id: 'traditional_wedding', name: 'Hôn Lễ Trọng Thể', rule: 'Đoan chính, trang trọng' }
                  ].map((ctx) => (
                    <button
                      key={ctx.id}
                      onClick={() => setConfig(prev => ({ ...prev, eventContext: ctx.id as EventContext }))}
                      className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        config.eventContext === ctx.id
                          ? 'bg-amber-500/20 border-amber-500 text-white font-bold'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs">{ctx.name}</div>
                      <div className="text-[10px] text-slate-400">{ctx.rule}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Bottom Navigation between Steps */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px]">
              Tỷ lệ Remix: <b className="text-white">{evaluation.remixPercentage}%</b> (Ngưỡng: &le;{evaluation.maxRecommendedRemix}%)
            </span>

            <button
              onClick={() => {
                const steps: (typeof activeStep)[] = ['garment', 'lapel', 'color', 'bottom', 'acc', 'context'];
                const nextIdx = (steps.indexOf(activeStep) + 1) % steps.length;
                setActiveStep(steps[nextIdx]);
              }}
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Bước Tiếp Theo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Bottom Teaser for Chapter II */}
      <div className="px-4 py-2 bg-slate-950/90 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 z-20">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Gợi mở Hồi II: Bóng dáng Áo Nhật Bình triều Nguyễn nơi Hậu cung Huế.</span>
        </div>

        <button
          onClick={onOpenHandbook}
          className="text-amber-300 hover:underline font-medium cursor-pointer"
        >
          Đọc trang khảo cứu Áo Nhật Bình ➔
        </button>
      </div>
    </div>
  );
};
