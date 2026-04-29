'use client'

import { useEffect } from 'react'

export default function HomeClient() {
  useEffect(() => {
    // Redirect to the static HTML with all the original design
    window.location.replace('/home.html')
  }, [])

  return null
}
