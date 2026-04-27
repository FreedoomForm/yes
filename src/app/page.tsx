'use client'

import { RouterProvider, useRouter, PageId } from '@/hooks/use-router'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MainHomePage } from '@/components/pages/MainHomePage'
import { BusinessHomePage } from '@/components/pages/BusinessHomePage'
import {
  AboutUsPage,
  AboutMePage,
  OurServicesPage,
  OurProcessPage,
  OurClientsPage,
  PricingPlansPage,
  ContactUsPage,
  GetInTouchPage,
  DropUsANotePage,
  FAQPage,
  Error404Page,
  PortfolioStandardPage,
  PortfolioGalleryPage,
  BlogRightSidebarPage,
  BlogLeftSidebarPage,
  BlogNoSidebarPage,
  ShopPage,
  ProductSinglePage,
  SeminarHomePage,
  AppShowcasePage,
  AdvisoryHomePage,
  InteractiveBannersPage,
  BusinessStrategyPage,
  FullscreenSliderPage,
  ComingSoonPage,
  LandingPage,
} from '@/components/pages/AllPages'

function PageRenderer() {
  const { currentPage } = useRouter()

  const pageComponents: Record<PageId, React.ComponentType> = {
    'main-home': MainHomePage,
    'business-home': BusinessHomePage,
    'seminar-home': SeminarHomePage,
    'app-showcase': AppShowcasePage,
    'advisory-home': AdvisoryHomePage,
    'interactive-banners': InteractiveBannersPage,
    'business-strategy': BusinessStrategyPage,
    'fullscreen-slider': FullscreenSliderPage,
    'coming-soon': ComingSoonPage,
    'landing': LandingPage,
    'about-us': AboutUsPage,
    'about-me': AboutMePage,
    'our-services': OurServicesPage,
    'our-process': OurProcessPage,
    'our-clients': OurClientsPage,
    'pricing-plans': PricingPlansPage,
    'contact-us': ContactUsPage,
    'get-in-touch': GetInTouchPage,
    'drop-us-a-note': DropUsANotePage,
    'faq-page': FAQPage,
    'error-404': Error404Page,
    'portfolio-standard': PortfolioStandardPage,
    'portfolio-gallery': PortfolioGalleryPage,
    'blog-right-sidebar': BlogRightSidebarPage,
    'blog-left-sidebar': BlogLeftSidebarPage,
    'blog-no-sidebar': BlogNoSidebarPage,
    'shop': ShopPage,
    'product-single': ProductSinglePage,
  }

  const PageComponent = pageComponents[currentPage] || MainHomePage

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <PageComponent />
      </main>
      <Footer />
    </div>
  )
}

export default function Home() {
  return (
    <RouterProvider>
      <PageRenderer />
    </RouterProvider>
  )
}
