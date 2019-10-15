import React from 'react';
import styled, { css } from 'styled-components';
import { addAlpha } from 'styles/helpers';
import Button from 'components/Button';

const Styles = styled.div`
  grid-row: top / bottom;
  grid-column: start / end;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: ${p => addAlpha(p.theme.colors.background, 0.9)};
  z-index: 500;
  pointer-events: none;
  opacity: 0;
  transition: opacity 200ms;
  ${p =>
    p.show &&
    css`
      pointer-events: auto;
      opacity: 1;
    `}
`;

const Message = styled.div`
  font-weight: 700;
  font-size: 3em;
`;

const Controls = styled.div``;

const PausedMessage = ({ resume }) => (
  <>
    <Message>Game Paused</Message>
    <Controls>
      <Button onClick={resume}>Resume</Button>
    </Controls>
  </>
);

export default function GridOverlay({ state, actions }) {
  const show = state.isPaused;

  return (
    <Styles show={show}>
      {state.isPaused && <PausedMessage resume={actions.togglePaused} />}
    </Styles>
  );
}
