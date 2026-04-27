#!/usr/bin/env python3
"""
Fast scraper to extract HTML and key CSS from Leroux template pages
"""

import os
import json
import requests
from bs4 import BeautifulSoup
import time

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

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
}


def scrape_page(page_info):
    """Scrape a single page for HTML and extract key content"""
    print(f"Scraping: {page_info['name']}")
    
    try:
        response = requests.get(page_info['url'], headers=HEADERS, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Get page title
        title = soup.title.string if soup.title else ''
        
        # Get all CSS links
        css_links = [link.get('href') for link in soup.find_all('link', rel='stylesheet') if link.get('href')]
        
        # Get inline styles
        inline_styles = '\n'.join([style.string for style in soup.find_all('style') if style.string])
        
        # Extract main content structure
        # Header
        header = soup.find('header') or soup.find(class_=lambda x: x and 'header' in x.lower() if x else False)
        header_text = header.get_text(separator=' ', strip=True)[:500] if header else ''
        
        # Main content
        main = soup.find('main') or soup.find(class_=lambda x: x and 'content' in x.lower() if x else False)
        
        # Extract sections
        sections = []
        for section in soup.find_all(['section', 'div'], class_=lambda x: x and any(k in str(x).lower() for k in ['section', 'hero', 'banner', 'about', 'service', 'contact', 'portfolio', 'blog', 'team', 'pricing', 'faq', 'shop'])):
            heading = section.find(['h1', 'h2', 'h3'])
            text = section.get_text(separator=' ', strip=True)[:300]
            if heading or len(text) > 50:
                sections.append({
                    'heading': heading.get_text(strip=True) if heading else '',
                    'text': text,
                    'classes': section.get('class', [])
                })
        
        # Get navigation
        nav = soup.find('nav') or soup.find(class_=lambda x: x and 'nav' in x.lower() if x else False)
        nav_items = []
        if nav:
            for link in nav.find_all('a')[:20]:
                text = link.get_text(strip=True)
                href = link.get('href', '')
                if text:
                    nav_items.append({'text': text, 'href': href})
        
        # Get footer
        footer = soup.find('footer') or soup.find(class_=lambda x: x and 'footer' in x.lower() if x else False)
        footer_text = footer.get_text(separator=' ', strip=True)[:500] if footer else ''
        
        # Get images
        images = []
        for img in soup.find_all('img')[:15]:
            src = img.get('src', '')
            if src and not src.startswith('data:'):
                images.append({
                    'src': src if src.startswith('http') else f"https://leroux.qodeinteractive.com{src}",
                    'alt': img.get('alt', '')
                })
        
        # Save data
        page_dir = os.path.join(OUTPUT_DIR, page_info['id'])
        os.makedirs(page_dir, exist_ok=True)
        
        # Save HTML (cleaned up)
        with open(os.path.join(page_dir, 'page.html'), 'w', encoding='utf-8') as f:
            f.write(response.text)
        
        # Save inline CSS
        with open(os.path.join(page_dir, 'inline.css'), 'w', encoding='utf-8') as f:
            f.write(inline_styles)
        
        # Save metadata
        metadata = {
            'id': page_info['id'],
            'name': page_info['name'],
            'url': page_info['url'],
            'title': title,
            'css_links': css_links[:20],
            'header_text': header_text,
            'footer_text': footer_text,
            'sections': sections[:15],
            'nav_items': nav_items,
            'images': images,
        }
        
        with open(os.path.join(page_dir, 'metadata.json'), 'w', encoding='utf-8') as f:
            json.dump(metadata, f, indent=2, ensure_ascii=False)
        
        print(f"  ✓ Saved: {page_info['name']}")
        return True
        
    except Exception as e:
        print(f"  ✗ Error scraping {page_info['name']}: {e}")
        return False


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    results = []
    for page_info in PAGES:
        success = scrape_page(page_info)
        results.append({'page': page_info['name'], 'success': success})
        time.sleep(0.5)  # Be nice to the server
    
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
    main()
