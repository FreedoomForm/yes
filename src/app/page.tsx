'use client'

import { useState, useEffect } from 'react'

interface Template {
  id: string
  name: string
}

interface TemplateData {
  html: string
  css: string
  metadata: {
    name?: string
    title?: string
    sections?: Array<{ heading: string; text: string }>
    images?: Array<{ src: string; alt: string }>
    nav_items?: Array<{ text: string; href: string }>
    footer_text?: string
  }
  slug: string
}

// All 27 available templates
const TEMPLATES: Template[] = [
  { id: 'main_home', name: 'Main Home' },
  { id: 'business_home', name: 'Business Home' },
  { id: 'seminar_home', name: 'Seminar Home' },
  { id: 'app_showcase', name: 'App Showcase' },
  { id: 'advisory_home', name: 'Advisory Home' },
  { id: 'interactive_banners', name: 'Interactive Banners' },
  { id: 'business_strategy', name: 'Business Strategy' },
  { id: 'fullscreen_slider', name: 'Fullscreen Slider' },
  { id: 'coming_soon', name: 'Coming Soon' },
  { id: 'landing', name: 'Landing' },
  { id: 'about_us', name: 'About Us' },
  { id: 'about_me', name: 'About Me' },
  { id: 'our_services', name: 'Our Services' },
  { id: 'our_process', name: 'Our Process' },
  { id: 'our_clients', name: 'Our Clients' },
  { id: 'pricing_plans', name: 'Pricing Plans' },
  { id: 'contact_us', name: 'Contact Us' },
  { id: 'get_in_touch', name: 'Get In Touch' },
  { id: 'drop_us_a_note', name: 'Drop Us A Note' },
  { id: 'faq_page', name: 'FAQ Page' },
  { id: 'portfolio_standard', name: 'Portfolio Standard' },
  { id: 'portfolio_gallery', name: 'Portfolio Gallery' },
  { id: 'blog_right_sidebar', name: 'Blog Right Sidebar' },
  { id: 'blog_left_sidebar', name: 'Blog Left Sidebar' },
  { id: 'blog_no_sidebar', name: 'Blog No Sidebar' },
  { id: 'shop', name: 'Shop' },
  { id: 'product_single', name: 'Product Single' },
]

const TEMPLATE_CATEGORIES = {
  'Homepage': ['main_home', 'business_home', 'seminar_home', 'app_showcase', 'advisory_home', 'interactive_banners', 'business_strategy', 'fullscreen_slider', 'coming_soon', 'landing'],
  'About': ['about_us', 'about_me'],
  'Services': ['our_services', 'our_process', 'our_clients', 'pricing_plans'],
  'Contact': ['contact_us', 'get_in_touch', 'drop_us_a_note'],
  'Utility': ['faq_page'],
  'Portfolio': ['portfolio_standard', 'portfolio_gallery'],
  'Blog': ['blog_right_sidebar', 'blog_left_sidebar', 'blog_no_sidebar'],
  'Shop': ['shop', 'product_single'],
}

export default function Home() {
  const [currentTemplate, setCurrentTemplate] = useState<string>('main_home')
  const [templateData, setTemplateData] = useState<TemplateData | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    async function fetchTemplate() {
      setLoading(true)
      try {
        const res = await fetch(`/api/templates/${currentTemplate}`)
        const data = await res.json()
        setTemplateData(data)
      } catch (error) {
        console.error('Failed to fetch template:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTemplate()
  }, [currentTemplate])

  // Clean and process HTML for display
  const processHtml = (html: string) => {
    // Remove scripts but keep structure
    return html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-16'} bg-slate-900 text-white transition-all duration-300 flex flex-col fixed h-full z-50 shadow-xl`}>
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          {sidebarOpen && (
            <div>
              <h1 className="text-lg font-bold text-white">Leroux</h1>
              <p className="text-xs text-slate-400">Business Templates</p>
            </div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-2">
          {Object.entries(TEMPLATE_CATEGORIES).map(([category, templateIds]) => (
            <div key={category} className="mb-4">
              {sidebarOpen && (
                <h3 className="text-xs uppercase text-slate-500 px-4 py-2 font-semibold tracking-wider">{category}</h3>
              )}
              {templateIds.map(id => {
                const template = TEMPLATES.find(t => t.id === id)
                if (!template) return null
                return (
                  <button
                    key={id}
                    onClick={() => setCurrentTemplate(id)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-all duration-200 ${
                      currentTemplate === id 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'hover:bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                    title={!sidebarOpen ? template.name : undefined}
                  >
                    {sidebarOpen ? (
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50"></span>
                        {template.name}
                      </span>
                    ) : (
                      <span className="flex justify-center font-medium">{template.name.charAt(0)}</span>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`${sidebarOpen ? 'ml-72' : 'ml-16'} transition-all duration-300 flex-1`}>
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {TEMPLATES.find(t => t.id === currentTemplate)?.name || 'Template'}
              </h2>
              <p className="text-sm text-gray-500">
                Template {TEMPLATES.findIndex(t => t.id === currentTemplate) + 1} of {TEMPLATES.length} • Direct from leroux.qodeinteractive.com
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a 
                href={`https://leroux.qodeinteractive.com/${currentTemplate === 'main_home' ? '' : currentTemplate.replace(/_/g, '-') + '/'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 text-sm font-medium transition-colors"
              >
                View Original ↗
              </a>
            </div>
          </div>
        </div>

        {/* Template Content */}
        <div className="bg-white min-h-[calc(100vh-73px)]">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <div className="text-gray-500">Loading template...</div>
              </div>
            </div>
          ) : templateData ? (
            <div className="relative">
              {/* Google Fonts */}
              <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
              
              {/* External stylesheets from Leroux */}
              <link rel="stylesheet" href="https://leroux.qodeinteractive.com/wp-content/themes/leroux/assets/css/main.min.css" />
              <link rel="stylesheet" href="https://leroux.qodeinteractive.com/wp-content/plugins/leroux-core/assets/css/leroux-core.min.css" />
              <link rel="stylesheet" href="https://leroux.qodeinteractive.com/wp-content/plugins/leroux-core/inc/icons/elegant-icons/assets/css/elegant-icons.min.css" />
              <link rel="stylesheet" href="https://leroux.qodeinteractive.com/wp-content/plugins/leroux-core/inc/icons/font-awesome/assets/css/all.min.css" />
              <link rel="stylesheet" href="https://leroux.qodeinteractive.com/wp-content/plugins/qi-blocks/inc/slider/assets/plugins/5.4.5/swiper.min.css" />
              
              {/* Inline CSS from scraped template */}
              <style dangerouslySetInnerHTML={{ __html: templateData.css }} />
              
              {/* Base styles for proper rendering */}
              <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap');
                
                * { box-sizing: border-box; }
                
                html, body {
                  margin: 0;
                  padding: 0;
                  font-family: 'DM Sans', 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif;
                  -webkit-font-smoothing: antialiased;
                  -moz-osx-font-smoothing: grayscale;
                }
                
                img { 
                  max-width: 100%; 
                  height: auto; 
                  display: block;
                }
                
                a { 
                  color: inherit; 
                  text-decoration: none;
                }
                
                .qodef-content { 
                  min-height: 100vh; 
                }
                
                /* Fix common issues */
                .elementor-section {
                  width: 100% !important;
                }
                
                .qodef-grid-item {
                  float: left;
                }
                
                /* Ensure images load */
                img[src*="leroux.qodeinteractive.com"] {
                  background: #f0f0f0;
                }
              `}} />
              
              {/* Render scraped HTML */}
              <div 
                dangerouslySetInnerHTML={{ __html: processHtml(templateData.html) }}
                className="leroux-template"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-96">
              <div className="text-red-500">Failed to load template</div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
