
import { createContext, useContext, useEffect, useState, } from "react";

export const ThemeContext = createContext<any>(null);
export default function ThemeProvider(props: any) {
  const [theme, setTheme] = useState<any>(() => {
    if(typeof window === 'undefined') return 'light'
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  });
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])
  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }
  const value = {
    theme,
    toggleTheme,
    setTheme,
  }
  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  )

}

export const useThemeContext = () => {
  const context = useContext<any>(ThemeContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}