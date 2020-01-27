import React from 'react';
import styled from 'styled-components';
import { mediaAbove } from 'styles/helpers';

const cols = '123456789';
const rows = 'ABCDEFGHI';

const LabelStyles = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  font-size: calc(var(--grid-label-width) * 0.75);
  font-weight: bold;
  line-height: 1;
  color: var(--grid-label-color);
  visibility: hidden;

  ${mediaAbove.phone`    
    visibility: visible;
  `}
`;

const ColumnStyles = styled(LabelStyles)`
  grid-area: col-labels;
  width: 100%;
  padding: 0 var(--grid-border-width) 0;
`;

const RowStyles = styled(LabelStyles)`
  grid-area: row-labels;
  flex-direction: column;
  padding: var(--grid-border-width) 0;
`;

function DivMap({ labels }) {
  return (
    <>
      {[...labels].map(label => (
        <div key={label}>{label}</div>
      ))}
    </>
  );
}

export function ColumnLabels() {
  return (
    <ColumnStyles>
      <DivMap labels={cols} />
    </ColumnStyles>
  );
}

export function RowLabels() {
  return (
    <RowStyles>
      <DivMap labels={rows} />
    </RowStyles>
  );
}
