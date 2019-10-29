import React, { createContext, useContext } from 'react';
import useLocalStorageState from 'hooks/useLocalStorageState';
import config from 'config';

// https://gist.github.com/murbar/1d1c90ee30561ceecbb431db801e7410

const initSettings = {
  darkTheme: false,
  soundFx: true,
  focusGroupsHighlight: true,
  sameValueHighlight: true,
  invalidInputWarn: true,
  valueCompleteIndicate: true
};

const SettingsContext = createContext();

const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useLocalStorageState(
    config.localStorageKeys.appSettings,
    initSettings
  );

  const toggleTheme = () => {
    setSettings(prev => ({ ...prev, darkTheme: !prev.darkTheme }));
  };

  const actions = {
    toggleTheme
  };

  const contextValue = {
    settings,
    actions
  };

  return (
    <SettingsContext.Provider value={contextValue}>{children}</SettingsContext.Provider>
  );
};

const useSettings = () => useContext(SettingsContext);

export { SettingsProvider, useSettings };
