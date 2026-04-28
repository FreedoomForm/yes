import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const templatesDir = path.join(process.cwd(), 'public', 'templates')
  
  try {
    const dirs = fs.readdirSync(templatesDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => {
        const metadataPath = path.join(templatesDir, dirent.name, 'metadata.json')
        let name = dirent.name.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
        
        try {
          const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'))
          name = metadata.name || name
        } catch {}
        
        return {
          id: dirent.name,
          name: name
        }
      })
    
    return NextResponse.json({ templates: dirs })
  } catch {
    return NextResponse.json({ templates: [] })
  }
}
