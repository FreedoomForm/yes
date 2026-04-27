'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type PageId = 
  | 'main-home'
  | 'business-home'
  | 'seminar-home'
  | 'app-showcase'
  | 'advisory-home'
  | 'interactive-banners'
  | 'business-strategy'
  | 'fullscreen-slider'
  | 'coming-soon'
  | 'landing'
  | 'about-us'
  | 'about-me'
  | 'our-services'
  | 'our-process'
  | 'our-clients'
  | 'pricing-plans'
  | 'contact-us'
  | 'get-in-touch'
  | 'drop-us-a-note'
  | 'faq-page'
  | 'error-404'
  | 'portfolio-standard'
  | 'portfolio-gallery'
  | 'blog-right-sidebar'
  | 'blog-left-sidebar'
  | 'blog-no-sidebar'
  | 'shop'
  | 'product-single'

interface RouterContextType {
  currentPage: PageId
  navigateTo: (page: PageId) => void
  pages: PageConfig[]
}

interface PageConfig {
  id: PageId
  name: string
  category: string
  description: string
}

export const pages: PageConfig[] = [
  // Homepage Templates
  { id: 'main-home', name: 'Main Home', category: 'Homepage Templates', description: 'Главная страница с полным набором секций' },
  { id: 'business-home', name: 'Business Home', category: 'Homepage Templates', description: 'Бизнес-ориентированная главная' },
  { id: 'seminar-home', name: 'Seminar Home', category: 'Homepage Templates', description: 'Главная для семинаров' },
  { id: 'app-showcase', name: 'App Showcase', category: 'Homepage Templates', description: 'Демонстрация приложения' },
  { id: 'advisory-home', name: 'Advisory Home', category: 'Homepage Templates', description: 'Консалтинговые услуги' },
  { id: 'interactive-banners', name: 'Interactive Banners', category: 'Homepage Templates', description: 'Интерактивные баннеры' },
  { id: 'business-strategy', name: 'Business Strategy', category: 'Homepage Templates', description: 'Стратегия бизнеса' },
  { id: 'fullscreen-slider', name: 'Fullscreen Slider', category: 'Homepage Templates', description: 'Полноэкранный слайдер' },
  { id: 'coming-soon', name: 'Coming Soon', category: 'Homepage Templates', description: 'Скоро открытие' },
  { id: 'landing', name: 'Landing', category: 'Homepage Templates', description: 'Посадочная страница' },
  // About Pages
  { id: 'about-us', name: 'About Us', category: 'About Pages', description: 'О компании' },
  { id: 'about-me', name: 'About Me', category: 'About Pages', description: 'Персональная страница' },
  // Service Pages
  { id: 'our-services', name: 'Our Services', category: 'Service Pages', description: 'Наши услуги' },
  { id: 'our-process', name: 'Our Process', category: 'Service Pages', description: 'Наш процесс' },
  { id: 'our-clients', name: 'Our Clients', category: 'Service Pages', description: 'Наши клиенты' },
  { id: 'pricing-plans', name: 'Pricing Plans', category: 'Service Pages', description: 'Тарифные планы' },
  // Contact Pages
  { id: 'contact-us', name: 'Contact Us', category: 'Contact Pages', description: 'Связаться с нами' },
  { id: 'get-in-touch', name: 'Get In Touch', category: 'Contact Pages', description: 'Связаться' },
  { id: 'drop-us-a-note', name: 'Drop Us A Note', category: 'Contact Pages', description: 'Написать нам' },
  // Utility Pages
  { id: 'faq-page', name: 'FAQ Page', category: 'Utility Pages', description: 'Частые вопросы' },
  { id: 'error-404', name: '404 Error Page', category: 'Utility Pages', description: 'Страница ошибки' },
  // Portfolio Pages
  { id: 'portfolio-standard', name: 'Portfolio Standard', category: 'Portfolio Pages', description: 'Стандартное портфолио' },
  { id: 'portfolio-gallery', name: 'Portfolio Gallery', category: 'Portfolio Pages', description: 'Галерея проектов' },
  // Blog Pages
  { id: 'blog-right-sidebar', name: 'Blog Right Sidebar', category: 'Blog Pages', description: 'Блог с боковой панелью справа' },
  { id: 'blog-left-sidebar', name: 'Blog Left Sidebar', category: 'Blog Pages', description: 'Блог с боковой панелью слева' },
  { id: 'blog-no-sidebar', name: 'Blog No Sidebar', category: 'Blog Pages', description: 'Блог без боковой панели' },
  // Shop Pages
  { id: 'shop', name: 'Shop Product List', category: 'Shop Pages', description: 'Каталог товаров' },
  { id: 'product-single', name: 'Product Single', category: 'Shop Pages', description: 'Страница товара' },
]

const RouterContext = createContext<RouterContextType | null>(null)

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageId>('main-home')

  const navigateTo = (page: PageId) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  return (
    <RouterContext.Provider value={{ currentPage, navigateTo, pages }}>
      {children}
    </RouterContext.Provider>
  )
}

export function useRouter() {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider')
  }
  return context
}
