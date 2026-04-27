'use client'

import { useRouter } from '@/hooks/use-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, Mail, Phone, MapPin, Clock, Calendar, Users, Target, ChevronDown, ShoppingCart, Star, Search } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

// About Us Page
export function AboutUsPage() {
  const { navigateTo } = useRouter()
  
  return (
    <div className="pt-20">
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">About Us</Badge>
              <h1 className="text-4xl font-bold text-slate-900 mb-6">We are a team of business experts</h1>
              <p className="text-slate-600 mb-6">
                With over 15 years of experience in business consulting, we have helped hundreds of companies 
                achieve their goals and transform their operations. Our team of experts brings diverse 
                perspectives and deep industry knowledge to every project.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {['Expert Team', 'Proven Results', 'Global Reach', '24/7 Support'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-800 rounded-full" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <Button className="bg-slate-800 hover:bg-slate-700" onClick={() => navigateTo('contact-us')}>
                Get In Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['👩‍💼', '👨‍💼', '👩‍💻', '👨‍🎓'].map((emoji, i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center text-6xl">
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4">Our Team</Badge>
            <h2 className="text-3xl font-bold text-slate-900">Meet the Experts</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Anne Reid', role: 'CEO & Founder', emoji: '👩‍💼' },
              { name: 'Mark Hagne', role: 'Senior Consultant', emoji: '👨‍💼' },
              { name: 'Diane Miller', role: 'Financial Advisor', emoji: '👩‍💻' },
              { name: 'Sophie White', role: 'Marketing Lead', emoji: '👩‍🎨' },
            ].map((member, i) => (
              <Card key={i}>
                <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-7xl">
                  {member.emoji}
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
    </div>
  )
}

// About Me Page
export function AboutMePage() {
  const { navigateTo } = useRouter()
  
  return (
    <div className="pt-20">
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center text-9xl">
              👨‍💼
            </div>
            <div>
              <Badge className="mb-4">Personal Profile</Badge>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">John Richardson</h1>
              <p className="text-xl text-slate-500 mb-6">Senior Business Consultant</p>
              <p className="text-slate-600 mb-6">
                With over 20 years of experience in strategic consulting, I specialize in helping 
                businesses transform their operations and achieve sustainable growth. My approach 
                combines data-driven insights with practical implementation strategies.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { value: '20+', label: 'Years Experience' },
                  { value: '300+', label: 'Projects' },
                  { value: '98%', label: 'Satisfaction' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-sm text-slate-500">{stat.label}</p>
                  </div>
                ))}
              </div>
              <Button className="bg-slate-800 hover:bg-slate-700" onClick={() => navigateTo('contact-us')}>
                Hire Me <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Our Services Page
export function OurServicesPage() {
  const { navigateTo } = useRouter()
  
  const services = [
    { title: 'Business Strategy', desc: 'Strategic planning and execution', icon: Target, color: 'bg-blue-100' },
    { title: 'Financial Advisory', desc: 'Expert financial guidance', icon: Target, color: 'bg-green-100' },
    { title: 'Market Research', desc: 'In-depth market analysis', icon: Target, color: 'bg-purple-100' },
    { title: 'Digital Marketing', desc: 'Comprehensive marketing solutions', icon: Target, color: 'bg-orange-100' },
    { title: 'Operations', desc: 'Process optimization', icon: Target, color: 'bg-pink-100' },
    { title: 'Human Resources', desc: 'Talent management solutions', icon: Target, color: 'bg-teal-100' },
  ]
  
  return (
    <div className="pt-20">
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4">What We Offer</Badge>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Comprehensive business solutions tailored to your needs
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <Card key={i} className="group hover:shadow-lg transition-all cursor-pointer">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                    <service.icon className="h-7 w-7 text-slate-700" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600 mb-4">{service.desc}</p>
                  <Button variant="link" className="p-0 h-auto text-slate-700">
                    Learn More <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Our Process Page
export function OurProcessPage() {
  const steps = [
    { num: '01', title: 'Discovery', desc: 'Understanding your business needs and goals' },
    { num: '02', title: 'Analysis', desc: 'Deep dive into your current operations' },
    { num: '03', title: 'Strategy', desc: 'Developing customized solutions' },
    { num: '04', title: 'Implementation', desc: 'Executing the strategy effectively' },
    { num: '05', title: 'Monitoring', desc: 'Tracking progress and optimizing' },
  ]
  
  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4">How We Work</Badge>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Process</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              A systematic approach to delivering results
            </p>
          </div>
          <div className="space-y-6">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-6 p-6 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="w-16 h-16 bg-slate-800 text-white rounded-lg flex items-center justify-center text-2xl font-bold shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-slate-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Our Clients Page
export function OurClientsPage() {
  const clients = [
    'Tech Corp', 'Finance Inc', 'Health Plus', 'Media Group', 'Retail Co', 'Energy Ltd',
    'Auto Motors', 'Food Chain', 'Travel Go', 'Edu Learn', 'Sports Pro', 'Fashion Hub'
  ]
  
  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4">Trusted By</Badge>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Clients</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Trusted by leading companies worldwide
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {clients.map((client, i) => (
              <Card key={i} className="p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-slate-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl font-bold text-slate-400">{client[0]}</span>
                </div>
                <p className="font-medium text-slate-900">{client}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Pricing Plans Page
export function PricingPlansPage() {
  const plans = [
    { name: 'Starter', price: '$99', period: '/month', features: ['5 Consulting Sessions', 'Email Support', 'Basic Reports', '1 Team Member'] },
    { name: 'Professional', price: '$249', period: '/month', features: ['15 Consulting Sessions', 'Priority Support', 'Detailed Reports', '5 Team Members', 'Strategy Planning'], popular: true },
    { name: 'Enterprise', price: '$499', period: '/month', features: ['Unlimited Sessions', '24/7 Support', 'Custom Reports', 'Unlimited Team', 'Full Service Package'] },
  ]
  
  return (
    <div className="pt-20">
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4">Pricing</Badge>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Plan</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Flexible pricing options to fit your business needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <Card key={i} className={`relative ${plan.popular ? 'border-slate-800 shadow-xl' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-slate-800 text-white">Most Popular</Badge>
                  </div>
                )}
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                    <span className="text-slate-500">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="text-slate-600 flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${plan.popular ? 'bg-slate-800 hover:bg-slate-700' : ''}`} variant={plan.popular ? 'default' : 'outline'}>
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Contact Us Page
export function ContactUsPage() {
  const { navigateTo } = useRouter()
  
  return (
    <div className="pt-20">
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <Badge className="mb-4">Contact Us</Badge>
              <h1 className="text-4xl font-bold text-slate-900 mb-6">Get in touch or visit us</h1>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Address</h3>
                    <p className="text-slate-600">Old Westbury 256, New York 11201, United States</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Email</h3>
                    <p className="text-slate-600">leroux@example.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Phone</h3>
                    <p className="text-slate-600">+0 123 4567 8999</p>
                  </div>
                </div>
              </div>
            </div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-6">Send us a message</h2>
                <form className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                  </div>
                  <Input type="email" placeholder="Email Address" />
                  <Input placeholder="Subject" />
                  <Textarea placeholder="Your Message" rows={5} />
                  <Button className="w-full bg-slate-800 hover:bg-slate-700">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

// Get In Touch Page
export function GetInTouchPage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4">Contact</Badge>
          <h1 className="text-4xl font-bold text-slate-900 mb-6">Get In Touch</h1>
          <p className="text-slate-600 mb-8">
            We&apos;d love to hear from you. Fill out the form below and we&apos;ll get back to you shortly.
          </p>
          <Card className="text-left">
            <CardContent className="p-6">
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                    <Input placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                  <Input placeholder="How can we help?" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                  <Textarea placeholder="Your message" rows={6} />
                </div>
                <Button className="w-full bg-slate-800 hover:bg-slate-700">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

// Drop Us A Note Page
export function DropUsANotePage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Drop Us A Note</h1>
          <p className="text-slate-300 mb-8">
            Have a question or feedback? We&apos;re here to help.
          </p>
          <div className="bg-slate-800 rounded-xl p-6">
            <form className="space-y-4">
              <Input placeholder="Your Name" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" />
              <Input type="email" placeholder="Your Email" className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" />
              <Textarea placeholder="Your Message" rows={5} className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400" />
              <Button className="w-full bg-white text-slate-900 hover:bg-slate-100">Send Note</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

// FAQ Page
export function FAQPage() {
  const faqs = [
    { q: 'What services do you offer?', a: 'We offer comprehensive business consulting services including strategic planning, financial advisory, market research, and digital transformation.' },
    { q: 'How can I schedule a consultation?', a: 'You can schedule a consultation by filling out our contact form or calling us directly. We typically respond within 24 hours.' },
    { q: 'What industries do you specialize in?', a: 'We work with clients across various industries including technology, finance, healthcare, retail, and manufacturing.' },
    { q: 'How long does a typical project take?', a: 'Project timelines vary based on scope and complexity. Initial consultations help us provide accurate time estimates.' },
    { q: 'Do you offer ongoing support?', a: 'Yes, we offer various support packages ranging from ad-hoc consultations to comprehensive retainer agreements.' },
  ]
  
  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4">FAQ</Badge>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h1>
            <p className="text-slate-600">Find answers to common questions about our services</p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-slate-50 rounded-lg px-4">
                <AccordionTrigger className="text-left font-medium text-slate-900 hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  )
}

// 404 Error Page
export function Error404Page() {
  const { navigateTo } = useRouter()
  
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-slate-200 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Page Not Found</h2>
        <p className="text-slate-600 mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Button className="bg-slate-800 hover:bg-slate-700" onClick={() => navigateTo('main-home')}>
          Back to Home
        </Button>
      </div>
    </div>
  )
}

// Portfolio Standard Page
export function PortfolioStandardPage() {
  const projects = [
    { title: 'Business Strategy', category: 'Consulting', emoji: '📊' },
    { title: 'Brand Identity', category: 'Design', emoji: '🎨' },
    { title: 'Digital Marketing', category: 'Marketing', emoji: '📱' },
    { title: 'Financial Planning', category: 'Finance', emoji: '💰' },
    { title: 'Market Research', category: 'Research', emoji: '🔍' },
    { title: 'Team Building', category: 'HR', emoji: '👥' },
  ]
  
  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4">Our Work</Badge>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Portfolio</h1>
            <p className="text-slate-600 max-w-2xl mx-auto">Explore our successful projects</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <Card key={i} className="group overflow-hidden cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-5xl group-hover:scale-105 transition-transform">
                  {project.emoji}
                </div>
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2">{project.category}</Badge>
                  <h3 className="font-semibold text-slate-900">{project.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Portfolio Gallery Page
export function PortfolioGalleryPage() {
  const projects = [
    { title: 'Strategic Planning', category: 'Business', emoji: '📈' },
    { title: 'Brand Development', category: 'Design', emoji: '🎯' },
    { title: 'Campaign Strategy', category: 'Marketing', emoji: '🚀' },
    { title: 'Investment Analysis', category: 'Finance', emoji: '💎' },
    { title: 'Consumer Insights', category: 'Research', emoji: '🔬' },
    { title: 'Leadership Training', category: 'HR', emoji: '🏆' },
    { title: 'Process Optimization', category: 'Operations', emoji: '⚙️' },
    { title: 'Digital Transformation', category: 'Tech', emoji: '💻' },
  ]
  
  return (
    <div className="pt-20">
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4">Gallery</Badge>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Project Gallery</h1>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((project, i) => (
              <div key={i} className="group relative aspect-square bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg overflow-hidden cursor-pointer flex items-center justify-center">
                <span className="text-6xl group-hover:scale-110 transition-transform">{project.emoji}</span>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="text-white">
                    <p className="text-sm text-slate-300">{project.category}</p>
                    <p className="font-semibold">{project.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Blog Right Sidebar Page
export function BlogRightSidebarPage() {
  const posts = [
    { title: 'Making innovative strategies for outstanding future results', category: 'Business', date: 'Feb 06, 2024', excerpt: 'Discover how innovative strategies can transform your business outcomes...' },
    { title: 'Our business thrives to contribute global initiatives', category: 'Economy', date: 'Feb 05, 2024', excerpt: 'Understanding the impact of global initiatives on local businesses...' },
    { title: 'Discover a better way of redefining company goals', category: 'Investment', date: 'Feb 04, 2024', excerpt: 'Learn effective methods for setting and achieving company goals...' },
    { title: 'The future of business consulting in digital age', category: 'Technology', date: 'Feb 03, 2024', excerpt: 'How technology is reshaping the consulting industry...' },
  ]
  
  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {posts.map((post, i) => (
                <Card key={i} className="overflow-hidden cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200" />
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                    <h2 className="text-xl font-semibold text-slate-900 mb-2">{post.title}</h2>
                    <p className="text-slate-600 mb-4">{post.excerpt}</p>
                    <p className="text-sm text-slate-500">{post.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Search</h3>
                  <div className="flex gap-2">
                    <Input placeholder="Search posts..." />
                    <Button size="icon"><Search className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Categories</h3>
                  <div className="space-y-2">
                    {['Business', 'Economy', 'Investment', 'Technology', 'Marketing'].map((cat, i) => (
                      <button key={i} className="block w-full text-left text-slate-600 hover:text-slate-900 py-1">
                        {cat}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Blog Left Sidebar Page
export function BlogLeftSidebarPage() {
  const posts = [
    { title: 'Strategic business planning for growth', category: 'Strategy', date: 'Feb 06, 2024' },
    { title: 'Market trends to watch in 2024', category: 'Markets', date: 'Feb 05, 2024' },
    { title: 'Building sustainable business models', category: 'Sustainability', date: 'Feb 04, 2024' },
  ]
  
  return (
    <div className="pt-20">
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Categories</h3>
                  <div className="space-y-2">
                    {['Strategy', 'Markets', 'Sustainability', 'Finance', 'Leadership'].map((cat, i) => (
                      <button key={i} className="block w-full text-left text-slate-600 hover:text-slate-900 py-1">
                        {cat}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Recent Posts</h3>
                  <div className="space-y-4">
                    {posts.slice(0, 3).map((post, i) => (
                      <div key={i} className="text-sm">
                        <p className="font-medium text-slate-900">{post.title}</p>
                        <p className="text-slate-500">{post.date}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-2 space-y-6">
              {posts.map((post, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-slate-200 to-slate-300" />
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                    <h2 className="text-xl font-semibold text-slate-900 mb-2">{post.title}</h2>
                    <p className="text-sm text-slate-500">{post.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Blog No Sidebar Page
export function BlogNoSidebarPage() {
  const posts = [
    { title: 'Innovation in business consulting', category: 'Innovation', date: 'Feb 06, 2024' },
    { title: 'Leadership strategies for modern teams', category: 'Leadership', date: 'Feb 05, 2024' },
    { title: 'Financial planning essentials', category: 'Finance', date: 'Feb 04, 2024' },
    { title: 'Digital transformation guide', category: 'Technology', date: 'Feb 03, 2024' },
    { title: 'Market analysis techniques', category: 'Research', date: 'Feb 02, 2024' },
    { title: 'Sustainable business practices', category: 'Sustainability', date: 'Feb 01, 2024' },
  ]
  
  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4">Blog</Badge>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Latest Articles</h1>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Card key={i} className="overflow-hidden cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200" />
                <CardContent className="p-4">
                  <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                  <h2 className="font-semibold text-slate-900 mb-2">{post.title}</h2>
                  <p className="text-sm text-slate-500">{post.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Shop Page
export function ShopPage() {
  const products = [
    { name: 'Business Strategy Guide', price: '$49', emoji: '📚' },
    { name: 'Financial Templates', price: '$29', emoji: '📊' },
    { name: 'Marketing Toolkit', price: '$79', emoji: '🎯' },
    { name: 'Leadership Course', price: '$99', emoji: '🎓' },
    { name: 'Analysis Templates', price: '$39', emoji: '📈' },
    { name: 'Consulting Starter Kit', price: '$149', emoji: '💼' },
  ]
  
  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4">Shop</Badge>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Products</h1>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <Card key={i} className="group overflow-hidden cursor-pointer">
                <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-7xl group-hover:scale-105 transition-transform">
                  {product.emoji}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-slate-900 mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-slate-900">{product.price}</span>
                    <Button size="sm" className="bg-slate-800 hover:bg-slate-700">
                      <ShoppingCart className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Product Single Page
export function ProductSinglePage() {
  const { navigateTo } = useRouter()
  
  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center text-9xl">
              📚
            </div>
            <div>
              <Badge className="mb-4">Best Seller</Badge>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">Business Strategy Guide</h1>
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-slate-500 text-sm">(128 reviews)</span>
              </div>
              <p className="text-3xl font-bold text-slate-900 mb-6">$49</p>
              <p className="text-slate-600 mb-6">
                A comprehensive guide to developing and implementing effective business strategies. 
                This guide covers everything from market analysis to execution planning.
              </p>
              <div className="flex gap-4 mb-8">
                <Button className="flex-1 bg-slate-800 hover:bg-slate-700">
                  <ShoppingCart className="h-5 w-5 mr-2" /> Add to Cart
                </Button>
              </div>
              <Card className="p-4">
                <h3 className="font-semibold text-slate-900 mb-2">Product Features:</h3>
                <ul className="space-y-2">
                  {['200+ pages of content', 'Downloadable templates', 'Case studies', 'Lifetime updates'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-600">
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Seminar Home Page
export function SeminarHomePage() {
  const { navigateTo } = useRouter()
  const events = [
    { title: 'Business Strategy Summit', date: 'Mar 15, 2024', location: 'New York', emoji: '🎤' },
    { title: 'Financial Planning Workshop', date: 'Mar 22, 2024', location: 'Los Angeles', emoji: '💼' },
    { title: 'Leadership Conference', date: 'Apr 05, 2024', location: 'Chicago', emoji: '👥' },
  ]
  
  return (
    <div className="pt-20">
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-slate-700 text-white">Seminars & Events</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Upcoming Business Seminars</h1>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            Join our expert-led seminars and workshops to enhance your business skills
          </p>
          <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
            View All Events
          </Button>
        </div>
      </section>
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <Card key={i} className="overflow-hidden cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-5xl">
                  {event.emoji}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{event.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {event.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {event.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// App Showcase Page
export function AppShowcasePage() {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-slate-700 text-white">Mobile App</Badge>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">Business Consulting App</h1>
              <p className="text-slate-300 mb-8">
                Access all our consulting services right from your mobile device. 
                Get real-time insights, schedule consultations, and track your progress.
              </p>
              <div className="flex gap-4">
                <Button className="bg-white text-slate-900 hover:bg-slate-100">
                  Download iOS
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Download Android
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-[500px] bg-slate-700 rounded-3xl p-4 shadow-2xl">
                <div className="w-full h-full bg-slate-200 rounded-2xl flex items-center justify-center text-6xl">
                  📱
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Advisory Home Page
export function AdvisoryHomePage() {
  const { navigateTo } = useRouter()
  
  return (
    <div className="pt-20">
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">Advisory Services</Badge>
              <h1 className="text-4xl font-bold text-slate-900 mb-6">Expert Business Advisory</h1>
              <p className="text-slate-600 mb-8">
                Our team of experienced advisors provides personalized guidance to help 
                your business navigate challenges and seize opportunities.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {['Strategic Planning', 'Financial Advisory', 'Risk Management', 'Growth Strategy'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-slate-800 rounded-full" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <Button className="bg-slate-800 hover:bg-slate-700" onClick={() => navigateTo('contact-us')}>
                Schedule Consultation
              </Button>
            </div>
            <div className="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 rounded-2xl flex items-center justify-center text-9xl">
              🤝
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Interactive Banners Page
export function InteractiveBannersPage() {
  const { navigateTo } = useRouter()
  const banners = [
    { title: 'Strategic Consulting', desc: 'Transform your business with expert strategies', emoji: '🎯' },
    { title: 'Financial Planning', desc: 'Secure your financial future', emoji: '💰' },
    { title: 'Market Research', desc: 'Understand your market better', emoji: '🔍' },
  ]
  
  return (
    <div className="pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4">Interactive</Badge>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Services</h1>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {banners.map((banner, i) => (
              <div 
                key={i} 
                className="group relative aspect-[4/5] bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl overflow-hidden cursor-pointer"
                onClick={() => navigateTo('our-services')}
              >
                <div className="absolute inset-0 flex items-center justify-center text-8xl group-hover:scale-110 transition-transform">
                  {banner.emoji}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
                  <p className="text-slate-300">{banner.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Business Strategy Page
export function BusinessStrategyPage() {
  const { navigateTo } = useRouter()
  
  return (
    <div className="pt-20">
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4 bg-slate-700 text-white">Strategy</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Business Strategy</h1>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            Develop winning strategies that drive growth and competitive advantage
          </p>
        </div>
      </section>
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Strategic Planning Process</h2>
              <div className="space-y-4">
                {['Vision & Mission Alignment', 'Market Analysis', 'Competitive Positioning', 'Growth Roadmap', 'Implementation Planning'].map((step, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </div>
                    <span className="text-slate-900">{step}</span>
                  </div>
                ))}
              </div>
              <Button className="mt-8 bg-slate-800 hover:bg-slate-700" onClick={() => navigateTo('contact-us')}>
                Start Your Strategy
              </Button>
            </div>
            <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center text-9xl">
              📊
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Fullscreen Slider Page
export function FullscreenSliderPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slides = [
    { title: 'Innovative Solutions', subtitle: 'For modern businesses', emoji: '💡' },
    { title: 'Expert Team', subtitle: 'Dedicated to your success', emoji: '👥' },
    { title: 'Global Reach', subtitle: 'Serving clients worldwide', emoji: '🌍' },
  ]
  
  return (
    <div className="pt-20">
      <section className="relative h-[80vh] bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[200px] opacity-20">{slides[currentSlide].emoji}</span>
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">{slides[currentSlide].title}</h1>
          <p className="text-xl text-slate-300 mb-8">{slides[currentSlide].subtitle}</p>
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-3 h-3 rounded-full transition-colors ${i === currentSlide ? 'bg-white' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Coming Soon Page
export function ComingSoonPage() {
  const { navigateTo } = useRouter()
  
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="text-center px-4">
        <Badge className="mb-4 bg-slate-700 text-white">Coming Soon</Badge>
        <h1 className="text-5xl sm:text-6xl font-bold mb-6">Something Amazing is Coming</h1>
        <p className="text-slate-300 mb-8 max-w-md mx-auto">
          We&apos;re working on something exciting. Be the first to know when we launch.
        </p>
        <div className="flex justify-center gap-4 mb-8">
          {['00', '00', '00', '00'].map((num, i) => (
            <div key={i} className="bg-slate-800 rounded-lg p-4 w-16">
              <p className="text-2xl font-bold">{num}</p>
              <p className="text-xs text-slate-400">{['Days', 'Hours', 'Mins', 'Secs'][i]}</p>
            </div>
          ))}
        </div>
        <Button className="bg-white text-slate-900 hover:bg-slate-100" onClick={() => navigateTo('main-home')}>
          Back to Home
        </Button>
      </div>
    </div>
  )
}

// Landing Page
export function LandingPage() {
  const { navigateTo, pages } = useRouter()
  
  const homepages = pages.filter(p => p.category === 'Homepage Templates')
  
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4">Leroux Template</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Eight fully developed site examples
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Diverse and fully adjustable homepage templates for your business needs
          </p>
        </div>
      </section>
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {homepages.map((page, i) => (
              <Card 
                key={page.id} 
                className="group overflow-hidden cursor-pointer"
                onClick={() => navigateTo(page.id)}
              >
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-slate-200 group-hover:to-slate-300 transition-colors flex items-center justify-center">
                  <span className="text-4xl">{['🏢', '💼', '🎤', '📱', '🤝', '🎯', '📊', '⏰', '🚀'][i]}</span>
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-slate-400 mb-1">0{i + 1}</p>
                  <h3 className="font-semibold text-slate-900">{page.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">All Pages Overview</h2>
            <p className="text-slate-600">Browse all {pages.length} pages in this template</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => navigateTo(page.id)}
                className="p-4 bg-white rounded-lg text-left hover:shadow-md transition-shadow"
              >
                <p className="text-xs text-slate-400 mb-1">{page.category}</p>
                <p className="font-medium text-slate-900">{page.name}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
