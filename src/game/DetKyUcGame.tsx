import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ShieldAlert, 
  ArrowLeft, 
  ArrowRight, 
  ArrowUp, 
  BookOpen, 
  CheckCircle2,
  X
} from 'lucide-react';
import { GridBoardEngine } from '../modules/game/engine/GridBoardEngine';

export interface DetKyUcGameProps {
  onCompleteGame: () => void;
  onOpenHandbook: () => void;
}

interface GamePlayer {
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
}

interface GameState {
  player: GamePlayer;
  collectedButtons: {
    nhan: boolean;
    le: boolean;
    nghia: boolean;
    tri: boolean;
    tin: boolean;
  };
  lapelInstalledSide: 'none' | 'left' | 'right';
  gateUnlocked: boolean;
  gatePuzzleTriggered: boolean;
  colorSweepRadius: number;
  cameraX: number;
}

// 5 Jade Buttons metadata
const JADE_BUTTONS_DATA = {
  nhan: {
    id: 'nhan',
    name: 'Khuy Nhân',
    title: 'Đức Nhân (Vị trí Cổ Áo)',
    color: '#10B981', // Emerald
    virtue: 'Lòng nhân ái, bao dung thương người như thể thương thân của bậc trượng phu.',
    position: 'Đính ở đỉnh cổ lập lĩnh, tượng trưng cho đức tính đứng đầu trong ngũ thường.'
  },
  le: {
    id: 'le',
    name: 'Khuy Lễ',
    title: 'Đức Lễ (Vị trí Ngực Áo)',
    color: '#06B6D4', // Cyan
    virtue: 'Sự đoan trang, tôn ti trật tự, kính trọng tổ tiên và gìn giữ quy củ lễ giáo.',
    position: 'Đính ngang xương quai xanh ngực áo, giữ cho vạt áo ngay ngắn trang nghiêm.'
  },
  nghia: {
    id: 'nghia',
    name: 'Khuy Nghĩa',
    title: 'Đức Nghĩa (Vị trí Sườn Nách Phải)',
    color: '#F59E0B', // Amber
    virtue: 'Ngay thẳng, trượng nghĩa, biết phân định đúng sai và luôn đứng về lẽ phải.',
    position: 'Đính tại hõm nách bên phải, điểm liên kết vạt trước và vạt con bên trong.'
  },
  tri: {
    id: 'tri',
    name: 'Khuy Trí',
    title: 'Đức Trí (Vị trí Bụng Phải)',
    color: '#3B82F6', // Blue
    virtue: 'Minh triết, sáng suốt, thấu hiểu quy luật tự nhiên và tri thức nhân sinh.',
    position: 'Đính ngang thắt lưng bên phải, biểu trưng cho sự cân bằng nội tâm.'
  },
  tin: {
    id: 'tin',
    name: 'Khuy Tín',
    title: 'Đức Tín (Vị trí Hông Phải)',
    color: '#EC4899', // Pink / Ruby
    virtue: 'Giữ trọn lời ước, trung thực, thủy chung và đáng tin cậy trong mọi hành động.',
    position: 'Đính dưới cùng bên hông phải, chốt chặt năm thân áo thành một khối vững vàng.'
  }
};

function createInitialState(): GameState {
  return {
    player: {
      x: 70,
      y: 300,
      vx: 0,
      vy: 0,
      width: 30,
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
    gateUnlocked: false,
    gatePuzzleTriggered: false,
    colorSweepRadius: 0,
    cameraX: 0,
  };
}

// Web Audio Pentatonic Heritage Synthesizer
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
    osc.frequency.setValueAtTime(280, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(540, this.ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  public playCollectPentatonic(index: number = 0) {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    const pentatonicNotes = [261.63, 293.66, 329.63, 392.00, 440.00]; // Hò, Xự, Xang, Xê, Cống
    const freq = pentatonicNotes[index % pentatonicNotes.length];
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.25);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  public playBronzeChime() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.2, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.8);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.8);
    });
  }

  public playSpookyGlitch() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [98, 103.83, 138.59, 146.83].forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.linearRampToValueAtTime(freq * 0.7, now + 0.7);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.7);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now);
      osc.stop(now + 0.7);
    });
  }

  public playAwakeningFanfare() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const fanfare = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
    fanfare.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.1);
      gain.gain.setValueAtTime(0.22, now + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.9);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + idx * 0.1);
      osc.stop(now + idx * 0.1 + 0.9);
    });
  }
}

export const DetKyUcGame: React.FC<DetKyUcGameProps> = ({
  onCompleteGame,
  onOpenHandbook
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const synthRef = useRef<HeritageSoundSynth>(new HeritageSoundSynth());
  const [soundEnabled, setSoundEnabled] = useState(true);

  const stateRef = useRef<GameState>(createInitialState());
  const keysRef = useRef<{ [key: string]: boolean }>({});

  // Coyote time & Jump buffer mechanics (Steve Swink Game Feel & Mario physics)
  const coyoteTimerRef = useRef<number>(0);
  const jumpBufferRef = useRef<number>(0);

  // Reactive UI state
  const [buttonCount, setButtonCount] = useState(0);
  const [activeButtonPopup, setActiveButtonPopup] = useState<typeof JADE_BUTTONS_DATA['nhan'] | null>(null);
  const [isSpookyDistortion, setIsSpookyDistortion] = useState(false);
  const [isGatePuzzleOpen, setIsGatePuzzleOpen] = useState(false);
  const [isGateQuizOpen, setIsGateQuizOpen] = useState(false);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizError, setQuizError] = useState(false);
  const [isAwakened, setIsAwakened] = useState(false);
  const [gameToast, setGameToast] = useState<string>('Dùng [A]/[D] hoặc phím ảo để di chuyển. Nhặt quạt trầm hương phía trước!');

  // On-screen Virtual Controller Handlers
  const pressVirtualKey = useCallback((code: string) => {
    keysRef.current[code] = true;
    if (code === 'V_JUMP') {
      jumpBufferRef.current = 8; // Buffer jump for 8 frames
    }
  }, []);

  const releaseVirtualKey = useCallback((code: string) => {
    keysRef.current[code] = false;
  }, []);

  // Keyboard events listener
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const code = e.code;
      keysRef.current[code] = true;
      if (['Space', 'ArrowUp', 'KeyW'].includes(code)) {
        jumpBufferRef.current = 8;
      }
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(code)) {
        e.preventDefault();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.code] = false;
      // Variable jump height: release early cuts jump velocity
      const p = stateRef.current.player;
      if (['Space', 'ArrowUp', 'KeyW'].includes(e.code) && p.vy < -3.5) {
        p.vy = -3.5;
      }
    };

    window.addEventListener('keydown', onKeyDown, { passive: false });
    window.addEventListener('keyup', onKeyUp);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  // Reset Game
  const handleResetGame = () => {
    stateRef.current = createInitialState();
    setButtonCount(0);
    setActiveButtonPopup(null);
    setIsSpookyDistortion(false);
    setIsGatePuzzleOpen(false);
    setIsGateQuizOpen(false);
    setQuizSelectedOption(null);
    setQuizError(false);
    setIsAwakened(false);
    setGameToast('Dùng [A]/[D] hoặc phím ảo để di chuyển. Nhặt quạt trầm hương phía trước!');
  };

  // Main 60FPS Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Platform map layout (Hue Royal Palace theme)
    const platforms = [
      { x: 0, y: 340, w: 380, h: 80, name: 'TienDien' }, // Starting Courtyard
      { x: 230, y: 270, w: 80, h: 16 }, // Stepping Stone 1
      { x: 330, y: 215, w: 85, h: 16 }, // Stepping Stone 2
      { x: 430, y: 340, w: 460, h: 80, name: 'DaiNgoMon' }, // Mid Pavilion Ground
      { x: 490, y: 260, w: 75, h: 16 }, // Bell Tower Platform 1
      { x: 580, y: 200, w: 75, h: 16 }, // Bell Tower Platform 2
      { x: 670, y: 145, w: 75, h: 16 }, // Bell Tower Platform 3 (Peak)
      { x: 765, y: 210, w: 80, h: 16 }, // Bell Tower Platform 4
      { x: 910, y: 340, w: 600, h: 80, name: 'HauCung' } // Inner Sanctuary (Loom)
    ];

    const fanItem = { x: 180, y: 308, w: 26, h: 26 };
    const webObstacle = { x: 395, y: 220, w: 35, h: 120 };
    const gatePos = { x: 865, y: 175, w: 50, h: 165 };
    const loomPos = { x: 1180, y: 250, w: 85, h: 90 };

    const buttonPickups = [
      { id: 'nhan', data: JADE_BUTTONS_DATA.nhan, x: 520, y: 225 },
      { id: 'le', data: JADE_BUTTONS_DATA.le, x: 610, y: 165 },
      { id: 'nghia', data: JADE_BUTTONS_DATA.nghia, x: 700, y: 110 },
      { id: 'tri', data: JADE_BUTTONS_DATA.tri, x: 795, y: 175 },
      { id: 'tin', data: JADE_BUTTONS_DATA.tin, x: 625, y: 308 }
    ];

    const renderLoop = () => {
      const state = stateRef.current;
      const p = state.player;

      // 1. INPUT & HORIZONTAL PHYSICS
      const moveSpeed = 4.2;
      p.vx = 0;

      const isLeft = keysRef.current['KeyA'] || keysRef.current['ArrowLeft'] || keysRef.current['V_LEFT'];
      const isRight = keysRef.current['KeyD'] || keysRef.current['ArrowRight'] || keysRef.current['V_RIGHT'];

      if (isLeft) {
        p.vx = -moveSpeed;
        p.facing = 'left';
      }
      if (isRight) {
        p.vx = moveSpeed;
        p.facing = 'right';
      }

      // Coyote Time Countdown
      if (p.isGrounded) {
        coyoteTimerRef.current = 6; // 6 frames = 100ms grace window
      } else if (coyoteTimerRef.current > 0) {
        coyoteTimerRef.current--;
      }

      // Jump Buffer Countdown
      if (jumpBufferRef.current > 0) {
        jumpBufferRef.current--;
      }

      // 2. JUMP WITH FORGIVENESS
      if (jumpBufferRef.current > 0 && coyoteTimerRef.current > 0) {
        p.vy = -11.6;
        p.isGrounded = false;
        coyoteTimerRef.current = 0;
        jumpBufferRef.current = 0;
        synthRef.current.playJump();
      }

      // Asymmetric Gravity (Steve Swink physics: heavier falling for solid feel)
      if (p.vy < 0) {
        p.vy += 0.58; // Upward damping
      } else {
        p.vy += 0.68; // Downward snappiness
      }
      if (p.vy > 13) p.vy = 13;

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Left boundary limit
      if (p.x < 15) p.x = 15;

      // 3. COLLISION RESOLUTION
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

      // 4. KI: FAN PICKUP (Invisible Pedagogy)
      if (!p.hasFan && Math.abs(p.x - fanItem.x) < 32 && Math.abs(p.y - fanItem.y) < 32) {
        p.hasFan = true;
        synthRef.current.playCollectPentatonic(0);
        setGameToast('Đã nhặt Quạt Trầm Hương! Hãy tiến tới phẩy tan mạng nhện phong ấn.');
      }

      // 5. WEB CLEARING
      if (!p.hasClearedWeb && p.x + p.width > webObstacle.x && p.x < webObstacle.x + webObstacle.w) {
        if (p.hasFan) {
          p.hasClearedWeb = true;
          synthRef.current.playBronzeChime();
          setGameToast('Quạt Trầm phẩy tan mạng nhện phong ấn! Lối vào Tháp Chuông đã mở.');
        } else {
          p.x = webObstacle.x - p.width;
          setGameToast('Mạng nhện cổ phong ấn đường đi! Hãy quay lại bục trước nhặt Quạt Trầm.');
        }
      }

      // 6. SHŌ: COLLECT 5 JADE BUTTONS
      buttonPickups.forEach((btn, idx) => {
        const key = btn.id as keyof typeof state.collectedButtons;
        if (!state.collectedButtons[key]) {
          if (Math.abs(p.x - btn.x) < 28 && Math.abs(p.y - btn.y) < 28) {
            state.collectedButtons[key] = true;
            synthRef.current.playCollectPentatonic(idx + 1);
            const count = Object.values(state.collectedButtons).filter(Boolean).length;
            setButtonCount(count);
            setActiveButtonPopup(btn.data);
            setGameToast(`Thu hồi ${btn.data.name}! (${count}/5 Khuy Ngũ Thường)`);
          }
        }
      });

      // 7. PALACE GATE: SOLID COLLISION & IDEMPOTENT PUZZLE TRIGGER
      if (!state.gateUnlocked) {
        // A. Solid collision body: Chặn cứng nhân vật không cho đi xuyên qua cổng khi đang khóa
        if (p.x + p.width > gatePos.x && p.x < gatePos.x + gatePos.w) {
          p.x = gatePos.x - p.width;
        }

        // B. Trigger câu đố có kiểm soát Idempotency (Tránh spam setState mỗi frame)
        if (Math.abs(p.x - gatePos.x) < 55) {
          const collectedAll = Object.values(state.collectedButtons).filter(Boolean).length === 5;
          if (collectedAll) {
            if (!state.gatePuzzleTriggered) {
              state.gatePuzzleTriggered = true;
              setIsGatePuzzleOpen(true);
            }
          } else {
            const count = Object.values(state.collectedButtons).filter(Boolean).length;
            setGameToast(`Cổng Hoàng Thành khóa then: Hãy thu thập đủ 5 Khuy Ngũ Thường (${count}/5).`);
          }
        }
      }

      // 8. KETSU: ROYAL LOOM REACHED
      if (state.gateUnlocked && Math.abs(p.x - loomPos.x) < 45 && !p.isTransformed) {
        p.isTransformed = true;
        synthRef.current.playAwakeningFanfare();
        setIsAwakened(true);
        setGameToast('THỨC TỈNH HOÀN MỸ: An đã khoác Áo Ngũ Thân Gấm Vàng! Mở khóa Tủ Đồ Hoàng Cung.');
      }

      // Color sweep expansion
      if (p.isTransformed && state.colorSweepRadius < 1800) {
        state.colorSweepRadius += 28;
      }

      // Camera follow
      state.cameraX = Math.max(0, Math.min(p.x - 300, 780));

      // -----------------------------------------------------------------
      // CANVAS RENDERING
      // -----------------------------------------------------------------
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(-state.cameraX, 0);

      const isWarm = p.isTransformed;

      // Sky gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (!isWarm) {
        bgGrad.addColorStop(0, '#040711');
        bgGrad.addColorStop(0.5, '#0c1322');
        bgGrad.addColorStop(1, '#162035');
      } else {
        bgGrad.addColorStop(0, '#3a1804');
        bgGrad.addColorStop(0.4, '#6b2d07');
        bgGrad.addColorStop(0.8, '#9a4508');
        bgGrad.addColorStop(1, '#c26207');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1600, canvas.height);

      // Hue Citadel Imperial Silhouettes
      ctx.fillStyle = isWarm ? 'rgba(255, 230, 150, 0.08)' : 'rgba(255, 255, 255, 0.03)';
      // Palace 1: Ngo Mon gate roof
      ctx.beginPath();
      ctx.moveTo(80, 310);
      ctx.lineTo(220, 160);
      ctx.lineTo(360, 310);
      ctx.fill();

      // Palace 2: Ngu Phung Pavilion
      ctx.beginPath();
      ctx.moveTo(580, 320);
      ctx.lineTo(800, 120);
      ctx.lineTo(1020, 320);
      ctx.fill();

      // Platforms with traditional Hue ceramic border styling
      for (const plat of platforms) {
        ctx.fillStyle = isWarm ? '#6d3106' : '#141d2f';
        ctx.strokeStyle = isWarm ? '#d97706' : '#27354f';
        ctx.lineWidth = 2;
        ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
        ctx.strokeRect(plat.x, plat.y, plat.w, plat.h);

        // Top moss / imperial golden lip
        ctx.fillStyle = isWarm ? '#f59e0b' : '#059669';
        ctx.fillRect(plat.x, plat.y, plat.w, 4);
      }

      // Quạt Trầm item (if not collected)
      if (!p.hasFan) {
        ctx.save();
        ctx.translate(fanItem.x + 13, fanItem.y + 13 + Math.sin(Date.now() * 0.005) * 4);
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(0, 0, 13, Math.PI, 0);
        ctx.fill();
        ctx.strokeStyle = '#fef3c7';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // Web obstacle (if not cleared)
      if (!p.hasClearedWeb) {
        ctx.strokeStyle = 'rgba(226, 232, 240, 0.75)';
        ctx.lineWidth = 2;
        for (let i = 0; i < 6; i++) {
          ctx.beginPath();
          ctx.moveTo(webObstacle.x, webObstacle.y + i * 18);
          ctx.lineTo(webObstacle.x + webObstacle.w, webObstacle.y + (i + 1) * 18);
          ctx.stroke();
        }
      }

      // Jade Buttons Pickups
      buttonPickups.forEach((btn) => {
        const key = btn.id as keyof typeof state.collectedButtons;
        if (!state.collectedButtons[key]) {
          ctx.save();
          ctx.translate(btn.x, btn.y + Math.sin(Date.now() * 0.006 + btn.x) * 4);
          ctx.shadowColor = btn.data.color;
          ctx.shadowBlur = 12;
          ctx.fillStyle = btn.data.color;
          ctx.beginPath();
          ctx.arc(0, 0, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(-2, -2, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // Palace Gate (Cổng Ngọ Môn)
      ctx.fillStyle = state.gateUnlocked ? '#92400e' : '#0b111e';
      ctx.strokeStyle = state.gateUnlocked ? '#fbbf24' : '#334155';
      ctx.lineWidth = 3.5;
      ctx.fillRect(gatePos.x, gatePos.y, gatePos.w, gatePos.h);
      ctx.strokeRect(gatePos.x, gatePos.y, gatePos.w, gatePos.h);

      // Royal Loom (Khung cửi)
      ctx.save();
      ctx.translate(loomPos.x, loomPos.y);
      ctx.fillStyle = isWarm ? '#b45309' : '#334155';
      ctx.fillRect(0, 0, loomPos.w, loomPos.h);
      // Flowing silk
      ctx.fillStyle = isWarm ? '#fde047' : '#94a3b8';
      ctx.beginPath();
      ctx.moveTo(10, 20);
      ctx.quadraticCurveTo(42, 10 + Math.sin(Date.now() * 0.005) * 8, 75, 20);
      ctx.lineTo(75, 75);
      ctx.lineTo(10, 75);
      ctx.fill();
      ctx.restore();

      // An (Player character)
      ctx.save();
      ctx.translate(p.x + p.width / 2, p.y + p.height / 2);
      if (p.facing === 'left') ctx.scale(-1, 1);

      if (!p.isTransformed) {
        // Cold gray thread sprite (Tinh linh tơ xám)
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath();
        ctx.arc(0, -10, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(3, -11, 3, 4);
        ctx.fillStyle = '#475569';
        ctx.fillRect(-9, 2, 18, 19);
      } else {
        // Awakened Royal Ngũ Thân
        ctx.fillStyle = '#d97706';
        ctx.beginPath();
        ctx.arc(0, -11, 13, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.fillRect(4, -12, 3, 4);
        // Golden Robe with 5 jade buttons on right side
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(-11, 2, 22, 21);
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(-11, 2, 22, 21);
        // 5 shining jade buttons
        ctx.fillStyle = '#10b981';
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.arc(6.5, 4 + i * 3.8, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Holding fan if collected
      if (p.hasFan) {
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(11, 4, 6.5, Math.PI * 1.2, 0);
        ctx.fill();
      }

      ctx.restore();

      // Color sweep radial shader
      if (state.colorSweepRadius > 0 && state.colorSweepRadius < 1800) {
        const sweepGrad = ctx.createRadialGradient(
          p.x + p.width / 2,
          p.y + p.height / 2,
          0,
          p.x + p.width / 2,
          p.y + p.height / 2,
          state.colorSweepRadius
        );
        sweepGrad.addColorStop(0, 'rgba(245, 158, 11, 0.45)');
        sweepGrad.addColorStop(0.7, 'rgba(217, 119, 6, 0.25)');
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

  // Handle Gate Lapel Choice
  const handleSolveGate = (side: 'right' | 'left') => {
    if (side === 'left') {
      synthRef.current.playSpookyGlitch();
      setIsSpookyDistortion(true);
      setIsGatePuzzleOpen(false);
      setGameToast('⛔ CẢNH BÁO ĐỎ: Cài vạt trái kích hoạt oán khí tử phục! Hãy đảo lại sang Vạt Phải.');
    } else {
      synthRef.current.playBronzeChime();
      setIsSpookyDistortion(false);
      setIsGatePuzzleOpen(false);
      // Open Gate Quiz Challenge to verify knowledge
      setIsGateQuizOpen(true);
    }
  };

  // Handle Gate Cultural Quiz Answer
  const handleGateQuizAnswer = (optionIndex: number) => {
    setQuizSelectedOption(optionIndex);
    // Correct option is 1: "Vạt trái đè vạt phải (cài sang sườn phải)"
    if (optionIndex === 1) {
      setQuizError(false);
      stateRef.current.gateUnlocked = true;
      synthRef.current.playBronzeChime();
      setTimeout(() => {
        setIsGateQuizOpen(false);
        setIsGatePuzzleOpen(false);
        setIsSpookyDistortion(false);
        setGameToast('CỔNG HOÀNG THÀNH MỞ RỰC RỠ: Tiến vào chạm Khung Cửi Cung Đình để thức tỉnh!');
      }, 400);
    } else {
      setQuizError(true);
      synthRef.current.playSpookyGlitch();
    }
  };

  const handleQuizAnswer = handleGateQuizAnswer;

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      {/* Top Bar: Progress & Audio Controls */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 border-b border-slate-800/80 text-xs backdrop-blur-md z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 font-medium">Khuy Ngũ Thường:</span>
            <div className="flex items-center gap-1">
              {(['nhan', 'le', 'nghia', 'tri', 'tin'] as const).map((k) => (
                <div 
                  key={k}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    stateRef.current.collectedButtons[k] 
                      ? 'border-white scale-110 shadow-sm' 
                      : 'border-slate-700 bg-slate-800 opacity-30'
                  }`}
                  style={{
                    backgroundColor: stateRef.current.collectedButtons[k] ? JADE_BUTTONS_DATA[k].color : undefined
                  }}
                  title={JADE_BUTTONS_DATA[k].title}
                />
              ))}
            </div>
            <span className="font-bold text-emerald-400 font-mono ml-1">{buttonCount}/5</span>
          </div>

          <span className="text-slate-600 hidden sm:inline">·</span>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
            <span className="text-slate-500">Cổ vật:</span>
            <span className="font-medium text-amber-300">
              {stateRef.current.player.hasFan ? '🪭 Quạt Trầm' : 'Chưa có'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenHandbook}
            className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sổ Tay Di Sản</span>
          </button>

          <button
            onClick={() => {
              const newMute = !soundEnabled;
              setSoundEnabled(newMute);
              synthRef.current.setMuted(!newMute);
            }}
            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            title="Bật/Tắt Âm Thanh"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
          </button>

          <button
            onClick={handleResetGame}
            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            title="Chơi lại từ đầu"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport (100% responsive, centered, zero-scroll) */}
      <div className="relative flex-1 w-full bg-black overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="w-full h-full object-cover block cursor-pointer"
          tabIndex={0}
        />

        {/* Spooky Horror Glitch Overlay when left lapel chosen */}
        {isSpookyDistortion && (
          <div className="absolute inset-0 bg-red-950/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30 animate-pulse">
            <ShieldAlert className="w-14 h-14 text-red-500 mb-3" />
            <h3 className="text-lg font-black text-white font-mono uppercase tracking-wider mb-2">
              DỊ BIẾN CÕI ÂM: CẢNH BÁO TỬ PHỤC (VẠT TRÁI)
            </h3>
            <p className="text-xs text-red-200 max-w-md mb-4 leading-relaxed">
              "Vạt trái là nẹp tang ma tử phục, điềm xấu cõi âm!" Cổ luật Á Đông quy định: Người sống cài vạt sang phải (Hữu nhậm), chỉ khi khâm liệm người khuất mới cài vạt sang trái (Tả nhậm).
            </p>
            <button
              id="btn-switch-right-lapel"
              data-testid="btn-switch-right-lapel"
              onClick={() => {
                setIsSpookyDistortion(false);
                setIsGatePuzzleOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg transition-colors cursor-pointer"
            >
              Đảo Lại Sang Vạt Phải (Hữu Nhậm) ➔
            </button>
          </div>
        )}

        {/* Jade Button Enlightening Popup (1-2 sentences, disappear on click/key) */}
        {activeButtonPopup && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-11/12 max-w-md bg-slate-900/95 border border-emerald-500/50 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md text-slate-100 flex items-start justify-between gap-3 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start gap-2.5">
              <div 
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 mt-0.5 shadow-md"
                style={{ backgroundColor: activeButtonPopup.color }}
              >
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>{activeButtonPopup.title}</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug">
                  {activeButtonPopup.virtue}
                </p>
                <p className="text-[10px] text-emerald-400 italic">
                  {activeButtonPopup.position}
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveButtonPopup(null)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Toast Guidance Bar */}
        <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-none flex justify-center">
          <div className="px-4 py-1.5 rounded-xl bg-slate-950/85 border border-slate-800/90 text-xs text-slate-300 backdrop-blur-md shadow-lg truncate max-w-xl text-center">
            {gameToast}
          </div>
        </div>
      </div>

      {/* Gate Lapel Puzzle Modal */}
      {isGatePuzzleOpen && (
        <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#0f172a] border border-amber-500/40 rounded-3xl p-6 shadow-2xl text-slate-100 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">
                Cơ Quan Ngũ Phụng: Then Cài Vạt Áo
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Bạn đã thu thập đủ <b>5 Khuy Ngũ Thường</b>. Trên cánh cổng đá chạm khắc 2 rãnh then: Cài vạt sang TRÁI hay sang PHẢI?
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                id="btn-lapel-left"
                data-testid="btn-lapel-left"
                onClick={() => handleSolveGate('left')}
                className="p-3.5 rounded-2xl bg-red-950/30 border border-red-900/60 hover:border-red-500 text-left transition-all cursor-pointer group"
              >
                <div className="text-xs font-bold text-red-400 mb-1 group-hover:underline">
                  Rãnh Cài Bên Trái
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  Tả nhậm: Kéo vạt áo sang phía nách trái.
                </div>
              </button>

              <button
                id="btn-lapel-right"
                data-testid="btn-lapel-right"
                onClick={() => handleSolveGate('right')}
                className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-900/60 hover:border-emerald-500 text-left transition-all cursor-pointer group"
              >
                <div className="text-xs font-bold text-emerald-400 mb-1 group-hover:underline">
                  Rãnh Cài Bên Phải
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  Hữu nhậm: Vạt trái đè phải cài sang sườn phải.
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gate Cultural Quiz Modal */}
      {isGateQuizOpen && (
        <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-[#0f172a] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">
                KHẢO NGHIỆM VĂN HÓA MỞ CỔNG
              </span>
              <span className="text-[10px] text-slate-400 font-mono">1 Câu Hỏi Chốt Hạ</span>
            </div>

            <h4 className="text-sm font-bold text-white leading-snug">
              Theo quy chuẩn Áo Ngũ Thân định chế năm 1744 và thời Nguyễn, quy cách vạt áo chuẩn mực là gì?
            </h4>

            <div className="space-y-2 pt-1">
              {[
                'Vạt phải đè vạt trái, cài sang sườn trái',
                'Vạt trái đè vạt phải, cài cúc sang sườn phải',
                'Hai vạt mở tự do không cài cúc',
                'Cài cúc thẳng chính giữa sống lưng'
              ].map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuizAnswer(idx)}
                  className={`w-full p-2.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                    quizSelectedOption === idx
                      ? idx === 1
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-red-950/80 border-red-500 text-red-200'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <span>{option}</span>
                  {quizSelectedOption === idx && (
                    idx === 1 
                      ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      : <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>

            {quizError && (
              <p className="text-[11px] text-red-400 font-medium">
                Chưa chính xác! Nhớ quy tắc: "Hữu nhậm vi nhân" - Vạt trái đè vạt phải cài sang bên phải.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Awakening Celebration Banner */}
      {isAwakened && (
        <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-gradient-to-b from-[#241306] to-[#120902] border border-amber-500/50 rounded-3xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 mx-auto flex items-center justify-center text-amber-300 shadow-lg shadow-amber-500/20">
              <Sparkles className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[11px] font-mono tracking-widest text-amber-400 font-bold uppercase">
                HỒI I HOÀN TẤT
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                Thức Tỉnh Áo Ngũ Thân Gấm Vàng
              </h3>
            </div>

            <p className="text-xs text-amber-200/90 leading-relaxed max-w-sm mx-auto">
              Sương lam tan biến, nếp áo ngũ thân cổ lập lĩnh và 5 hạt khuy Ngũ Thường đã tỏa rạng! Giờ là lúc bước vào Tủ Đồ Hoàng Cung để thỏa sức sáng tạo phong cách Việt Phục Remix đương đại.
            </p>

            <button
              id="btn-goto-wardrobe"
              data-testid="btn-goto-wardrobe"
              onClick={onCompleteGame}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-black text-xs shadow-lg shadow-amber-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Vào Tủ Đồ Hoàng Cung Ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Responsive Virtual Touch Controller for Universal Mobile & Desktop Access */}
      <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between gap-4 z-20">
        {/* Directional Pad */}
        <div className="flex items-center gap-2">
          <button
            id="vbtn-left"
            data-testid="vbtn-left"
            onMouseDown={() => pressVirtualKey('V_LEFT')}
            onMouseUp={() => releaseVirtualKey('V_LEFT')}
            onTouchStart={() => pressVirtualKey('V_LEFT')}
            onTouchEnd={() => releaseVirtualKey('V_LEFT')}
            className="w-11 h-11 rounded-xl bg-slate-800 active:bg-cyan-500 active:text-black text-slate-200 flex items-center justify-center shadow select-none touch-none cursor-pointer"
            title="Sang trái (A)"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            id="vbtn-right"
            data-testid="vbtn-right"
            onMouseDown={() => pressVirtualKey('V_RIGHT')}
            onMouseUp={() => releaseVirtualKey('V_RIGHT')}
            onTouchStart={() => pressVirtualKey('V_RIGHT')}
            onTouchEnd={() => releaseVirtualKey('V_RIGHT')}
            className="w-11 h-11 rounded-xl bg-slate-800 active:bg-cyan-500 active:text-black text-slate-200 flex items-center justify-center shadow select-none touch-none cursor-pointer"
            title="Sang phải (D)"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Jump Action */}
        <button
          id="vbtn-jump"
          data-testid="vbtn-jump"
          onMouseDown={() => pressVirtualKey('V_JUMP')}
          onMouseUp={() => releaseVirtualKey('V_JUMP')}
          onTouchStart={() => pressVirtualKey('V_JUMP')}
          onTouchEnd={() => releaseVirtualKey('V_JUMP')}
          className="px-6 h-11 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 active:from-amber-300 active:to-amber-400 text-black font-black text-xs flex items-center gap-2 shadow-md shadow-amber-500/20 select-none touch-none cursor-pointer"
        >
          <ArrowUp className="w-4 h-4 stroke-[3]" />
          <span>NHẢY (SPACE)</span>
        </button>
      </div>
    </div>
  );
};
