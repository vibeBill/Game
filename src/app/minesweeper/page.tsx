'use client';

import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import DifficultySelector, { Difficulty } from './components/DifficultySelector';
import GameBoard from './components/GameBoard';
import Navbar from './components/Navbar';
import SettingsModal from './components/SettingsModal';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const GameOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const GameOverMessage = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;

  h2 {
    color: var(--primary-color);
    margin-bottom: 1rem;
  }

  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      opacity: 0.9;
    }
  }
`;

export default function MinesweeperPage() {
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [gameOver, setGameOver] = useState<boolean | null>(null);
  const [remainingMines, setRemainingMines] = useState(0);
  const [time, setTime] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    soundVolume: 50,
    musicVolume: 30,
  });
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (difficulty && gameOver === null) {
      const interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
      setTimerInterval(interval);
      return () => clearInterval(interval);
    }
    return undefined;
  }, [difficulty, gameOver]);

  const handleGameOver = (won: boolean) => {
    setGameOver(won);
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  };

  const handleRestart = () => {
    setDifficulty(null);
    setGameOver(null);
    setTime(0);
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  };

  const handleSettingsSave = (newSettings: { soundVolume: number; musicVolume: number }) => {
    setSettings(newSettings);
    setIsSettingsOpen(false);
  };

  if (!difficulty) {
    return (
      <GameContainer>
        <DifficultySelector onSelect={setDifficulty} />
      </GameContainer>
    );
  }

  return (
    <GameContainer>
      <Navbar
        remainingMines={remainingMines}
        time={time}
        onRestart={handleRestart}
        onSettings={() => setIsSettingsOpen(true)}
      />
      <GameBoard
        rows={difficulty.rows}
        cols={difficulty.cols}
        mines={difficulty.mines}
        settings={settings}
        onGameOver={handleGameOver}
        onUpdateMineCount={setRemainingMines}
      />
      {gameOver !== null && (
        <GameOverlay>
          <GameOverMessage>
            <h2>{gameOver ? 'Congratulations!' : 'Game Over!'}</h2>
            <p>{gameOver ? 'You won the game!' : 'Better luck next time!'}</p>
            <p>Time: {time} seconds</p>
            <button onClick={handleRestart}>Play Again</button>
          </GameOverMessage>
        </GameOverlay>
      )}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={handleSettingsSave}
      />
    </GameContainer>
  );
}
