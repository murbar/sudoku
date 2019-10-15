import React from 'react';
import styled from 'styled-components';
import ColumnLabels from 'components/ColumnLabels';
import RowLabels from 'components/RowLabels';
import GameGrid from 'components/GameGrid';
import { media } from 'styles/helpers';

const Styles = styled.div`
  --grid-label-width: 1em;
  --grid-label-color: #999;
  --grid-border-width: 0.3rem;
  --border-color: #444;
  --pen-color: ${p => p.theme.colors.pine};
  --starting-values-color: #444;
  --warn-color: hsl(14, 75%, 50%);
  --warn-bg-color: hsla(14, 75%, 50%, 0.3);
  --highlight-bg-color: white;
  --grid-font-size: 1.8rem;

  ${media.px400`    
    --grid-font-size: 2.2rem;
  `}
  ${media.px450`    
    --grid-font-size: 2.8rem;
  `}
  ${media.phone`    
    --grid-font-size: 3.2rem;
  `}
  ${media.px600`    
    --grid-font-size: 3.5rem;
  `}

  display: grid;
  grid-template-columns: [start] var(--grid-label-width) 1fr [end];
  grid-template-rows: [top] var(--grid-label-width) 1fr [bottom];
  grid-template-areas: 
    ". col-labels"
    "row-labels main-grid";
`;

export default function GridContainer({ gameState, gameActions }) {
  return (
    <Styles>
      <ColumnLabels />
      <RowLabels />
      <GameGrid
        cells={gameState.currentCells}
        isPaused={gameState.isPaused}
        handleCellChange={gameActions.setCell}
        startingCellIndexes={gameState.startingCellIndexes}
        invalidCellIndexes={gameState.invalidCellIndexes}
      />
    </Styles>
  );
}
