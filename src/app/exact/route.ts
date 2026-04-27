import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const htmlPath = path.join(process.cwd(), 'public', 'leroux-exact', 'index.html')
    const html = fs.readFileSync(htmlPath, 'utf-8')
    
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to load template' }, { status: 500 })
  }
}
