'use client'
import UserSidebar from '@/components/layout/components/UserSidebar'
import React, { useState } from 'react'

// Generate initials from name
const generateInitials = (name: string): string => {
    return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2)
}

export default function Navbar() {
  const userName = "João Silva"
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false)

  const toggleUserSidebar = () => {
    setIsUserSidebarOpen(!isUserSidebarOpen)
  }

  const closeUserSidebar = () => {
    setIsUserSidebarOpen(false)
  }
  
  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b bg-background/95 px-8 backdrop-blur">
        <div>
          <h1 className="text-xl font-bold">Dashboard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <p className="hidden sm:block">Bem-vindo, {userName.split(' ')[0]}!</p>
          
          {/* Avatar do usuário clicável */}
          <button
            onClick={toggleUserSidebar}
            className="w-10 h-10 bg-gradient-to-br from-accent to-chart-3 rounded-xl flex items-center justify-center text-sm text-primary-foreground font-bold hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {generateInitials(userName)}
          </button>
        </div>
      </header>

      {/* User Sidebar */}
      <UserSidebar 
        isOpen={isUserSidebarOpen}
        onClose={closeUserSidebar}
        userName={userName}
      />
    </>
  )
}