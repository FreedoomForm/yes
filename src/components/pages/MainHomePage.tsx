'use client'

import { useRouter } from '@/hooks/use-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Users, Target, BarChart3, Lightbulb, CheckCircle, Star } from 'lucide-react'

export function MainHomePage() {
  const { navigateTo } = useRouter()

  const services = [
    { icon: BarChart3, title: 'Business Analysis', desc: 'Comprehensive market analysis and insights' },
    { icon: Target, title: 'Strategy Planning', desc: 'Custom strategies for your growth' },
    { icon: Users, title: 'Team Building', desc: 'Build and optimize your team' },
    { icon: Lightbulb, title: 'Innovation', desc: 'Creative solutions for challenges' },
  ]

  const stats = [
    { value: '500+', label: 'Projects Completed' },
    { value: '98%', label: 'Client Satisfaction' },
    { value: '50+', label: 'Expert Consultants' },
    { value: '15+', label: 'Years Experience' },
  ]

  const team = [
    { name: 'Anne Reid', role: 'CEO & Founder', image: '👩‍💼' },
    { name: 'Mark Hagne', role: 'Senior Consultant', image: '👨‍💼' },
    { name: 'Diane Miller', role: 'Financial Advisor', image: '👩‍💻' },
    { name: 'Sophie White', role: 'Marketing Lead', image: '👩‍🎨' },
  ]

  const testimonials = [
    { name: 'John Smith', company: 'Tech Corp', text: 'Excellent service and professional team. Highly recommended!', rating: 5 },
    { name: 'Sarah Johnson', company: 'Finance Inc', text: 'They helped us grow our business by 200% in just one year.', rating: 5 },
    { name: 'Michael Brown', company: 'StartUp Co', text: 'The best consulting firm we have ever worked with.', rating: 5 },
  ]

  const posts = [
    { title: 'Making innovative strategies for outstanding future results', category: 'Business', date: 'Feb 06, 2024' },
    { title: 'Our business thrives to contribute global initiatives', category: 'Economy', date: 'Feb 06, 2024' },
    { title: 'Discover a better way of redefining company goals', category: 'Investment', date: 'Feb 06, 2024' },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-96 h-96 bg-slate-200 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-slate-300 rounded-full blur-3xl opacity-30" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-slate-100 text-slate-700 hover:bg-slate-200">
                Professional Business Consulting
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Connect with your clients using a variety of elements
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-xl">
                Professional & modern, a theme designed to help your business stand out from the rest. Let us help you achieve your goals.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-slate-800 hover:bg-slate-700 text-white"
                  onClick={() => navigateTo('our-services')}
                >
                  View More <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigateTo('about-us')}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-9xl">🏢</div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Trusted by 500+</p>
                    <p className="text-sm text-slate-500">Happy clients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4">Our Services</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Unique & new business tips for our clients
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We provide comprehensive business solutions tailored to your needs
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <Card key={i} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm cursor-pointer" onClick={() => navigateTo('our-services')}>
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-slate-800 transition-colors">
                    <service.icon className="h-7 w-7 text-slate-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600 text-sm">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-5xl font-bold mb-2">{stat.value}</p>
                <p className="text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4">How It Works</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              How does it work?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {['People', 'Strategies', 'Analysis', 'Cooperation', 'Statistics'].map((step, i) => (
              <div key={i} className="relative">
                <div className="bg-slate-50 rounded-xl p-6 text-center hover:bg-slate-100 transition-colors cursor-pointer" onClick={() => navigateTo('our-process')}>
                  <div className="w-12 h-12 bg-slate-800 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-semibold text-slate-900">{step}</h3>
                </div>
                {i < 4 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4">Our Team</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Team of specialists
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <Card key={i} className="overflow-hidden group cursor-pointer" onClick={() => navigateTo('about-us')}>
                <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <span className="text-8xl">{member.image}</span>
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-slate-900">{member.name}</h3>
                  <p className="text-sm text-slate-500">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Successful projects delivered
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-semibold text-slate-900">{t.name}</p>
                  <p className="text-sm text-slate-500">{t.company}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <Badge className="mb-4">Latest News</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Latest news coming
              </h2>
            </div>
            <Button variant="outline" onClick={() => navigateTo('blog-right-sidebar')}>
              View More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Card key={i} className="overflow-hidden group cursor-pointer" onClick={() => navigateTo('blog-right-sidebar')}>
                <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300" />
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                  <h3 className="font-semibold text-slate-900 group-hover:text-slate-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-2">{post.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to grow your business?
          </h2>
          <p className="text-slate-300 mb-8">
            Let us help you achieve your goals with our professional consulting services.
          </p>
          <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100" onClick={() => navigateTo('contact-us')}>
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  )
}
