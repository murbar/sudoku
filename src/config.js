const version = '2019.9.24';

const localStorageKeys = {
  gameState: `sudoku-joelb-dev-${version}`,
  appSettings: `sudoku-joelb-dev-settings-${version}`
};

export default {
  version,
  publicURL: 'https://sudoku.joelb.dev',
  pageTitle: 'Play Sudoku Online',
  localStorageKeys,
  // GAPropertyId: 'UA-140727716-1',
  // sentryDsn: 'https://4ce61244b73c47a2806e2f9cefeaf925@sentry.io/1527263',
  env: process.env.NODE_ENV
};
