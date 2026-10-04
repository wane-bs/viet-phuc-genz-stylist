/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Headless 2D Grid & Board Game Engine for "Dệt Ký Ức"
 * Pure TypeScript State Machine with Command Pattern & Undo/Redo
 */

export interface Position {
  x: number;
  y: number;
}

export interface PlayerState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  facing: 'left' | 'right';
  isGrounded: boolean;
  hasFan: boolean;
  hasClearedWeb: boolean;
  isTransformed: boolean;
}

export interface CollectedButtonsState {
  nhan: boolean;  // Nhân
  le: boolean;    // Lễ
  nghia: boolean; // Nghĩa
  tri: boolean;   // Trí
  tin: boolean;   // Tín
}

export interface BoardState {
  player: PlayerState;
  collectedButtons: CollectedButtonsState;
  lapelInstalledSide: 'none' | 'left' | 'right';
  stage: 'cold_intro' | 'puzzle_tower' | 'gate_puzzle' | 'warm_awakening' | 'completed';
  gateUnlocked: boolean;
  statusMessage: string;
  stepCount: number;
  score: number;
}

export interface IGameCommand {
  description: string;
  timestamp: number;
  execute(state: Readonly<BoardState>): BoardState;
  undo(state: Readonly<BoardState>): BoardState;
}

export class MovePlayerCommand implements IGameCommand {
  readonly description: string;
  readonly timestamp = Date.now();
  private prevPosition: Position;
  private prevFacing: 'left' | 'right';

  constructor(
    private targetX: number,
    private targetY: number,
    private facing: 'left' | 'right'
  ) {
    this.description = `Di chuyển tới (${Math.round(targetX)}, ${Math.round(targetY)})`;
    this.prevPosition = { x: 0, y: 0 };
    this.prevFacing = 'right';
  }

  execute(state: Readonly<BoardState>): BoardState {
    this.prevPosition = { x: state.player.x, y: state.player.y };
    this.prevFacing = state.player.facing;

    return {
      ...state,
      stepCount: state.stepCount + 1,
      player: {
        ...state.player,
        x: this.targetX,
        y: this.targetY,
        facing: this.facing
      }
    };
  }

  undo(state: Readonly<BoardState>): BoardState {
    return {
      ...state,
      stepCount: Math.max(0, state.stepCount - 1),
      player: {
        ...state.player,
        x: this.prevPosition.x,
        y: this.prevPosition.y,
        facing: this.prevFacing
      }
    };
  }
}

export class CollectItemCommand implements IGameCommand {
  readonly description: string;
  readonly timestamp = Date.now();

  constructor(
    private itemType: 'fan' | keyof CollectedButtonsState,
    private itemName: string
  ) {
    this.description = `Thu hồi cổ vật: ${itemName}`;
  }

  execute(state: Readonly<BoardState>): BoardState {
    if (this.itemType === 'fan') {
      return {
        ...state,
        player: { ...state.player, hasFan: true },
        score: state.score + 100,
        statusMessage: `🪭 Đã trang bị ${this.itemName}! Sẵn sàng dọn dẹp chướng ngại vật.`
      };
    }

    const updatedButtons = {
      ...state.collectedButtons,
      [this.itemType]: true
    };
    const count = Object.values(updatedButtons).filter(Boolean).length;

    return {
      ...state,
      collectedButtons: updatedButtons,
      score: state.score + 200,
      statusMessage: `💎 Thu hồi thành công ${this.itemName} (${count}/5 Khuy Ngũ Thường).`
    };
  }

  undo(state: Readonly<BoardState>): BoardState {
    if (this.itemType === 'fan') {
      return {
        ...state,
        player: { ...state.player, hasFan: false },
        score: Math.max(0, state.score - 100),
        statusMessage: 'Undo: Bỏ trang bị quạt.'
      };
    }

    return {
      ...state,
      collectedButtons: {
        ...state.collectedButtons,
        [this.itemType]: false
      },
      score: Math.max(0, state.score - 200),
      statusMessage: `Undo: Hoàn tác thu hồi ${this.itemName}.`
    };
  }
}

export class ClearObstacleCommand implements IGameCommand {
  readonly description = 'Dùng Quạt Trầm phẩy tan mạng nhện phong ấn';
  readonly timestamp = Date.now();

  execute(state: Readonly<BoardState>): BoardState {
    return {
      ...state,
      player: { ...state.player, hasClearedWeb: true },
      score: state.score + 150,
      statusMessage: '✨ Mạng nhện đã tan biến! Lối vào Tháp Chuông rộng mở.'
    };
  }

  undo(state: Readonly<BoardState>): BoardState {
    return {
      ...state,
      player: { ...state.player, hasClearedWeb: false },
      score: Math.max(0, state.score - 150),
      statusMessage: 'Undo: Phục hồi mạng nhện phong ấn.'
    };
  }
}

export class SolveGateCommand implements IGameCommand {
  readonly description: string;
  readonly timestamp = Date.now();

  constructor(private side: 'left' | 'right') {
    this.description = side === 'right' 
      ? 'Cài then vạt phải (Hữu nhậm - Hợp lễ)' 
      : 'Cài then vạt trái (Tả nhậm - Tử phục)';
  }

  execute(state: Readonly<BoardState>): BoardState {
    if (this.side === 'right') {
      return {
        ...state,
        lapelInstalledSide: 'right',
        gateUnlocked: true,
        score: state.score + 500,
        stage: 'gate_puzzle',
        statusMessage: '🔔 KHÁNH ĐỒNG NGÂN VANG: Quy cách Hữu Nhậm chính xác! Cổng Điện Kính Thiên đã mở.'
      };
    }

    return {
      ...state,
      lapelInstalledSide: 'left',
      gateUnlocked: false,
      score: Math.max(0, state.score - 300),
      statusMessage: '⛔ LỖI TỬ PHỤC: Cài vạt trái là quy cách tang ma! Oán khí phong ấn cánh cổng.'
    };
  }

  undo(state: Readonly<BoardState>): BoardState {
    return {
      ...state,
      lapelInstalledSide: 'none',
      gateUnlocked: false,
      score: this.side === 'right' ? Math.max(0, state.score - 500) : state.score + 300,
      statusMessage: 'Undo: Đặt lại trạng thái cơ quan then cài.'
    };
  }
}

export class AwakenHeritageCommand implements IGameCommand {
  readonly description = 'Chạm Khung Cửi Huyền Bí - Phục dựng Áo Ngũ Thân Gấm Vàng';
  readonly timestamp = Date.now();

  execute(state: Readonly<BoardState>): BoardState {
    return {
      ...state,
      player: { ...state.player, isTransformed: true },
      stage: 'warm_awakening',
      score: state.score + 1000,
      statusMessage: '🌟 ĐÁNH THỨC DI SẢN: Áo Ngũ Thân Tay Chẽn 1744 tỏa sáng rực rỡ, quét sạch sương giá!'
    };
  }

  undo(state: Readonly<BoardState>): BoardState {
    return {
      ...state,
      player: { ...state.player, isTransformed: false },
      stage: 'puzzle_tower',
      score: Math.max(0, state.score - 1000),
      statusMessage: 'Undo: Trở về hình thái tơ xám ban sơ.'
    };
  }
}
