import React from 'react';
import { Sparkles, BookOpen, Trophy, Compass, ShieldCheck } from 'lucide-react';

interface TopNavProps {
  activeTab: 'game' | 'studio' | 'vault' | 'agent' | 'knowledge';
  onSelectTab: (tab: 'game' | 'studio' | 'vault' | 'agent' | 'knowledge') => void;
  onOpenHeritageGuide: () => void;
  onOpenQuiz: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenHeritageGuide,
  onOpenQuiz
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0f17]/95 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button 
          type="button"
          onClick={() => onSelectTab('studio')}
          className="flex items-center gap-2 text-base sm:text-lg font-black tracking-tight text-white group cursor-pointer text-left bg-transparent border-0 p-0"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center text-black font-mono font-bold shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            DK
          </div>
          <span className="font-['Cinzel',serif] tracking-wider text-amber-300">
            DỆT KÝ ỨC
          </span>
          <span className="hidden sm:inline text-xs font-mono text-cyan-400 font-normal px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/50">
            Điện Kính Thiên & Việt Phục Remix
          </span>
        </button>

        {/* Zone 2: 4 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-2 text-xs font-semibold">
          <button 
            onClick={() => onSelectTab('game')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'game' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'text-slate-300 hover:text-white'
            }`}
          >
            🎮 Chơi Game
          </button>
          <button 
            onClick={() => onSelectTab('studio')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'studio' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-300 hover:text-white'
            }`}
          >
            👘 Stylist Studio
          </button>
          <button 
            onClick={() => onSelectTab('vault')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'vault' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'text-slate-300 hover:text-white'
            }`}
          >
            🖼️ Kho Reference Img2Img
          </button>
          <button 
            onClick={() => onSelectTab('agent')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'agent' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'text-slate-300 hover:text-white'
            }`}
          >
            🤖 AI Agent & SDKs
          </button>
          <button 
            onClick={() => onSelectTab('knowledge')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'knowledge' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'text-slate-300 hover:text-white'
            }`}
          >
            📚 Knowledge Base
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenQuiz}
            className="px-3 py-1.5 text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Trắc Nghiệm</span>
          </button>
          <button
            onClick={() => onSelectTab(activeTab === 'game' ? 'studio' : 'game')}
            className="px-3.5 py-1.5 text-xs font-semibold text-black bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-md transition-all whitespace-nowrap"
          >
            {activeTab === 'game' ? 'Mở Stylist Studio ➔' : 'Vào Chơi Game ➔'}
          </button>
        </div>
      </div>
    </header>
  );
};
