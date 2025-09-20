'use client'
import React, { useState, useEffect } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronRight, ChevronLeft, Menu, Settings, LogOut, Home, MessageCircle, ClipboardList, Database, Lightbulb } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { sidebarOptions } from './constants/sidebar-settings'

interface SidebarProps {
    isOpen?: boolean
    onClose?: () => void
    currentPath?: string
}

// Helper functions for cookies
const setCookie = (name: string, value: string, days: number) => {
    let expires = ""
    if (days) {
        const date = new Date()
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
        expires = "; expires=" + date.toUTCString()
    }
    if (typeof document !== "undefined") {
        document.cookie = name + "=" + (value || "") + expires + "; path=/"
    }
}

const getCookie = (name: string): string | null => {
    if (typeof document === "undefined") {
        return null
    }
    const nameEQ = name + "="
    const ca = document.cookie.split(";")
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) === " ") c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
}

// Generate initials from name
const generateInitials = (name: string): string => {
    return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2)
}

function Sidebar({ isOpen = true, onClose, currentPath = "/" }: SidebarProps) {
    const [isDesktopOpen, setIsDesktopOpen] = useState(true);
    
    useEffect(() => {
        const saved = localStorage.getItem("sidebarCollapsed");
        if (saved !== null)
            setIsDesktopOpen(saved !== "null");
    }, []);

    const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set())
    const [collapsedMenuItems, setCollapsedMenuItems] = useState<Set<string>>(new Set())
    const [organizationName] = useState("Minha Organização")
    const [userName] = useState("João Silva")

    const iniciais = generateInitials(organizationName)

    const router = useRouter()

    // Save sidebar state to cookie
    useEffect(() => {
        localStorage.setItem("sidebarCollapsed", isDesktopOpen ? "false" : "true");
    }, [isDesktopOpen]);

    const toggleSidebar = () => {
        setIsDesktopOpen(prev => !prev)
    }

    const toggleCategory = (categoryName: string) => {
        setCollapsedCategories(prev => {
            const newSet = new Set(prev)
            newSet.has(categoryName) ? newSet.delete(categoryName) : newSet.add(categoryName)
            return newSet
        })
    }

    const toggleMenuItem = (itemKey: string) => {
        setCollapsedMenuItems(prev => {
            const newSet = new Set(prev)
            newSet.has(itemKey) ? newSet.delete(itemKey) : newSet.add(itemKey)
            return newSet
        })
    }

    const isActiveRoute = (optionPage: string): boolean => {
        if (optionPage === "/" || optionPage === "") {
            return currentPath === "/"
        }
        return currentPath.startsWith(optionPage)
    }

    const isCategoryCollapsed = (categoryName: string): boolean => {
        return collapsedCategories.has(categoryName)
    }

    const isMenuItemCollapsed = (itemKey: string): boolean => {
        return collapsedMenuItems.has(itemKey)
    }

    const isCategoryActive = (categoryOptions: any[]): boolean => {
        return categoryOptions.some(option => {
            if (isActiveRoute(option.page)) return true
            if (option.childs) {
                return option.childs.some((child: any) => isActiveRoute(child.page))
            }
            return false
        })
    }

    const hasActiveChild = (option: any): boolean => {
        if (!option.childs) return false
        return option.childs.some((child: any) => isActiveRoute(child.page))
    }

    const handleLogout = () => {
        console.log("Logout")
        // Implement logout logic
    }

    const handleNavigate = (page: string) => {
        router.push(page)
        onClose?.()
    }

    return (
        <>
            {/* Background overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[50] lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar Container */}
            <div
                className={`
          fixed lg:static h-screen flex flex-col z-[51] 
          transition-all duration-700 ease-in-out
          bg-card/95 backdrop-blur-xl border-r border-border/20
          ${isDesktopOpen ? "lg:w-[320px]" : "lg:w-[100px]"}
          ${isOpen
                        ? "w-[320px] translate-x-0"
                        : "w-[320px] -translate-x-full lg:translate-x-0"
                    }
        `}
            >
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-accent/3 to-chart-3/3 rounded-r-3xl"></div>


                <div className="relative z-10 h-full flex flex-col p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between w-full mb-8">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex p-2 items-center justify-center gap-3 hover:bg-secondary/50 rounded-2xl cursor-pointer transition-all duration-200 backdrop-blur-sm border border-border/10">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-sm text-primary-foreground font-bold shadow-lg">
                                        {iniciais}
                                    </div>
                                    {isDesktopOpen && (
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="text-sm font-semibold truncate text-foreground">
                                                {organizationName}
                                            </span>
                                            <ChevronDown size={16} className="text-muted-foreground" />
                                        </div>
                                    )}
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 z-[60] bg-card/95 backdrop-blur-xl border border-border/20" align="start">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className="cursor-pointer rounded-xl">
                                        <div className="flex justify-center items-center gap-3">
                                            <Settings size={18} />
                                            <span>Configurações</span>
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                                    <div className="flex justify-center items-center gap-3">
                                        <LogOut size={18} />
                                        <span>Sair</span>
                                    </div>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="flex items-center gap-2">
                            <div className="hidden lg:flex">
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    onClick={toggleSidebar}
                                    className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl h-10 w-10 backdrop-blur-sm"
                                >
                                    {isDesktopOpen ? <ChevronLeft size={18} /> : <Menu size={18} />}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="overflow-y-auto flex-1 flex flex-col gap-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border/20">
                        {Object.entries(sidebarOptions).map(([categoryName, categoryOptions]) => {
                            const collapsed = isCategoryCollapsed(categoryName)
                            const hasActiveOption = isCategoryActive(categoryOptions)

                            return (
                                <div key={categoryName} className="space-y-2">
                                    {/* Category Header */}
                                    {isDesktopOpen && (
                                        <button
                                            onClick={() => toggleCategory(categoryName)}
                                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold tracking-wider transition-all duration-200 hover:bg-secondary/50 backdrop-blur-sm ${hasActiveOption
                                                    ? "text-primary bg-primary/5 border border-primary/10"
                                                    : "text-muted-foreground hover:text-foreground border border-transparent"
                                                }`}
                                        >
                                            <span>{categoryName}</span>
                                            {collapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                                        </button>
                                    )}

                                    {/* Category Items */}
                                    <div
                                        className={`space-y-1 flex justify-center flex-col ${isDesktopOpen ? "items-start" : "items-center"} transition-all duration-500 ease-in-out overflow-hidden ${collapsed && isDesktopOpen
                                                ? "max-h-0 opacity-0"
                                                : "max-h-none opacity-100"
                                            }`}
                                    >
                                        {categoryOptions.map((option: any, optionIndex: number) => {
                                            const isActive = isActiveRoute(option.page)
                                            const hasChildren = Boolean(option.childs?.length)
                                            const hasActiveChildItem = hasActiveChild(option)
                                            const itemKey = `${categoryName}-${optionIndex}`
                                            const isItemCollapsed = isMenuItemCollapsed(itemKey)

                                            return (
                                                <div key={option.name} className="space-y-1">
                                                    <div className="flex items-center w-full">
                                                        <button
                                                            onClick={() => handleNavigate(option.page)}
                                                            className={`${isDesktopOpen ? 'flex-1' : 'w-12 h-12'} flex cursor-pointer items-center gap-3 ${isDesktopOpen ? 'px-4 py-3' : 'p-2'} rounded-xl text-sm font-medium transition-all duration-200 backdrop-blur-sm border ${isActive || hasActiveChildItem
                                                                    ? "bg-gradient-to-r from-primary/10 to-accent/5 text-primary border-primary/20 shadow-sm"
                                                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/40 border-transparent hover:border-border/20"
                                                                } ${!isDesktopOpen ? "justify-center" : ""}`}
                                                        >
                                                            <div className="flex-shrink-0">{option.icon}</div>
                                                            {isDesktopOpen && <span className="truncate">{option.name}</span>}
                                                        </button>

                                                        {hasChildren && isDesktopOpen && (
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => toggleMenuItem(itemKey)}
                                                                className="h-10 w-10 p-0 text-muted-foreground hover:text-foreground hover:bg-secondary/50 ml-2 rounded-xl"
                                                            >
                                                                {isItemCollapsed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                                                            </Button>
                                                        )}
                                                    </div>

                                                    {/* Child Items */}
                                                    {hasChildren && isDesktopOpen && option.childs && (
                                                        <div
                                                            className={`ml-8 space-y-1 transition-all duration-500 ease-in-out overflow-hidden ${isItemCollapsed
                                                                    ? "max-h-0 opacity-0"
                                                                    : "max-h-none opacity-100"
                                                                }`}
                                                        >
                                                            {option.childs.map((child: any) => {
                                                                const isChildActive = isActiveRoute(child.page)
                                                                return (
                                                                    <button
                                                                        key={child.name}
                                                                        onClick={() => handleNavigate(child.page)}
                                                                        className={`w-full flex cursor-pointer items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 backdrop-blur-sm border ${isChildActive
                                                                                ? "bg-gradient-to-r from-primary/10 to-accent/5 text-primary border-primary/20 shadow-sm"
                                                                                : "text-muted-foreground hover:text-foreground hover:bg-secondary/30 border-transparent hover:border-border/20"
                                                                            }`}
                                                                    >
                                                                        <div className="flex-shrink-0">{child.icon}</div>
                                                                        <span className="truncate text-xs">{child.name}</span>
                                                                    </button>
                                                                )
                                                            })}
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="mt-auto pt-4 border-t border-border/20">
                        <div className="flex items-center gap-3 p-3 rounded-2xl bg-secondary/30 backdrop-blur-sm border border-border/10">
                            <div className="w-10 h-10 bg-gradient-to-br from-accent to-chart-3 rounded-xl flex items-center justify-center text-sm text-primary-foreground font-bold">
                                {generateInitials(userName)}
                            </div>

                            {isDesktopOpen && (
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-foreground truncate">{userName}</p>
                                    <p className="text-xs text-muted-foreground truncate">Online</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar