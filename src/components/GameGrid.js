import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Cell from 'components/Cell';
import { calcDestinationIndex, calcRowAndCol, calcSubGrid } from 'lib/helpers';

const Styles = styled.div`
  --board-size: 54rem;
  --border-width: 0.3rem;
  --border-color: #444;

  display: grid;
  grid-template-columns: [start] repeat(9, calc(var(--board-size) / 9)) [end];
  grid-template-rows: [top] repeat(9, calc(var(--board-size) / 9)) [bottom];
  width: var(--board-size);
  /* background: rgba(255, 255, 255, 0.25); */
  border: var(--border-width) solid var(--border-color);
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
  box-sizing: content-box;
  filter: ${p => (p.isPaused ? 'blur(0.75rem)' : 'none')};
`;

const calcIsHighlighted = (index, focusObj) => {
  const { row, col } = calcRowAndCol(index);
  const subGrid = calcSubGrid(index);
  return row === focusObj.row || col === focusObj.col || subGrid === focusObj.subGrid;
};

const initFocus = {
  index: null,
  row: null,
  col: null,
  subGrid: null
};

export default function GameGrid({
  cells,
  handleCellChange,
  startingCellIndexes,
  isPaused,
  highlightFocus = true,
  warnInvalid = true,
  invalidCellIndexes
}) {
  const gridRef = useRef();
  const [focus, setFocus] = useState(initFocus);

  const handleFocusCell = index => {
    if (index === null) {
      setFocus(initFocus);
    } else {
      const { row, col } = calcRowAndCol(index);
      setFocus({
        index,
        row,
        col,
        subGrid: calcSubGrid(index)
      });
    }
  };

  const handleGridNavigate = (currentIndex, key) => {
    let invalidDest = true;
    let destIndex = calcDestinationIndex(currentIndex, key);
    while (invalidDest) {
      const destCell = gridRef.current.querySelector(`[data-index='${destIndex}']`);
      if (!destCell.disabled) {
        invalidDest = false;
        destCell.focus();
      } else {
        destIndex = calcDestinationIndex(destIndex, key);
      }
    }
  };

  return (
    <Styles isPaused={isPaused} ref={gridRef}>
      {cells.map((value, index) => {
        const isHighlight = highlightFocus && calcIsHighlighted(index, focus);
        const isWarn = warnInvalid && invalidCellIndexes.includes(index); // stub
        return (
          <Cell
            key={index}
            handleCellChange={handleCellChange}
            handleGridNavigate={handleGridNavigate}
            handleFocusCell={handleFocusCell}
            index={index}
            value={value}
            isStartingValue={startingCellIndexes.includes(index)}
            isHighlight={isHighlight}
            isWarn={isWarn}
          />
        );
      })}
    </Styles>
  );
}
// TODO
GameGrid.propTypes = {
  cells: PropTypes.array.isRequired
};
