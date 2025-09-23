'use client'
import React, { ReactNode } from 'react'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex'>
        <Sidebar />
        <Navbar />
        <div>
            {children}
        </div>
    </div>
  )
}

export default Layout
