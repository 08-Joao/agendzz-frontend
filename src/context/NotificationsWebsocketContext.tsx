'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { io, Socket } from 'socket.io-client'

// 1. Definir o tipo de dados que o contexto irá fornecer
interface WebSocketContextType {
  socket: Socket | null
  isConnected: boolean
}

// 2. Criar o Contexto com um valor padrão
const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined)

// 3. Criar o Provedor (o componente que vai gerenciar a conexão)
interface WebSocketProviderProps {
  children: ReactNode
}

export function NotificationsWebSocketProvider({ children }: WebSocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Configurar Socket.IO (não WebSocket nativo!)
    const socketInstance = io('http://localhost:4000/notifications', {
      reconnectionAttempts: 3,
      reconnectionDelay: 5000,
      timeout: 3000,
      forceNew: true,
      withCredentials: true
    })

    socketInstance.on('connect', () => {
      console.log('✅ Socket.IO conectado!')
      setIsConnected(true)
    })

    socketInstance.on('disconnect', (reason) => {
      console.log('❌ Socket.IO desconectado:', reason)
      setIsConnected(false)
    })

    socketInstance.on('connect_error', (error) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Erro de conexão com Socket.IO:', error.message)
      }
      setIsConnected(false)
    })

    socketInstance.on('reconnect_error', (error) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Erro de reconexão:', error.message)
      }
    })

    setSocket(socketInstance)

    // Função de limpeza: será executada quando o componente for desmontado
    // Como o Provider estará no layout raiz, isso só acontecerá ao fechar a aba.
    return () => {
      socketInstance.disconnect()
    }
  }, []) // O array vazio [] garante que este efeito rode APENAS UMA VEZ.

  const value = { socket, isConnected }

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  )
}

// 4. Criar um Hook customizado para facilitar o uso do contexto
export function useWebSocket() {
  const context = useContext(WebSocketContext)
  if (context === undefined) {
    throw new Error('useWebSocket deve ser usado dentro de um WebSocketProvider')
  }
  return context
}