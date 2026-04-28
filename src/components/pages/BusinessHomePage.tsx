'use client'

import { useRouter } from '@/hooks/use-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Play, ChevronLeft, ChevronRight, BarChart3, Users, Lightbulb, Settings } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export function BusinessHomePage() {
  const { navigateTo } = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    { image: 'https://leroux.qodeinteractive.com/wp-content/uploads/2023/01/business-home-slider-img1.jpg', title: 'Tips for marketing & strategy' },
    { image: 'https://leroux.qodeinteractive.com/wp-content/uploads/2023/01/business-home-slider-img2.jpg', title: 'Achieve Results With Modern Ideas' },
    { image: 'https://leroux.qodeinteractive.com/wp-content/uploads/2023/01/business-home-slider-img3.jpg', title: 'Expertise advice for your business plans' },
    { image: 'https://leroux.qodeinteractive.com/wp-content/uploads/2023/01/business-home-slider-img4.jpg', title: 'Transform Your Business Today' },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0))
    }, 6000)
    return () => clearInterval(timer)
  }, [slides.length])

  const services = [
    { icon: BarChart3, title: 'Market Research', desc: 'Expert market analysis and insights' },
    { icon: Users, title: 'Marketing', desc: 'Strategic marketing solutions' },
    { icon: Lightbulb, title: 'Web Solution', desc: 'Digital transformation expertise' },
    { icon: Settings, title: 'Development', desc: 'Custom development services' },
    { icon: BarChart3, title: 'Innovation', desc: 'Cutting-edge solutions' },
    { icon: Users, title: 'Virtual reality', desc: 'Immersive experiences' },
  ]

  const accordionItems = [
    { 
      title: 'Operations & Efficiency', 
      image: 'https://leroux.qodeinteractive.com/wp-content/uploads/2023/01/business-acordion-img1.jpg',
      desc: 'Strategy work & accounting. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    { 
      title: 'Strategy Work & Accounting', 
      image: 'https://leroux.qodeinteractive.com/wp-content/uploads/2023/02/business-acordion-img2.jpg',
      desc: 'Identity design specialists. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    { 
      title: 'Identity Design Specialists', 
      image: 'https://leroux.qodeinteractive.com/wp-content/uploads/2023/02/business-acordion-img3.jpg',
      desc: 'Change your company image with our help. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    { 
      title: 'Change Your Company Image', 
      image: 'https://leroux.qodeinteractive.com/wp-content/uploads/2023/03/business-acordion-img4.jpg',
      desc: 'Professional business transformation. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
  ]

  const pricingPlans = [
    { price: '$68', name: 'Basic Plan', features: ['Affert volumus legend', 'Mel detracto atomorum ne', 'Eripuit minimum probatus ei', 'Vix ex natum iracundia'], featured: false },
    { price: '$168', name: 'Standard Plan', features: ['Affert volumus legend', 'Mel detracto atomorum ne', 'Eripuit minimum probatus ei', 'Vix ex natum iracundia'], featured: true },
    { price: '$268', name: 'Premium Plan', features: ['Affert volumus legend', 'Mel detracto atomorum ne', 'Eripuit minimum probatus ei', 'Vix ex natum iracundia'], featured: false },
  ]

  return (
    <div className="pt-20">
      {/* Hero Slider */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />
          </div>
        ))}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-white/10 text-white border-white/20 backdrop-blur-sm">
              Business Solutions
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-500">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100" onClick={() => navigateTo('our-services')}>
                View More <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Play className="mr-2 h-5 w-5" /> Watch Video
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
          className="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors z-20"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0))}
          className="absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors z-20"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Slide Counter */}
        <div className="absolute bottom-8 right-8 text-white z-20">
          <span className="text-4xl font-bold">{String(currentSlide + 1).padStart(2, '0')}</span>
          <span className="text-xl text-white/60"> / {String(slides.length).padStart(2, '0')}</span>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Card key={i} className="group hover:shadow-lg transition-all cursor-pointer border-0 bg-slate-50" onClick={() => navigateTo('our-services')}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-slate-800 rounded-lg mb-4 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                    <service.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">About Our Company</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Digitize your business now with our best experts
              </h2>
              <p className="text-slate-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </p>
              <p className="text-slate-600 mb-8">
                Change your company image with our help. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
              <Button className="bg-slate-800 hover:bg-slate-700 text-white" onClick={() => navigateTo('about-us')}>
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {accordionItems.map((item, i) => (
                <div 
                  key={i} 
                  className="group relative overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => navigateTo('our-services')}
                >
                  <div className="aspect-[3/1] relative">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent" />
                    <div className="absolute inset-0 flex items-center p-6">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                        <p className="text-white/80 text-sm line-clamp-2">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-white/10 text-white border-white/20">Pricing</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Find the best plan for your needs
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Choose the perfect plan for your business. All plans include our core features.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, i) => (
              <Card 
                key={i} 
                className={`relative ${plan.featured ? 'bg-white text-slate-900 scale-105 shadow-2xl' : 'bg-slate-800 text-white border-slate-700'}`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-slate-800 text-white">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-6 text-center">
                  <p className="text-4xl font-bold mb-2">{plan.price}</p>
                  <h3 className="text-xl font-semibold mb-6">{plan.name}</h3>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="text-sm flex items-center justify-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${plan.featured ? 'bg-slate-400' : 'bg-slate-500'}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.featured ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-white hover:bg-slate-100 text-slate-900'}`}
                  >
                    View More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your needs. Our team is ready to help you achieve your business goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-slate-800 hover:bg-slate-700 text-white" onClick={() => navigateTo('contact-us')}>
              Contact Us <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigateTo('our-services')}>
              View Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
