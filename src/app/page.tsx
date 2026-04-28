'use client'

import { useState } from 'react'

const PAGES = [
  { id: 'index', name: 'Main Home', category: 'Homepage' },
  { id: 'business_home', name: 'Business Home', category: 'Homepage' },
  { id: 'seminar_home', name: 'Seminar Home', category: 'Homepage' },
  { id: 'app_showcase', name: 'App Showcase', category: 'Homepage' },
  { id: 'advisory_home', name: 'Advisory Home', category: 'Homepage' },
  { id: 'interactive_banners', name: 'Interactive Banners', category: 'Homepage' },
  { id: 'business_strategy', name: 'Business Strategy', category: 'Homepage' },
  { id: 'fullscreen_slider', name: 'Fullscreen Slider', category: 'Homepage' },
  { id: 'coming_soon', name: 'Coming Soon', category: 'Homepage' },
  { id: 'landing', name: 'Landing', category: 'Homepage' },
  { id: 'about_us', name: 'About Us', category: 'About' },
  { id: 'about_me', name: 'About Me', category: 'About' },
  { id: 'our_services', name: 'Our Services', category: 'Services' },
  { id: 'our_process', name: 'Our Process', category: 'Services' },
  { id: 'our_clients', name: 'Our Clients', category: 'Services' },
  { id: 'pricing_plans', name: 'Pricing Plans', category: 'Services' },
  { id: 'contact_us', name: 'Contact Us', category: 'Contact' },
  { id: 'get_in_touch', name: 'Get In Touch', category: 'Contact' },
  { id: 'drop_us_a_note', name: 'Drop Us A Note', category: 'Contact' },
  { id: 'faq_page', name: 'FAQ Page', category: 'Utility' },
  { id: 'portfolio_standard', name: 'Portfolio Standard', category: 'Portfolio' },
  { id: 'portfolio_gallery', name: 'Portfolio Gallery', category: 'Portfolio' },
  { id: 'blog_right_sidebar', name: 'Blog Right Sidebar', category: 'Blog' },
  { id: 'blog_left_sidebar', name: 'Blog Left Sidebar', category: 'Blog' },
  { id: 'blog_no_sidebar', name: 'Blog No Sidebar', category: 'Blog' },
  { id: 'shop', name: 'Shop', category: 'Shop' },
  { id: 'product_single', name: 'Product Single', category: 'Shop' },
]

const CATEGORIES = ['Homepage', 'About', 'Services', 'Contact', 'Utility', 'Portfolio', 'Blog', 'Shop']

export default function Home() {
  const [currentPage, setCurrentPage] = useState('index')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const pageUrl = currentPage === 'index' 
    ? '/leroux-exact/index.html' 
    : `/leroux-exact/pages/${currentPage}.html`

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-16'} bg-slate-950 text-white transition-all duration-300 flex flex-col fixed h-full z-50`}>
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h1 className="text-xl font-bold">Leroux</h1>
              <p className="text-xs text-slate-400">Exact Copy • 27 Pages</p>
            </div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-2">
          {CATEGORIES.map(category => (
            <div key={category}>
              {sidebarOpen && (
                <h3 className="text-xs uppercase text-slate-500 px-4 py-2 font-semibold">{category}</h3>
              )}
              {PAGES.filter(p => p.category === category).map(page => (
                <button
                  key={page.id}
                  onClick={() => setCurrentPage(page.id)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    currentPage === page.id 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-slate-800 text-slate-300'
                  }`}
                  title={!sidebarOpen ? page.name : undefined}
                >
                  {sidebarOpen ? page.name : page.name.charAt(0)}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`${sidebarOpen ? 'ml-72' : 'ml-16'} transition-all duration-300 flex-1`}>
        {/* Top Bar */}
        <div className="bg-slate-900 border-b border-slate-700 px-6 py-3 sticky top-0 z-40 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {PAGES.find(p => p.id === currentPage)?.name}
            </h2>
            <p className="text-xs text-slate-400">
              Template {PAGES.findIndex(p => p.id === currentPage) + 1} of {PAGES.length} • 
              142 CSS • 202 JS • 1316 Images • 87MB Total
            </p>
          </div>
          <div className="flex gap-2">
            <a 
              href={pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
            >
              Open Full Page ↗
            </a>
          </div>
        </div>

        {/* Iframe with exact copy */}
        <div className="bg-white" style={{ height: 'calc(100vh - 65px)' }}>
          <iframe 
            src={pageUrl}
            className="w-full h-full border-0"
            title="Leroux Template"
          />
        </div>
      </main>
    </div>
  )
}
