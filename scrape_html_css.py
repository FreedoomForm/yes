#!/usr/bin/env python3
"""
Scraper to extract HTML and CSS from Leroux template pages
"""

import asyncio
import os
import json
import re
from playwright.async_api import async_playwright

# All 28 pages to scrape
PAGES = [
    {"id": "main_home", "name": "Main Home", "url": "https://leroux.qodeinteractive.com/"},
    {"id": "business_home", "name": "Business Home", "url": "https://leroux.qodeinteractive.com/business-home/"},
    {"id": "seminar_home", "name": "Seminar Home", "url": "https://leroux.qodeinteractive.com/seminar-home/"},
    {"id": "app_showcase", "name": "App Showcase", "url": "https://leroux.qodeinteractive.com/app-showcase/"},
    {"id": "advisory_home", "name": "Advisory Home", "url": "https://leroux.qodeinteractive.com/advisory-home/"},
    {"id": "interactive_banners", "name": "Interactive Banners", "url": "https://leroux.qodeinteractive.com/interactive-banners/"},
    {"id": "business_strategy", "name": "Business Strategy", "url": "https://leroux.qodeinteractive.com/business-strategy/"},
    {"id": "fullscreen_slider", "name": "Fullscreen Slider", "url": "https://leroux.qodeinteractive.com/fullscreen-slider/"},
    {"id": "coming_soon", "name": "Coming Soon", "url": "https://leroux.qodeinteractive.com/coming-soon/"},
    {"id": "landing", "name": "Landing", "url": "https://leroux.qodeinteractive.com/landing/"},
    {"id": "about_us", "name": "About Us", "url": "https://leroux.qodeinteractive.com/about-us/"},
    {"id": "about_me", "name": "About Me", "url": "https://leroux.qodeinteractive.com/about-me/"},
    {"id": "our_services", "name": "Our Services", "url": "https://leroux.qodeinteractive.com/our-services/"},
    {"id": "our_process", "name": "Our Process", "url": "https://leroux.qodeinteractive.com/our-process/"},
    {"id": "our_clients", "name": "Our Clients", "url": "https://leroux.qodeinteractive.com/our-clients/"},
    {"id": "pricing_plans", "name": "Pricing Plans", "url": "https://leroux.qodeinteractive.com/pricing-plans/"},
    {"id": "contact_us", "name": "Contact Us", "url": "https://leroux.qodeinteractive.com/contact-us/"},
    {"id": "get_in_touch", "name": "Get In Touch", "url": "https://leroux.qodeinteractive.com/get-in-touch/"},
    {"id": "drop_us_a_note", "name": "Drop Us A Note", "url": "https://leroux.qodeinteractive.com/drop-us-a-note/"},
    {"id": "faq_page", "name": "FAQ Page", "url": "https://leroux.qodeinteractive.com/faq-page/"},
    {"id": "error_404", "name": "Error 404", "url": "https://leroux.qodeinteractive.com/404-error-page"},
    {"id": "portfolio_standard", "name": "Portfolio Standard", "url": "https://leroux.qodeinteractive.com/portfolio/standard-list/"},
    {"id": "portfolio_gallery", "name": "Portfolio Gallery", "url": "https://leroux.qodeinteractive.com/portfolio/gallery-list/"},
    {"id": "blog_right_sidebar", "name": "Blog Right Sidebar", "url": "https://leroux.qodeinteractive.com/blog/right-sidebar/"},
    {"id": "blog_left_sidebar", "name": "Blog Left Sidebar", "url": "https://leroux.qodeinteractive.com/blog/left-sidebar/"},
    {"id": "blog_no_sidebar", "name": "Blog No Sidebar", "url": "https://leroux.qodeinteractive.com/blog/no-sidebar/"},
    {"id": "shop", "name": "Shop", "url": "https://leroux.qodeinteractive.com/shop/"},
    {"id": "product_single", "name": "Product Single", "url": "https://leroux.qodeinteractive.com/product/headphones/"},
]

OUTPUT_DIR = "/home/z/my-project/download/leroux_scraped"


async def scrape_page(page, page_info):
    """Scrape a single page for HTML and CSS"""
    print(f"Scraping: {page_info['name']} - {page_info['url']}")
    
    try:
        await page.goto(page_info['url'], wait_until='networkidle', timeout=60000)
        await page.wait_for_timeout(2000)  # Wait for dynamic content
        
        # Get page title
        title = await page.title()
        
        # Get the full HTML
        html = await page.content()
        
        # Get all inline styles
        inline_styles = await page.evaluate('''() => {
            const styles = [];
            document.querySelectorAll('style').forEach(style => {
                styles.push(style.textContent);
            });
            return styles.join('\\n');
        }''')
        
        # Get computed styles for main elements
        computed_styles = await page.evaluate('''() => {
            const elements = {
                body: document.body,
                header: document.querySelector('header'),
                main: document.querySelector('main'),
                footer: document.querySelector('footer'),
                hero: document.querySelector('.qodef-hero, .hero, [class*="hero"]'),
            };
            
            const result = {};
            
            for (const [key, el] of Object.entries(elements)) {
                if (el) {
                    const styles = window.getComputedStyle(el);
                    result[key] = {
                        backgroundColor: styles.backgroundColor,
                        color: styles.color,
                        fontFamily: styles.fontFamily,
                        fontSize: styles.fontSize,
                        padding: styles.padding,
                        margin: styles.margin,
                    };
                }
            }
            
            return result;
        }''')
        
        # Get all CSS links
        css_links = await page.evaluate('''() => {
            const links = [];
            document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
                links.push(link.href);
            });
            return links;
        }''')
        
        # Extract text content from main sections
        text_content = await page.evaluate('''() => {
            const sections = [];
            document.querySelectorAll('section, .qodef-section, [class*="section"]').forEach(section => {
                const heading = section.querySelector('h1, h2, h3');
                const text = section.textContent.trim().substring(0, 500);
                if (heading || text) {
                    sections.push({
                        heading: heading ? heading.textContent.trim() : '',
                        text: text
                    });
                }
            });
            return sections;
        }''')
        
        # Get navigation items
        nav_items = await page.evaluate('''() => {
            const items = [];
            document.querySelectorAll('nav a, .menu a, [class*="nav"] a').forEach(link => {
                const text = link.textContent.trim();
                const href = link.href;
                if (text && text.length < 50) {
                    items.push({ text, href });
                }
            });
            return items;
        }''')
        
        # Get images
        images = await page.evaluate('''() => {
            const imgs = [];
            document.querySelectorAll('img').forEach(img => {
                if (img.src && !img.src.includes('data:image')) {
                    imgs.push({
                        src: img.src,
                        alt: img.alt || '',
                        width: img.width,
                        height: img.height
                    });
                }
            });
            return imgs.slice(0, 20); // Limit to first 20 images
        }''')
        
        # Save data
        page_dir = os.path.join(OUTPUT_DIR, page_info['id'])
        os.makedirs(page_dir, exist_ok=True)
        
        # Save HTML
        with open(os.path.join(page_dir, 'page.html'), 'w', encoding='utf-8') as f:
            f.write(html)
        
        # Save inline CSS
        with open(os.path.join(page_dir, 'inline.css'), 'w', encoding='utf-8') as f:
            f.write(inline_styles)
        
        # Save metadata
        metadata = {
            'id': page_info['id'],
            'name': page_info['name'],
            'url': page_info['url'],
            'title': title,
            'css_links': css_links,
            'computed_styles': computed_styles,
            'text_content': text_content[:10],  # First 10 sections
            'nav_items': nav_items[:30],  # First 30 nav items
            'images': images,
        }
        
        with open(os.path.join(page_dir, 'metadata.json'), 'w', encoding='utf-8') as f:
            json.dump(metadata, f, indent=2, ensure_ascii=False)
        
        print(f"  ✓ Saved: {page_info['name']}")
        return True
        
    except Exception as e:
        print(f"  ✗ Error scraping {page_info['name']}: {e}")
        return False


async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(
            viewport={'width': 1920, 'height': 1080},
            user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        )
        
        page = await context.new_page()
        
        results = []
        for page_info in PAGES:
            success = await scrape_page(page, page_info)
            results.append({'page': page_info['name'], 'success': success})
        
        await browser.close()
    
    # Save summary
    summary = {
        'total_pages': len(PAGES),
        'successful': sum(1 for r in results if r['success']),
        'failed': sum(1 for r in results if not r['success']),
        'pages': results
    }
    
    with open(os.path.join(OUTPUT_DIR, 'scraping_summary.json'), 'w') as f:
        json.dump(summary, f, indent=2)
    
    print(f"\n=== Scraping Complete ===")
    print(f"Total: {summary['total_pages']}, Success: {summary['successful']}, Failed: {summary['failed']}")
    print(f"Output: {OUTPUT_DIR}")


if __name__ == '__main__':
    asyncio.run(main())
