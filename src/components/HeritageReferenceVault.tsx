/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Layers, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  Upload, 
  Eye, 
  ShieldCheck, 
  Info, 
  BookOpen, 
  Cpu, 
  Wand2, 
  Scissors, 
  Tag, 
  Image as ImageIcon,
  ZoomIn,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { HERITAGE_MODEL_REFERENCES, HeritageModelReference } from '../data/heritageImageModels';

// Technical blueprints and design schemas provided by user
export interface HeritageBlueprint {
  id: string;
  title: string;
  category: 'blueprint_technical' | 'anatomy_structure';
  source: string;
  description: string;
  svgDrawing: string;
  keySpecs: { label: string; value: string }[];
  guardrailRule: string;
}

export const HERITAGE_BLUEPRINTS: HeritageBlueprint[] = [
  {
    id: 'bp_ngu_than_tay_chen',
    title: 'Bản Vẽ Thiết Kế Rập: Áo Ngũ Thân Tay Chẽn',
    category: 'blueprint_technical',
    source: 'Tài liệu chuẩn hóa Rập Cổ phục Việt Nam',
    description: 'Sơ đồ kỹ thuật cấu tạo phom dáng áo ngũ thân tay chẽn: 6 đường ráp vải (đường trung phùng), cổ tròn thẳng đứng ôm khít, form chữ A xòe dần xuống tà.',
    guardrailRule: 'Tay áo liền với vai, hẹp dần và vừa khít cổ tay. Áo không bó nách. Tà áo cong nhẹ mềm mại. Bắt buộc 5 cúc cài bên sườn phải.',
    keySpecs: [
      { label: 'Cổ áo', value: 'Cổ tròn, thẳng đứng (Cổ lập lĩnh)' },
      { label: 'Tay áo', value: 'Liền với vai, hẹp dần vừa khít cổ tay, không bó nách' },
      { label: 'Phom dáng', value: 'Form chữ "A", càng xuống thì tà áo càng xòe ra' },
      { label: 'Quy cách nút', value: '5 nút cài sang phải (Hữu Nhậm)' },
      { label: '6 đường ráp vải', value: '2 ống tay (1-2), 2 dọc sườn (3-4), 2 giữa áo (5,6)' }
    ],
    svgDrawing: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="700" height="700" viewBox="0 0 700 700">
      <rect width="700" height="700" fill="%23d6d3d1" rx="16"/>
      <!-- Header note -->
      <text x="350" y="45" font-family="sans-serif" font-size="20" font-weight="bold" fill="%231c1917" text-anchor="middle">CỔ TRÒN, THẲNG ĐỨNG</text>
      <!-- Main Garment Blueprint Top View -->
      <g stroke="%237f1d1d" stroke-width="2.5" fill="%23e17575">
        <!-- Body & Sleeves -->
        <path d="M70 120 L240 120 L270 100 Q350 90 430 100 L460 120 L630 120 L630 150 L510 170 L480 340 L530 460 L170 460 L220 340 L190 170 L70 150 Z"/>
      </g>
      <!-- Collar -->
      <circle cx="350" cy="98" r="24" fill="%23fef3c7" stroke="%237f1d1d" stroke-width="2"/>
      <!-- Mid Center Line (Đường sống áo) -->
      <line x1="350" y1="120" x2="350" y2="460" stroke="%231e3a8a" stroke-width="2" stroke-dasharray="4 3"/>
      <!-- Lapel Curve & 5 Buttons -->
      <path d="M340 100 Q280 150 250 200 L250 300" fill="none" stroke="%231e3a8a" stroke-width="2.5"/>
      <circle cx="300" cy="130" r="4" fill="%231c1917"/>
      <circle cx="270" cy="165" r="4" fill="%231c1917"/>
      <circle cx="255" cy="205" r="4" fill="%231c1917"/>
      <circle cx="250" cy="250" r="4" fill="%231c1917"/>
      <circle cx="250" cy="300" r="4" fill="%231c1917"/>
      <!-- Annotations -->
      <text x="120" y="200" font-family="sans-serif" font-size="16" font-weight="bold" fill="%231c1917">5 NÚT</text>
      <line x1="165" y1="195" x2="250" y2="195" stroke="%2344403c" stroke-width="1.5"/>
      <text x="400" y="150" font-family="sans-serif" font-size="14" font-weight="bold" fill="%231c1917">TAY ÁO LIỀN VỚI VAI, HẸP DẦN</text>
      <text x="400" y="170" font-family="sans-serif" font-size="14" font-weight="bold" fill="%231c1917">VÀ VỪA KHÍT VÀO CỔ TAY</text>
      <text x="400" y="230" font-family="sans-serif" font-size="14" font-weight="bold" fill="%231c1917">ÁO KHÔNG BÓ NÁCH</text>
      <text x="400" y="280" font-family="sans-serif" font-size="14" font-weight="bold" fill="%231c1917">ÁO CÓ FORM CHỮ "A"</text>
      <text x="400" y="300" font-family="sans-serif" font-size="14" font-weight="bold" fill="%231c1917">CÀNG XUỐNG THÌ TÀ CÀNG XÒE RA</text>
      <text x="410" y="410" font-family="sans-serif" font-size="14" font-weight="bold" fill="%231c1917">TÀ ÁO CONG</text>
      <!-- Bottom Section: 6 Đường ráp vải -->
      <text x="350" y="520" font-family="sans-serif" font-size="15" font-weight="bold" fill="%231c1917" text-anchor="middle">ÁO CÓ 6 ĐƯỜNG RÁP VẢI (ĐƯỜNG TRUNG PHÙNG)</text>
      <text x="350" y="545" font-family="sans-serif" font-size="13" fill="%2344403c" text-anchor="middle">2 đường ống tay (1-2) · 2 đường dọc sườn (3-4) · 2 đường giữa áo (5,6)</text>
      <!-- Small Mini T illustration -->
      <path d="M300 580 L400 580 L380 670 L320 670 Z" fill="%23f87171" stroke="%237f1d1d" stroke-width="2"/>
      <line x1="350" y1="580" x2="350" y2="670" stroke="%231e3a8a" stroke-width="2"/>
      <text x="350" y="690" font-family="sans-serif" font-size="14" font-weight="bold" fill="%231e3a8a" text-anchor="middle">5, 6</text>
    </svg>`
  },
  {
    id: 'bp_cau_tao_ao_ngu_than',
    title: 'Sơ Đồ Giải Phẫu: Cấu Tạo Áo Ngũ Thân',
    category: 'anatomy_structure',
    source: 'Nghiên cứu Cổ phục Việt Nam & Di sản Thừa Thiên Huế',
    description: 'Sơ đồ trực quan 4 yếu tố cốt lõi tạo nên linh hồn Áo Ngũ Thân: 5 thân áo tượng trưng Tứ Phụ Mẫu và bản thân, 5 cúc áo tượng trưng Ngũ Thường, Cổ đứng nghiêm cẩn và Màu sắc nhã nhặn.',
    guardrailRule: 'Thân áo con bên trong (vạt lót) che chở tâm can và giữ nếp kín đáo. Màu sắc cổ truyền luôn lấy vẻ đoan trang, tinh tế làm trọng.',
    keySpecs: [
      { label: '5 thân áo', value: '2 thân trước, 2 thân sau và 1 thân con (vạt con) bên trong' },
      { label: '5 cúc áo', value: 'Tượng trưng Ngũ Thường: Nhân, Lễ, Nghĩa, Trí, Tín' },
      { label: 'Cổ đứng', value: 'Cổ Lập Lĩnh đứng thẳng, tượng trưng sự chính trực' },
      { label: 'Màu sắc', value: 'Màu sắc nhã nhặn, phối lót trong kín đáo, thanh tao' }
    ],
    svgDrawing: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="700" height="700" viewBox="0 0 700 700">
      <rect width="700" height="700" fill="%23f5f5f4" rx="16"/>
      <text x="350" y="60" font-family="serif" font-size="32" font-weight="bold" fill="%23292524" text-anchor="middle" font-style="italic">Cấu tạo áo ngũ thân</text>
      <!-- Center Main Robe Illustration -->
      <g stroke="%2378350f" stroke-width="3" fill="%23a88365">
        <path d="M80 180 L250 190 L280 170 Q350 150 420 170 L450 190 L620 180 L620 230 L520 260 L490 560 Q350 630 210 560 L180 260 L80 230 Z"/>
      </g>
      <!-- Flap Layers (Tà phụ bên trong) -->
      <path d="M210 560 L280 340 L350 590 Z" fill="%23854d0e" opacity="0.8"/>
      <path d="M350 590 L320 340 L450 575 Z" fill="%239a3412" opacity="0.6"/>
      <!-- Callouts 4 circles -->
      <!-- 1. Cổ đứng Top Right -->
      <circle cx="560" cy="340" r="55" fill="%239a3412" stroke="%2378350f" stroke-width="2.5"/>
      <circle cx="560" cy="340" r="45" fill="none" stroke="%23ffffff" stroke-width="2"/>
      <text x="560" y="270" font-family="sans-serif" font-size="16" font-weight="bold" fill="%23292524" text-anchor="middle">cổ đứng</text>
      <line x1="420" y1="180" x2="520" y2="300" stroke="%2378350f" stroke-width="2"/>
      <!-- 2. 5 cúc áo Top Left -->
      <circle cx="140" cy="340" r="55" fill="%239a3412" stroke="%2378350f" stroke-width="2.5"/>
      <text x="140" y="270" font-family="sans-serif" font-size="16" font-weight="bold" fill="%23292524" text-anchor="middle">5 cúc áo</text>
      <line x1="260" y1="300" x2="190" y2="320" stroke="%2378350f" stroke-width="2"/>
      <!-- 3. 5 thân áo Bottom Left -->
      <circle cx="120" cy="540" r="55" fill="%239a3412" stroke="%2378350f" stroke-width="2.5"/>
      <text x="120" y="470" font-family="sans-serif" font-size="16" font-weight="bold" fill="%23292524" text-anchor="middle">5 thân áo</text>
      <line x1="240" y1="520" x2="175" y2="530" stroke="%2378350f" stroke-width="2"/>
      <!-- 4. Màu sắc nhã nhặn Bottom Right -->
      <circle cx="580" cy="540" r="55" fill="%23a88365" stroke="%2378350f" stroke-width="2.5"/>
      <text x="580" y="470" font-family="sans-serif" font-size="16" font-weight="bold" fill="%23292524" text-anchor="middle">màu sắc nhã nhặn</text>
      <line x1="480" y1="520" x2="530" y2="530" stroke="%2378350f" stroke-width="2"/>
    </svg>`
  }
];

interface HeritageReferenceVaultProps {
  onSelectReferenceForTryOn: (ref: HeritageModelReference) => void;
}

export const HeritageReferenceVault: React.FC<HeritageReferenceVaultProps> = ({
  onSelectReferenceForTryOn
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'real_models' | 'blueprints' | 'user_custom'>('all');
  const [previewItem, setPreviewItem] = useState<{ title: string; image: string; description: string; notes?: string } | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);
  const [customUploads, setCustomUploads] = useState<{ id: string; name: string; url: string; note: string }[]>(() => {
    try {
      const saved = localStorage.getItem('viet_phuc_custom_references');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Handle uploading custom reference
  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newRef = {
            id: `custom_${Date.now()}`,
            name: file.name.replace(/\.[^/.]+$/, ''),
            url: event.target.result as string,
            note: 'Ảnh cổ phục tham chiếu do người dùng tải lên'
          };
          const updated = [newRef, ...customUploads];
          setCustomUploads(updated);
          try {
            localStorage.setItem('viet_phuc_custom_references', JSON.stringify(updated));
          } catch (e) {
            console.warn('LocalStorage limit:', e);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteCustom = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customUploads.filter(item => item.id !== id);
    setCustomUploads(updated);
    try {
      localStorage.setItem('viet_phuc_custom_references', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  const handleCopyPrompt = (id: string, promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPromptId(id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950 via-[#131b2e] to-slate-900 border border-purple-800/40 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400 text-purple-300 text-xs font-mono font-bold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              IMG2IMG REFERENCE VAULT
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 text-xs font-mono">
              Kho Dữ Liệu Di Sản Chuẩn Xác
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Kho Lưu Trữ Hình Ảnh Tham Chiếu (Img2Img Reference Vault)
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Nơi lưu trữ và số hóa chuẩn mực toàn bộ <strong>Bản vẽ Rập Kỹ Thuật</strong> (6 đường trung phùng, form chữ A), <strong>Sơ đồ Giải Phẫu Cấu Tạo</strong> (5 thân, cổ đứng, 5 khuy) và <strong>Ảnh Mẫu Thực Tế</strong> (Áo Ngũ Thân Đỏ Đô / Tím Hoa Cà, Áo Tấc Lễ Phục Lam Ngọc &amp; Lục Bảo). Sẵn sàng nạp trực tiếp vào động cơ AI Virtual Fitting Studio.
          </p>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-purple-500 text-black shadow-lg shadow-purple-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Tất Cả ({HERITAGE_MODEL_REFERENCES.length + HERITAGE_BLUEPRINTS.length + customUploads.length})
            </button>
            <button
              onClick={() => setActiveCategory('real_models')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'real_models'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Ảnh Mẫu Thực Tế ({HERITAGE_MODEL_REFERENCES.length})
            </button>
            <button
              onClick={() => setActiveCategory('blueprints')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'blueprints'
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Bản Vẽ &amp; Cấu Tạo Rập ({HERITAGE_BLUEPRINTS.length})
            </button>
            <button
              onClick={() => setActiveCategory('user_custom')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === 'user_custom'
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Mẫu Tự Tải Lên ({customUploads.length})
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="ml-auto px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-purple-600/30"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Tải Thêm Ảnh Cổ Phục Tham Chiếu</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleCustomUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* 1. PHOTOREALISTIC REAL-LIFE HERITAGE REFERENCES */}
      {(activeCategory === 'all' || activeCategory === 'real_models') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">
                Ảnh Mẫu Cổ Phục Thực Tế (Photorealistic Real-Life Heritage References)
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              Dùng làm ảnh điều kiện (Conditioning Image) cho Img2Img
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {HERITAGE_MODEL_REFERENCES.map((model) => (
              <div
                key={model.id}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-purple-500/60 transition-all hover:shadow-xl hover:shadow-purple-950/20 group"
              >
                {/* Image Showcase Card */}
                <div 
                  className="relative aspect-[3/4] bg-slate-950 overflow-hidden cursor-pointer"
                  onClick={() => setPreviewItem({
                    title: model.name,
                    image: model.fullBodyPhotorealisticUrl,
                    description: model.historicalContext,
                    notes: model.guardrailNotes
                  })}
                >
                  <img
                    src={model.fullBodyPhotorealisticUrl}
                    alt={model.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70" />
                  
                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-purple-500/60 text-purple-300 text-[10px] font-bold font-mono">
                      {model.gender === 'nam' ? 'Model Nam' : model.gender === 'nu' ? 'Model Nữ' : 'Couple Nam Nữ'}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-slate-700 text-slate-300 text-[10px] font-mono">
                      {model.period}
                    </span>
                  </div>

                  {/* Zoom hint */}
                  <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4" />
                  </div>

                  {/* Bottom title in image */}
                  <div className="absolute bottom-3 left-3 right-3 space-y-1">
                    <h4 className="text-sm font-bold text-white leading-tight">
                      {model.name}
                    </h4>
                    <p className="text-[11px] text-amber-400 line-clamp-1">
                      {model.colorPalette.description}
                    </p>
                  </div>
                </div>

                {/* Features & Guardrails */}
                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {model.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <ul className="space-y-1 text-xs text-slate-300">
                      {model.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 line-clamp-1">
                          <span className="text-purple-400 font-bold">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    <button
                      onClick={() => onSelectReferenceForTryOn(model)}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-600/30 transition-all"
                    >
                      <Wand2 className="w-4 h-4" />
                      <span>Dùng Mẫu Này Vào AI Try-On</span>
                    </button>

                    <button
                      onClick={() => handleCopyPrompt(model.id, model.img2imgPromptModifier)}
                      className="w-full py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-mono flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      {copiedPromptId === model.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Đã chép Prompt Img2Img</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Sao chép Prompt Img2Img</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. TECHNICAL BLUEPRINTS & ANATOMIES */}
      {(activeCategory === 'all' || activeCategory === 'blueprints') && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Scissors className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">
                Bản Vẽ Thiết Kế Rập &amp; Cấu Tạo Di Sản (Technical Blueprints)
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              Quy chuẩn 6 đường trung phùng, vạt Hữu Nhậm và Cổ Lập Lĩnh
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {HERITAGE_BLUEPRINTS.map((bp) => (
              <div
                key={bp.id}
                className="rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4 hover:border-amber-500/60 transition-all"
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  {/* Drawing Image Preview */}
                  <div
                    className="w-full sm:w-60 aspect-square rounded-xl overflow-hidden bg-stone-200 shrink-0 cursor-pointer border border-stone-400 relative group"
                    onClick={() => setPreviewItem({
                      title: bp.title,
                      image: bp.svgDrawing,
                      description: bp.description,
                      notes: bp.guardrailRule
                    })}
                  >
                    <img
                      src={bp.svgDrawing}
                      alt={bp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute top-2 right-2 p-1 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Blueprint Specifications */}
                  <div className="space-y-2.5 flex-1">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 border border-amber-800 text-amber-300">
                        {bp.source}
                      </span>
                      <h4 className="text-base font-bold text-white">
                        {bp.title}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {bp.description}
                      </p>
                    </div>

                    <div className="space-y-1 pt-1">
                      {bp.keySpecs.map((spec, i) => (
                        <div key={i} className="text-xs flex items-start gap-1.5">
                          <span className="text-amber-400 font-bold shrink-0">{spec.label}:</span>
                          <span className="text-slate-300">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-900/60 text-xs text-amber-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Quy tắc Ranh Giới Văn Hóa (Cultural Guardrail):</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {bp.guardrailRule}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. USER CUSTOM REFERENCE UPLOADS */}
      {(activeCategory === 'all' || activeCategory === 'user_custom') && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">
                Bộ Sưu Tập Cổ Phục Cá Nhân (User Custom Reference Stash)
              </h3>
            </div>
            <span className="text-xs text-slate-400">
              Lưu trữ ảnh cổ phục bạn tải lên phục vụ Img2Img
            </span>
          </div>

          {customUploads.length === 0 ? (
            <div className="p-8 rounded-2xl bg-slate-900/50 border border-dashed border-slate-800 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-500">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-300">Chưa có ảnh cổ phục tự tải</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Bạn có thể tải lên các bức ảnh cổ phục mẫu, vải lụa hoa văn hoặc bản vẽ yêu thích để đưa vào động cơ Img2Img.
                </p>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Tải Lên Ảnh Mẫu Đầu Tiên
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {customUploads.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden relative group"
                >
                  <div className="aspect-[3/4] bg-slate-950 overflow-hidden">
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-3 space-y-1">
                    <h5 className="text-xs font-bold text-white truncate">{item.name}</h5>
                    <p className="text-[10px] text-slate-400 line-clamp-1">{item.note}</p>
                  </div>
                  <button
                    onClick={(e) => handleDeleteCustom(item.id, e)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-red-950/80 border border-red-800 text-red-300 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-800"
                    title="Xóa ảnh này"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* FULL PREVIEW MODAL */}
      {previewItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewItem(null)}
        >
          <div 
            className="max-w-2xl w-full bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">{previewItem.title}</h3>
              <button
                onClick={() => setPreviewItem(null)}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer"
              >
                Đóng ✕
              </button>
            </div>

            <div className="max-h-[60vh] overflow-hidden rounded-2xl bg-black flex items-center justify-center">
              <img
                src={previewItem.image}
                alt={previewItem.title}
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p>{previewItem.description}</p>
              {previewItem.notes && (
                <p className="text-amber-300 bg-amber-950/50 p-2.5 rounded-xl border border-amber-900/60">
                  <strong>Quy chuẩn di sản:</strong> {previewItem.notes}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
