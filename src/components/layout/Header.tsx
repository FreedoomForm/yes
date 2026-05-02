'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useRouter, pages } from '@/hooks/use-router'
import { Menu, X, ChevronDown, Phone, Mail, MapPin } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'

const navigation = [
  {
    name: 'Home',
    items: pages.filter(p => p.category === 'Homepage Templates')
  },
  {
    name: 'Pages',
    items: [
      { label: 'About', items: pages.filter(p => p.category === 'About Pages') },
      { label: 'Services', items: pages.filter(p => p.category === 'Service Pages') },
      { label: 'Contact', items: pages.filter(p => p.category === 'Contact Pages') },
      { label: 'Utility', items: pages.filter(p => p.category === 'Utility Pages') },
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
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'}`}>
      {/* Top Bar */}
      <div className="hidden lg:block bg-slate-800 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Old Westbury 256, New York 11201, United States
              </span>
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +1 234 5678 9999
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span>Mon - Sat 8.00 - 16.00</span>
              <span className="text-slate-400">|</span>
              <span>Sunday CLOSED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => navigateTo('main-home')}
            className="flex items-center gap-3 mt-[30px]"
          >
            <Image
              src="https://leroux.qodeinteractive.com/wp-content/uploads/2023/01/logo-dark-skin.png"
              alt="Leroux Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Home Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50">
                  Home
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {pages.filter(p => p.category === 'Homepage Templates').map((item) => (
                  <DropdownMenuItem
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`cursor-pointer ${currentPage === item.id ? 'bg-slate-100 text-slate-900' : ''}`}
                  >
                    {item.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Pages Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50">
                  Pages
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuLabel>About</DropdownMenuLabel>
                {pages.filter(p => p.category === 'About Pages').map((item) => (
                  <DropdownMenuItem
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`cursor-pointer ${currentPage === item.id ? 'bg-slate-100' : ''}`}
                  >
                    {item.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Services</DropdownMenuLabel>
                {pages.filter(p => p.category === 'Service Pages').map((item) => (
                  <DropdownMenuItem
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`cursor-pointer ${currentPage === item.id ? 'bg-slate-100' : ''}`}
                  >
                    {item.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Contact</DropdownMenuLabel>
                {pages.filter(p => p.category === 'Contact Pages').map((item) => (
                  <DropdownMenuItem
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`cursor-pointer ${currentPage === item.id ? 'bg-slate-100' : ''}`}
                  >
                    {item.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Utility</DropdownMenuLabel>
                {pages.filter(p => p.category === 'Utility Pages').map((item) => (
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

            {/* Portfolio Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50">
                  Portfolio
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {pages.filter(p => p.category === 'Portfolio Pages').map((item) => (
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

            {/* Blog Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50">
                  Blog
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {pages.filter(p => p.category === 'Blog Pages').map((item) => (
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

            {/* Shop Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50">
                  Shop
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {pages.filter(p => p.category === 'Shop Pages').map((item) => (
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

            {/* Landing Link */}
            <Button 
              variant="ghost" 
              className="px-4 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50"
              onClick={() => navigateTo('landing')}
            >
              Landing
            </Button>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button 
              onClick={() => navigateTo('contact-us')}
              className="bg-slate-800 hover:bg-slate-700 text-white px-6"
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
                    <Image
                      src="https://leroux.qodeinteractive.com/wp-content/uploads/2023/01/logo-dark-skin.png"
                      alt="Leroux Logo"
                      width={100}
                      height={32}
                      className="h-8 w-auto"
                    />
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                  {/* Home */}
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Home</h3>
                    <div className="space-y-1">
                      {pages.filter(p => p.category === 'Homepage Templates').map((item) => (
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

                  {/* About */}
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">About</h3>
                    <div className="space-y-1">
                      {pages.filter(p => p.category === 'About Pages').map((item) => (
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

                  {/* Services */}
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Services</h3>
                    <div className="space-y-1">
                      {pages.filter(p => p.category === 'Service Pages').map((item) => (
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

                  {/* Contact */}
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Contact</h3>
                    <div className="space-y-1">
                      {pages.filter(p => p.category === 'Contact Pages').map((item) => (
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

                  {/* Utility */}
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Utility</h3>
                    <div className="space-y-1">
                      {pages.filter(p => p.category === 'Utility Pages').map((item) => (
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

                  {/* Portfolio */}
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Portfolio</h3>
                    <div className="space-y-1">
                      {pages.filter(p => p.category === 'Portfolio Pages').map((item) => (
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

                  {/* Blog */}
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Blog</h3>
                    <div className="space-y-1">
                      {pages.filter(p => p.category === 'Blog Pages').map((item) => (
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

                  {/* Shop */}
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Shop</h3>
                    <div className="space-y-1">
                      {pages.filter(p => p.category === 'Shop Pages').map((item) => (
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
