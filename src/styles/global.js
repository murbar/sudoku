import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * { 
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
  }
  body {
    margin: 0;
    background: ${p => p.theme.colors.cream};
    color: ${p => p.theme.colors.darkBrown};
    font-family: ${p => p.theme.fontFamily};
    font-size: 1.8rem;
    line-height: 1.7;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit;
    &:hover {
      color: ${p => p.theme.colors.primary};
    }
  }

  h1, h2, h3, h4, h5, h6 { 
    font-weight: 900;
    line-height: 1.2;
  }
`;
