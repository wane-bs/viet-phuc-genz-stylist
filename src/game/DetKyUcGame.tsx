import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ShieldAlert, 
  Award, 
  Info,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Hand
} from 'lucide-react';

interface GameState {
  player: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    width: number;
    height: number;
    isGrounded: boolean;
    facing: 'left' | 'right';
    isTransformed: boolean;
    hasFan: boolean;
    hasClearedWeb: boolean;
  };
  collectedButtons: {
    nhan: boolean;
    le: boolean;
    nghia: boolean;
    tri: boolean;
    tin: boolean;
  };
  lapelInstalledSide: 'none' | 'left' | 'right';
  stage: 'cold_intro' | 'puzzle_tower' | 'gate_puzzle' | 'warm_awakening' | 'completed';
  colorSweepRadius: number;
  cameraX: number;
}

// Initial default state factory
function createInitialState(): GameState {
  return {
    player: {
      x: 80,
      y: 310,
      vx: 0,
      vy: 0,
      width: 32,
      height: 42,
      isGrounded: true,
      facing: 'right',
      isTransformed: false,
      hasFan: false,
      hasClearedWeb: false,
    },
    collectedButtons: {
      nhan: false,
      le: false,
      nghia: false,
      tri: false,
      tin: false,
    },
    lapelInstalledSide: 'none',
    stage: 'cold_intro',
    colorSweepRadius: 0,
    cameraX: 0,
  };
}

// Web Audio Synthesizer
class HeritageSoundSynth {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public playJump() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(520, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  public playCollect() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      gain.gain.setValueAtTime(0.15, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.2);
    });
  }

  public playSpookyGlitch() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [110, 116.54, 155.56].forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.linearRampToValueAtTime(freq * 0.8, now + 0.6);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.6);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now);
      osc.stop(now + 0.6);
    });
  }

  public playAwakeningFanfare() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);
      gain.gain.setValueAtTime(0.25, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.8);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.8);
    });
  }
}

export const DetKyUcGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const synthRef = useRef<HeritageSoundSynth>(new HeritageSoundSynth());
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Mutable Game State held in ref for steady 60FPS physics loop
  const stateRef = useRef<GameState>(createInitialState());

  // Reactive UI states updated on game events
  const [uiState, setUiState] = useState({
    buttonCount: 0,
    hasFan: false,
    isTransformed: false,
    gameMessage: 'Nhấn [A]/[D] hoặc ◄ ► để di chuyển, [SPACE] hoặc ▲ để nhảy. Đi tìm cổ vật!',
    isSpookyScare: false,
    spookyMessage: '',
  });

  const [isGateModalOpen, setIsGateModalOpen] = useState(false);

  // Active Key inputs in Ref
  const keysRef = useRef<{ [key: string]: boolean }>({});

  // Keyboard events listener
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const code = e.code;
      keysRef.current[code] = true;
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(code)) {
        e.preventDefault();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
    };

    window.addEventListener('keydown', onKeyDown, { passive: false });
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  // On-screen Virtual Controller Handlers
  const pressVirtualKey = useCallback((code: string) => {
    keysRef.current[code] = true;
  }, []);

  const releaseVirtualKey = useCallback((code: string) => {
    keysRef.current[code] = false;
  }, []);

  // Reset Game
  const handleResetGame = () => {
    stateRef.current = createInitialState();
    setUiState({
      buttonCount: 0,
      hasFan: false,
      isTransformed: false,
      gameMessage: 'Nhấn [A]/[D] hoặc ◄ ► để di chuyển, [SPACE] để nhảy. Đi tìm cổ vật!',
      isSpookyScare: false,
      spookyMessage: '',
    });
    setIsGateModalOpen(false);
  };

  // Main 60FPS Loop using requestAnimationFrame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Platform map layout
    const platforms = [
      { x: 0, y: 350, w: 420, h: 70 }, // Ground 1
      { x: 220, y: 280, w: 90, h: 18 }, // Step 1
      { x: 330, y: 220, w: 80, h: 18 }, // Step 2
      { x: 440, y: 350, w: 480, h: 70 }, // Ground 2
      { x: 500, y: 260, w: 70, h: 18 }, // Tower 1
      { x: 590, y: 200, w: 70, h: 18 }, // Tower 2
      { x: 680, y: 140, w: 70, h: 18 }, // Tower 3
      { x: 770, y: 210, w: 80, h: 18 }, // Tower 4
      { x: 940, y: 350, w: 600, h: 70 } // Ground 3
    ];

    const fanItem = { x: 170, y: 315, w: 28, h: 28 };
    const webObstacle = { x: 410, y: 240, w: 34, h: 110 };
    const gatePos = { x: 880, y: 180, w: 55, h: 170 };
    const loomPos = { x: 1220, y: 260, w: 80, h: 90 };

    const buttonPickups = [
      { id: 'nhan', name: 'Khuy Nhân', x: 520, y: 225 },
      { id: 'le', name: 'Khuy Lễ', x: 610, y: 165 },
      { id: 'nghia', name: 'Khuy Nghĩa', x: 700, y: 105 },
      { id: 'tri', name: 'Khuy Trí', x: 790, y: 175 },
      { id: 'tin', name: 'Khuy Tín', x: 630, y: 315 }
    ];

    const renderLoop = () => {
      const state = stateRef.current;
      const p = state.player;

      // 1. HORIZONTAL PHYSICS
      const moveSpeed = 4.2;
      p.vx = 0;

      const isLeft = keysRef.current['KeyA'] || keysRef.current['ArrowLeft'] || keysRef.current['V_LEFT'];
      const isRight = keysRef.current['KeyD'] || keysRef.current['ArrowRight'] || keysRef.current['V_RIGHT'];
      const isJump = keysRef.current['Space'] || keysRef.current['KeyW'] || keysRef.current['ArrowUp'] || keysRef.current['V_JUMP'];

      if (isLeft) {
        p.vx = -moveSpeed;
        p.facing = 'left';
      }
      if (isRight) {
        p.vx = moveSpeed;
        p.facing = 'right';
      }

      // 2. JUMP & VERTICAL PHYSICS
      if (isJump && p.isGrounded) {
        p.vy = -11.8;
        p.isGrounded = false;
        synthRef.current.playJump();
      }

      // Gravity
      p.vy += 0.62;
      if (p.vy > 14) p.vy = 14;

      // Update positions
      p.x += p.vx;
      p.y += p.vy;

      // Keep inside left world boundary
      if (p.x < 10) p.x = 10;

      // 3. COLLISION DETECTION
      p.isGrounded = false;
      for (const plat of platforms) {
        if (
          p.x + p.width > plat.x &&
          p.x < plat.x + plat.w &&
          p.y + p.height >= plat.y &&
          p.y + p.height <= plat.y + 16 &&
          p.vy >= 0
        ) {
          p.y = plat.y - p.height;
          p.vy = 0;
          p.isGrounded = true;
        }
      }

      // 4. FAN PICKUP
      if (!p.hasFan && Math.abs(p.x - fanItem.x) < 35 && Math.abs(p.y - fanItem.y) < 35) {
        p.hasFan = true;
        synthRef.current.playCollect();
        setUiState((prev) => ({
          ...prev,
          hasFan: true,
          gameMessage: '🪭 Đã nhặt Quạt Giấy Gỗ Trầm! Tiến về phía trước để dọn dẹp mạng nhện.'
        }));
      }

      // 5. WEB OBSTACLE CLEARING
      if (!p.hasClearedWeb && p.x + p.width > webObstacle.x && p.x < webObstacle.x + webObstacle.w) {
        if (p.hasFan) {
          p.hasClearedWeb = true;
          synthRef.current.playCollect();
          setUiState((prev) => ({
            ...prev,
            gameMessage: '✨ Đã dùng Quạt Giấy Trầm phẩy tan mạng nhện! Lối vào Tháp Chuông đã mở.'
          }));
        } else {
          p.x = webObstacle.x - p.width;
          setUiState((prev) => ({
            ...prev,
            gameMessage: '🕸️ Mạng nhện phong ấn đường đi! Hãy quay lại nhặt Quạt Giấy Gỗ Trầm.'
          }));
        }
      }

      // 6. JADE BUTTONS PICKUP
      for (const btn of buttonPickups) {
        const btnKey = btn.id as keyof typeof state.collectedButtons;
        if (!state.collectedButtons[btnKey]) {
          if (Math.abs(p.x - btn.x) < 30 && Math.abs(p.y - btn.y) < 30) {
            state.collectedButtons[btnKey] = true;
            const count = Object.values(state.collectedButtons).filter(Boolean).length;
            synthRef.current.playCollect();
            setUiState((prev) => ({
              ...prev,
              buttonCount: count,
              gameMessage: `💎 Đã thu hồi ${btn.name}! (${count}/5 Hạt Khuy Ngũ Thường)`
            }));
          }
        }
      }

      // 7. GATE INTERACTION
      if (Math.abs(p.x - gatePos.x) < 45 && state.lapelInstalledSide !== 'right') {
        const collectedAll = Object.values(state.collectedButtons).filter(Boolean).length === 5;
        if (collectedAll) {
          setIsGateModalOpen(true);
        } else {
          if (p.x > gatePos.x) p.x = gatePos.x - p.width;
          setUiState((prev) => ({
            ...prev,
            gameMessage: `🔒 Cổng Điện Kính Thiên khóa kín: Hãy leo tháp gom đủ 5 Khuy Ngũ Thường (${Object.values(state.collectedButtons).filter(Boolean).length}/5).`
          }));
        }
      }

      // 8. LOOM INTERACTION (WARM AWAKENING)
      if (state.lapelInstalledSide === 'right' && Math.abs(p.x - loomPos.x) < 50 && !p.isTransformed) {
        p.isTransformed = true;
        state.stage = 'warm_awakening';
        synthRef.current.playAwakeningFanfare();
        setUiState((prev) => ({
          ...prev,
          isTransformed: true,
          gameMessage: '🌟 ĐÁNH THỨC DI SẢN: Áo Ngũ Thân Tay Chẽn Gấm Vàng đã dệt hoàn tất! Sương lam tan biến.'
        }));
      }

      // Color sweep radius expansion
      if (p.isTransformed && state.colorSweepRadius < 1800) {
        state.colorSweepRadius += 22;
      }

      // Camera follow
      state.cameraX = Math.max(0, Math.min(p.x - 320, 850));

      // -------------------------------------------------------------
      // CANVAS RENDERING
      // -------------------------------------------------------------
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.translate(-state.cameraX, 0);

      const isWarm = p.isTransformed;

      // 1. SKY / BACKGROUND
      const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (!isWarm) {
        bgGrad.addColorStop(0, '#020617');
        bgGrad.addColorStop(0.5, '#0f172a');
        bgGrad.addColorStop(1, '#1e293b');
      } else {
        bgGrad.addColorStop(0, '#451a03');
        bgGrad.addColorStop(0.4, '#78350f');
        bgGrad.addColorStop(0.8, '#b45309');
        bgGrad.addColorStop(1, '#d97706');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1600, canvas.height);

      // Distant palace silhouette
      ctx.fillStyle = isWarm ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.04)';
      ctx.beginPath();
      ctx.moveTo(100, 320);
      ctx.lineTo(260, 170);
      ctx.lineTo(420, 320);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(620, 330);
      ctx.lineTo(880, 130);
      ctx.lineTo(1140, 330);
      ctx.fill();

      // 2. PLATFORMS
      for (const plat of platforms) {
        ctx.fillStyle = isWarm ? '#78350F' : '#1E293B';
        ctx.strokeStyle = isWarm ? '#D97706' : '#334155';
        ctx.lineWidth = 2;
        ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
        ctx.strokeRect(plat.x, plat.y, plat.w, plat.h);

        // Top edge
        ctx.fillStyle = isWarm ? '#F59E0B' : '#059669';
        ctx.fillRect(plat.x, plat.y, plat.w, 4);
      }

      // 3. FAN ITEM
      if (!p.hasFan) {
        ctx.save();
        ctx.translate(fanItem.x + 14, fanItem.y + 14 + Math.sin(Date.now() * 0.005) * 4);
        ctx.fillStyle = '#D97706';
        ctx.beginPath();
        ctx.arc(0, 0, 14, Math.PI, 0);
        ctx.fill();
        ctx.strokeStyle = '#FCD34D';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 9px monospace';
        ctx.fillText('QUẠT', -12, -16);
        ctx.restore();
      }

      // 4. WEB OBSTACLE
      if (!p.hasClearedWeb) {
        ctx.strokeStyle = 'rgba(203, 213, 225, 0.8)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.moveTo(webObstacle.x, webObstacle.y + i * 18);
          ctx.lineTo(webObstacle.x + webObstacle.w, webObstacle.y + (i + 1) * 18);
          ctx.stroke();
        }
        ctx.fillStyle = '#CBD5E1';
        ctx.font = 'bold 9px monospace';
        ctx.fillText('MẠNG NHỆN', webObstacle.x - 14, webObstacle.y - 6);
      }

      // 5. JADE BUTTONS
      buttonPickups.forEach((btn) => {
        const btnKey = btn.id as keyof typeof state.collectedButtons;
        if (!state.collectedButtons[btnKey]) {
          ctx.save();
          ctx.translate(btn.x, btn.y + Math.sin(Date.now() * 0.006 + btn.x) * 4);
          ctx.shadowColor = '#10B981';
          ctx.shadowBlur = 10;
          ctx.fillStyle = '#10B981';
          ctx.beginPath();
          ctx.arc(0, 0, 7.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(-2, -2, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // 6. PALACE GATE
      ctx.fillStyle = state.lapelInstalledSide === 'right' ? '#B45309' : '#0F172A';
      ctx.strokeStyle = state.lapelInstalledSide === 'right' ? '#F59E0B' : '#475569';
      ctx.lineWidth = 4;
      ctx.fillRect(gatePos.x, gatePos.y, gatePos.w, gatePos.h);
      ctx.strokeRect(gatePos.x, gatePos.y, gatePos.w, gatePos.h);
      ctx.fillStyle = '#FFF';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText(state.lapelInstalledSide === 'right' ? 'CỔNG MỞ' : 'CƠ QUAN', gatePos.x + 3, gatePos.y + 24);

      // 7. LOOM
      ctx.save();
      ctx.translate(loomPos.x, loomPos.y);
      ctx.fillStyle = isWarm ? '#D97706' : '#475569';
      ctx.fillRect(0, 0, loomPos.w, loomPos.h);
      // Flowing silk
      ctx.fillStyle = isWarm ? '#FCD34D' : '#94A3B8';
      ctx.beginPath();
      ctx.moveTo(10, 20);
      ctx.quadraticCurveTo(40, 10 + Math.sin(Date.now() * 0.005) * 8, 70, 20);
      ctx.lineTo(70, 75);
      ctx.lineTo(10, 75);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.font = 'bold 9px monospace';
      ctx.fillText('KHUNG CỦI', 12, 45);
      ctx.restore();

      // 8. PLAYER: AN
      ctx.save();
      ctx.translate(p.x + p.width / 2, p.y + p.height / 2);
      if (p.facing === 'left') ctx.scale(-1, 1);

      if (!p.isTransformed) {
        // Gray thread sprite
        ctx.fillStyle = '#94A3B8';
        ctx.beginPath();
        ctx.arc(0, -10, 13, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0F172A';
        ctx.fillRect(3, -11, 3, 4);
        ctx.fillStyle = '#64748B';
        ctx.fillRect(-10, 3, 20, 18);
        ctx.strokeStyle = '#CBD5E1';
        ctx.strokeRect(-10, 3, 20, 18);
      } else {
        // Awakened Royal Ngũ Thân
        ctx.fillStyle = '#D97706';
        ctx.beginPath();
        ctx.arc(0, -11, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.fillRect(4, -12, 3.5, 4.5);
        ctx.fillStyle = '#FFF';
        ctx.fillRect(5.5, -13, 1.2, 1.2);
        // Golden Robe
        ctx.fillStyle = '#F59E0B';
        ctx.fillRect(-12, 3, 24, 20);
        ctx.strokeStyle = '#FCD34D';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(-12, 3, 24, 20);
        // Jade buttons on right lapel
        ctx.fillStyle = '#10B981';
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.arc(7, 5 + i * 4.2, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Holding fan
      if (p.hasFan) {
        ctx.fillStyle = '#F59E0B';
        ctx.beginPath();
        ctx.arc(12, 5, 7, Math.PI * 1.2, 0);
        ctx.fill();
      }

      ctx.restore();

      // 9. COLOR SWEEP SHADER
      if (state.colorSweepRadius > 0 && state.colorSweepRadius < 1800) {
        const sweepGrad = ctx.createRadialGradient(
          p.x + p.width / 2,
          p.y + p.height / 2,
          0,
          p.x + p.width / 2,
          p.y + p.height / 2,
          state.colorSweepRadius
        );
        sweepGrad.addColorStop(0, 'rgba(245, 158, 11, 0.4)');
        sweepGrad.addColorStop(0.7, 'rgba(217, 119, 6, 0.2)');
        sweepGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = sweepGrad;
        ctx.fillRect(0, 0, 1600, canvas.height);
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    animationFrameId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Gate Lapel Puzzle Action
  const handleSolveGate = (side: 'right' | 'left') => {
    if (side === 'left') {
      synthRef.current.playSpookyGlitch();
      setUiState((prev) => ({
        ...prev,
        isSpookyScare: true,
        spookyMessage: '⛔ DỊ BIẾN CÕI ÂM: "Vạt trái là đường về cõi âm, chớ để nhầm nếp áo tiền nhân..." Cài vạt trái kích hoạt oán khí tử phục!',
        gameMessage: '⚠️ CẢNH BÁO: Đã chạm bẫy Vạt Trái! Hãy đảo lại sang Vạt Phải (Hữu Nhậm) để mở cổng.'
      }));
    } else {
      synthRef.current.playCollect();
      stateRef.current.lapelInstalledSide = 'right';
      setUiState((prev) => ({
        ...prev,
        isSpookyScare: false,
        gameMessage: '🔔 KHÁNH ĐỒNG NGÂN VANG: Cổng Điện Kính Thiên đã mở! Hãy tiến vào chạm Khung Cửi Huyền Bí.'
      }));
      setIsGateModalOpen(false);
    }
  };

  return (
    <div className="w-full bg-[#090d16] border border-slate-800 rounded-3xl p-5 shadow-2xl space-y-4 text-slate-200 overflow-hidden">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              2D NARRATIVE PUZZLE-PLATFORMER (CANVAS 60FPS)
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-cyan-400 font-mono">VERTICAL SLICE DEMO</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
            Dệt Ký Ức: Khuy Ngọc Trên Điện Kính Thiên
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const newMute = !soundEnabled;
              setSoundEnabled(newMute);
              synthRef.current.setMuted(!newMute);
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Bật/Tắt Âm Thanh"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          <button
            onClick={handleResetGame}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Chơi Lại</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div className="relative w-full aspect-[16/9] max-h-[460px] bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
        <canvas
          ref={canvasRef}
          width={800}
          height={420}
          className="w-full h-full object-cover block cursor-pointer select-none"
          tabIndex={0}
        />

        {/* Spooky Horror Distortion Overlay */}
        {uiState.isSpookyScare && (
          <div className="absolute inset-0 bg-red-950/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-pulse z-30">
            <ShieldAlert className="w-16 h-16 text-red-500 mb-3" />
            <h3 className="text-xl font-black text-white font-mono uppercase tracking-wider mb-2">
              ⛔ CẢNH BÁO RANH GIỚI VĂN HÓA: LỖI TẢ NHẬM (VẠT TRÁI)
            </h3>
            <p className="text-sm text-red-200 max-w-lg mb-4 leading-relaxed">
              {uiState.spookyMessage}
            </p>
            <button
              onClick={() => {
                setUiState((prev) => ({ ...prev, isSpookyScare: false }));
                setIsGateModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg transition-colors cursor-pointer"
            >
              Đảo Lại Sang Vạt Phải (Hữu Nhậm) Ngay ➔
            </button>
          </div>
        )}

        {/* Top HUD */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none text-xs z-10">
          <div className="bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-1.5 flex items-center gap-3 backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Khuy Ngũ Thường:</span>
              <span className="font-mono font-bold text-emerald-400">{uiState.buttonCount} / 5</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">Vật phẩm:</span>
              <span className="font-semibold text-amber-300">
                {uiState.hasFan ? '🪭 Quạt Giấy Trầm' : 'Chưa có'}
              </span>
            </div>
          </div>

          <div className="bg-slate-900/90 border border-slate-700 rounded-xl px-3 py-1.5 font-mono text-[11px] backdrop-blur-md">
            {uiState.isTransformed ? (
              <span className="text-amber-300 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                CÕI ẤM (ÁO NGŨ THÂN 1744)
              </span>
            ) : (
              <span className="text-cyan-300">CÕI LẠNH (TƠ XÁM)</span>
            )}
          </div>
        </div>

        {/* Bottom Message Banner */}
        <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 backdrop-blur-md flex items-center gap-2 z-10">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="font-medium truncate">{uiState.gameMessage}</span>
        </div>
      </div>

      {/* Touch / Clickable D-PAD Controls for Universal Playability */}
      <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {/* Left D-pad */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400 hidden sm:inline mr-2">Bảng điều khiển:</span>
          
          <button
            onMouseDown={() => pressVirtualKey('V_LEFT')}
            onMouseUp={() => releaseVirtualKey('V_LEFT')}
            onTouchStart={() => pressVirtualKey('V_LEFT')}
            onTouchEnd={() => releaseVirtualKey('V_LEFT')}
            className="w-12 h-12 rounded-xl bg-slate-800 active:bg-cyan-500 active:text-black text-slate-200 flex items-center justify-center font-bold shadow-md select-none touch-none cursor-pointer"
            title="Sang trái (A)"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <button
            onMouseDown={() => pressVirtualKey('V_RIGHT')}
            onMouseUp={() => releaseVirtualKey('V_RIGHT')}
            onTouchStart={() => pressVirtualKey('V_RIGHT')}
            onTouchEnd={() => releaseVirtualKey('V_RIGHT')}
            className="w-12 h-12 rounded-xl bg-slate-800 active:bg-cyan-500 active:text-black text-slate-200 flex items-center justify-center font-bold shadow-md select-none touch-none cursor-pointer"
            title="Sang phải (D)"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-3">
          <button
            onMouseDown={() => pressVirtualKey('V_JUMP')}
            onMouseUp={() => releaseVirtualKey('V_JUMP')}
            onTouchStart={() => pressVirtualKey('V_JUMP')}
            onTouchEnd={() => releaseVirtualKey('V_JUMP')}
            className="px-6 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 active:from-amber-400 active:to-amber-500 text-black font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 select-none touch-none cursor-pointer"
          >
            <ArrowUp className="w-5 h-5 stroke-[3]" />
            <span>NHẢY (SPACE)</span>
          </button>
        </div>
      </div>

      {/* GATE PUZZLE MODAL */}
      {isGateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="w-full max-w-md bg-[#0f172a] border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4 text-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Cơ Quan Ngũ Luân: Cài Vạt Áo
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Bạn đã thu thập đủ <b>5 Hạt Khuy Ngọc</b> (Nhân, Lễ, Nghĩa, Trí, Tín). Trên cánh cổng đá chạm khắc hai hàng rãnh then cài: <b>Bên Trái</b> và <b>Bên Phải</b>. Bạn sẽ cài vào hàng nào?
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handleSolveGate('left')}
                className="p-3 rounded-xl bg-red-950/40 border border-red-800 hover:border-red-500 text-left transition-all cursor-pointer group"
              >
                <div className="text-xs font-bold text-red-300 mb-1 group-hover:underline">
                  Rãnh Cài Bên Trái
                </div>
                <div className="text-[10px] text-slate-400">
                  Kéo vạt áo cài sang sườn trái (Tả nhậm).
                </div>
              </button>

              <button
                onClick={() => handleSolveGate('right')}
                className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 hover:border-emerald-500 text-left transition-all cursor-pointer group"
              >
                <div className="text-xs font-bold text-emerald-300 mb-1 group-hover:underline">
                  Rãnh Cài Bên Phải
                </div>
                <div className="text-[10px] text-slate-400">
                  Vạt trái đè phải cài sang sườn phải (Hữu nhậm).
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MEMORY REVEAL CUTSCENE */}
      {uiState.isTransformed && (
        <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 space-y-3 animate-in fade-in duration-500">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Hồi Ức Mở Khóa: Ký Ức Năm 1744 & Áo Ngũ Thân Gấm Vàng</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Ánh sáng ấm áp từ cội nguồn dân tộc đã quét qua Điện Kính Thiên, xua tan lớp sương mù lạnh lẽo. Tinh linh An nay đã khoác lên mình chiếc <b>Áo Ngũ Thân Tay Chẽn gấm vàng</b> vuông vức cổ lập lĩnh, 5 hạt khuy ngọc Ngũ Thường tỏa sáng rạng ngời. Ký ức về đức độ tiền nhân và đạo làm người đã được thức tỉnh!
          </p>
        </div>
      )}
    </div>
  );
};
