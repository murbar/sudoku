import React from 'react';
import styled from 'styled-components';
import { isArrowKey } from 'lib/helpers';

const Input = styled.input`
  --starting-value-color: #999;
  --warn-color: hsl(14, 75%, 50%);
  --warn-bg-color: hsla(14, 75%, 50%, 0.3);
  --highlight-bg-color: lightyellow;

  display: flex;
  width: 100%;
  height: 100%;
  margin: 0;
  background: ${p =>
    p.isWarn
      ? 'var(--warn-bg-color)'
      : p.isHighlight
      ? 'var(--highlight-bg-color)'
      : 'transparent'};
  color: ${p => (p.isWarn ? 'var(--warn-color)' : 'inherit')};
  text-align: center;
  align-items: center;
  font-size: 3.5rem;
  font-weight: 900;
  font-family: ${p => p.theme.fontFamilyHand};
  border-radius: 0;
  border: none;
  border-right: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  &:focus {
    outline: none;
    background: papayawhip;
  }
  &[disabled] {
    font-family: ${p => p.theme.fontFamily};
    color: var(--starting-value-color);
    /* iOS/Safari */
    -webkit-text-fill-color: var(--starting-value-color);
    opacity: 1;
  }
  &:nth-child(3n) {
    border-right: 3px solid var(--border-color);
  }
  &:nth-child(9n) {
    border-right: none;
  }
  &:nth-child(n + 19):nth-child(-n + 27),
  &:nth-child(n + 46):nth-child(-n + 54) {
    border-bottom: 3px solid var(--border-color);
  }
  &:nth-child(n + 73):nth-child(-n + 81) {
    border-bottom: none;
  }
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
  handleCellChange,
  handleGridNavigate,
  handleFocusCell
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
  };

  return (
    <Input
      value={value === 0 ? '' : value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onFocus={() => handleFocusCell(index)}
      disabled={isStartingValue}
      isHighlight={isHighlight}
      isWarn={isWarn}
      maxLength="1"
      min="1"
      max="9"
      pattern="\d*"
      type="number"
      data-index={index}
    />
  );
}
