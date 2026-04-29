'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Send } from 'lucide-react'

interface ContactFormProps {
  variant?: 'main' | 'footer'
  className?: string
}

export function ContactForm({ variant = 'main', className = '' }: ContactFormProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setStatus({ type: 'error', message: 'Пожалуйста, заполните все поля' })
      return
    }

    setLoading(true)
    setStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus({ type: 'success', message: 'Отправлено!' })
        setName('')
        setPhone('')
        setMessage('')
        setTimeout(() => setStatus({ type: null, message: '' }), 2000)
      } else {
        setStatus({ type: 'error', message: data.error || 'Ошибка отправки' })
      }
    } catch {
      setStatus({ type: 'error', message: 'Ошибка соединения' })
    } finally {
      setLoading(false)
    }
  }

  if (variant === 'footer') {
    return (
      <form onSubmit={handleSubmit} className={`space-y-3 ${className}`}>
        <Input
          placeholder="Ваше имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
          disabled={loading}
        />
        <Input
          type="tel"
          placeholder="Номер телефона"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
          disabled={loading}
        />
        <Textarea
          placeholder="Сообщение"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/60 resize-none"
          disabled={loading}
        />
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-white text-gray-900 hover:bg-white/90"
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
          <p className={`text-sm ${status.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {status.message}
          </p>
        )}
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
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
  )
}
