'use client'
import React, { ReactNode } from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar' // 1. Importe a Navbar

function Layout({ children }: { children: ReactNode }) {
  return (
    // Container principal que ocupa a tela inteira
    <div className='flex h-screen bg-background'>
        <Sidebar />

        {/* Área principal que contém a Navbar e o conteúdo */}
        <main className='flex flex-1 flex-col overflow-hidden'>
            <Navbar />

            {/* Container do conteúdo principal com rolagem interna */}
            <div className='flex-1 overflow-y-auto p-8'>
                {children}
            </div>
        </main>
    </div>
  )
}

export default Layout