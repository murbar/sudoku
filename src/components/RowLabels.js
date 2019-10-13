import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  grid-column: 1;
  font-size: calc(var(--grid-label-width) * 0.8);
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
