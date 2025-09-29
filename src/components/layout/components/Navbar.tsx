'use client'
import UserSidebar from '@/components/layout/components/UserSidebar'
import NotificationSidebar from '@/components/layout/components/NotificationSidebar'
import ThemeSwitcher from '@/components/theme-switcher'
import { Bell, Menu, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'

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
  const { user } = useAuth()
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false)
  const [isNotificationSidebarOpen, setIsNotificationSidebarOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

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

  const navigationLinks = [
    { href: '/', label: 'Início' },
    { href: '/about', label: 'Sobre' },
    { href: '/services', label: 'Serviços' },
    { href: '/contact', label: 'Contato' },
  ]
  
  return (
    <>
      <header className="sticky top-0 z-40 w-full">
        {/* Background with glassmorphism effect */}
        <div className="absolute inset-0 bg-card/95 backdrop-blur-xl border-b border-border/20"></div>
        
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-accent/3 to-chart-3/3"></div>
        
        <div className="relative z-10 flex h-16 w-full items-center justify-between px-6 lg:px-8">
          {/* Left Section - Logo/Brand */}


          {/* Center Section - Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-all duration-200 backdrop-blur-sm border border-transparent hover:border-border/20"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-3">
            {/* Theme Switcher */}
            <div className="flex items-center">
              <ThemeSwitcher />
            </div>

            {/* Notification Button */}
            <Button
              variant="secondary"
              size="icon"
              onClick={toggleNotificationSidebar}
              className={`relative rounded-xl h-10 w-10 backdrop-blur-sm transition-all duration-200 ${
                isNotificationSidebarOpen 
                  ? "bg-primary/10 text-primary border-primary/20" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50 border-transparent"
              }`}
            >
              <Bell size={18} />
              {/* Notification badge */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-card"></div>
            </Button>

            {/* Welcome Text - Hidden on small screens */}
            <div className="hidden md:flex items-center space-x-3">
              <span className="text-sm text-muted-foreground">
                Bem-vindo, <span className="font-medium text-foreground">{user?.name.split(' ')[0]}!</span>
              </span>
            </div>
            
            {/* User Avatar */}
            <button
              onClick={toggleUserSidebar}
              className={`w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-sm text-primary-foreground font-bold shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                isUserSidebarOpen ? "scale-95 ring-2 ring-primary/50" : "hover:scale-105"
              }`}
            >
              {generateInitials(user?.name || 'Usuário')}
            </button>

            {/* Mobile Menu Button */}
            <Button
              variant="secondary"
              size="icon"
              onClick={toggleMobileMenu}
              className="lg:hidden rounded-xl h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-secondary/50 backdrop-blur-sm"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Background overlay */}
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
              onClick={toggleMobileMenu}
            />
            
            {/* Mobile menu panel */}
            <div className="absolute top-full left-0 right-0 z-40 lg:hidden">
              <div className="mx-4 mt-2 bg-card/95 backdrop-blur-xl border border-border/20 rounded-2xl shadow-lg p-4">
                {/* Decorative gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-accent/3 to-chart-3/3 rounded-2xl"></div>
                
                <div className="relative z-10 space-y-2">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={toggleMobileMenu}
                      className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-all duration-200 backdrop-blur-sm border border-transparent hover:border-border/20"
                    >
                      {link.label}
                    </Link>
                  ))}
                  
                  {/* Mobile user info */}
                  <div className="mt-4 pt-4 border-t border-border/20">
                    <div className="flex items-center space-x-3 px-4 py-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-xs text-primary-foreground font-bold">
                        {generateInitials(user?.name || 'Usuário')}
                      </div>
                      <span className="text-sm text-foreground font-medium">
                        {user?.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </header>
        
      {/* User Sidebar */}
      <UserSidebar 
        isOpen={isUserSidebarOpen}
        onClose={closeUserSidebar}
      />

      {/* Notification Sidebar */}
      <NotificationSidebar 
        isOpen={isNotificationSidebarOpen}
        onClose={closeNotificationSidebar}
      />
    </>
  )
}