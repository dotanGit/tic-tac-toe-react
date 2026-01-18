interface RestartButtonProps {
  onRestart: () => void;
}

function RestartButton({ onRestart }: RestartButtonProps) {
  return (
    <button className="restart-button" onClick={onRestart}>
      New Game
    </button>
  );
}

export default RestartButton;

