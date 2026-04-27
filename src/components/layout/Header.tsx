'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useRouter, pages } from '@/hooks/use-router'
import { Menu, X, ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const navigation = [
  {
    name: 'Home',
    items: pages.filter(p => p.category === 'Homepage Templates').slice(0, 6)
  },
  {
    name: 'Pages',
    items: [
      ...pages.filter(p => p.category === 'About Pages'),
      ...pages.filter(p => p.category === 'Service Pages'),
      ...pages.filter(p => p.category === 'Contact Pages'),
      ...pages.filter(p => p.category === 'Utility Pages'),
    ]
  },
  {
    name: 'Portfolio',
    items: pages.filter(p => p.category === 'Portfolio Pages')
  },
  {
    name: 'Blog',
    items: pages.filter(p => p.category === 'Blog Pages')
  },
  {
    name: 'Shop',
    items: pages.filter(p => p.category === 'Shop Pages')
  },
]

export function Header() {
  const { currentPage, navigateTo } = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button 
            onClick={() => navigateTo('main-home')}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="text-2xl font-bold text-slate-800">Leroux</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((nav) => (
              <DropdownMenu key={nav.name}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50">
                    {nav.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {nav.items.map((item) => (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => navigateTo(item.id)}
                      className={`cursor-pointer ${currentPage === item.id ? 'bg-slate-100' : ''}`}
                    >
                      {item.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button 
              onClick={() => navigateTo('contact-us')}
              className="bg-slate-800 hover:bg-slate-700 text-white"
            >
              Get In Touch
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-slate-800">Menu</span>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  {navigation.map((nav) => (
                    <div key={nav.name} className="mb-4">
                      <h3 className="text-sm font-semibold text-slate-500 mb-2">{nav.name}</h3>
                      <div className="space-y-1">
                        {nav.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => {
                              navigateTo(item.id)
                              setIsOpen(false)
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              currentPage === item.id 
                                ? 'bg-slate-100 text-slate-900' 
                                : 'text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t">
                  <Button 
                    onClick={() => {
                      navigateTo('contact-us')
                      setIsOpen(false)
                    }}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-white"
                  >
                    Get In Touch
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
