import { mediaAbove } from './helpers';

const colors = {
  offWhite: '#fefaf0',
  offBlack: '#222',
  green: '#3cc473',
  cream: 'hsl(42, 45%, 90%)',
  darkCream: 'hsl(41, 45%, 84%)',
  cellHighlight: 'hsla(41, 45%, 84%, 0.5)',
  pine: 'hsl(167, 30%, 29%)',
  seaFoam: 'hsl(137, 78%, 88%)',
  darkBrown: 'hsl(23, 10%, 26%)',
  blue: 'hsl(207,44%, 49%)', // "steelblue"
  red: 'hsl(355, 80%, 55%)'
};

const theme = {
  inputBorderRadius: `0.5rem`,
  fontFamilyHeadings: 'Bangers, sans-serif',
  fontFamily: "'Source Sans Pro', sans-serif",
  mediaAbove
};

export const light = {
  ...theme,
  colors: {
    ...colors,
    background: colors.cream,
    foreground: colors.darkBrown,
    primary: colors.green,
    pen: colors.blue,
    warn: colors.red
  }
};

export const dark = {
  ...theme,
  colors: {
    ...colors,
    background: colors.darkBrown,
    foreground: colors.cream,
    primary: colors.green,
    pen: colors.blue,
    warn: colors.red
  }
};

export default theme;
