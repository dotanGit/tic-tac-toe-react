export type Player = 'X' | 'O';

export type CellValue = Player | '';

export type Winner = Player | 'Draw' | null;

export type Board = [CellValue, CellValue, CellValue, CellValue, CellValue, CellValue, CellValue, CellValue, CellValue];

export type WinningLine = [number, number, number] | null;

export const WINNING_COMBINATIONS: [number, number, number][] = [
  // Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonal
  [0, 4, 8],
  [2, 4, 6],
];

// Initial game state constants
export const INITIAL_BOARD: Board = ['', '', '', '', '', '', '', '', ''];
export const INITIAL_PLAYER: Player = 'X';

