// import { useMemo } from 'react';
import useLocalStorageState from 'hooks/useLocalStorageState';
import config from 'config';

const initSettings = {
  darkTheme: false
};

export default function useAppSettings() {
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

  return [settings, actions];
}
