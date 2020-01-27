import React from 'react';
import styled from 'styled-components';
import { ColumnLabels, RowLabels } from 'components/GridLabels';
import GameGrid from 'components/GameGrid';
import GridOverlay from 'components/GridOverlay';
import { mediaAbove, addHslAlpha } from 'styles/helpers';

const Styles = styled.div`
  --grid-label-width: 2rem;
  --grid-label-color: ${p => addHslAlpha(p.theme.colors.foreground, 0.5)};
  --grid-border-width: 0.3rem;
  --border-color: ${p => p.theme.colors.foreground};
  --pen-color: ${p => p.theme.colors.pen};
  --starting-values-color: ${p => addHslAlpha(p.theme.colors.foreground, 1)};
  --warn-color: ${p => p.theme.colors.warn};
  --warn-bg-color: ${p => addHslAlpha(p.theme.colors.warn, 0.2)};
  --highlight-bg-color: ${p => addHslAlpha(p.theme.colors.pen, 0.15)};
  --grid-font-size: 2.5rem;
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
