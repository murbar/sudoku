import React from 'react';
import styled from 'styled-components';
import { ColumnLabels, RowLabels } from 'components/GridLabels';
import GameGrid from 'components/GameGrid';
import GridOverlay from 'components/GridOverlay';
import { mediaAbove, addHslAlpha } from 'styles/helpers';

const Styles = styled.div`
  --grid-label-width: 2rem;
  --grid-label-color: #999;
  --grid-border-width: 0.3rem;
  --border-color: #444;
  --starting-values-color: ${p => addHslAlpha(p.theme.colors.foreground, 0.5)};
  --warn-color: hsl(14, 75%, 50%);
  --warn-bg-color: hsla(14, 75%, 50%, 0.3);
  --highlight-bg-color: white;
  --grid-font-size: 1.8rem;
  margin: 0 0 0 -2rem;

  ${mediaAbove.phone`    
    --grid-font-size: 3.5rem;
  `}

  display: grid;
  grid-template-columns: [start] var(--grid-label-width) 1fr [end];
  grid-template-rows: [top] var(--grid-label-width) 1fr [bottom];
  grid-template-areas: 
    '. col-labels'
    'row-labels main-grid';
`;

export default function GridContainer({ gameState, gameActions }) {
  return (
    <Styles>
      <ColumnLabels />
      <RowLabels />
      <GameGrid
        cells={gameState.currentCells}
        handleCellChange={gameActions.setCell}
        startingCellIndexes={gameState.startingCellIndexes}
        invalidCellIndexes={gameState.invalidCellIndexes}
        isPaused={gameState.isPaused}
      />
      <GridOverlay />
    </Styles>
  );
}
