import { css } from 'styled-components';

const sizes = {
  desktopXL: 1800,
  desktop: 1200,
  tablet: 900,
  phone: 625,
  px350: 350,
  px400: 400,
  px450: 450,
  px500: 500,
  px550: 550,
  px600: 600,
  px650: 650
};

// Iterate through the sizes and create a media template
export const mediaAbove = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label] / 16}rem) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export const mediaBelow = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label] / 16}rem) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export const addHslAlpha = (hsl, alpha) => {
  return `${hsl.slice(0, -1)}, ${alpha})`;
};

export const addHexAlpha = (hex, alpha) => {
  hex = hex.slice(1);
  const values =
    hex.length === 3
      ? [...hex].map(ch => ch + ch)
      : [hex.substring(0, 2), hex.substring(2, 4), hex.substring(4)];
  const rgb = values.map(h => parseInt(h, 16));
  return `rgba(${rgb.join(', ')}, ${alpha})`;
};
