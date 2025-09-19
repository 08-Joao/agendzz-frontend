'use client'
import React, { ReactNode } from 'react'
import Sidebar from './components/Sidebar'

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='flex'>
        <Sidebar />
        <div>
            {children}
        </div>
    </div>
  )
}

export default Layout
