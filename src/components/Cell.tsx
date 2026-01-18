import type { CellValue } from '../types';

interface CellProps {
  value: CellValue; 
  isWinning: boolean;
  onClick: () => void;
  index: number;
}

function Cell({ value, onClick }: CellProps) {
  // Cell should not be clickable if already filled
  const isDisabled = value !== '';
  
  
  const cellClass = value === 'X' ? 'cell cell-x' : value === 'O' ? 'cell cell-o' : 'cell';
  
  return (
    <button
      className={cellClass}
      onClick={onClick}
      disabled={isDisabled}
    >
      {value}
    </button>
  );
}

export default Cell;

