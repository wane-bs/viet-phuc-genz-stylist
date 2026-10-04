/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Camera, 
  Upload, 
  Download, 
  Sparkles, 
  Check, 
  AlertTriangle,
  RefreshCw,
  Eye,
  User,
  Copy,
  Code2,
  SwitchCamera,
  Cpu,
  Layers,
  Sparkle,
  Image as ImageIcon,
  Info,
  ShieldCheck,
  Wand2,
  History,
  Database,
  SlidersHorizontal,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { StylingConfig, CulturalEvaluation } from '../types';
import { USER_PRESET_PROFILES, HeritageModelReference } from '../data/heritageImageModels';

interface AnywearVirtualFittingProps {
  config: StylingConfig;
  evaluation: CulturalEvaluation;
  outfitTitle: string;
}

export const AnywearVirtualFitting: React.FC<AnywearVirtualFittingProps> = ({
  config,
  evaluation,
  outfitTitle
}) => {
  // References from DB
  const [dbReferences, setDbReferences] = useState<HeritageModelReference[]>([]);
  const [selectedReference, setSelectedReference] = useState<HeritageModelReference | null>(null);
  const [customReferenceImage, setCustomReferenceImage] = useState<string | null>(null);

  // User Portrait & Generated Images
  const [userImage, setUserImage] = useState<string | null>(USER_PRESET_PROFILES[0].avatarUrl);
  const [generatedResultImage, setGeneratedResultImage] = useState<string | null>(null);
  const [isGeneratingTryOn, setIsGeneratingTryOn] = useState(false);
  
  // Database History
  const [tryonHistory, setTryonHistory] = useState<any[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Camera states
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  // Img2Img Hyperparameters
  const [denoisingStrength, setDenoisingStrength] = useState<number>(0.65);
  const [preserveFace, setPreserveFace] = useState<boolean>(true);
  const [aiModelPreference, setAiModelPreference] = useState<string>('openai/gpt-4o');
  
  // Try-on & JSON prompt states
  const [promptJson, setPromptJson] = useState<Record<string, unknown> | null>(null);
  const [aiDescription, setAiDescription] = useState<string>('');
  const [aiSource, setAiSource] = useState<string>('OpenRouter GPT-4o & AI Generative Engine');
  const [apiDiagnostic, setApiDiagnostic] = useState<any>(null);
  const [showJsonInspector, setShowJsonInspector] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [viewTab, setViewTab] = useState<'side_by_side' | 'split' | 'result_only' | 'reference'>('side_by_side');
  const [splitSliderPos, setSplitSliderPos] = useState<number>(50);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const customRefInputRef = useRef<HTMLInputElement>(null);

  // 1. Fetch References and History from Database on Mount
  const loadDatabaseState = useCallback(async () => {
    try {
      const refRes = await fetch('/api/db/references');
      if (refRes.ok) {
        const refData = await refRes.json();
        if (refData.data && refData.data.length > 0) {
          setDbReferences(refData.data);
          if (!selectedReference) {
            setSelectedReference(refData.data[0]);
          }
        }
      }

      const histRes = await fetch('/api/db/history');
      if (histRes.ok) {
        const histData = await histRes.json();
        if (histData.data) {
          setTryonHistory(histData.data);
        }
      }
    } catch (e) {
      console.warn('DB load warning:', e);
    }
  }, [selectedReference]);

  useEffect(() => {
    loadDatabaseState();
  }, [loadDatabaseState]);

  // Build the structured JSON prompt representing current Studio configuration
  const generatePromptJson = useCallback(() => {
    const isLapelCorrect = config.lapelDirection === 'right';
    const activeRef = selectedReference || dbReferences[0];

    return {
      application: 'Việt Phục Remix: Gen Z Heritage Stylist',
      model_task: 'IMAGE_TO_IMAGE_ANYWEAR_VIRTUAL_TRYON',
      ai_engine: `${aiModelPreference} + Multimodal Generative Studio`,
      outfit_title: outfitTitle,
      heritage_reference: {
        id: activeRef?.id || 'ref_ngu_than_do_do',
        name: activeRef?.name || 'Áo Ngũ Thân Tay Chẽn (Đỏ Đô)',
        period: activeRef?.period || '1744 Chúa Nguyễn Phúc Khoát',
        category: activeRef?.category || 'ngu_than_tay_chen',
        color_palette: activeRef?.colorPalette?.description || 'Đỏ đô hoàng triều'
      },
      img2img_parameters: {
        denoising_strength: denoisingStrength,
        preserve_facial_identity: preserveFace,
        lapel_standard: isLapelCorrect ? 'Hữu Nhậm (vạt trái đè vạt phải)' : 'Tả Nhậm (vi phạm ranh giới văn hóa)',
        collar_type: 'Cổ Lập Lĩnh ôm sát cổ'
      },
      user_gender: config.gender,
      event_context: config.eventContext,
      aesthetic_vibe: config.aestheticVibe,
      cultural_validity_score: evaluation.score,
      guardrail_status: evaluation.level,
      base_garment: {
        id: config.baseGarment,
        name: activeRef?.name || 'Áo Ngũ Thân Tay Chẽn',
        lapel_rule: isLapelCorrect 
          ? 'Hữu Nhậm (Vạt trái đè vạt phải, 5 cúc cài sang sườn phải) - CHUẨN MỰC 100%' 
          : 'Tả Nhậm (Vạt phải đè vạt trái) - CẢNH BÁO ĐỎ LỖI TỬ PHỤC',
        collar_type: 'Cổ lập lĩnh vuông vức đứng ôm sát cổ',
        buttons: '5 hạt khuy ngọc / đồng tượng trưng Ngũ Thường (Nhân, Lễ, Nghĩa, Trí, Tín)',
        fabric: config.fabric || 'Gấm lụa tơ tằm thượng hạng',
        pattern: config.pattern || 'Hoa cúc dây hoàng gia',
        primary_color_hex: activeRef?.colorPalette?.primary || config.primaryColor || '#7f1d1d',
        accent_color_hex: activeRef?.colorPalette?.accent || config.accentColor || '#d97706'
      },
      lower_garment: 'Quần lụa trắng suông truyền thống',
      ai_generation_prompt: `High-fidelity Image-to-Image photorealistic try-on: Subject wearing authentic Vietnamese ${activeRef?.name}. Features: ${activeRef?.img2imgPromptModifier}. Ensure exact right lapel wrapping (Hữu Nhậm), standing collar, natural silk folds, photorealistic lighting preserving original facial identity.`
    };
  }, [config, evaluation, outfitTitle, selectedReference, dbReferences, denoisingStrength, preserveFace, aiModelPreference]);

  // Stop camera helper
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setCameraError(null);
  }, []);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Start webcam
  const startCamera = async () => {
    setCameraError(null);
    try {
      stopCamera();
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Trình duyệt không hỗ trợ trực tiếp Webcam.');
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 800 }, facingMode: facingMode },
        audio: false
      });
      streamRef.current = stream;
      setIsCameraActive(true);
    } catch (err: unknown) {
      console.warn('Camera access error:', err);
      setCameraError('Không thể mở camera tự động. Vui lòng tải ảnh chân dung từ thiết bị!');
      setIsCameraActive(false);
    }
  };

  // Toggle camera
  const handleToggleFacingMode = () => {
    const nextMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextMode);
    if (isCameraActive) {
      setTimeout(() => startCamera(), 100);
    }
  };

  // Capture frame from webcam
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 800;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      if (facingMode === 'user') {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      setUserImage(dataUrl);
      stopCamera();
      executeImg2ImgTryOn(dataUrl);
    }
  };

  // Upload user portrait photo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const dataUrl = event.target.result as string;
          setUserImage(dataUrl);
          stopCamera();
          executeImg2ImgTryOn(dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Custom reference garment upload
  const handleCustomRefUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const dataUrl = event.target.result as string;
          setCustomReferenceImage(dataUrl);
          if (userImage) {
            executeImg2ImgTryOn(userImage, dataUrl);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // MASTER IMG2IMG GENERATIVE EXECUTION
  const executeImg2ImgTryOn = async (targetUserSrc: string, referenceSrc?: string) => {
    setIsGeneratingTryOn(true);
    setApiDiagnostic(null);

    const jsonPayload = generatePromptJson();
    setPromptJson(jsonPayload);

    const activeRef = selectedReference || dbReferences[0];
    const refImageToUse = referenceSrc || customReferenceImage || activeRef?.fullBodyPhotorealisticUrl || '';

    try {
      const response = await fetch('/api/try-on/img2img', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userImage: targetUserSrc,
          referenceGarmentImage: refImageToUse,
          garmentReferenceId: activeRef?.id || 'ref_ngu_than_do_do',
          denoisingStrength: denoisingStrength,
          preserveFace: preserveFace,
          promptJson: jsonPayload,
          modelPreference: aiModelPreference
        })
      });

      const data = await response.json();
      if (data.aiDescription) {
        setAiDescription(data.aiDescription);
      }
      if (data.aiSource) {
        setAiSource(data.aiSource);
      }
      if (data.apiDiagnostic) {
        setApiDiagnostic(data.apiDiagnostic);
      }
      if (data.generatedImageUrl) {
        setGeneratedResultImage(data.generatedImageUrl);
      }

      // Refresh DB history
      loadDatabaseState();
    } catch (err) {
      console.warn('TryOn Execution error:', err);
    } finally {
      setIsGeneratingTryOn(false);
    }
  };

  // Auto trigger initial fit if user image exists and no result yet
  useEffect(() => {
    if (userImage && !generatedResultImage && dbReferences.length > 0) {
      executeImg2ImgTryOn(userImage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedReference, dbReferences]);

  // Copy prompt JSON
  const handleCopyJson = () => {
    if (!promptJson) return;
    navigator.clipboard.writeText(JSON.stringify(promptJson, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  // Download final result
  const handleDownload = () => {
    const targetImg = generatedResultImage || userImage;
    if (!targetImg) return;
    const link = document.createElement('a');
    link.download = `viet-phuc-tryon-${Date.now()}.jpg`;
    link.href = targetImg;
    link.click();
  };

  const activeRef = selectedReference || dbReferences[0];

  return (
    <div className="w-full rounded-3xl bg-gradient-to-b from-[#111827] via-[#0d121f] to-[#080c14] border border-slate-800 p-5 sm:p-7 shadow-2xl space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-cyan-300 font-bold uppercase tracking-wider">
            ANYWEAR VIRTUAL FITTING STUDIO (AI TRY-ON · IMG2IMG)
          </span>
          <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-700 text-purple-300 text-[10px] font-mono flex items-center gap-1">
            <Database className="w-3 h-3 text-purple-400" />
            Database &amp; OpenRouter Connected
          </span>
        </div>

        {/* Input Source Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowHistoryModal(true)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 text-xs font-semibold flex items-center gap-1.5 border border-purple-800/60 cursor-pointer"
          >
            <History className="w-3.5 h-3.5 text-purple-400" />
            <span>Lịch Sử Thử Đồ ({tryonHistory.length})</span>
          </button>

          <button
            onClick={isCameraActive ? stopCamera : startCamera}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              isCameraActive
                ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/30'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isCameraActive ? 'Tắt Webcam' : '1. Bật Webcam Chụp'}</span>
          </button>

          {isCameraActive && (
            <button
              onClick={handleToggleFacingMode}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 cursor-pointer"
              title="Đổi Camera"
            >
              <SwitchCamera className="w-4 h-4 text-amber-400" />
            </button>
          )}

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            <span>2. Tải Ảnh Chân Dung</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* API Diagnostic Alert Notice (if OpenRouter credits notice) */}
      {apiDiagnostic && (
        <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-800/80 text-purple-200 text-xs flex items-start gap-2.5 animate-in fade-in">
          <Info className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-purple-300">Thông báo từ động cơ OpenRouter AI:</span>
            <p className="text-slate-300 leading-relaxed">{apiDiagnostic.message}</p>
          </div>
        </div>
      )}

      {/* 1. HERITAGE REFERENCE GARMENT BAR */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Chọn Mẫu Cổ Phục Tham Chiếu (Reference Garments)
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Dữ liệu đồng bộ từ Database
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {dbReferences.map((refItem) => {
            const isSelected = activeRef?.id === refItem.id;
            return (
              <div
                key={refItem.id}
                onClick={() => {
                  setSelectedReference(refItem);
                  if (userImage) {
                    executeImg2ImgTryOn(userImage);
                  }
                }}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 relative overflow-hidden ${
                  isSelected
                    ? 'bg-purple-950/50 border-purple-500 ring-2 ring-purple-500/40 shadow-lg'
                    : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600 hover:bg-slate-800'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-purple-500 text-[10px] font-bold text-black flex items-center gap-0.5">
                    <Check className="w-3 h-3" /> Đang thử
                  </div>
                )}
                <div className="w-12 h-16 rounded-lg overflow-hidden border border-slate-700 shrink-0 bg-slate-950">
                  <img
                    src={refItem.fullBodyPhotorealisticUrl || refItem.previewUrl}
                    alt={refItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{refItem.name}</h4>
                  <p className="text-[11px] text-amber-400 font-mono truncate">{refItem.period}</p>
                  <p className="text-[10px] text-slate-400 truncate">{refItem.colorPalette.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. MAIN VIEWPORT: SIDE-BY-SIDE (BEFORE VS AFTER) */}
      <div className="space-y-4">
        {/* View Mode Tabs */}
        <div className="flex items-center justify-between p-1 bg-slate-900 border border-slate-800 rounded-2xl text-xs">
          <button
            onClick={() => setViewTab('side_by_side')}
            className={`flex-1 py-2 px-3 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              viewTab === 'side_by_side'
                ? 'bg-cyan-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Song Song (Trước &amp; Sau)</span>
          </button>

          <button
            onClick={() => setViewTab('split')}
            className={`flex-1 py-2 px-3 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              viewTab === 'split'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Thanh Trượt (Split Slider)</span>
          </button>

          <button
            onClick={() => setViewTab('result_only')}
            className={`flex-1 py-2 px-3 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              viewTab === 'result_only'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Toàn Bộ Kết Quả AI</span>
          </button>
        </div>

        {/* Viewport Render Area */}
        {viewTab === 'side_by_side' ? (
          /* TRUE SIDE-BY-SIDE BEFORE & AFTER VIEWPORT */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            {/* FRAME 1 (LEFT): ẢNH GỐC CHÂN DUNG (BEFORE) */}
            <div className="rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-between shadow-xl relative aspect-[3/4] group">
              <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 shadow-lg">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>ẢNH CHÂN DUNG GỐC (BEFORE)</span>
              </div>

              {isCameraActive ? (
                <div className="w-full h-full relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                  />
                  <button
                    onClick={capturePhoto}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs shadow-xl flex items-center gap-2 cursor-pointer animate-pulse"
                  >
                    <Camera className="w-4 h-4" />
                    Chụp Ngay
                  </button>
                </div>
              ) : userImage ? (
                <img
                  src={userImage}
                  alt="Original Portrait Before"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-2 text-slate-500">
                  <User className="w-12 h-12" />
                  <p className="text-xs">Chưa có ảnh chân dung gốc</p>
                </div>
              )}

              {/* Sample Profile Switcher */}
              <div className="absolute bottom-3 left-3 right-3 p-2 rounded-2xl bg-black/80 backdrop-blur-md border border-slate-800 flex items-center justify-between gap-2 text-xs">
                <span className="text-[10px] text-slate-400">Mẫu nhanh:</span>
                <div className="flex gap-1.5">
                  {USER_PRESET_PROFILES.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setUserImage(p.avatarUrl);
                        executeImg2ImgTryOn(p.avatarUrl);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-semibold border border-slate-700 cursor-pointer"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* FRAME 2 (RIGHT): ẢNH AI PHỤC DỰNG HOÀN CHỈNH (AFTER) */}
            <div className="rounded-3xl bg-slate-950 border border-purple-800/80 overflow-hidden flex flex-col justify-between shadow-2xl relative aspect-[3/4] group">
              <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-purple-950/90 backdrop-blur-md border border-purple-500 text-purple-200 text-xs font-bold flex items-center gap-1.5 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>ẢNH AI PHỤC DỰNG TOÀN THÂN (AFTER)</span>
              </div>

              <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-black/80 border border-slate-700 text-[10px] font-mono text-amber-400">
                {activeRef?.name}
              </div>

              {isGeneratingTryOn ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4 bg-black/90">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-400 animate-spin" />
                    <Sparkles className="w-6 h-6 text-purple-400 absolute inset-0 m-auto animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">Đang phục dựng trang phục toàn thân...</h4>
                    <p className="text-xs text-slate-400 font-mono">
                      Khớp chuẩn nếp vạt Hữu Nhậm, Cổ Lập Lĩnh &amp; Lụa tơ tằm
                    </p>
                  </div>
                </div>
              ) : generatedResultImage ? (
                <img
                  src={generatedResultImage}
                  alt="AI Fitted Result After"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-6 text-center text-slate-500">
                  <p className="text-xs">Đang chờ thực thi thử đồ AI...</p>
                </div>
              )}
            </div>
          </div>
        ) : viewTab === 'split' && userImage && generatedResultImage ? (
          /* BEFORE & AFTER SPLIT SLIDER */
          <div className="relative aspect-[3/4] max-w-lg mx-auto rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl select-none">
            <img
              src={generatedResultImage}
              alt="After"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-amber-400 shadow-2xl"
              style={{ width: `${splitSliderPos}%` }}
            >
              <img
                src={userImage}
                alt="Before"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ width: '100%', maxWidth: 'none' }}
              />
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-black/80 border border-slate-700 text-[10px] font-bold text-amber-400">
                TRƯỚC (BEFORE)
              </div>
            </div>
            <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/80 border border-purple-500 text-[10px] font-bold text-purple-300">
              SAU (AFTER)
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={splitSliderPos}
              onChange={(e) => setSplitSliderPos(Number(e.target.value))}
              className="absolute inset-x-0 bottom-6 mx-auto w-3/4 opacity-80 hover:opacity-100 transition-opacity cursor-ew-resize accent-amber-400 z-10"
            />
          </div>
        ) : (
          /* SINGLE HIGH-RES RESULT VIEW */
          <div className="relative aspect-[3/4] max-w-lg mx-auto rounded-3xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl">
            {generatedResultImage && (
              <img
                src={generatedResultImage}
                alt="High Res Result"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => userImage && executeImg2ImgTryOn(userImage)}
              disabled={isGeneratingTryOn || !userImage}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-600/30"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingTryOn ? 'animate-spin' : ''}`} />
              <span>Thực Thi Thử Lại (Generative AI)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={!generatedResultImage && !userImage}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tải Ảnh Kết Quả HD</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. AI CONSULTATION & CULTURAL EVALUATION CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start pt-2">
        {/* AI Stylist Description (8 cols) */}
        <div className="lg:col-span-8 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkle className="w-4 h-4 text-purple-400" />
              <h4 className="text-xs font-bold text-purple-200 uppercase tracking-wider">
                Thẩm Định Chuyên Gia Di Sản &amp; Tư Vấn Phối Đồ
              </h4>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
              {aiSource}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 text-xs text-slate-300 leading-relaxed space-y-2">
            <p>{aiDescription || 'Đang thẩm định nếp vạt và chuẩn mực di sản...'}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs pt-1">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Quy chuẩn vạt áo</span>
              <span className={`font-bold text-[11px] ${config.lapelDirection === 'right' ? 'text-emerald-400' : 'text-red-400'}`}>
                {config.lapelDirection === 'right' ? '✓ Hữu Nhậm (Chuẩn)' : '✗ Tả Nhậm (Lỗi tử phục)'}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Điểm chuẩn mực</span>
              <span className="font-bold text-[11px] text-amber-400">
                {evaluation.score}/100 ({evaluation.level})
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-slate-400 block">Denoising Strength</span>
              <span className="font-bold text-[11px] text-purple-300">
                {denoisingStrength} (Tự nhiên)
              </span>
            </div>
          </div>
        </div>

        {/* Hyperparameters (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Wand2 className="w-4 h-4 text-purple-400" />
            Siêu Tham Số Img2Img
          </span>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Độ thích ứng (Denoising):</span>
              <span className="font-mono text-purple-400 font-bold">{denoisingStrength}</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="0.95"
              step="0.05"
              value={denoisingStrength}
              onChange={(e) => setDenoisingStrength(Number(e.target.value))}
              className="w-full accent-purple-400 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-xs text-slate-300">Bảo tồn khuôn mặt:</span>
            <button
              onClick={() => setPreserveFace(!preserveFace)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                preserveFace ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {preserveFace ? 'BẬT' : 'TẮT'}
            </button>
          </div>

          <button
            onClick={() => setShowJsonInspector(!showJsonInspector)}
            className="w-full py-2 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-400 text-xs font-mono flex items-center justify-between cursor-pointer transition-colors mt-2"
          >
            <span className="flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" />
              <span>Prompt JSON</span>
            </span>
            <span>{showJsonInspector ? '▲' : '▼'}</span>
          </button>
        </div>
      </div>

      {/* PROMPT JSON INSPECTOR MODAL/EXPAND */}
      {showJsonInspector && (
        <div className="p-4 rounded-2xl bg-black border border-slate-800 space-y-2 font-mono text-[11px] animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-cyan-400 font-bold">structured_img2img_prompt.json</span>
            <button
              onClick={handleCopyJson}
              className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] flex items-center gap-1 cursor-pointer"
            >
              {copiedJson ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedJson ? 'Đã sao chép' : 'Sao chép'}</span>
            </button>
          </div>
          <pre className="text-slate-300 overflow-x-auto max-h-48 p-2 bg-slate-950 rounded leading-relaxed">
            {JSON.stringify(promptJson || generatePromptJson(), null, 2)}
          </pre>
        </div>
      )}

      {/* TRY-ON HISTORY MODAL */}
      {showHistoryModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowHistoryModal(false)}
        >
          <div 
            className="max-w-2xl w-full bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-purple-400" />
                <h3 className="text-base font-bold text-white">
                  Lịch Sử Thử Đồ Lưu Trong Database ({tryonHistory.length})
                </h3>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer"
              >
                Đóng ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {tryonHistory.length === 0 ? (
                <div className="p-8 text-center text-slate-500 space-y-2">
                  <p className="text-xs">Chưa có bản ghi thử đồ nào trong cơ sở dữ liệu.</p>
                </div>
              ) : (
                tryonHistory.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (item.generatedResultImage) setGeneratedResultImage(item.generatedResultImage);
                      if (item.userOriginalImage) setUserImage(item.userOriginalImage);
                      if (item.aiDescription) setAiDescription(item.aiDescription);
                      setShowHistoryModal(false);
                    }}
                    className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-500/60 transition-all cursor-pointer flex items-center gap-4 group"
                  >
                    <div className="w-12 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-800">
                      <img
                        src={item.generatedResultImage || item.userOriginalImage}
                        alt="TryOn Item"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-white truncate">{item.referenceGarmentName}</h4>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {new Date(item.createdAt).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-1 italic">
                        "{item.aiDescription}"
                      </p>
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className="text-amber-400 font-bold">Điểm: {item.culturalScore}/100</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-purple-300 font-mono">{item.aiSource}</span>
                      </div>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-purple-400 transition-colors" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
