import React from 'react';
import styled from 'styled-components';
import useDocumentTitle from 'hooks/useDocumentTitle';
import GameGrid from 'components/GameGrid';
import useSudoku from 'hooks/useSudoku';
import Header from 'components/Header';

const Styles = styled.div``;

export default function SudokuPage() {
  useDocumentTitle('Sudoku');
  const {
    cells,
    startingValueIndexes,
    hintsRemaining,
    isSolved,
    isPaused,
    isFilledButUnsolved,
    actions
  } = useSudoku();

  return (
    <Styles>
      <Header />
      {isSolved && <h2>Solved! Good work.</h2>}
      {isFilledButUnsolved && <h2>Hmm. That's not quite right, check your work.</h2>}
      <p>Hints remaining: {hintsRemaining}</p>
      <GameGrid
        cells={cells}
        isPaused={isPaused}
        handleCellChange={actions.setCell}
        startingValueIndexes={startingValueIndexes}
      />
      <button onClick={actions.getHint} disabled={hintsRemaining < 1}>
        Get Hint
      </button>
      <button onClick={actions.solveGame}>Solve</button>
      <button onClick={actions.initNewGame}>New</button>
      <button onClick={actions.resetGame}>Reset</button>
      <button onClick={actions.togglePaused}>{isPaused ? 'Resume' : 'Pause'}</button>
      <button onClick={actions.clearCells}>Clear</button>
      {/* <h2>Time: 00:00</h2> */}
      {/* <h2>Mode: play/solve</h2> */}
    </Styles>
  );
}
