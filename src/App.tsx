import { useState } from 'react';
import GameStatus from './components/GameStatus';
import Board from './components/Board';
import RestartButton from './components/RestartButton';
import type { Player, Board as BoardType, Winner, WinningLine } from './types';
import { INITIAL_BOARD, INITIAL_PLAYER, WINNING_COMBINATIONS } from './types';
import './App.css';

function App() {

  const [board, setBoard] = useState<BoardType>(INITIAL_BOARD);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(INITIAL_PLAYER);
  const [winner, setWinner] = useState<Winner>(null);
  const [winningLine, setWinningLine] = useState<WinningLine>(null);

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

  const checkDraw = (boardState: BoardType): boolean => {
    return boardState.every(cell => cell !== '');
  };

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
