import { createContext, useContext, useState } from "react-native";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState("claro");

  return (
    <ThemeContext.Provider value={{ tema, setTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}