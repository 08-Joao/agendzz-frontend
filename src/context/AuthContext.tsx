'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { GetUserDto } from '@/dtos/get.user.dto'
import Api from '@/services/Api'

interface AuthContextType {
  user: GetUserDto | null
  isAuthenticated: boolean
  isLoading: boolean
  signin: (email: string, password: string) => Promise<boolean>
  signout: () => Promise<void>
  checkAuth: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

const PUBLIC_ROUTES = ['/signin', '/signup', '/forgot-password', '/reset-password']
const AUTH_ROUTES = ['/signin', '/signup']

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<GetUserDto | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const isNavigatingRef = useRef(false)

  const isAuthenticated = !!user

  const checkAuth = async () => {
    try {
      setIsLoading(true)
      const response = await Api.getMe()
      if (response && 'data' in response) {
        setUser(response.data)
      } else {
        setUser(null)
      }
    } catch (error) {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  const signin = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await Api.signin({ email, password })

      if (response && response.data) {
        setUser(response.data)
        // Navegar imediatamente após setar o usuário
        isNavigatingRef.current = true
        router.push('/')
        return true
      }
      return false
    } catch (error) {
      console.error('Erro no login:', error)
      return false
    }
  }

  const signout = async () => {
    try {
      await Api.signout()
    } catch (error) {
      console.error('Erro no logout:', error)
    } finally {
      setUser(null)
      // Navegar imediatamente após limpar o usuário
      isNavigatingRef.current = true
      router.push('/signin')
    }
  }

  // Verificar autenticação apenas na montagem inicial
  useEffect(() => {
    checkAuth()
  }, [])

  // Gerenciar redirecionamentos baseados na autenticação
  useEffect(() => {
    // Não redirecionar se ainda está carregando
    if (isLoading) return

    // Não redirecionar se já está navegando
    if (isNavigatingRef.current) {
      isNavigatingRef.current = false
      return
    }

    const isAuthRoute = AUTH_ROUTES.includes(pathname)
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

    if (isAuthenticated) {
      // Usuário logado tentando acessar rotas de auth
      if (isAuthRoute) {
        router.replace('/')
      }
    } else {
      // Usuário não logado tentando acessar rotas protegidas
      if (!isPublicRoute) {
        router.replace('/signin')
      }
    }
  }, [isAuthenticated, isLoading, pathname, router])

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    signin,
    signout,
    checkAuth
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}