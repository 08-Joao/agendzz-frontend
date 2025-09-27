'use client'

import { NotificationEntity } from '@/entities/notification.entity'
import Api from '@/services/Api'
import React, { useEffect, useState, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { Bell, Check, X, Users, Calendar, Clock, ChevronRight } from 'lucide-react'

function NotificationsSidebar() {
  const [notifications, setNotifications] = useState<NotificationEntity[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [loadingActions, setLoadingActions] = useState<string[]>([])
  const [count, setCount] = useState(0)
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    // Configurações do socket para reduzir logs de erro
    const socket = io('http://localhost:4000/notifications', {
      // Reduz tentativas de reconexão
      reconnectionAttempts: 3,
      // Aumenta intervalo entre tentativas
      reconnectionDelay: 5000,
      // Timeout menor para falhar mais rápido
      timeout: 3000,
      // Desabilita logs automáticos do socket.io
      forceNew: true,
      withCredentials: true
    })

    socketRef.current = socket

    socket.on('connect', () => {
      console.log('✅ Conectado ao gateway de notificações!')
      setIsConnected(true)
    })

    socket.on('message', (newNotification: NotificationEntity) => {
      console.log('Nova notificação recebida:', newNotification)
      setNotifications((prevNotifications) => [newNotification, ...prevNotifications])
    })

    socket.on('disconnect', (reason) => {
      console.log('❌ Desconectado do gateway de notificações. Motivo:', reason)
      setIsConnected(false)
    })

    // Captura erros de conexão sem loggar no console
    socket.on('connect_error', (error) => {
      // Você pode logar apenas em desenvolvimento ou remover completamente
      if (process.env.NODE_ENV === 'development') {
        console.warn('Erro de conexão com o gateway (modo silencioso):', error.message)
      }
      setIsConnected(false)
    })

    // Silencia erros de reconexão
    socket.on('reconnect_error', (error) => {
      // Log silencioso ou removido completamente
      if (process.env.NODE_ENV === 'development') {
        console.warn('Erro de reconexão (modo silencioso):', error.message)
      }
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [])

  // useEffect para enviar mensagem quando count mudar
  useEffect(() => {
    // Só envia se o count for maior que 0 e o socket estiver conectado
    if (count > 0 && socketRef.current && isConnected) {
      const testMessage = {
        type: 'test_count_update',
        count: count,
        timestamp: new Date().toISOString(),
        message: `Contador atualizado para ${count}`
      }
      
      console.log('📤 Enviando mensagem de teste para o servidor:', testMessage)
      socketRef.current.emit('message', testMessage)
    }
  }, [count, isConnected])

  const handleAccept = async (actionUrl: string, notificationId: string) => {
    setLoadingActions(prev => [...prev, notificationId])
    try {
      const response = await Api.acceptInvitation(actionUrl)
      if (response) {
        console.log('Notificação aceita com sucesso!')
        // Remove a notificação da lista após aceitar
        setNotifications(prev => prev.filter(n => n.id !== notificationId))
      }
    } catch (error) {
      console.error('Erro ao aceitar convite:', error)
    } finally {
      setLoadingActions(prev => prev.filter(id => id !== notificationId))
    }
  }

  const handleDecline = async (actionUrl: string, notificationId: string) => {
    setLoadingActions(prev => [...prev, notificationId])
    try {
      const response = await Api.declineInvitation(actionUrl)
      if (response) {
        console.log('Notificação rejeitada com sucesso!')
        // Remove a notificação da lista após rejeitar
        setNotifications(prev => prev.filter(n => n.id !== notificationId))
      }
    } catch (error) {
      console.error('Erro ao rejeitar convite:', error)
    } finally {
      setLoadingActions(prev => prev.filter(id => id !== notificationId))
    }
  }

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => 
        n.id === notificationId ? { ...n, isRead: true } : n
      )
    )
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'INVITATION_RECEIVED':
        return <Users className="w-5 h-5 text-blue-500" />
      case 'APPOINTMENT':
        return <Calendar className="w-5 h-5 text-green-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - new Date(date).getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Agora'
    if (minutes < 60) return `${minutes}min atrás`
    if (hours < 24) return `${hours}h atrás`
    return `${days}d atrás`
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <div className="w-80 h-full bg-white border-l border-gray-200 shadow-lg flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-700" />
            <h3 className="font-semibold text-gray-900">
              Notificações
            </h3>
            {unreadCount > 0 && (
              <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={`text-xs ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
              {isConnected ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
        
        {!isConnected && (
          <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded-md">
            <p className="text-xs text-orange-700 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Reconectando ao servidor...
            </p>
          </div>
        )}
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto">
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded-md m-4" 
        onClick={() => setCount(count + 1)}
        disabled={!isConnected}
      >
        CLIQUE AQUI {count} {!isConnected && '(Desconectado)'}
      </button>
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
            <Bell className="w-12 h-12 text-gray-300 mb-4" />
            <p className="text-sm text-center">Nenhuma notificação ainda</p>
            <p className="text-xs text-center text-gray-400 mt-1">
              Você será notificado aqui quando houver novidades
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                  !notif.isRead ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                }`}
                onClick={() => !notif.isRead && markAsRead(notif.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notif.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className={`text-sm font-medium text-gray-900 leading-5 ${
                        !notif.isRead ? 'font-semibold' : ''
                      }`}>
                        {notif.title}
                      </h4>
                      {!notif.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1 leading-5">
                      {notif.message}
                    </p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(notif.createdAt)}
                      </span>
                      
                      {notif.expiresAt && (
                        <span className="text-xs text-orange-600 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Expira em {formatTimeAgo(notif.expiresAt)}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons for Invitations */}
                    {notif.type === 'INVITATION_RECEIVED' && notif.actionUrl && (
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAccept(notif.actionUrl!, notif.id)
                          }}
                          disabled={loadingActions.includes(notif.id)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Check className="w-3 h-3" />
                          {loadingActions.includes(notif.id) ? 'Aceitando...' : 'Aceitar'}
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDecline(notif.actionUrl!, notif.id)
                          }}
                          disabled={loadingActions.includes(notif.id)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <X className="w-3 h-3" />
                          {loadingActions.includes(notif.id) ? 'Rejeitando...' : 'Rejeitar'}
                        </button>
                      </div>
                    )}

                    {/* Generic Action URL */}
                    {notif.actionUrl && notif.type !== 'INVITATION_RECEIVED' && (
                      <button className="flex items-center gap-1 mt-2 text-xs text-blue-600 hover:text-blue-800 transition-colors">
                        Ver detalhes
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <button className="w-full text-sm text-gray-600 hover:text-gray-800 transition-colors">
            Marcar todas como lidas
          </button>
        </div>
      )}
    </div>
  )
}

export default NotificationsSidebar