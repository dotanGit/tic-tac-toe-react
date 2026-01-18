import Cell from './Cell';
import type { Board as BoardType, WinningLine } from '../types';

interface BoardProps {
  board: BoardType; 
  winningLine: WinningLine; 
  onCellClick: (index: number) => void;
}

function Board({ board, winningLine, onCellClick }: BoardProps) {
  return (
    <div className="board">
      {board.map((value, index) => (
        <Cell
          key={index}
          value={value}
          isWinning={winningLine?.includes(index) || false}
          onClick={() => onCellClick(index)}
          index={index}
        />
      ))}
    </div>
  );
}

export default Board;

