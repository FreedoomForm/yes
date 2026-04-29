'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Send, Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

export default function Home() {
  // Contact Form State
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })
  const [loading, setLoading] = useState(false)

  // Footer Form State
  const [footerName, setFooterName] = useState('')
  const [footerPhone, setFooterPhone] = useState('')
  const [footerMessage, setFooterMessage] = useState('')
  const [footerStatus, setFooterStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })
  const [footerLoading, setFooterLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent, isFooter = false) => {
    e.preventDefault()
    
    const currentName = isFooter ? footerName : name
    const currentPhone = isFooter ? footerPhone : phone
    const currentMessage = isFooter ? footerMessage : message
    const setStatusFunc = isFooter ? setFooterStatus : setStatus
    const setLoadingFunc = isFooter ? setFooterLoading : setLoading
    
    if (!currentName.trim() || !currentPhone.trim() || !currentMessage.trim()) {
      setStatusFunc({ type: 'error', message: 'Пожалуйста, заполните все поля' })
      return
    }

    setLoadingFunc(true)
    setStatusFunc({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: currentName, phone: currentPhone, message: currentMessage }),
      })

      const data = await response.json()

      if (data.success) {
        setStatusFunc({ type: 'success', message: 'Отправлено!' })
        if (isFooter) {
          setFooterName('')
          setFooterPhone('')
          setFooterMessage('')
        } else {
          setName('')
          setPhone('')
          setMessage('')
        }
        setTimeout(() => setStatusFunc({ type: null, message: '' }), 2000)
      } else {
        setStatusFunc({ type: 'error', message: data.error || 'Ошибка отправки' })
      }
    } catch {
      setStatusFunc({ type: 'error', message: 'Ошибка соединения' })
    } finally {
      setLoadingFunc(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 text-white py-4 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold">Century Intelligence</div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#services" className="hover:text-gray-300 transition">Услуги</a>
            <a href="#about" className="hover:text-gray-300 transition">О нас</a>
            <a href="#contact" className="hover:text-gray-300 transition">Контакты</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            ИИ и энергетические решения
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Ведущий провайдер AI решений и энергосистем для государственного сектора Узбекистана
          </p>
          <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
            Связаться с нами <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Наши услуги</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">AI Решения</h3>
              <p className="text-gray-600">Инновационные решения на базе искусственного интеллекта для оптимизации государственных процессов</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Энергосистемы</h3>
              <p className="text-gray-600">Современные энергетические решения для устойчивого развития</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Консалтинг</h3>
              <p className="text-gray-600">Экспертная поддержка в цифровизации и модернизации</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Свяжитесь с нами</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Контактная информация</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-600" />
                  <a href="tel:+998990008991" className="text-gray-700 hover:text-gray-900">+998 99 000 89 91</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-600" />
                  <a href="mailto:info@centuryintelligence.com" className="text-gray-700 hover:text-gray-900">info@centuryintelligence.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-700">Ташкент, Узбекистан</span>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12"
                    disabled={loading}
                  />
                  <Input
                    type="tel"
                    placeholder="Номер телефона"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-12"
                    disabled={loading}
                  />
                </div>
                <Textarea
                  placeholder="Сообщение"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="resize-none"
                  disabled={loading}
                />
                <Button 
                  type="submit" 
                  disabled={loading}
                  size="lg"
                  className="bg-gray-900 hover:bg-gray-800"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      Отправить
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                {status.type && (
                  <p className={`text-sm ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {status.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Century Intelligence</h3>
              <p className="text-gray-400">Воплотите ваши идеи в реальность с Century Intelligence</p>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Свяжитесь с нами:</h3>
              <div className="space-y-2 text-gray-400">
                <p>info@centuryintelligence.com</p>
                <p>+998 99 000 89 91</p>
              </div>
            </div>
            
            {/* Footer Form */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Напишите нам:</h3>
              <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-3">
                <Input
                  placeholder="Ваше имя"
                  value={footerName}
                  onChange={(e) => setFooterName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 h-10"
                  disabled={footerLoading}
                />
                <Input
                  type="tel"
                  placeholder="Номер телефона"
                  value={footerPhone}
                  onChange={(e) => setFooterPhone(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 h-10"
                  disabled={footerLoading}
                />
                <Textarea
                  placeholder="Сообщение"
                  value={footerMessage}
                  onChange={(e) => setFooterMessage(e.target.value)}
                  rows={3}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 resize-none"
                  disabled={footerLoading}
                />
                <Button 
                  type="submit" 
                  disabled={footerLoading}
                  className="w-full bg-white text-gray-900 hover:bg-gray-100"
                >
                  {footerLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      Отправить
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                {footerStatus.type && (
                  <p className={`text-sm ${footerStatus.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                    {footerStatus.message}
                  </p>
                )}
              </form>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Century Intelligence. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
