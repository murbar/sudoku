import React from 'react';
import styled from 'styled-components';

const Styles = styled.div``;

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
