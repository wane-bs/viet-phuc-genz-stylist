import React, { useState } from 'react';
import { 
  Gender, 
  EventContext, 
  AestheticVibe, 
  BaseGarmentType, 
  LapelDirection,
  LowerGarmentType,
  FootwearType,
  AccessoryType,
  PatternType,
  FabricType,
  StylingConfig,
  PresetLookbook
} from '../types';
import { GARMENTS_CATALOG } from '../data/garmentsData';
import { 
  Sparkles, 
  Shuffle, 
  Sliders, 
  ShieldCheck, 
  AlertOctagon, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  RotateCcw,
  Compass
} from 'lucide-react';

interface StylistControlPanelProps {
  config: StylingConfig;
  onChange: (newConfig: StylingConfig) => void;
  onApplyPreset?: (preset: PresetLookbook) => void;
  onReset: () => void;
}

export const StylistControlPanel: React.FC<StylistControlPanelProps> = ({
  config,
  onChange,
  onReset
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Helper updates
  const updateField = <K extends keyof StylingConfig>(field: K, value: StylingConfig[K]) => {
    onChange({ ...config, [field]: value });
  };

  const toggleAccessory = (acc: AccessoryType) => {
    const exists = config.accessories.includes(acc);
    const newAccs = exists 
      ? config.accessories.filter(a => a !== acc) 
      : [...config.accessories, acc];
    updateField('accessories', newAccs);
  };

  const handleRandomize = () => {
    const garments: BaseGarmentType[] = ['ngu_than_tay_chen', 'ao_tac', 'ao_nhat_binh', 'ao_tu_than', 'ao_giao_linh', 'ao_dai_raglan'];
    const contexts: EventContext[] = ['concert_festival', 'street_cafe', 'school_workshop', 'temple_worship', 'traditional_wedding'];
    const vibes: AestheticVibe[] = ['streetwear', 'minimalist', 'cyber_y2k', 'academia', 'royal_fusion'];
    const lower: LowerGarmentType[] = ['cargo_pants', 'silk_wide_pants', 'dress_trousers', 'pleated_skirt', 'culottes'];
    const shoes: FootwearType[] = ['chunky_sneaker', 'leather_loafer', 'high_boots', 'wooden_clogs', 'mule_sandals'];
    const colors = ['#1E293B', '#D97706', '#DC2626', '#3F6212', '#06B6D4', '#78350F'];
    const accents = ['#06B6D4', '#EC4899', '#F59E0B', '#10B981', '#E2E8F0'];

    const randomGarment = garments[Math.floor(Math.random() * garments.length)];
    const randomContext = contexts[Math.floor(Math.random() * contexts.length)];
    const randomVibe = vibes[Math.floor(Math.random() * vibes.length)];
    const randomLower = lower[Math.floor(Math.random() * lower.length)];
    const randomShoes = shoes[Math.floor(Math.random() * shoes.length)];

    onChange({
      gender: 'unisex',
      eventContext: randomContext,
      aestheticVibe: randomVibe,
      baseGarment: randomGarment,
      lapelDirection: 'right', // standard
      lowerGarment: randomLower,
      footwear: randomShoes,
      accessories: ['slim_sunglasses', 'silver_kieng'],
      pattern: 'van_may_thuy_ba',
      fabric: 'gam_to_tam',
      primaryColor: colors[Math.floor(Math.random() * colors.length)],
      accentColor: accents[Math.floor(Math.random() * accents.length)]
    });
  };

  const handleTriggerTrapLapel = () => {
    onChange({
      ...config,
      lapelDirection: config.lapelDirection === 'left' ? 'right' : 'left'
    });
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-5 backdrop-blur-md shadow-xl space-y-6">
      {/* Panel Top Title */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-white tracking-wide">
            Studio Phối Đồ & Giám Sát Văn Hóa
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRandomize}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            title="Ngẫu nhiên phối đồ"
          >
            <Shuffle className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Random Remix</span>
          </button>

          <button
            onClick={onReset}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 text-xs transition-colors"
            title="Khôi phục mặc định"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 1. GENDER SELECTOR */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          01. Giới Tính / Phom Dáng
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'nam' as Gender, label: 'Nam Tính (Khang Kiện)' },
            { id: 'nu' as Gender, label: 'Nữ Tính (Đoan Trang)' },
            { id: 'unisex' as Gender, label: 'Unisex (Phi Giới Tính)' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => updateField('gender', item.id)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-center border ${
                config.gender === item.id
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold shadow-sm'
                  : 'bg-slate-800/60 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. EVENT CONTEXT SELECTOR */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            02. Bối Cảnh / Sự Kiện Tham Gia
          </label>
          <span className="text-[11px] text-cyan-400 font-mono">
            {config.eventContext === 'temple_worship' ? 'Tôn nghiêm (Max 20% Remix)' : 'Tự do sáng tạo (Max 70% Remix)'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { id: 'concert_festival' as EventContext, label: 'Concert / Festival Ngoài Trời', desc: 'Năng động, di chuyển nhiều, quẩy nhạc hội', tag: 'Remix 60-70%' },
            { id: 'temple_worship' as EventContext, label: 'Lễ Đền Chùa / Cúng Giỗ Gia Tiên', desc: 'Trang nghiêm, kín đáo, thanh tịnh', tag: 'Chuẩn 100%' },
            { id: 'traditional_wedding' as EventContext, label: 'Hôn Lễ Truyền Thống / Hỷ Sự', desc: 'Trọng thể, lộng lẫy, chuẩn điển lễ', tag: 'Lễ Trọng' },
            { id: 'street_cafe' as EventContext, label: 'Dạo Phố / Cà Phê Cuối Tuần', desc: 'Phóng khoáng, chụp ảnh kỷ niệm phong cách', tag: 'Remix 50%' },
            { id: 'school_workshop' as EventContext, label: 'Workshop Trường Học / Thuyết Trình', desc: 'Thanh lịch, tri thức, học thuật', tag: 'Academia' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => updateField('eventContext', item.id)}
              className={`p-2.5 rounded-xl text-left transition-all border flex flex-col justify-between ${
                config.eventContext === item.id
                  ? 'bg-cyan-950/40 border-cyan-500 text-cyan-100 shadow-md ring-1 ring-cyan-500/30'
                  : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-semibold text-xs text-white">{item.label}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-300">{item.tag}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* 3. BASE GARMENT LINE SELECTION */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          03. Dòng Phục Trang Gốc (Di Sản Cốt Lõi)
        </label>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(GARMENTS_CATALOG).map(([key, item]) => {
            const isSelected = config.baseGarment === key;
            return (
              <button
                key={key}
                onClick={() => updateField('baseGarment', key as BaseGarmentType)}
                className={`p-2.5 rounded-xl text-left transition-all border flex flex-col justify-between relative ${
                  isSelected
                    ? 'bg-amber-950/40 border-amber-500 text-amber-100 shadow-md ring-1 ring-amber-500/30'
                    : 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-amber-500 text-black flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
                <div className="space-y-0.5">
                  <span className="font-bold text-xs text-white block pr-4">{item.name}</span>
                  <span className="text-[10px] font-mono text-amber-400 block">{item.decreeYear}</span>
                </div>
                <span className="text-[11px] text-slate-400 mt-2 block line-clamp-1">{item.subName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. AESTHETIC VIBE */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
          04. Phong Cách Remix Cá Nhân
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'streetwear' as AestheticVibe, label: 'Streetwear Năng Động (Cargo + Sneaker)' },
            { id: 'minimalist' as AestheticVibe, label: 'Minimalist Tinh Gọn (Âu Phục + Loafer)' },
            { id: 'cyber_y2k' as AestheticVibe, label: 'Cyber-Retro / Y2K (Kính Mát + Chrome)' },
            { id: 'academia' as AestheticVibe, label: 'Academia Học Thuật (Blazer + Oxford)' },
            { id: 'royal_fusion' as AestheticVibe, label: 'Royal Fusion Cung Đình (Kiềng Bạc + Gấm)' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => updateField('aestheticVibe', item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                config.aestheticVibe === item.id
                  ? 'bg-white text-slate-900 border-white font-semibold'
                  : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ADVANCED CUSTOMIZATION DRAWER */}
      <div className="pt-2 border-t border-slate-800/80">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full py-2 px-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 flex items-center justify-between text-xs font-semibold text-slate-200 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tùy Biến Chuyên Sâu Từng Chi Tiết (Vạt Áo, Hạ Y, Phụ Kiện, Màu Sắc)</span>
          </div>
          {showAdvanced ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {showAdvanced && (
          <div className="mt-4 space-y-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 animate-in fade-in duration-300">
            {/* RULE CHECK: LAPEL DIRECTION TOGGLE */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Quy Cách Vạt Áo & Cài Cúc (Quy Chuẩn Tuyệt Đối)
                </span>
                <span className={`text-[11px] font-mono font-bold ${config.lapelDirection === 'right' ? 'text-emerald-400' : 'text-red-400 animate-pulse'}`}>
                  {config.lapelDirection === 'right' ? '✅ HỮU NHẬM (HỢP LỄ)' : '⛔ TẢ NHẬM (TỬ PHỤC)'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => updateField('lapelDirection', 'right')}
                  className={`p-2 rounded-lg text-xs font-medium border text-left flex items-start gap-2 ${
                    config.lapelDirection === 'right'
                      ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                      : 'bg-slate-800/40 border-slate-700 text-slate-400'
                  }`}
                >
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Vạt Trái Đè Vạt Phải (Chuẩn)</div>
                    <div className="text-[10px] text-slate-300">Cài cúc bên sườn phải theo nếp người sống.</div>
                  </div>
                </button>

                <button
                  onClick={() => updateField('lapelDirection', 'left')}
                  className={`p-2 rounded-lg text-xs font-medium border text-left flex items-start gap-2 ${
                    config.lapelDirection === 'left'
                      ? 'bg-red-950/70 border-red-500 text-red-200'
                      : 'bg-slate-800/40 border-slate-700 text-slate-400'
                  }`}
                >
                  <AlertOctagon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-red-300">[Bẫy] Cài Vạt Sang Trái</div>
                    <div className="text-[10px] text-red-300">Quy cách tử phục (Thử nghiệm cảnh báo).</div>
                  </div>
                </button>
              </div>
            </div>

            {/* LOWER GARMENTS */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Phối Nửa Dưới (Hạ Y)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'cargo_pants' as LowerGarmentType, label: 'Quần Cargo Túi Hộp Đen' },
                  { id: 'silk_wide_pants' as LowerGarmentType, label: 'Quần Lụa Trắng Suông Dài' },
                  { id: 'dress_trousers' as LowerGarmentType, label: 'Quần Âu Xếp Ly Dáng Rộng' },
                  { id: 'pleated_skirt' as LowerGarmentType, label: 'Chân Váy Xếp Ly Dài' },
                  { id: 'culottes' as LowerGarmentType, label: 'Quần Culottes Đũi Lửng' },
                  { id: 'short_mini' as LowerGarmentType, label: 'Quần Short Mini (Cảnh báo đền chùa)' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => updateField('lowerGarment', item.id)}
                    className={`p-2 rounded-lg text-xs text-left border ${
                      config.lowerGarment === item.id
                        ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200 font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* FOOTWEAR */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Giày Dép Đi Kèm
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'chunky_sneaker' as FootwearType, label: 'Chunky Sneaker Trắng/Đen' },
                  { id: 'leather_loafer' as FootwearType, label: 'Loafer Da Bóng Khóa Vàng' },
                  { id: 'high_boots' as FootwearType, label: 'Boots Da Cổ Cao High-Fashion' },
                  { id: 'wooden_clogs' as FootwearType, label: 'Guốc Mộc Truyền Thống' },
                  { id: 'mule_sandals' as FootwearType, label: 'Dép Sục Quai Da Tối Giản' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => updateField('footwear', item.id)}
                    className={`p-2 rounded-lg text-xs text-left border ${
                      config.footwear === item.id
                        ? 'bg-cyan-950/60 border-cyan-500 text-cyan-200 font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ACCESSORIES (MULTI-SELECT) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                Phụ Kiện Giao Thoa Đương Đại (Chọn Nhiều)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'slim_sunglasses' as AccessoryType, label: '🕶️ Kính Mát Slim Retro' },
                  { id: 'silver_kieng' as AccessoryType, label: '⭕ Kiềng Cổ Bạc Trơn' },
                  { id: 'folding_fan' as AccessoryType, label: '🪭 Quạt Xếp Gỗ Trầm' },
                  { id: 'tote_crossbody' as AccessoryType, label: '👜 Túi Tote / Crossbody' },
                  { id: 'non_quai_thao' as AccessoryType, label: '👒 Nón Quai Thao Mini' }
                ].map((item) => {
                  const isChecked = config.accessories.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleAccessory(item.id)}
                      className={`p-2 rounded-lg text-xs text-left border flex items-center justify-between ${
                        isChecked
                          ? 'bg-amber-950/50 border-amber-500 text-amber-200 font-semibold'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isChecked && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PATTERNS & FABRIC */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Họa Tiết Trang Trí
                </label>
                <select
                  value={config.pattern}
                  onChange={(e) => updateField('pattern', e.target.value as PatternType)}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="van_may_thuy_ba">Vân Mây & Sóng Thủy Ba (Nhã Nhặn)</option>
                  <option value="hoa_sen_tinh_khiet">Hoa Sen Dân Gian Thuần Khiết</option>
                  <option value="gam_chim_co_dien">Gấm Dệt Hoa Chìm Cổ Điển</option>
                  <option value="plain_solid">Trơn Tối Giản Không Họa Tiết</option>
                  <option value="rong_nam_mong_hoang_gia">⚠️ Rồng 5 Móng Hoàng Gia (Lưu ý)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                  Chất Liệu Dệt May
                </label>
                <select
                  value={config.fabric}
                  onChange={(e) => updateField('fabric', e.target.value as FabricType)}
                  className="w-full p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="gam_to_tam">Gấm Tơ Tằm Thượng Hạng</option>
                  <option value="lua_ha_dong">Lụa Vạn Phúc - Hà Đông</option>
                  <option value="dui_linen">Đũi Tự Nhiên Pha Linen Thoáng Mát</option>
                  <option value="denim_silk">Denim Kết Hợp Sợi Tơ Hiện Đại</option>
                  <option value="sheer_voile">⛔ Voan Xuyên Thấu (Dễ phạm quy đền chùa)</option>
                </select>
              </div>
            </div>

            {/* COLOR PICKERS */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Sắc Phục Chính (Áo)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.primaryColor}
                    onChange={(e) => updateField('primaryColor', e.target.value)}
                    className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <span className="text-xs font-mono text-slate-300 uppercase">{config.primaryColor}</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Sắc Điểm Nhấn (Nẹp / Viền)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={config.accentColor}
                    onChange={(e) => updateField('accentColor', e.target.value)}
                    className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                  />
                  <span className="text-xs font-mono text-slate-300 uppercase">{config.accentColor}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Trap Testing Quick Button */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={handleTriggerTrapLapel}
          className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 ${
            config.lapelDirection === 'left'
              ? 'bg-red-900/60 border-red-500 text-red-200'
              : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-amber-300'
          }`}
        >
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>
            {config.lapelDirection === 'left' ? 'Đảo lại Vạt Phải (Khắc Phục)' : 'Thử Kích Hoạt Bẫy Vạt Trái (Giáo Dục Di Sản)'}
          </span>
        </button>

        <div className="text-[11px] text-slate-500">
          Tự động cập nhật thời gian thực
        </div>
      </div>
    </div>
  );
};
