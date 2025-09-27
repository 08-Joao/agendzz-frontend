'use client'
import UserSidebar from '@/components/layout/components/UserSidebar'
import NotificationSidebar from '@/components/layout/components/NotificationSidebar'
import { Bell } from '@solar-icons/react/ssr'
import Link from 'next/link'
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
  const [isNotificationSidebarOpen, setIsNotificationSidebarOpen] = useState(false)

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserSidebar = () => {
    setIsUserSidebarOpen(!isUserSidebarOpen)
    // Fecha a sidebar de notificações se estiver aberta
    if (isNotificationSidebarOpen) {
      setIsNotificationSidebarOpen(false)
    }
  }

  const closeUserSidebar = () => {
    setIsUserSidebarOpen(false)
  }

  const toggleNotificationSidebar = () => {
    setIsNotificationSidebarOpen(!isNotificationSidebarOpen)
    // Fecha a sidebar do usuário se estiver aberta
    if (isUserSidebarOpen) {
      setIsUserSidebarOpen(false)
    }
  }

  const closeNotificationSidebar = () => {
    setIsNotificationSidebarOpen(false)
  }
  
  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b bg-background/95 px-8 backdrop-blur">
         {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="text-black-300 hover:text-white">
            Início
          </Link>
          <Link href="/about" className="text-black-300 hover:text-white">
            Sobre
          </Link>
          <Link href="/services" className="text-black-300 hover:text-white">
            Serviços
          </Link>
          <Link href="/contact" className="text-black-300 hover:text-white">
            Contato
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              )}
            </svg>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleNotificationSidebar}
            className={`relative rounded-full p-2 transition-colors focus:outline-none ${
              isNotificationSidebarOpen 
                ? "text-primary bg-primary/10" 
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-label="Ver notificações"
          >
            <Bell size={20} />
          </button>

          <p className="hidden sm:block">Bem-vindo, {userName.split(' ')[0]}!</p>
          
          <button
            onClick={toggleUserSidebar}
            className="w-10 h-10 bg-gradient-to-br from-accent to-chart-3 rounded-xl flex items-center justify-center text-sm text-primary-foreground font-bold hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {generateInitials(userName)}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-gray-700 p-4">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-300 hover:text-white" onClick={toggleMenu}>
                Início
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white" onClick={toggleMenu}>
                Sobre
              </Link>
              <Link href="/services" className="text-gray-300 hover:text-white" onClick={toggleMenu}>
                Serviços
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white" onClick={toggleMenu}>
                Contato
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* User Sidebar */}
      <UserSidebar 
        isOpen={isUserSidebarOpen}
        onClose={closeUserSidebar}
        userName={userName}
      />

      {/* Notification Sidebar */}
      <NotificationSidebar 
        isOpen={isNotificationSidebarOpen}
        onClose={closeNotificationSidebar}
      />
    </>
  )
}