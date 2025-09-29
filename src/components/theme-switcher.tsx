'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useTheme } from 'next-themes'
import { Moon, Sun } from '@solar-icons/react/ssr'

// Componente Skeleton para o botão
function ThemeSwitcherSkeleton() {
  return (
    <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
      <div className="h-4 w-4 animate-pulse bg-muted-foreground/20 rounded" />
    </div>
  )
}

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  // Retorna skeleton até o componente estar montado no cliente
  if (!mounted) {
    return <ThemeSwitcherSkeleton />
  }

  return (
    <Button size="icon" onClick={toggleTheme}>
      {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </Button>
  )
}

export default ThemeSwitcher