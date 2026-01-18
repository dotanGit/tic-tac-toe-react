import type { Player, Winner } from '../types';

interface GameStatusProps {
  currentPlayer: Player; 
  winner: Winner; 
}

function GameStatus({ currentPlayer, winner }: GameStatusProps) {
  const getStatusMessage = () => {
    if (winner === 'Draw') {
      return 'Draw!';
    } else if (winner) {
      return `Winner: ${winner}`;
    } else {
      return `Next turn: ${currentPlayer}`;
    }
  };

  return (
    <div className="game-status">
      <h2>{getStatusMessage()}</h2>
    </div>
  );
}

export default GameStatus;

