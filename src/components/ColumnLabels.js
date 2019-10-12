import React from 'react';
import styled from 'styled-components';

const Styles = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: space-between;
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
