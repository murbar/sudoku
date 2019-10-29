import React from 'react';
import ReactDOM from 'react-dom';
import { SettingsProvider } from 'contexts/SettingsContext';
import App from './App';

const Root = () => {
  return (
    <SettingsProvider>
      <App />
    </SettingsProvider>
  );
};
ReactDOM.render(<Root />, document.getElementById('root'));
