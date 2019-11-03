import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/global';
import { dark, light } from 'styles/theme';
import { useSettings } from 'contexts/SettingsContext';
import Header from 'components/Header';
// import NumbersTouchControl from 'components/NumbersTouchControl';
import GridContainer from 'components/GridContainer';
import GameControls from 'components/GameControls';
import Settings from 'components/Settings';
import useDocumentTitle from 'hooks/useDocumentTitle';
import useSudoku from 'hooks/useSudoku';

// import runOnLoad from 'lib/runOnLoad';

const AppStyles = styled.div`
  max-width: 64rem;
  min-width: 35rem;
  margin: 0 auto;
  padding: 0 2rem 4rem;
`;

export default function App() {
  const [gameState, gameActions] = useSudoku();
  const { settings } = useSettings();
  useDocumentTitle('Play Sudoku Online');

  return (
    <ThemeProvider theme={settings.darkTheme ? dark : light}>
      <AppStyles>
        <GlobalStyles />
        <Header />
        <p>
          Select a grid cell to enter a value 1 through 9. Navigate the grid with arrow
          keys or go to a cell directly by pressing a row key (<kbd>A</kbd> - <kbd>I</kbd>
          ) followed by a column key (<kbd>1</kbd> - <kbd>9</kbd>). Cells with starting
          values are not editable and will be skipped.
        </p>
        <p>
          Difficulty: {gameState.difficulty}, Hints remaining: {gameState.hintsRemaining}
        </p>
        {gameState.isSolved && <h2>Solved! Good work.</h2>}
        {gameState.isFilledButUnsolved && (
          <h2>Hmm. That's not quite right, check your work.</h2>
        )}
        {/* <NumbersTouchControl /> */}
        <GridContainer {...{ gameState, gameActions }} />
        <GameControls {...{ gameState, gameActions }} />
        <Settings />
        {/* <h2>Time: 00:00</h2> */}
        {/* <h2>Mode: play/solve</h2> */}
        <h2>
          Solving a Sudoku puzzle with Norvig's constraint propagation and search
          algorithm
        </h2>
      </AppStyles>
    </ThemeProvider>
  );
}
