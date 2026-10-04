/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  StylingConfig, 
  PresetLookbook 
} from './types';
import { generateOutfitRemixResult } from './services/culturalGuardrailEngine';
import { TopNav } from './components/TopNav';
import { DetKyUcGame } from './game/DetKyUcGame';
import { StylistControlPanel } from './components/StylistControlPanel';
import { GarmentVisualizer } from './components/GarmentVisualizer';
import { CulturalScoreGauge } from './components/CulturalScoreGauge';
import { ShowcaseCard } from './components/ShowcaseCard';
import { PresetLookbookGallery } from './components/PresetLookbookGallery';
import { AgentSkillsStudio } from './components/AgentSkillsStudio';
import { KnowledgeBaseExplorer } from './components/KnowledgeBaseExplorer';
import { CulturalHeritageGuideModal } from './components/CulturalHeritageGuideModal';
import { HeritageQuizModal } from './components/HeritageQuizModal';
import { HeritageReferenceVault } from './components/HeritageReferenceVault';
import { HeritageModelReference } from './data/heritageImageModels';
import { Footer } from './components/Footer';
import { 
  Gamepad2, 
  Sparkles, 
  BookOpen, 
  Layers, 
  ShieldCheck, 
  Trophy, 
  Compass, 
  Flame, 
  ArrowRight, 
  Scroll,
  Cpu
} from 'lucide-react';

const DEFAULT_CONFIG: StylingConfig = {
  gender: 'unisex',
  eventContext: 'concert_festival',
  aestheticVibe: 'streetwear',
  baseGarment: 'ngu_than_tay_chen',
  lapelDirection: 'right', // Hợp lễ chuẩn mực
  lowerGarment: 'cargo_pants',
  footwear: 'chunky_sneaker',
  accessories: ['slim_sunglasses', 'silver_kieng'],
  pattern: 'van_may_thuy_ba',
  fabric: 'gam_to_tam',
  primaryColor: '#1E293B',
  accentColor: '#06B6D4'
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'game' | 'studio' | 'vault' | 'agent' | 'knowledge'>('game');
  const [config, setConfig] = useState<StylingConfig>(DEFAULT_CONFIG);
  const [isHeritageGuideOpen, setIsHeritageGuideOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // Generate real-time live evaluation and remix details
  const outfitResult = useMemo(() => {
    return generateOutfitRemixResult(config);
  }, [config]);

  const handleSelectPreset = (preset: PresetLookbook) => {
    setConfig(preset.config);
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectVaultReference = (ref: HeritageModelReference) => {
    setConfig(prev => ({
      ...prev,
      baseGarment: ref.category === 'ngu_than_tay_chen' ? 'ngu_than_tay_chen' 
        : ref.category === 'ao_tac' ? 'ao_tac' 
        : ref.category === 'ao_nhat_binh' ? 'ao_nhat_binh' : 'ngu_than_tay_chen',
      primaryColor: ref.colorPalette.primary,
      accentColor: ref.colorPalette.accent,
      lapelDirection: 'right'
    }));
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setConfig(DEFAULT_CONFIG);
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col selection:bg-amber-500 selection:text-black font-sans">
      {/* Top Bar (3-Zone Contract) */}
      <TopNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenHeritageGuide={() => setIsHeritageGuideOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-6 space-y-8">
        {/* Navigation Mode Segmented Bar */}
        <div className="flex items-center justify-between p-1.5 bg-slate-900/90 border border-slate-800 rounded-2xl backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('game')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'game'
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>1. Trò Chơi 2D: Dệt Ký Ức</span>
            </button>

            <button
              onClick={() => setActiveTab('studio')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'studio'
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>2. Stylist Studio &amp; AI Try-On</span>
            </button>

            <button
              onClick={() => setActiveTab('vault')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'vault'
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>3. Kho Reference Img2Img</span>
            </button>

            <button
              onClick={() => setActiveTab('agent')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'agent'
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>4. AI Agent &amp; Kiến Trúc RAG</span>
            </button>

            <button
              onClick={() => setActiveTab('knowledge')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'knowledge'
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>5. Knowledge Base Di Sản</span>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 font-mono pr-2">
            <span>SDK: @google/genai</span>
          </div>
        </div>

        {/* 1. TAB: PLAYABLE GAME (DỆT KÝ ỨC) */}
        {activeTab === 'game' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Game Canvas & Controls */}
            <DetKyUcGame />

            {/* Quick transition banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-[#131b2e] to-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-base font-bold text-white">
                  Đã mở khóa Áo Ngũ Thân trong game? Hãy sáng tạo phong cách cho riêng bạn!
                </h3>
                <p className="text-xs text-slate-400">
                  Thử nghiệm phối Áo Ngũ Thân, Áo Tấc, Nhật Bình cùng Sneaker, Cargo pants và kiểm định Ranh Giới Văn Hóa.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('studio')}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 shrink-0"
              >
                <span>Mở Studio Stylist Ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 2. TAB: STYLIST STUDIO */}
        {activeTab === 'studio' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Main Studio Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left 6 Columns: Stylist Control Panel */}
              <div className="lg:col-span-6 space-y-6">
                <StylistControlPanel
                  config={config}
                  onChange={setConfig}
                  onApplyPreset={handleSelectPreset}
                  onReset={handleReset}
                />
              </div>

              {/* Right 6 Columns: Interactive SVG Mannequin & Cultural Score Gauge */}
              <div className="lg:col-span-6 space-y-6 sticky top-20">
                <GarmentVisualizer
                  config={config}
                  evaluation={outfitResult.evaluation}
                  outfitTitle={outfitResult.outfitTitle}
                />

                <CulturalScoreGauge
                  evaluation={outfitResult.evaluation}
                />
              </div>
            </div>

            {/* Showcase Card: 3-Layer Breakdown & Historical Insight */}
            <ShowcaseCard
              outfit={outfitResult}
              onOpenHeritageGuide={() => setIsHeritageGuideOpen(true)}
            />

            {/* Preset Lookbook Gallery */}
            <PresetLookbookGallery
              onSelectPreset={handleSelectPreset}
              currentConfig={config}
            />
          </div>
        )}

        {/* 3. TAB: HERITAGE REFERENCE VAULT FOR IMG2IMG */}
        {activeTab === 'vault' && (
          <div className="animate-in fade-in duration-300">
            <HeritageReferenceVault
              onSelectReferenceForTryOn={handleSelectVaultReference}
            />
          </div>
        )}

        {/* 4. TAB: AGENT SKILLS STUDIO & LIVE GEMINI AI */}
        {activeTab === 'agent' && (
          <div className="animate-in fade-in duration-300">
            <AgentSkillsStudio currentConfig={config} />
          </div>
        )}

        {/* 4. TAB: KNOWLEDGE BASE EXPLORER */}
        {activeTab === 'knowledge' && (
          <div className="animate-in fade-in duration-300">
            <KnowledgeBaseExplorer />
          </div>
        )}
      </main>

      {/* FOOTER */}
      <Footer />

      {/* EDUCATIONAL MODALS */}
      <CulturalHeritageGuideModal
        isOpen={isHeritageGuideOpen}
        onClose={() => setIsHeritageGuideOpen(false)}
      />

      <HeritageQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />
    </div>
  );
}
