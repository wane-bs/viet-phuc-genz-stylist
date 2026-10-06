import React, { useState } from 'react';
import { DetKyUcGame } from './game/DetKyUcGame';
import { WardrobeStudio } from './components/WardrobeStudio';
import { HeritageHandbookModal } from './components/HeritageHandbookModal';
import { Sparkles, BookOpen, Play, ArrowRight, RotateCcw } from 'lucide-react';

type AppScene = 'OPENING' | 'GAME' | 'AWAKENING' | 'WARDROBE';

export default function App() {
  const [scene, setScene] = useState<AppScene>('OPENING');
  const [isHandbookOpen, setIsHandbookOpen] = useState(false);

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      
      {/* SCENE 1: OPENING PROLOGUE (One-Screen Viewport) */}
      {scene === 'OPENING' && (
        <div className="relative w-full h-full flex flex-col items-center justify-between p-6 sm:p-10 bg-gradient-to-b from-[#0c1322] via-[#090d16] to-[#040711] overflow-hidden select-none">
          {/* Subtle mist effect & imperial halo */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Header */}
          <div className="w-full max-w-4xl flex items-center justify-between z-10 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center font-bold text-black text-xs font-mono shadow-lg shadow-amber-500/20">
                DK
              </div>
              <span className="font-['Cinzel',serif] tracking-widest font-black text-amber-300 text-sm sm:text-base">
                DỆT KÝ ỨC
              </span>
            </div>

            <button
              onClick={() => setIsHandbookOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Sổ Tay Di Sản</span>
            </button>
          </div>

          {/* Center Story Callout */}
          <div className="max-w-xl text-center space-y-4 z-10 my-auto animate-in fade-in zoom-in-95 duration-500">
            <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-cyan-500/30 mx-auto flex items-center justify-center text-cyan-300 shadow-xl shadow-cyan-500/10">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono tracking-widest text-cyan-400 font-bold uppercase">
                HỒI I · TIỀN ĐIỆN CUNG ĐÌNH NGUYỄN
              </span>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Khuy Ngọc Ngũ Thường
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-lg mx-auto">
              Tháng năm phai mờ, ký ức tiền nhân chìm trong sương lam giá lạnh của chốn hoàng thành. Tinh linh An thức dậy với tấm áo tơ xám đơn sơ, bắt đầu hành trình tìm lại 5 hạt khuy đức hạnh và nếp áo ngũ thân rạng ngời.
            </p>

            {/* Exactly One Primary CTA Button */}
            <div className="pt-2">
              <button
                onClick={() => setScene('GAME')}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black text-sm tracking-wide shadow-xl shadow-amber-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center gap-2.5 mx-auto"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Bắt Đầu Dệt Ký Ức</span>
              </button>
            </div>
          </div>

          {/* Bottom Footnote Guide */}
          <div className="w-full max-w-xl text-center z-10 text-[11px] text-slate-500">
            Khám phá quy chuẩn Áo Ngũ Thân định chế năm 1744 & Triết lý Nhân - Lễ - Nghĩa - Trí - Tín
          </div>
        </div>
      )}

      {/* SCENE 2: 2D GAME VIEWPORT (Main Narrative Puzzle Platformer) */}
      {scene === 'GAME' && (
        <div className="w-full h-full flex flex-col overflow-hidden">
          <DetKyUcGame
            onCompleteGame={() => setScene('AWAKENING')}
            onOpenHandbook={() => setIsHandbookOpen(true)}
          />
        </div>
      )}

      {/* SCENE 3: AWAKENING CELEBRATION CUTSCENE */}
      {scene === 'AWAKENING' && (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-6 sm:p-10 bg-gradient-to-b from-[#2a1304] via-[#1a0a01] to-[#0c0500] overflow-hidden select-none animate-in fade-in duration-500">
          <div className="absolute inset-0 bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="max-w-md w-full text-center space-y-5 z-10 p-8 rounded-3xl bg-slate-950/80 border border-amber-500/40 shadow-2xl backdrop-blur-md">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-400/40 mx-auto flex items-center justify-center text-amber-300 shadow-xl shadow-amber-500/20 animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono tracking-widest text-amber-400 font-bold uppercase">
                THỨC TỈNH DI SẢN
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Áo Ngũ Thân Đã Sống Lại
              </h2>
            </div>

            <p className="text-xs text-amber-200/90 leading-relaxed">
              Sương lam đã tan, năm hạt khuy ngọc <b>Nhân – Lễ – Nghĩa – Trí – Tín</b> cài sang vạt phải sáng ngời trên nền gấm vàng cung đình. Hãy bước vào Tủ Đồ Hoàng Cung để mở khóa và phối đồ đương đại!
            </p>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => setScene('WARDROBE')}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black text-xs shadow-lg shadow-amber-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Mở Tủ Đồ Hoàng Cung</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsHandbookOpen(true)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium border border-slate-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Xem Trang Sổ Tay Di Sản Vừa Mở</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCENE 4: STREAMLINED WARDROBE REMIX STUDIO */}
      {scene === 'WARDROBE' && (
        <div className="w-full h-full flex flex-col overflow-hidden">
          <WardrobeStudio
            onReplayGame={() => setScene('GAME')}
            onOpenHandbook={() => setIsHandbookOpen(true)}
          />
        </div>
      )}

      {/* SỔ TAY DI SẢN (Flipbook Modal - Accessible from any scene) */}
      <HeritageHandbookModal
        isOpen={isHandbookOpen}
        onClose={() => setIsHandbookOpen(false)}
      />

    </div>
  );
}
