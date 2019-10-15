import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  grid-area: col-labels;
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  font-size: calc(var(--grid-label-width) * 0.8);
  font-weight: bold;
  line-height: 1;
  padding: 0 var(--grid-border-width) 0;
  color: var(--grid-label-color);
`;

const cols = '123456789';

export default function ColumnLabels() {
  return (
    <Styles>
      {[...cols].map(label => (
        <div key={label}>{label}</div>
      ))}
    </Styles>
  );
}
