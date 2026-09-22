import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const theme = {
    isDark: isDarkMode,
    background: isDarkMode ? '#121212' : '#F8F9FA',
    card: isDarkMode ? '#1E1E1E' : '#FFF',
    text: isDarkMode ? '#F5F5F5' : '#1E1E1E',
    textSecondary: isDarkMode ? '#AAAAAA' : '#757575',
    primary: '#4361EE',
    primaryLight: isDarkMode ? '#2A3C91' : '#EEF2FF',
    income: '#2ECC71',
    expense: '#E74C3C',
    border: isDarkMode ? '#333333' : '#EEEEEE',
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};