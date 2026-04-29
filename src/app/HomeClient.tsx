'use client'

import { useEffect } from 'react'

export default function HomeClient() {
  useEffect(() => {
    // Redirect to the static HTML with all the original design
    window.location.replace('/home.html')
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gray-600 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-white text-lg">Загрузка Century Intelligence...</p>
      </div>
    </div>
  )
}
