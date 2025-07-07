"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const BOARD_SIZE = 8

const getBishopMoves = (x: number, y: number): [number, number][] => {
  const directions = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ]

  const moves: [number, number][] = []

  for (const [dx, dy] of directions) {
    let nx = x + dx
    let ny = y + dy

    while (nx >= 0 && nx < BOARD_SIZE && ny >= 0 && ny < BOARD_SIZE) {
      moves.push([nx, ny])
      nx += dx
      ny += dy
    }
  }

  return moves
}

const toChessNotation = ([x, y]: [number, number]) => {
  const file = String.fromCharCode("A".charCodeAt(0) + x) // A-H
  const rank = BOARD_SIZE - y // ranks 8-1 top to bottom
  return `${file}${rank}`
}

const BishopSingleSteps = () => {
  const [bishopPos, setBishopPos] = useState<[number, number]>([0, 0])
  const [possibleMoves, setPossibleMoves] = useState<[number, number][]>([])
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const x = Math.floor(Math.random() * BOARD_SIZE)
    const y = Math.floor(Math.random() * BOARD_SIZE)
    setBishopPos([x, y])
    setPossibleMoves(getBishopMoves(x, y))
  }, [])

  const handleDropEvent = (e: React.DragEvent, x: number, y: number) => {
    e.preventDefault()
    setBishopPos([x, y])
    setPossibleMoves(getBishopMoves(x, y))
    setIsDragging(false)
  }

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(bishopPos))
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent) => e.preventDefault()

  const renderCell = (x: number, y: number) => {
    const isBishop = bishopPos[0] === x && bishopPos[1] === y
    const isMove = possibleMoves.some(([mx, my]) => mx === x && my === y)
    const isLightSquare = (x + y) % 2 === 0

    let cellClasses = `
      w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center relative transition-all duration-200
      border border-border/20 rounded shadow-sm
    `

    // Base square colors - classic black and white theme
    if (isLightSquare) {
      cellClasses += " bg-white hover:bg-gray-100"
    } else {
      cellClasses += " bg-gray-800 hover:bg-gray-700"
    }

    // Highlight possible moves
    if (isMove) {
      cellClasses += " ring-2 ring-primary ring-offset-1"
      if (isLightSquare) {
        cellClasses += " bg-primary/10"
      } else {
        cellClasses += " bg-primary/20"
      }
    }

    // Bishop square highlighting
    if (isBishop) {
      cellClasses += " ring-2 ring-destructive ring-offset-1 shadow-lg"
    }

    return (
      <div
        key={`${x}-${y}`}
        onDrop={(e) => handleDropEvent(e, x, y)}
        onDragOver={handleDragOver}
        className={cellClasses}
      >
        {isBishop && (
          <span
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className={`
              text-2xl sm:text-3xl md:text-4xl cursor-grab active:cursor-grabbing select-none
              transition-transform duration-200 hover:scale-110
              ${isDragging ? "opacity-50 scale-95" : ""}
              ${isLightSquare ? "text-black" : "text-white"}
              drop-shadow-lg
            `}
            style={{ filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))" }}
          >
            ♗
          </span>
        )}
        {isMove && !isBishop && (
          <div
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-pulse ${isLightSquare ? "bg-primary/70" : "bg-primary/90"}`}
          />
        )}

        {/* Coordinate labels */}
        {y === BOARD_SIZE - 1 && (
          <div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 text-[10px] sm:text-xs font-medium text-muted-foreground">
            {x + 1}
          </div>
        )}
        {x === 0 && (
          <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 text-[10px] sm:text-xs font-medium text-muted-foreground">
            {BOARD_SIZE - y}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <Card className="w-fit shadow-2xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold">Chess Bishop Movement</CardTitle>
          <p className="text-muted-foreground">Drag the bishop to see all possible diagonal moves</p>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
          {/* Chess Board */}
          <div className="relative">
            <div className="grid grid-cols-8 gap-1 sm:gap-2 border-2 border-border rounded-lg overflow-hidden shadow-lg p-0.5 sm:p-1">
              {Array.from({ length: BOARD_SIZE }, (_, row) =>
                Array.from({ length: BOARD_SIZE }, (_, col) => renderCell(col, row)),
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 justify-center items-center">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Position:</span>
              <Badge variant="secondary" className="font-mono text-sm sm:text-base px-2 sm:px-3 py-1">
                {toChessNotation(bishopPos)}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Possible Moves:</span>
              <Badge variant="default" className="font-mono text-sm sm:text-base px-2 sm:px-3 py-1">
                {possibleMoves.length}
              </Badge>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center text-xs sm:text-sm text-muted-foreground bg-muted/50 rounded-lg p-2 sm:p-3">
            <p>
              💡 <strong>Tip:</strong> Drag the bishop (♗) to any square to see how diagonal movement works in chess!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BishopSingleSteps
