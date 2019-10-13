import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Cell from 'components/Cell';
import { calcDestinationIndex, calcRowAndCol, calcSubGrid } from 'lib/helpers';
import useHotKeyGridFocus from 'hooks/useHotKeyGridFocus';

const SquareAspectControl = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  & > div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const Styles = styled.div`
  grid-column: 2; /* position in parent grid */

  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  border: var(--grid-border-width) solid var(--border-color);
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
  filter: ${p => (p.isPaused ? 'blur(0.75rem)' : 'none')};

  /*
  The following hack makes Safari respect the row height as 1/9th of this container's
  height, which is set by SquareAspectControl up top. We have to prime the first row
  with a hidden element that gets its height from its padding. This isn't necessary in
  Chrome or Firefox. About 3 hours spent on this one. 🤬
  https://medium.com/cloudaper/how-to-create-a-flexible-square-grid-with-css-grid-layout-ea48baf038f3
  */

  &::before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1;
    grid-column: 1;
  }

  & > *:first-child {
    grid-row: 1;
    grid-column: 1;
  }
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
  const focusedCell = React.useMemo(() => {
    const i = focus.index;
    return i === null ? null : gridRef.current.querySelector(`[data-index='${i}']`);
  }, [focus]);

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

  const handleBlurGrid = () => {
    if (focusedCell) focusedCell.blur();
    setFocus(initFocus);
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

  useHotKeyGridFocus(index => {
    handleGridNavigate(index - 1, 'ArrowRight');
  }, handleBlurGrid);

  return (
    <SquareAspectControl>
      <Styles isPaused={isPaused} ref={gridRef} onBlur={handleBlurGrid}>
        {cells.map((value, index) => {
          const isHighlight = highlightFocus && calcIsHighlighted(index, focus);
          const isWarn = warnInvalid && invalidCellIndexes.includes(index); // stub
          return (
            <Cell
              key={index}
              handleCellChange={handleCellChange}
              handleGridNavigate={handleGridNavigate}
              handleFocusCell={handleFocusCell}
              handleBlur={handleBlurGrid}
              index={index}
              value={value}
              isStartingValue={startingCellIndexes.includes(index)}
              isHighlight={isHighlight}
              isWarn={isWarn}
            />
          );
        })}
      </Styles>
    </SquareAspectControl>
  );
}
// TODO
GameGrid.propTypes = {
  cells: PropTypes.array.isRequired
};
