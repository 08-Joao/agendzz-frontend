'use client'
import UserSidebar from '@/components/layout/components/UserSidebar'
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

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserSidebar = () => {
    setIsUserSidebarOpen(!isUserSidebarOpen)
  }

  const closeUserSidebar = () => {
    setIsUserSidebarOpen(false)
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
        <div className="flex items-center space-x-4">
          <button className="relative rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground focus:outline-none"aria-label="Ver notificações">
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