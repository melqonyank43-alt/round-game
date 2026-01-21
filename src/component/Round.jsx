import { useEffect, useState } from "react";

function Round() {
  const [round, setRound] = useState(Array(9).fill(0));
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(20);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    setScore(0);
    setTime(20);
    setRound(Array(9).fill(0));
    setGameOver(false);
  };

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      const x = Math.floor(Math.random() * 9);
      const newRound = Array(9).fill(0);
      newRound[x] = 1;
      setRound(newRound);
    }, 600);

    const timer = setInterval(() => {
      setTime(t => {
        if (t <= 1) {
          clearInterval(interval);
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [gameOver]);

  const message = gameOver ? (score >= 20 ? "Winner 🎉" : "Game Over 💀") : null;

  useEffect(() => {
    if (!gameOver) return;

    const audio = new Audio(
      score >= 20 
        ? "/11l-victory-1749704550711-358777.mp3" 
        : "/verloren-89595.mp3"
    );
    audio.play();
  }, [gameOver, score]);

  return (
    <div>
      <h2>Score: {score}</h2>
      <h2>Time: {time}</h2>
      {message && <h1>{message}</h1>}

      {gameOver && (
        <button onClick={startGame}>
          Restart
        </button>
      )}

      <div className="Header">
        {round.map((klor, index) => (
          <div
            key={index}
            className="circle"
            onClick={() => {
              if (!gameOver && klor === 1) {
                setScore(s => s + 1);
                const newRound = [...round];
                newRound[index] = 0;
                setRound(newRound);
              }
            }}
          >
            {klor === 1 && <img src="/orig.webp" alt="orig" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Round;






