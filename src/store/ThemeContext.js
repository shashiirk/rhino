import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext({
  dark: false,
  toggleTheme: () => {},
});

export const ThemeProvider = (props) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const localThemeData = JSON.parse(localStorage.getItem('darkMode'));
    if (localThemeData) {
      setDark(true);
    }
  }, []);

  useEffect(() => {
    if (dark) {
      localStorage.setItem('darkMode', true);
    } else {
      localStorage.removeItem('darkMode');
    }
  }, [dark]);

  const toggleThemeHandler = () => {
    setDark((prev) => !prev);
  };

  const themeContext = {
    dark: dark,
    toggleTheme: toggleThemeHandler,
  };

  return (
    <ThemeContext.Provider value={themeContext}>
      {props.children}
    </ThemeContext.Provider>
  );
};
