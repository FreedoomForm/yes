'use client'

import { useRouter } from '@/hooks/use-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  const { navigateTo } = useRouter()

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-slate-800 font-bold text-xl">L</span>
              </div>
              <span className="text-2xl font-bold">Leroux</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Professional & modern, a theme designed to help your business stand out from the rest.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['about-us', 'our-services', 'pricing-plans', 'contact-us', 'faq-page'].map((page) => (
                <li key={page}>
                  <button
                    onClick={() => navigateTo(page as any)}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {page.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {['Business Consulting', 'Market Analysis', 'Strategic Planning', 'Financial Advisory', 'Digital Marketing'].map((service) => (
                <li key={service}>
                  <button
                    onClick={() => navigateTo('our-services')}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-slate-400 text-sm mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
              <Button className="bg-white text-slate-900 hover:bg-slate-100">
                Send
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                <Phone className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Call Us</p>
                <p className="text-white">+1 234 5678 9999</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                <Mail className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Email Us</p>
                <p className="text-white">leroux@example.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Visit Us</p>
                <p className="text-white">Old Westbury 256, New York</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2024 Leroux. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button className="text-slate-400 hover:text-white text-sm transition-colors">
              Terms and conditions
            </button>
            <button className="text-slate-400 hover:text-white text-sm transition-colors">
              Privacy policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
