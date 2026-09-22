import './../styles/score.css';

export function Scores ({score, hscore}) {
  
  return ( 
    <div className="scores">
      <div className="currentScore">
        Current Score : {score}
      </div>
      <div className="highScore">
        High Score : {hscore}
      </div>
    </div>
  );
}

