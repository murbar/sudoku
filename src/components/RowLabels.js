import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  grid-area: row-labels;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  font-size: calc(var(--grid-label-width) * 0.75);
  font-weight: bold;
  line-height: 1;
  padding: var(--grid-border-width) 0;
  color: var(--grid-label-color);
`;

const rows = 'ABCDEFGHI';

export default function RowLabels() {
  return (
    <Styles>
      {[...rows].map(label => (
        <div key={label}>{label}</div>
      ))}
    </Styles>
  );
}
