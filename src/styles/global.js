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
    background: ${p => p.theme.colors.background};
    color: ${p => p.theme.colors.foreground};
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
    font-family: ${p => p.theme.fontFamilyHeadings};
    font-weight: normal;
    line-height: 1.2;
  }
`;
