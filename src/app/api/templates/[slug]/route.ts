import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  
  const templateDir = path.join(process.cwd(), 'public', 'templates', slug)
  
  try {
    const htmlPath = path.join(templateDir, 'page.html')
    const cssPath = path.join(templateDir, 'inline.css')
    const metadataPath = path.join(templateDir, 'metadata.json')
    
    const html = fs.existsSync(htmlPath) ? fs.readFileSync(htmlPath, 'utf-8') : ''
    const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, 'utf-8') : ''
    const metadata = fs.existsSync(metadataPath) 
      ? JSON.parse(fs.readFileSync(metadataPath, 'utf-8')) 
      : {}
    
    return NextResponse.json({ html, css, metadata, slug })
  } catch {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 })
  }
}
