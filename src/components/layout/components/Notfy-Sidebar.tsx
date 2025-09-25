'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X, MessageSquare, FileText, DollarSign, Eye, UserPlus } from 'lucide-react'

interface NotificationAction {
  type: 'accept' | 'decline' | 'reply' | 'download' | 'view'
  label: string
  variant?: 'default' | 'destructive' | 'secondary' | 'outline'
}

interface NotificationTag {
  label: string
  color: 'blue' | 'orange' | 'gray'
}

interface Notification {
  id: string
  title: string
  message?: string
  type: 'friend_request' | 'mention' | 'file' | 'tags' | 'payment' | 'message'
  timestamp: Date
  user?: {
    name: string
    avatar: string
  }
  actions?: NotificationAction[]
  file?: {
    name: string
    size: string
    type: string
  }
  tags?: NotificationTag[]
  amount?: string
}

interface NotificationSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Deja Brady sent you a friend request',
    type: 'friend_request',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    user: {
      name: 'Deja Brady',
      avatar: 'DB'
    },
    actions: [
      { type: 'accept', label: 'Accept', variant: 'default' },
      { type: 'decline', label: 'Decline', variant: 'outline' }
    ]
  },
  {
    id: '2',
    title: 'Jayvon Hull mentioned you in Minimal UI',
    message: '@jaydon Frankie feedback by asking questions or just leave a note of appreciation.',
    type: 'mention',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    user: {
      name: 'Jayvon Hull',
      avatar: 'JH'
    },
    actions: [
      { type: 'reply', label: 'Reply', variant: 'default' }
    ]
  },
  {
    id: '3',
    title: 'Lainey Davidson added file to File manager',
    type: 'file',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    user: {
      name: 'Lainey Davidson',
      avatar: 'LD'
    },
    file: {
      name: 'design-suriname-2015.mp...',
      size: '2.3 MB',
      type: 'video'
    },
    actions: [
      { type: 'download', label: 'Download', variant: 'outline' }
    ]
  },
  {
    id: '4',
    title: 'Angelique Morse added new tags to File manager',
    type: 'tags',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    user: {
      name: 'Angelique Morse',
      avatar: 'AM'
    },
    tags: [
      { label: 'Design', color: 'blue' },
      { label: 'Dashboard', color: 'orange' },
      { label: 'Design system', color: 'gray' }
    ]
  },
  {
    id: '5',
    title: 'Giana Brandt request a payment of $200',
    type: 'payment',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    user: {
      name: 'Giana Brandt',
      avatar: 'GB'
    },
    amount: '$200',
    actions: [
      { type: 'view', label: 'View', variant: 'default' }
    ]
  }
]

const formatTimeAgo = (date: Date): string => {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 1) return 'now'
  if (diffInMinutes < 60) return `${diffInMinutes} minutes`
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours} hours`
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays} days`
  
  return date.toLocaleDateString('pt-BR')
}

const getTagColor = (color: NotificationTag['color']) => {
  switch (color) {
    case 'blue':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
    case 'orange':
      return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300'
    case 'gray':
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
  }
}

function NotificationSidebar({ isOpen = false, onClose }: NotificationSidebarProps) {
  const [notifications] = useState<Notification[]>(mockNotifications)

  const handleAction = (notificationId: string, actionType: string) => {
    console.log(`Action ${actionType} for notification ${notificationId}`)
    // Implement action logic here
  }

  return (
    <>
      {/* Background overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-[50]"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`
          fixed right-0 top-0 h-screen flex flex-col z-[51] 
          transition-all duration-700 ease-in-out
          bg-card/95 border-l border-border/20
          w-[400px]
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-bl from-primary/3 via-accent/3 to-chart-3/3 rounded-l-3xl"></div>

        <div className="relative z-10 h-full flex flex-col p-4">
          {/* Header */}
          <div className="flex items-center justify-between w-full mb-6">
            <h2 className="text-lg font-semibold text-foreground">Notificações</h2>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl h-8 w-8"
              >
                <X size={16} />
              </Button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="overflow-y-auto flex-1 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border/20">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <MessageSquare size={48} className="text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground text-sm">
                  Sem notificações
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="relative p-4 rounded-xl transition-all duration-200 border bg-background/50 border-border/10 hover:bg-background/70"
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {notification.user?.avatar || 'U'}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      {/* Title and time */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-medium text-sm leading-tight text-muted-foreground">
                          {notification.title}
                        </h3>
                        
                        <span className="text-xs text-muted-foreground/70 flex-shrink-0">
                          {formatTimeAgo(notification.timestamp)}
                        </span>
                      </div>

                      {/* Message */}
                      {notification.message && (
                        <p className="text-xs mb-3 line-clamp-3 text-muted-foreground/70">
                          {notification.message}
                        </p>
                      )}

                      {/* File attachment */}
                      {notification.file && (
                        <div className="mb-3 p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-200 dark:border-purple-800/20">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-800/30 rounded-lg flex items-center justify-center">
                                <FileText size={16} className="text-purple-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-foreground">{notification.file.name}</p>
                                <p className="text-xs text-muted-foreground">{notification.file.size}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      {notification.tags && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {notification.tags.map((tag, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 text-xs font-medium rounded-md ${getTagColor(tag.color)}`}
                            >
                              {tag.label}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Actions */}
                      {notification.actions && (
                        <div className="flex gap-2">
                          {notification.actions.map((action, index) => (
                            <Button
                              key={index}
                              size="sm"
                              variant={action.variant || 'default'}
                              onClick={() => handleAction(notification.id, action.type)}
                              className="h-7 px-3 text-xs rounded-lg"
                            >
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* View all button */}
          {notifications.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border/20">
              <Button
                variant="ghost"
                className="w-full rounded-xl hover:bg-secondary/50"
                onClick={() => console.log('Todas as Notificações')}
              >
                <Eye size={16} className="mr-2" />
                Ver tudo
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default NotificationSidebar