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
    // Remove admin bars and unnecessary elements
    return html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
  }

  // External CSS links from the template
  const externalStyles = `
    https://leroux.qodeinteractive.com/wp-content/themes/leroux/assets/css/main.min.css
    https://leroux.qodeinteractive.com/wp-content/plugins/leroux-core/assets/css/leroux-core.min.css
    https://leroux.qodeinteractive.com/wp-content/plugins/leroux-core/inc/icons/elegant-icons/assets/css/elegant-icons.min.css
    https://leroux.qodeinteractive.com/wp-content/plugins/leroux-core/inc/icons/font-awesome/assets/css/all.min.css
  `

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-16'} bg-gray-900 text-white transition-all duration-300 flex flex-col fixed h-full z-50`}>
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-lg font-bold">Leroux Templates</h1>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-700 rounded"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-2">
          {Object.entries(TEMPLATE_CATEGORIES).map(([category, templateIds]) => (
            <div key={category} className="mb-4">
              {sidebarOpen && (
                <h3 className="text-xs uppercase text-gray-400 px-3 py-2">{category}</h3>
              )}
              {templateIds.map(id => {
                const template = TEMPLATES.find(t => t.id === id)
                if (!template) return null
                return (
                  <button
                    key={id}
                    onClick={() => setCurrentTemplate(id)}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                      currentTemplate === id 
                        ? 'bg-blue-600 text-white' 
                        : 'hover:bg-gray-700 text-gray-300'
                    }`}
                    title={!sidebarOpen ? template.name : undefined}
                  >
                    {sidebarOpen ? template.name : template.name.charAt(0)}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? 'ml-72' : 'ml-16'} transition-all duration-300`}>
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {TEMPLATES.find(t => t.id === currentTemplate)?.name || 'Template'}
              </h2>
              <p className="text-sm text-gray-500">
                Direct HTML/CSS implementation from leroux.qodeinteractive.com
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                Template {TEMPLATES.findIndex(t => t.id === currentTemplate) + 1} of {TEMPLATES.length}
              </span>
              <a 
                href={`https://leroux.qodeinteractive.com/${currentTemplate === 'main_home' ? '' : currentTemplate.replace(/_/g, '-') + '/'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                View Original
              </a>
            </div>
          </div>
        </div>

        {/* Template Content */}
        <div className="bg-white">
          {loading ? (
            <div className="flex items-center justify-center h-96">
              <div className="text-gray-500">Loading template...</div>
            </div>
          ) : templateData ? (
            <div className="relative">
              {/* External stylesheets */}
              <link rel="stylesheet" href="https://leroux.qodeinteractive.com/wp-content/themes/leroux/assets/css/main.min.css" />
              <link rel="stylesheet" href="https://leroux.qodeinteractive.com/wp-content/plugins/leroux-core/assets/css/leroux-core.min.css" />
              <link rel="stylesheet" href="https://leroux.qodeinteractive.com/wp-content/plugins/leroux-core/inc/icons/elegant-icons/assets/css/elegant-icons.min.css" />
              <link rel="stylesheet" href="https://leroux.qodeinteractive.com/wp-content/plugins/leroux-core/inc/icons/font-awesome/assets/css/all.min.css" />
              
              {/* Inline CSS from scraped template */}
              <style dangerouslySetInnerHTML={{ __html: templateData.css }} />
              
              {/* Custom base styles */}
              <style dangerouslySetInnerHTML={{ __html: `
                * { box-sizing: border-box; }
                body { margin: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
                img { max-width: 100%; height: auto; }
                a { color: inherit; }
                .qodef-content { min-height: 100vh; }
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
