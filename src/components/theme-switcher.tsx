'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useTheme } from 'next-themes'
import { Moon, Sun } from '@solar-icons/react'

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }


  return (
    <Button onClick={toggleTheme}>
      {theme === 'light' ? <Moon /> : <Sun />}
    </Button>
  )
}

export default ThemeSwitcher