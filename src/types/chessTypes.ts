// /types/chessTypes.ts
export type PieceType = string | null;

export interface DraggedPiece {
  id: string;    // position, e.g. "e2"
  piece: string; // symbol, e.g. "♞"
}
