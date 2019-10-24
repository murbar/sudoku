import { media } from './helpers';

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
  blue: 'steel blue'
};

const theme = {
  colors: {
    ...colors,
    background: colors.cream,
    foreground: colors.darkBrown,
    primary: colors.green
  },
  inputBorderRadius: `0.5rem`,
  fontFamily: "'Source Sans Pro', sans-serif",
  fontFamilyHand: "'Patrick Hand', sans-serif",
  media
};

export default theme;
