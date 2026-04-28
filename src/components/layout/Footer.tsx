'use client'

import { useRouter } from '@/hooks/use-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Send } from 'lucide-react'
import Image from 'next/image'

export function Footer() {
  const { navigateTo } = useRouter()

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Image
                src="https://leroux.qodeinteractive.com/wp-content/uploads/2023/01/logo-footer.png"
                alt="Leroux Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Make your idea into reality with Leroux
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Professional & modern, a theme designed to help your business stand out from the rest.
            </p>
            <div className="flex gap-3">
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
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { id: 'about-us', name: 'About Us' },
                { id: 'our-services', name: 'Our Services' },
                { id: 'our-process', name: 'Our Process' },
                { id: 'pricing-plans', name: 'Pricing Plans' },
                { id: 'contact-us', name: 'Contact Us' },
                { id: 'faq-page', name: 'FAQ Page' },
              ].map((page) => (
                <li key={page.id}>
                  <button
                    onClick={() => navigateTo(page.id as any)}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {page.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {[
                'Business Strategy',
                'Market Research',
                'Strategic Planning',
                'Financial Advisory',
                'Digital Marketing',
                'Operations Optimization'
              ].map((service) => (
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
            <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
            <p className="text-slate-400 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <div className="flex gap-2 mb-6">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-slate-500"
              />
              <Button className="bg-slate-700 hover:bg-slate-600 text-white shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-sm text-slate-400">+1 234 5678 9999</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-sm text-slate-400">leroux@qodeinteractive.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-sm text-slate-400">Old Westbury 256, New York 11201</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Contact us:</p>
                <p className="text-white font-medium">leroux@qodeinteractive.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Call us:</p>
                <p className="text-white font-medium">+1 234 5678 9999</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Our address:</p>
                <p className="text-white font-medium">Old Westbury 256, New York 11201, United States</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2023 Qode Interactive, All Rights Reserved
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
