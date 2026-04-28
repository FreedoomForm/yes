'use client'

import { useState, useEffect } from 'react'

const PAGES = [
  { id: 'index', name: 'Главная', url: '/leroux-exact/index.html' },
  { id: 'our_services', name: 'Наши услуги', url: '/leroux-exact/pages/our_services.html' },
  { id: 'our_clients', name: 'Наши клиенты', url: '/leroux-exact/pages/our_clients.html' },
  { id: 'contact_us', name: 'Контакты', url: '/leroux-exact/pages/contact_us.html' },
]

export default function Home() {
  const [currentPage, setCurrentPage] = useState('index')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const currentPageData = PAGES.find(p => p.id === currentPage)

  // Get base URL for direct access
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header Navigation */}
      <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="font-bold text-xl">Century Intelligence</div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {PAGES.map(page => (
                <button
                  key={page.id}
                  onClick={() => setCurrentPage(page.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page.id 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {page.name}
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-800"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t border-slate-700">
              {PAGES.map(page => (
                <button
                  key={page.id}
                  onClick={() => {
                    setCurrentPage(page.id)
                    setIsMenuOpen(false)
                  }}
                  className={`block w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                    currentPage === page.id 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {page.name}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Main Content - Full Page Iframe */}
      <main className="flex-1">
        <iframe 
          key={currentPage}
          src={currentPageData?.url}
          className="w-full h-full border-0"
          style={{ minHeight: 'calc(100vh - 64px)' }}
          title="Century Intelligence"
        />
      </main>
    </div>
  )
}
