import { media } from './helpers';

const colors = {
  offWhite: '#fefaf0',
  offBlack: '#222',
  green: '#3cc473'
};

const theme = {
  colors: {
    ...colors,
    background: colors.offWhite,
    foreground: colors.offBlack,
    primary: colors.green
  },
  inputBorderRadius: `0.5rem`,
  fontFamily: "'Source Sans Pro', sans-serif",
  fontFamilyHand: "'Patrick Hand', sans-serif",
  media
};

export default theme;
