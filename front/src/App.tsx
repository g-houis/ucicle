import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RiderSelect from './components/RiderSelect';
import { Rider } from './types/CyclingTypes';
import GuessTable from './components/GuessTable';
import { addGameSession, getGameHistory, getTodayGameSession } from './services/gameService';
import { GameParticipation, GameSession } from './types/GameType';
import NavBar from './components/NavBar';
import ResultCard from './components/ResultCard';
import HintCard from './components/HintCard';
import Conditional from './components/theme/Conditional';

export default function App() {
  const gameHistory: GameParticipation[] = getGameHistory();
  const gameParticipation: GameParticipation | null = getTodayGameSession(gameHistory);
  const [guesses, setGuesses] = useState<Rider[]>(gameParticipation?.guesses ?? []);

  const [riders, setRiders] = useState<Rider[]>([]);
  const [gameSession, setGameSession] = useState<GameSession>();

  useEffect(() => {
    axios.get('/api/riders.json')
      .then((fetchedRiders) => {
        setRiders(fetchedRiders.data);
      });

    axios.get('/api/secret_rider.json')
      .then((fetchedGameSession) => {
        setGameSession(fetchedGameSession.data);
      });
  }, []);

  const addGuess = (guess: Rider) => {
    if (guess.name === gameSession?.rider.name) {
      addGameSession(gameSession.rider, [...guesses, guess], true);
      setGuesses([...guesses, guess]);
    } else if (guesses.length === 4 && !!gameSession) {
      addGameSession(gameSession.rider, [...guesses, guess], false);
      setGuesses([...guesses, guess]);
    } else {
      setGuesses([...guesses, guess]);
    }
  };

  return (
    <>
      <NavBar gameHistory={gameHistory}/>
      <main>
        <Conditional conditions={[!!gameParticipation]}>
          <ResultCard gameParticipation={gameParticipation} />
        </Conditional>
        <Conditional conditions={[!gameParticipation]}>
          { gameSession && <HintCard bestResult={gameSession.rider.bestResult} />}
          <RiderSelect addGuess={addGuess} riders={riders} guesses={guesses.length} />
        </Conditional>
        <Conditional conditions={[!!guesses.length, !!gameSession]}>
          { gameSession && <GuessTable guesses={guesses} reference={gameSession.rider} />}
        </Conditional>
      </main>
    </>
  );
}
