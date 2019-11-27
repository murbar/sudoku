import React from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import { difficulties } from 'lib/common';
import useHotKeyMap from 'hooks/useHotKeyMap';

const Styles = styled.div``;

const DifficultySelect = ({ current, setDifficulty }) => {
  const handleChange = e => {
    const { value } = e.target;
    setDifficulty(parseInt(value, 10));
  };

  return (
    <div>
      <label>
        Difficulty
        <select value={current} onChange={handleChange}>
          <option value={difficulties.EASY}>Easy</option>
          <option value={difficulties.NORMAL}>Normal</option>
          <option value={difficulties.HARD}>Hard</option>
        </select>
      </label>
    </div>
  );
};

export default function GameControls({ gameState, gameActions }) {
  useHotKeyMap({
    p: gameActions.togglePaused,
    n: gameActions.initNewGame,
    s: gameActions.solveGame,
    r: gameActions.resetGame
  });

  return (
    <Styles>
      <Button onClick={gameActions.togglePaused}>
        {gameState.isPaused ? 'Resume' : 'Pause'}
      </Button>
      <Button onClick={gameActions.getHint} disabled={gameState.hintsRemaining < 1}>
        Get Hint
      </Button>
      <Button onClick={gameActions.solveGame}>Solve</Button>
      <Button onClick={gameActions.clearCells}>Clear</Button>
      <Button onClick={gameActions.resetGame}>Reset</Button>
      <Button onClick={gameActions.initNewGame}>New</Button>
      <DifficultySelect
        current={gameState.difficulty}
        setDifficulty={gameActions.setDifficulty}
      />
    </Styles>
  );
}
