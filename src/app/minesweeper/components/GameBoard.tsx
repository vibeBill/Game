'use client';

import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

const BoardWrapper = styled.div`
  overflow: auto;
  max-width: 100vw;
  max-height: 70vh;
  -webkit-overflow-scrolling: touch;
  position: relative;
  background-color: var(--border-color);
  border: 2px solid var(--border-color);
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const TouchInstructions = styled.div`
  color: var(--text-color);
  font-size: 0.9rem;
  opacity: 0.8;
  text-align: center;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ZoomIndicator = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  opacity: 0.8;
`;

const BoardContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  overflow: auto;
`;

const Board = styled.div<{ cols: number; isTouchDevice: boolean; scale: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.cols}, ${props => props.isTouchDevice ? '24px' : '30px'});
  gap: 1px;
  min-width: min-content;
  transform-origin: center;
  transform: scale(${props => props.scale});
  transition: transform 0.1s ease;
`;

const Cell = styled.button<{ isRevealed: boolean; isFlagged: boolean; isLongPressing?: boolean; isTouchDevice: boolean }>`
  width: ${props => props.isTouchDevice ? '24px' : '30px'};
  height: ${props => props.isTouchDevice ? '24px' : '30px'};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.isRevealed ? '#e0e0e0' : 'white'};
  border: none;
  cursor: pointer;
  font-weight: bold;
  font-size: ${props => props.isTouchDevice ? '0.8rem' : '1rem'};
  transition: all 0.2s ease;
  transform: ${props => props.isLongPressing ? 'scale(0.9)' : 'none'};

  &:hover {
    background-color: ${props => props.isRevealed ? '#e0e0e0' : '#f5f5f5'};
  }

  &:active {
    transform: ${props => props.isRevealed ? 'none' : 'scale(0.95)'};
  }
`;

interface CellData {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

interface GameBoardProps {
  rows: number;
  cols: number;
  mines: number;
  onGameOver: (won: boolean) => void;
  onUpdateMineCount: (count: number) => void;
}

const getNeighborCoords = (row: number, col: number, maxRow: number, maxCol: number) => {
  const neighbors = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      const newRow = row + i;
      const newCol = col + j;
      if (newRow >= 0 && newRow < maxRow && newCol >= 0 && newCol < maxCol) {
        neighbors.push([newRow, newCol]);
      }
    }
  }
  return neighbors;
};

export default function GameBoard({ rows, cols, mines, onGameOver, onUpdateMineCount }: GameBoardProps) {
  const [board, setBoard] = useState<CellData[][]>(() => 
    Array(rows).fill(null).map(() =>
      Array(cols).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborMines: 0,
      }))
    )
  );
  const [isFirstClick, setIsFirstClick] = useState(true);
  const [remainingFlags, setRemainingFlags] = useState(mines);
  const [touchTimer, setTouchTimer] = useState<NodeJS.Timeout | null>(null);
  const [longPressingCell, setLongPressingCell] = useState<{row: number, col: number} | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [scale, setScale] = useState(1);
  const [initialTouchDistance, setInitialTouchDistance] = useState<number | null>(null);
  const [initialScale, setInitialScale] = useState(1);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window);
    // Set initial scale based on board size for touch devices
    if ('ontouchstart' in window) {
      const viewportWidth = Math.min(window.innerWidth, 900);
      const boardWidth = cols * (24 + 1); // cell width + gap
      if (boardWidth > viewportWidth * 0.9) {
        setScale((viewportWidth * 0.9) / boardWidth);
      }
    }
  }, [cols]);

  const initializeBoard = (firstClickRow: number, firstClickCol: number) => {
    // Create empty board
    const newBoard: CellData[][] = Array(rows).fill(null).map(() =>
      Array(cols).fill(null).map(() => ({
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborMines: 0,
      }))
    );

    // Place mines (avoiding first click)
    let minesToPlace = mines;
    while (minesToPlace > 0) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      
      // Skip if it's the first click cell or its neighbors, or if there's already a mine
      if ((Math.abs(row - firstClickRow) <= 1 && Math.abs(col - firstClickCol) <= 1) || 
          newBoard[row][col].isMine) {
        continue;
      }

      newBoard[row][col].isMine = true;
      minesToPlace--;
    }

    // Calculate neighbor mines
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (newBoard[row][col].isMine) continue;
        
        const neighbors = getNeighborCoords(row, col, rows, cols);
        newBoard[row][col].neighborMines = neighbors.reduce((count, [r, c]) => 
          count + (newBoard[r][c].isMine ? 1 : 0), 0);
      }
    }

    return newBoard;
  };

  const revealCell = (row: number, col: number, currentBoard: CellData[][]) => {
    if (currentBoard[row][col].isRevealed || currentBoard[row][col].isFlagged) return;

    currentBoard[row][col].isRevealed = true;

    if (currentBoard[row][col].neighborMines === 0 && !currentBoard[row][col].isMine) {
      const neighbors = getNeighborCoords(row, col, rows, cols);
      neighbors.forEach(([r, c]) => {
        if (!currentBoard[r][c].isRevealed) {
          revealCell(r, c, currentBoard);
        }
      });
    }
  };

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col].isFlagged) return;

    if (isFirstClick) {
      const newBoard = initializeBoard(row, col);
      revealCell(row, col, newBoard);
      setBoard(newBoard);
      setIsFirstClick(false);
      return;
    }

    if (board[row][col].isMine) {
      // Game Over
      const revealedBoard = board.map(row =>
        row.map(cell => ({ ...cell, isRevealed: true }))
      );
      setBoard(revealedBoard);
      onGameOver(false);
      return;
    }

    const newBoard = board.map(row => [...row]);
    revealCell(row, col, newBoard);
    setBoard(newBoard);

    // Check win condition
    const unrevealedCells = newBoard.flat().filter(cell => !cell.isRevealed).length;
    if (unrevealedCells === mines) {
      onGameOver(true);
    }
  };

  const toggleFlag = (row: number, col: number) => {
    if (board[row][col].isRevealed) return;

    const newBoard = board.map(row => [...row]);
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    setBoard(newBoard);

    const newRemainingFlags = remainingFlags + (newBoard[row][col].isFlagged ? -1 : 1);
    setRemainingFlags(newRemainingFlags);
    onUpdateMineCount(newRemainingFlags);
  };

  const handleRightClick = (e: React.MouseEvent, row: number, col: number) => {
    if (isTouchDevice) return; // Disable right click on touch devices
    e.preventDefault();
    toggleFlag(row, col);
  };

  const handleTouchStart = (row: number, col: number, e: React.TouchEvent) => {
    if (!isTouchDevice) return;

    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = getTouchDistance(e.touches as unknown as React.TouchList);
      if (distance) {
        setInitialTouchDistance(distance);
        setInitialScale(scale);
      }
    } else {
      setLongPressingCell({ row, col });
      const timer = setTimeout(() => {
        toggleFlag(row, col);
        setLongPressingCell(null);
      }, 500); // 500ms long press
      setTouchTimer(timer);
    }
  };

  const handleTouchEnd = () => {
    setLongPressingCell(null);
    if (touchTimer) {
      clearTimeout(touchTimer);
      setTouchTimer(null);
    }
    setInitialTouchDistance(null);
  };

  const getTouchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return null;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = getTouchDistance(e.touches as unknown as React.TouchList);
      
      if (distance && initialTouchDistance) {
        const newScale = (distance / initialTouchDistance) * initialScale;
        setScale(Math.min(Math.max(newScale, 0.5), 2));
      }
    }
    handleTouchEnd();
  };

  useEffect(() => {
    if (isFirstClick) {
      onUpdateMineCount(mines);
    }
  }, [isFirstClick, mines, onUpdateMineCount]);

  const getCellContent = (cell: CellData) => {
    if (cell.isFlagged) return '🚩';
    if (!cell.isRevealed) return '';
    if (cell.isMine) return '💣';
    return cell.neighborMines || '';
  };

  const getCellColor = (cell: CellData) => {
    if (!cell.isRevealed || cell.neighborMines === 0) return 'inherit';
    const colors = ['#1976d2', '#388e3c', '#d32f2f', '#7b1fa2', '#ff5722', '#0097a7', '#424242', '#9e9e9e'];
    return colors[cell.neighborMines - 1] || 'inherit';
  };

  return (
    <BoardWrapper>
      {isTouchDevice && (
        <TouchInstructions>
          <div>💡 Long press to flag suspicious cells</div>
          <div>👆 Use two fingers to zoom in/out</div>
        </TouchInstructions>
      )}
      <BoardContainer>
        <Board cols={cols} isTouchDevice={isTouchDevice} scale={scale}>
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                isRevealed={cell.isRevealed}
                isFlagged={cell.isFlagged}
                isLongPressing={longPressingCell?.row === rowIndex && longPressingCell?.col === colIndex}
                isTouchDevice={isTouchDevice}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
                onTouchStart={(e) => handleTouchStart(rowIndex, colIndex, e)}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
                style={{ color: getCellColor(cell) }}
              >
                {getCellContent(cell)}
              </Cell>
            ))
          )}
        </Board>
        {isTouchDevice && scale !== 1 && (
          <ZoomIndicator>
            {Math.round(scale * 100)}%
          </ZoomIndicator>
        )}
      </BoardContainer>
    </BoardWrapper>
  );
}
