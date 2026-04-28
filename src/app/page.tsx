'use client'

import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // Redirect directly to the main HTML page
    window.location.href = '/leroux-exact/index.html'
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <p className="text-white">Redirecting to Century Intelligence...</p>
    </div>
  )
}
