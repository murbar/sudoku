import React from 'react';
import styled from 'styled-components';
import useDocumentTitle from 'hooks/useDocumentTitle';
import GameGrid from 'components/GameGrid';
import useSudoku from 'hooks/useSudoku';
import Header from 'components/Header';

const Styles = styled.div`
  max-width: 66rem;
  margin: 0 auto;
  padding: 0 2rem 4rem;
`;

export default function App() {
  // const {
  //   cells,
  //   startingValueIndexes,
  //   hintsRemaining,
  //   isSolved,
  //   isPaused,
  //   isFilledButUnsolved,
  //   difficulty,
  //   actions
  // } = useSudoku();
  const [gameState, gameActions] = useSudoku();
  useDocumentTitle('Play Sudoku Online');

  return (
    <Styles>
      <Header />
      {gameState.isSolved && <h2>Solved! Good work.</h2>}
      {gameState.isFilledButUnsolved && (
        <h2>Hmm. That's not quite right, check your work.</h2>
      )}
      <p>
        Difficulty: {gameState.difficulty}, Hints remaining: {gameState.hintsRemaining}
      </p>
      <GameGrid
        cells={gameState.currentCells}
        isPaused={gameState.isPaused}
        handleCellChange={gameActions.setCell}
        startingValueIndexes={gameState.startingValueIndexes}
      />
      <button onClick={gameActions.getHint} disabled={gameState.hintsRemaining < 1}>
        Get Hint
      </button>
      <button onClick={gameActions.solveGame}>Solve</button>
      <button onClick={gameActions.initNewGame}>New</button>
      <button onClick={gameActions.resetGame}>Reset</button>
      <button onClick={gameActions.togglePaused}>
        {gameState.isPaused ? 'Resume' : 'Pause'}
      </button>
      <button onClick={gameActions.clearCells}>Clear</button>
      {/* <h2>Time: 00:00</h2> */}
      {/* <h2>Mode: play/solve</h2> */}
    </Styles>
  );
}
