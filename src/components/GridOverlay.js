import React from 'react';
import styled from 'styled-components';
import { addAlpha } from 'styles/helpers';

const Styles = styled.div`
  grid-row: top / bottom;
  grid-column: start / end;
  background: ${p => addAlpha(p.theme.colors.background, 0.9)};
  /* position: absolute; */
  /* width: 100%;
  height: 100%; */
  z-index: 500;
`;

export default function GridOverlay() {
  return <Styles></Styles>;
}
