import React, { useState, useEffect } from "react";

type Theme = "light" | "dark";
type ThemeContext = { theme:Theme; toggleTheme: () => void; isDark: boolean };
// eslint-disable-next-line
export const ThemeContext = React.createContext<ThemeContext>(
  {} as ThemeContext
);

export const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [isDark, setIsDark] = useState(false);
  let [th, setTh] = useState<string | null>(theme);

  const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");


    setIsDark(!isDark);

  };

   const backgroundColor = theme === "light" ?  "#0052A6":"#282c36" 
 ;

    useEffect(() => {
   
    setIsDark(isDark);
  }, []);

  document.body.style.backgroundColor = backgroundColor;
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme , isDark}}>
      {children}
    </ThemeContext.Provider>
  );
};
