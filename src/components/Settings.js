import React from 'react';
import styled from 'styled-components';

const Styles = styled.div``;

export default function Settings() {
  return (
    <Styles>
      <h2>Settings</h2>
      <div>Highlight focused regions</div>
      <div>Highlight cells with same value</div>
      <div>Highlight invalid entries</div>
      <div>Sound effects on/off</div>
      <div>Show/hide timer</div>
      <div>Difficulty for new games</div>
    </Styles>
  );
}
