import { useThemeContext } from '@/contexts/ThemeProvider'
import React from 'react'
import SunIcon from './icons/SunIcon'
import MoonIcon from './icons/MoonIcon'

const ButtonTheme = () => {
  const { theme,
    toggleTheme, } = useThemeContext()
  return (
    <>
      {
        theme === 'dark' ? <SunIcon onClick={toggleTheme} className='w-5 h-5 text-black dark:text-white' /> : <MoonIcon
          onClick={toggleTheme}
          className='w-5 h-5 text-black dark:text-white' />
      }
    </>
  )
}

export default ButtonTheme