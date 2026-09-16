import { useEffect, useState } from "react";
import './../styles/score.css';

export function Score () {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  function updateCurrentScore () {
    setCurrentScore(currentScore + 1);
  }

  function resetCurrentScore () {
    setCurrentScore(0);
  }

  if (currentScore > highScore) {
    setHighScore(currentScore);
  }

  return ( 
    <div className="scores">
      <div className="currentScore">
        Current Score : {currentScore}
      </div>
      <div className="highScore">
        High Score : {highScore}
      </div>
    </div>
  );
}
