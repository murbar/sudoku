import React from 'react';
import styled from 'styled-components';
import { ReactComponent as GridImage } from 'images/grid.svg';

const Styles = styled.div`
  /* default display inserts a line return in the rendered HTML that throws off our layout */
  display: flex;
  grid-row: 2 / bottom;
  grid-column: 2 / end;
  z-index: 500;
  pointer-events: none;
  color: var(--grid-border-color); /* inherited by grid SVG */
  svg {
    width: 100%;
  }
`;

export default function GridLines() {
  return (
    <Styles>
      <GridImage />
    </Styles>
  );
}
