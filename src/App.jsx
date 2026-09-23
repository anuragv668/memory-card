import './styles/app.css';
import {Scores} from './components/score.jsx';
import {Card} from './components/card.jsx';
import { useEffect, useState } from 'react';

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pokemons, setPokemons] = useState([]);
  const [clicked, setClicked] = useState([]);

  function resetClicked () {
    setClicked([]);
  }

  function addClicked(item) {
    setClicked([...clicked, item]);
  }

  async function getPokemon(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    return {
      name: data.name,
      image: data.sprites.other["official-artwork"].front_default,
      id: data.id
    }
  }

  useEffect (() => {
  async function fetchPokemons() {
    const results = [];
    for (let i = 0; i < 12; i++) {
      const pokemon = await getPokemon(Math.floor(Math.random() * 1000) + 1);
      results.push(pokemon);
    }
    setPokemons(results);
  }
  fetchPokemons();
  }, []);

  function clickHandler(pokemon) {
    if (clicked.includes(pokemon.id)) {
      resetClicked();
      setCurrentScore(0);
    } else {
      addClicked(pokemon.id);
      updateCurrentScores();
      setPokemons(prev => shuffle(prev));
    }
  }

  function shuffle(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  function updateCurrentScores() {
    setCurrentScore((prev) => {
      const newScore = prev + 1;
      if (newScore > highScore)
        setHighScore(newScore);
      if (newScore >= 12) {
        return 0;
      }
      return newScore;
    })
  }

  return (
    <div className = "app">
      <h1>Memory Card Game</h1>
      <div className="description">
        <ul>
          <b>Rules: </b>
          <li>Clicking on card adds points.</li>
          <li>Game Ends when you click the same card twice. </li>
        </ul>
      </div>
      <Scores score={currentScore} hscore={highScore}/>
      <div className="cards">
        {pokemons && 
          pokemons.map((pokemon) => {
            return <Card onClick={() => clickHandler(pokemon)} obj={pokemon} key={pokemon.id} />
          })
        }
      </div>
    </div>
  )
}

export default App
