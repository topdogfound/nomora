// /store/useGameStore.ts
import { create } from 'zustand';
import { Chess } from 'chess.js';

interface GameState {
  chess: Chess;
  fen: string;
  movePiece: (from: string, to: string) => void;
}

export const useGameStore = create<GameState>((set) => ({
  chess: new Chess(),
  fen: 'start',
  movePiece: (from, to) =>
    set((s) => {
      const g = new Chess(s.chess.fen());
      const m = g.move({ from, to });
      return m ? { fen: g.fen(), chess: g } : {};
    }),
}));
