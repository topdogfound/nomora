// /components/Piece.tsx
'use client';
import { useDraggable } from '@dnd-kit/core';
import { DraggedPiece } from '@/types/chessTypes';

interface Props {
  piece: string;
  id: string;
}

export default function Piece({ piece, id }: Props) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    data: { id, piece } as DraggedPiece,
  });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px,${transform.y}px,0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
    fontSize: 32,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {piece}
    </div>
  );
}
