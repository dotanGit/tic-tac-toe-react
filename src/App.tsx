import { useState } from 'react';
import GameStatus from './components/GameStatus';
import Board from './components/Board';
import RestartButton from './components/RestartButton';
import type { Player, Board as BoardType, Winner, WinningLine } from './types';
import { INITIAL_BOARD, INITIAL_PLAYER, WINNING_COMBINATIONS } from './types';
import './App.css';

function App() {
  // Game State Management
  // ---------------------
  // board: Tracks X, O, or empty for each of the 9 cells
  const [board, setBoard] = useState<BoardType>(INITIAL_BOARD);
  
  // currentPlayer: Tracks whose turn it is (X or O)
  const [currentPlayer, setCurrentPlayer] = useState<Player>(INITIAL_PLAYER);
  
  // winner: Tracks game outcome (X won, O won, Draw, or null for game in progress)
  const [winner, setWinner] = useState<Winner>(null);
  
  // winningLine: Tracks the 3 cell indices that form a winning line (or null)
  const [winningLine, setWinningLine] = useState<WinningLine>(null);

  /**
   * Check if the current player has won
   * Returns: { hasWon: boolean, winningLine: [number, number, number] | null }
   */
  const checkWinner = (boardState: BoardType, player: Player): { hasWon: boolean; winningLine: WinningLine } => {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (
        boardState[a] === player &&
        boardState[b] === player &&
        boardState[c] === player
      ) {
        return { hasWon: true, winningLine: combination };
      }
    }
    return { hasWon: false, winningLine: null };
  };

  /**
   * Check if the board is full (all cells filled)
   * Returns: true if board is full, false otherwise
   */
  const checkDraw = (boardState: BoardType): boolean => {
    return boardState.every(cell => cell !== '');
  };

  /**
   * Handle cell click event
   * Validates move, updates board, checks for win/draw, switches player
   */
  const handleCellClick = (index: number) => {
    // Validation 1: Game is already over
    if (winner) {
      return;
    }

    // Validation 2: Cell is already filled
    if (board[index] !== '') {
      return;
    }

    // Create new board with current player's move
    const newBoard = [...board] as BoardType;
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    // Check if current player won
    const { hasWon, winningLine: foundWinningLine } = checkWinner(newBoard, currentPlayer);
    
    if (hasWon) {
      // Current player wins!
      setWinner(currentPlayer);
      setWinningLine(foundWinningLine);
      return;
    }

    // Check for draw (board full and no winner)
    if (checkDraw(newBoard)) {
      setWinner('Draw');
      return;
    }

    // Switch to other player
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  /**
   * Reset the game to initial state
   */
  const handleRestart = () => {
    setBoard(INITIAL_BOARD);
    setCurrentPlayer(INITIAL_PLAYER);
    setWinner(null);
    setWinningLine(null);
  };

  return (
    <div className="app">
      <h1>Tic-Tac-Toe</h1>
      <GameStatus currentPlayer={currentPlayer} winner={winner} />
      <Board board={board} winningLine={winningLine} onCellClick={handleCellClick} />
      <RestartButton onRestart={handleRestart} />
    </div>
  );
}

export default App;
