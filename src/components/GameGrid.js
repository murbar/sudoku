import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Cell from 'components/Cell';
import { calcDestinationIndex, calcRowAndCol, calcSubGrid } from 'lib/helpers';
import useHotKeyGridFocus from 'hooks/useHotKeyGridFocus';
import useElementWidth from 'hooks/useElementWidth';

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
  /* Safari doesn't respect row height - even tho container has set height, we can't 
    set row template to 9 x 1fr and expect each row to take up 1/9 of the height,
    this works on both Chrome and Firefox but and I can't find any documentation about
    how/why it would differ in Safari. So just for Safari, I get the width of the container
    with a hook and manual set the height of the rows in pixels. This works but there
    is a jank when the page first loads in safari -- not ideal.
   */

  /* --grid-cell-size: calc(${p => p.containerWidth}px / 9); */
  --grid-cell-size: ${p =>
    p.containerWidth ? `calc(${p.containerWidth}px / 9)` : '1fr'};

  grid-column: 2; /* position in parent grid */

  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, var(--grid-cell-size));
  border: var(--grid-border-width) solid var(--border-color);
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
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
  const containerWidth = useElementWidth(gridRef);
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
      <Styles
        isPaused={isPaused}
        ref={gridRef}
        onBlur={handleBlurGrid}
        containerWidth={containerWidth}
      >
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
