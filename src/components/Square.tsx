// /components/Square.tsx
'use client';
import { useDroppable } from '@dnd-kit/core';
import { useGameStore } from '@/store/useGameStore';
import Piece from '@/components/Piece';
import { PieceType } from '@/types/chessTypes';

interface Props {
  x: number;
  y: number;
  piece: PieceType;
}

export default function Square({ x, y, piece }: Props) {
  const movePiece = useGameStore((s) => s.movePiece);
  const id = `${String.fromCharCode(97 + x)}${8 - y}`;
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const bg = (x + y) % 2 === 0 ? '#eee' : '#999';

  return (
    <div
      ref={setNodeRef}
      style={{
        width: '60px',
        height: '60px',
        backgroundColor: isOver ? 'yellow' : bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const data = e.dataTransfer.getData('application/json');
        const { id: from, piece: p } = JSON.parse(data);
        movePiece(from, id);
      }}
    >
      {piece && <Piece piece={piece} id={id} />}
    </div>
  );
}
