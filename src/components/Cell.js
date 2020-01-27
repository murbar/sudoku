import React from 'react';
import styled, { css } from 'styled-components';
import { isArrowKey } from 'lib/common';

const warnStyles = css`
  background: var(--warn-bg-color);
  color: var(--warn-color);
`;

const highlightStyles = css`
  background: var(--highlight-bg-color);
`;

// This was an interesting challenge but it's just not as consistent across browsers/devices
// as using a grid lines image overlay.

// const gridBorders = css`
//   /* https://css-tricks.com/useful-nth-child-recipies/ */

//   /* all cells */
//   border: 1px solid var(--grid-border-color);

//   /* left column */
//   &:nth-child(9n + 1) {
//   }

//   /* 3rd 6th, and 9th column */
//   &:nth-child(3n) {
//     border-right: 2px solid var(--grid-border-color);
//   }

//   /* 1st, 4th and 7th column */
//   &:nth-child(3n + 1) {
//     border-left: 2px solid var(--grid-border-color);
//   }

//   /* right column */
//   &:nth-child(9n) {
//   }

//   /* 1st, 4th and 7th rows */
//   &:nth-child(n + 1):nth-child(-n + 9),
//   &:nth-child(n + 28):nth-child(-n + 36),
//   &:nth-child(n + 55):nth-child(-n + 63) {
//     border-top: 2px solid var(--grid-border-color);
//   }

//   /* 3rd, 6th, and 9th rows */
//   &:nth-child(n + 19):nth-child(-n + 27),
//   &:nth-child(n + 46):nth-child(-n + 54),
//   &:nth-child(n + 73):nth-child(-n + 81) {
//     border-bottom: 2px solid var(--grid-border-color);
//   }
// `;

const Input = styled.input`
  display: flex;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background: transparent;
  color: ${p => (p.isPaused ? 'transparent' : 'var(--pen-color)')};
  text-align: center;
  font-size: var(--grid-font-size);
  font-family: ${p => p.theme.fontFamily};
  font-weight: 700;
  line-height: var(--grid-font-size);
  border: calc(var(--grid-border-width) / 2) solid var(--grid-border-color);
  border-radius: 0;

  ${p => p.isWarn && warnStyles}
  ${p => p.isHighlight && highlightStyles}

  &:focus {
    outline: none;
    background: ${p => (p.isWarn ? 'var(--warn-bg-color)' : p.theme.colors.offWhite)};
  }

  &[disabled] {
    font-family: ${p => p.theme.fontFamily};
    color: ${p => (p.isPaused ? 'transparent' : 'var(--starting-values-color)')};

    /* iOS/Safari */
    -webkit-text-fill-color: ${p =>
      p.isPaused ? 'transparent' : 'var(--starting-values-color)'};
    opacity: 1;
  }

  /* vendor styles */
  -webkit-appearance: none;
  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

export default function Cell({
  value,
  index,
  isStartingValue,
  isHighlight,
  isWarn,
  isPaused,
  handleCellChange,
  handleGridNavigate,
  handleFocusCell,
  handleBlur
}) {
  const handleChange = e => {
    let { value: newValue } = e.target;
    newValue = newValue === '' ? 0 : parseInt(newValue.toString().slice(0, 1), 10);
    if (isNaN(newValue)) return;
    handleCellChange(index, newValue);
  };

  const handleKeyDown = e => {
    const { key } = e;
    if (isArrowKey(key) || key === 'Enter') {
      e.preventDefault();
      handleGridNavigate(index, key === 'Enter' ? 'ArrowRight' : key);
    }

    if (key === 'Escape') {
      e.preventDefault();
      handleBlur();
    }
  };

  const handleFocus = e => {
    if (e.target.value !== '') e.target.select();
    handleFocusCell(index);
  };

  return (
    <Input
      value={value === 0 ? '' : value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      disabled={isStartingValue}
      isHighlight={isHighlight}
      isWarn={isWarn}
      isPaused={isPaused}
      maxLength="1"
      min="1"
      max="9"
      pattern="\d*"
      type="number"
      data-index={index}
    />
  );
}
