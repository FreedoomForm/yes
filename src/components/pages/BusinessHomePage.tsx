'use client'

import { useRouter } from '@/hooks/use-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Play, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export function BusinessHomePage() {
  const { navigateTo } = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    { title: 'Transform Your Business', subtitle: 'Strategic consulting for growth' },
    { title: 'Drive Innovation', subtitle: 'Stay ahead of competition' },
    { title: 'Build Success', subtitle: 'Expert guidance every step' },
  ]

  return (
    <div className="pt-20">
      {/* Hero Slider */}
      <section className="relative min-h-[90vh] flex items-center bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl">
            <Badge className="mb-4 bg-slate-700 text-white">
              Business Solutions
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 transition-opacity">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              {slides[currentSlide].subtitle}
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Play className="mr-2 h-5 w-5" /> Watch Video
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-3 h-3 rounded-full transition-colors ${i === currentSlide ? 'bg-white' : 'bg-white/30'}`}
            />
          ))}
        </div>
        <button
          onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0))}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '250+', label: 'Happy Clients' },
              { value: '150+', label: 'Projects Done' },
              { value: '50+', label: 'Team Members' },
              { value: '10+', label: 'Years Experience' },
            ].map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-slate-50">
                <p className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</p>
                <p className="text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4">What We Do</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Our Business Services
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Strategic Planning', desc: 'Comprehensive business strategy development' },
              { title: 'Market Analysis', desc: 'In-depth market research and insights' },
              { title: 'Financial Advisory', desc: 'Expert financial guidance and planning' },
              { title: 'Operations Optimization', desc: 'Streamline your business processes' },
              { title: 'Digital Transformation', desc: 'Modernize your business technology' },
              { title: 'Risk Management', desc: 'Identify and mitigate business risks' },
            ].map((service, i) => (
              <Card key={i} className="group hover:shadow-lg transition-all cursor-pointer" onClick={() => navigateTo('our-services')}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-slate-800 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-white font-bold">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-slate-300 mb-8">Contact us today to discuss your needs</p>
          <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100" onClick={() => navigateTo('contact-us')}>
            Contact Us <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}
