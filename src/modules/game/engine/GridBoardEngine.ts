/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Headless Grid & Board Engine Implementation for "Dệt Ký Ức"
 * Pure state machine decoupling game logic from rendering
 */

import {
  BoardState,
  IGameCommand,
  MovePlayerCommand,
  CollectItemCommand,
  ClearObstacleCommand,
  SolveGateCommand,
  AwakenHeritageCommand,
  CollectedButtonsState
} from './types';

export function createDefaultBoardState(): BoardState {
  return {
    player: {
      x: 80,
      y: 310,
      vx: 0,
      vy: 0,
      facing: 'right',
      isGrounded: true,
      hasFan: false,
      hasClearedWeb: false,
      isTransformed: false
    },
    collectedButtons: {
      nhan: false,
      le: false,
      nghia: false,
      tri: false,
      tin: false
    },
    lapelInstalledSide: 'none',
    stage: 'cold_intro',
    gateUnlocked: false,
    statusMessage: 'Nhấn [A]/[D] để di chuyển, [SPACE] để nhảy. Đi tìm quạt trầm và 5 khuy ngọc.',
    stepCount: 0,
    score: 0
  };
}

export class GridBoardEngine {
  private currentState: BoardState;
  private undoStack: IGameCommand[] = [];
  private redoStack: IGameCommand[] = [];
  private listeners: Array<(state: BoardState, canUndo: boolean, canRedo: boolean) => void> = [];

  constructor(initialState?: BoardState) {
    this.currentState = initialState ? { ...initialState } : createDefaultBoardState();
  }

  public getState(): Readonly<BoardState> {
    return this.currentState;
  }

  public getUndoStack(): ReadonlyArray<IGameCommand> {
    return this.undoStack;
  }

  public getRedoStack(): ReadonlyArray<IGameCommand> {
    return this.redoStack;
  }

  public canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  public canRedo(): boolean {
    return this.redoStack.length > 0;
  }

  public subscribe(callback: (state: BoardState, canUndo: boolean, canRedo: boolean) => void): () => void {
    this.listeners.push(callback);
    callback(this.currentState, this.canUndo(), this.canRedo());
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  }

  private notify() {
    for (const listener of this.listeners) {
      listener(this.currentState, this.canUndo(), this.canRedo());
    }
  }

  public executeCommand(command: IGameCommand): BoardState {
    const nextState = command.execute(this.currentState);
    this.currentState = nextState;
    this.undoStack.push(command);
    this.redoStack = []; // Clear redo stack on new action
    this.notify();
    return this.currentState;
  }

  public undo(): BoardState | null {
    const command = this.undoStack.pop();
    if (!command) return null;

    const revertedState = command.undo(this.currentState);
    this.currentState = revertedState;
    this.redoStack.push(command);
    this.notify();
    return this.currentState;
  }

  public redo(): BoardState | null {
    const command = this.redoStack.pop();
    if (!command) return null;

    const reappliedState = command.execute(this.currentState);
    this.currentState = reappliedState;
    this.undoStack.push(command);
    this.notify();
    return this.currentState;
  }

  public reset(): BoardState {
    this.currentState = createDefaultBoardState();
    this.undoStack = [];
    this.redoStack = [];
    this.notify();
    return this.currentState;
  }

  // Convenience dispatchers
  public movePlayer(targetX: number, targetY: number, facing: 'left' | 'right'): BoardState {
    return this.executeCommand(new MovePlayerCommand(targetX, targetY, facing));
  }

  public collectFan(): BoardState {
    if (this.currentState.player.hasFan) return this.currentState;
    return this.executeCommand(new CollectItemCommand('fan', 'Quạt Giấy Gỗ Trầm'));
  }

  public collectButton(key: keyof CollectedButtonsState, name: string): BoardState {
    if (this.currentState.collectedButtons[key]) return this.currentState;
    return this.executeCommand(new CollectItemCommand(key, name));
  }

  public clearWeb(): BoardState {
    if (this.currentState.player.hasClearedWeb) return this.currentState;
    return this.executeCommand(new ClearObstacleCommand());
  }

  public solveGate(side: 'left' | 'right'): BoardState {
    return this.executeCommand(new SolveGateCommand(side));
  }

  public awakenHeritage(): BoardState {
    if (this.currentState.player.isTransformed) return this.currentState;
    return this.executeCommand(new AwakenHeritageCommand());
  }
}
