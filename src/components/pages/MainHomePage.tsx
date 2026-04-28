'use client'

import { useRouter } from '@/hooks/use-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Users, Target, BarChart3, Lightbulb, CheckCircle, Star, Quote } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export function MainHomePage() {
  const { navigateTo } = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroSlides = [
    {
      image: 'https://leroux.qodeinteractive.com/wp-content/uploads/2023/02/main-home-rev-img-1.jpg',
      title: 'From strategy to delivery, we are here to make sure your business succeeds'
    },
    {
      image: 'https://leroux.qodeinteractive.com/wp-content/uploads/2023/02/main-home-rev-img-2.jpg',
      title: 'We help our clients realize their business ideas and achieve great results'
    },
    {
      image: 'https://leroux.qodeinteractive.com/wp-content/uploads/2023/02/main-home-rev-img-3.jpg',
      title: 'Connect with your clients using a variety of elements that let you tell your story'
    },
    {
      image: 'https://leroux.qodeinteractive.com/wp-content/uploads/2023/02/main-home-rev-img-4.jpg',
      title: 'Refresh your brand and pave the way for new business goals and ventures'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev < heroSlides.length - 1 ? prev + 1 : 0))
    }, 5000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  const services = [
    { icon: BarChart3, title: 'The best solution for your business', desc: 'Lorem ipsum dolor sit amet, nihil audiam nam no, ei eos exerci nostro.' },
    { icon: Target, title: 'Unique & new business tips for our clients', desc: 'Lorem ipsum dolor sit amet, nihil audiam nam no, ei eos exerci nostro.' },
    { icon: Users, title: 'The best way to boost your potential', desc: 'Lorem ipsum dolor sit amet, nihil audiam nam no, ei eos exerci nostro.' },
  ]

  const stats = [
    { value: '8,506K+', label: 'Companies analyzed' },
    { value: '7,245K+', label: 'Satisfied clients' },
    { value: '9,105K+', label: 'Projects released' },
    { value: '6,500K+', label: 'Strategies planned' },
  ]

  const features = [
    { title: 'Analysis', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.' },
    { title: 'HR Researches', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.' },
    { title: 'On-line Business', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.' },
    { title: 'Monitoring Information', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.' },
  ]

  const team = [
    { name: 'Anne Reid', role: 'CEO', image: 'https://leroux.qodeinteractive.com/wp-content/uploads/2023/02/team-img-1.jpg' },
    { name: 'Mark Hagne', role: 'Lawyer', image: 'https://leroux.qodeinteractive.com/wp-content/uploads/2023/01/team-6.jpg' },
    { name: 'Diane Miller', role: 'Business Manager', image: 'https://leroux.qodeinteractive.com/wp-content/uploads/2023/01/team-5.jpg' },
    { name: 'Sophie White', role: 'Head of Consulting', image: 'https://leroux.qodeinteractive.com/wp-content/uploads/2023/01/team-4.jpg' },
    { name: 'Paul Goto', role: 'Manager', image: 'https://leroux.qodeinteractive.com/wp-content/uploads/2023/01/team-3.jpg' },
    { name: 'Toby Young', role: 'Legal Officer', image: 'https://leroux.qodeinteractive.com/wp-content/uploads/2023/01/team-2.jpg' },
  ]

  const testimonials = [
    { name: 'Toby Young', role: 'Project Manager', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Sed do eiusmod tempor per incididunt labore et dolore.' },
    { name: 'Kevin Wels', role: 'CEO', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Sed do eiusmod tempor per incididunt labore et dolore.' },
    { name: 'Diane Miller', role: 'Manager', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, Sed do eiusmod tempor per incididunt labore et dolore.' },
  ]

  const posts = [
    { title: 'Making innovative strategies for outstanding future results', category: 'Business', date: 'Feb 06, 2024', image: 'https://leroux.qodeinteractive.com/wp-content/uploads/2023/02/blog-list-img-1.jpg' },
    { title: 'Our business thrives to contribute global initiatives', category: 'Economy', date: 'Feb 06, 2024', image: 'https://leroux.qodeinteractive.com/wp-content/uploads/2023/02/blog-list-img-2.jpg' },
    { title: 'Discover a better way of redefining company goals', category: 'Investment', date: 'Feb 06, 2024', image: 'https://leroux.qodeinteractive.com/wp-content/uploads/2023/02/blog-list-img-3.jpg' },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section with Slider */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {heroSlides.map((slide, index) => (
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
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-transparent" />
          </div>
        ))}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-white/10 text-white border-white/20 backdrop-blur-sm">
              Professional Business Consulting
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 transition-all duration-500">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-lg text-white/80 mb-8 max-w-xl">
              We help our clients realize their business ideas and achieve great results. Connect with your clients using a variety of elements that let you tell your story.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-white text-slate-900 hover:bg-slate-100"
                onClick={() => navigateTo('our-services')}
              >
                View More <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigateTo('about-us')}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`w-12 h-1.5 rounded-full transition-all ${
                i === currentSlide ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <Badge className="mb-4 bg-slate-100 text-slate-700 hover:bg-slate-200">
                The best solution for your business
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Unlock success with professional business solutions
              </h2>
              <p className="text-slate-600 mb-6">
                Achieve goals & coach fast. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip eam.
              </p>
              <Button 
                className="bg-slate-800 hover:bg-slate-700 text-white"
                onClick={() => navigateTo('our-services')}
              >
                View More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Image
                src="https://leroux.qodeinteractive.com/wp-content/uploads/2023/01/main-home-img-3.jpg"
                alt="Business Solutions"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="font-semibold text-slate-900">Trusted by 500+</span>
                </div>
                <p className="text-sm text-slate-500">Happy clients worldwide</p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Card key={i} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm cursor-pointer bg-slate-50" onClick={() => navigateTo('our-services')}>
                <CardContent className="p-6">
                  <div className="w-14 h-14 bg-slate-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-slate-700 transition-colors">
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{service.desc}</p>
                  <Button variant="link" className="p-0 h-auto text-slate-700 group-hover:text-slate-900">
                    View More <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Trust the process & make your business grow
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Quas saepe nonumy nec cu. Nominati gloriatur scriptorem forensibus duo, vel unum suscipiantur.
            </p>
          </div>
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

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-6">
                {features.map((feature, i) => (
                  <div key={i} className="p-4">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-600">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Image
                src="https://leroux.qodeinteractive.com/wp-content/uploads/2023/01/main-home-img-4.png"
                alt="Features"
                width={500}
                height={400}
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <Badge className="mb-4">Our Team</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Meet our team
              </h2>
            </div>
            <Button variant="outline" onClick={() => navigateTo('about-us')}>
              View More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {team.map((member, i) => (
              <Card key={i} className="overflow-hidden group cursor-pointer bg-white" onClick={() => navigateTo('about-us')}>
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
              What others said about us
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Card key={i} className="p-6 relative">
                <Quote className="h-10 w-10 text-slate-100 absolute top-4 right-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 mb-6 relative z-10">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-slate-600">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{t.name}</p>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <Badge className="mb-4">Latest News</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Latest insights & news
              </h2>
            </div>
            <Button variant="outline" onClick={() => navigateTo('blog-right-sidebar')}>
              View More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Card key={i} className="overflow-hidden group cursor-pointer bg-white" onClick={() => navigateTo('blog-right-sidebar')}>
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                  <h3 className="font-semibold text-slate-900 group-hover:text-slate-600 transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500">{post.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            From strategy to delivery, we&apos;re here for your business.
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
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
