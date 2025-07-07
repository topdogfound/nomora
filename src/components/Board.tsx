// /components/Board.tsx
'use client';
import { useGameStore } from '@/store/useGameStore';
import { DndContext } from '@dnd-kit/core';
import Square from '@/components/Square';
import { PieceType } from '@/types/chessTypes';
function pieceToSymbol(piece: { type: string; color: 'w' | 'b' }): string {
  const symbols = {
    p: '♟',
    r: '♜',
    n: '♞',
    b: '♝',
    q: '♛',
    k: '♚',
  };
  const symbol = symbols[piece.type as keyof typeof symbols];
  return piece.color === 'w' ? symbol.toUpperCase() : symbol;
}
export default function Board() {
    const chess = useGameStore((s) => s.chess);
    const board = chess.board(); // returns 2D array of pieces


    return (
        <DndContext
            onDragEnd={(event) => {
                const { active, over } = event;
                if (over && active.id !== over.id) {
                    useGameStore.getState().movePiece(active.id as string, over.id as string);
                }
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(8, 60px)',
                    gridTemplateRows: 'repeat(8, 60px)',
                    width: 480,
                    height: 480,
                    border: '2px solid black',
                }}
            >
                {board.map((row, y) =>
                    row.map((square, x) => {
                        const piece = square ? pieceToSymbol(square) : null;
                        return <Square key={`${x}-${y}`} x={x} y={y} piece={piece} />;
                    })
                )}
            </div>
        </DndContext>
    );
}

function fenToBoard(fen: string): PieceType[][] {
    return fen
        .split(' ')[0]
        .split('/')
        .map((row) => {
            const arr: PieceType[] = [];
            for (const c of row) {
                if (isNaN(parseInt(c))) arr.push(c);
                else arr.push(...Array(parseInt(c)).fill(null));
            }
            return arr;
        });
}
