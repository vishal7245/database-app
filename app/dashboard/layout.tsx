'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Home, Folder, LogOut, Menu } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navItems = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/dashboard/Healthy+RIF', label: 'Healthy RIF', icon: Folder },
    { href: '/dashboard/Proliferative', label: 'Proliferative', icon: Folder },
    { href: '/dashboard/Healthy', label: 'Healthy', icon: Folder },
    { href: '/dashboard/RIF', label: 'RIF', icon: Folder },
    { href: '/dashboard/ExcludedDatasets', label: 'Excluded Datasets', icon: Folder },
    { href: '/dashboard/AllDatasets', label: 'All Datasets', icon: Folder },
  ]

  return (
    <div className="flex min-h-screen bg-white">
      <nav
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-pink-800 text-white transition-all duration-300",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-full flex-col justify-between p-4">
          <div>
            <div className="mb-8 flex items-center justify-between">
              {!isCollapsed && <h2 className="text-xl font-semibold">Dashboard</h2>}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-pink-100 hover:bg-pink-700 hover:text-white"
              >
                {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
              </Button>
            </div>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          className={cn(
                            "flex items-center rounded-lg p-2 text-pink-100 hover:bg-pink-700",
                            isCollapsed ? "justify-center" : "space-x-3"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          {!isCollapsed && <span>{item.label}</span>}
                        </Link>
                      </TooltipTrigger>
                      {isCollapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
                    </Tooltip>
                  </TooltipProvider>
                </li>
              ))}
            </ul>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/logout"
                  className={cn(
                    "flex items-center rounded-lg p-2 text-pink-100 hover:bg-pink-700",
                    isCollapsed ? "justify-center" : "space-x-3"
                  )}
                >
                  <LogOut className="h-5 w-5" />
                  {!isCollapsed && <span>Logout</span>}
                </Link>
              </TooltipTrigger>
              {isCollapsed && <TooltipContent side="right">Logout</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        </div>
      </nav>
      <main className={cn(
        "flex-1 overflow-auto transition-all duration-300",
        isCollapsed ? "ml-16" : "ml-64"
      )}>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}