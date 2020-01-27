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

const Input = styled.input`
  display: flex;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background: transparent;
  color: ${p => (p.isPaused ? 'transparent' : 'var(--pen-color)')};
  text-align: center;
  align-items: center;
  font-size: var(--grid-font-size);
  font-weight: 700;
  /* font-weight: 400; */
  /* font-family: ${p => p.theme.fontFamilyHand}; */
  font-family: ${p => p.theme.fontFamily};
  line-height: 0.7;
  border-radius: 0;
  border: none;

  ${p => p.isWarn && warnStyles}
  ${p => p.isHighlight && highlightStyles}

  border-right: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
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

  &:focus {
    outline: none;
    background: ${p => (p.isWarn ? 'var(--warn-bg-color)' : p.theme.colors.seaFoam)};
  }

  &[disabled] {
    font-family: ${p => p.theme.fontFamily};
    /* font-weight: 700; */
    /* font-size: 3.5rem; */
    color: ${p => (p.isPaused ? 'transparent' : 'var(--starting-values-color)')};

    /* iOS/Safari */
    -webkit-text-fill-color: ${p =>
      p.isPaused ? 'transparent' : 'var(--starting-values-color)'};
    opacity: 1;
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
