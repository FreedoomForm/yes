#!/usr/bin/env python3
"""
Comprehensive scraper to extract all resources from Leroux template
- All CSS files (external stylesheets)
- All JavaScript files
- All images
- Fonts
- Icons
- SVG files
"""

import os
import json
import requests
from bs4 import BeautifulSoup
import time
import re
from urllib.parse import urljoin, urlparse

OUTPUT_DIR = "/home/z/my-project/download/leroux_full_scrape"

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
}

PAGES = [
    {"id": "main_home", "url": "https://leroux.qodeinteractive.com/"},
    {"id": "business_home", "url": "https://leroux.qodeinteractive.com/business-home/"},
    {"id": "seminar_home", "url": "https://leroux.qodeinteractive.com/seminar-home/"},
    {"id": "app_showcase", "url": "https://leroux.qodeinteractive.com/app-showcase/"},
    {"id": "advisory_home", "url": "https://leroux.qodeinteractive.com/advisory-home/"},
    {"id": "interactive_banners", "url": "https://leroux.qodeinteractive.com/interactive-banners/"},
    {"id": "business_strategy", "url": "https://leroux.qodeinteractive.com/business-strategy/"},
    {"id": "fullscreen_slider", "url": "https://leroux.qodeinteractive.com/fullscreen-slider/"},
    {"id": "coming_soon", "url": "https://leroux.qodeinteractive.com/coming-soon/"},
    {"id": "landing", "url": "https://leroux.qodeinteractive.com/landing/"},
    {"id": "about_us", "url": "https://leroux.qodeinteractive.com/about-us/"},
    {"id": "about_me", "url": "https://leroux.qodeinteractive.com/about-me/"},
    {"id": "our_services", "url": "https://leroux.qodeinteractive.com/our-services/"},
    {"id": "our_process", "url": "https://leroux.qodeinteractive.com/our-process/"},
    {"id": "our_clients", "url": "https://leroux.qodeinteractive.com/our-clients/"},
    {"id": "pricing_plans", "url": "https://leroux.qodeinteractive.com/pricing-plans/"},
    {"id": "contact_us", "url": "https://leroux.qodeinteractive.com/contact-us/"},
    {"id": "get_in_touch", "url": "https://leroux.qodeinteractive.com/get-in-touch/"},
    {"id": "drop_us_a_note", "url": "https://leroux.qodeinteractive.com/drop-us-a-note/"},
    {"id": "faq_page", "url": "https://leroux.qodeinteractive.com/faq-page/"},
    {"id": "portfolio_standard", "url": "https://leroux.qodeinteractive.com/portfolio/standard-list/"},
    {"id": "portfolio_gallery", "url": "https://leroux.qodeinteractive.com/portfolio/gallery-list/"},
    {"id": "blog_right_sidebar", "url": "https://leroux.qodeinteractive.com/blog/right-sidebar/"},
    {"id": "blog_left_sidebar", "url": "https://leroux.qodeinteractive.com/blog/left-sidebar/"},
    {"id": "blog_no_sidebar", "url": "https://leroux.qodeinteractive.com/blog/no-sidebar/"},
    {"id": "shop", "url": "https://leroux.qodeinteractive.com/shop/"},
    {"id": "product_single", "url": "https://leroux.qodeinteractive.com/product/headphones/"},
]

def create_dirs():
    dirs = [
        OUTPUT_DIR,
        f"{OUTPUT_DIR}/css",
        f"{OUTPUT_DIR}/js", 
        f"{OUTPUT_DIR}/images",
        f"{OUTPUT_DIR}/fonts",
        f"{OUTPUT_DIR}/icons",
        f"{OUTPUT_DIR}/svg",
        f"{OUTPUT_DIR}/pages",
    ]
    for d in dirs:
        os.makedirs(d, exist_ok=True)

def download_file(url, output_path):
    """Download a file from URL"""
    try:
        response = requests.get(url, headers=HEADERS, timeout=30)
        if response.status_code == 200:
            with open(output_path, 'wb') as f:
                f.write(response.content)
            return True
    except Exception as e:
        pass
    return False

def scrape_page_resources(page_info, all_resources):
    """Scrape all resources from a single page"""
    print(f"Scraping resources from: {page_info['id']}")
    
    try:
        response = requests.get(page_info['url'], headers=HEADERS, timeout=30)
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # 1. CSS Files
        for link in soup.find_all('link', rel='stylesheet'):
            href = link.get('href', '')
            if href and not href.startswith('data:'):
                full_url = urljoin(page_info['url'], href)
                if full_url not in all_resources['css']:
                    all_resources['css'].append(full_url)
        
        # 2. JavaScript Files
        for script in soup.find_all('script', src=True):
            src = script.get('src', '')
            if src and not src.startswith('data:'):
                full_url = urljoin(page_info['url'], src)
                if full_url not in all_resources['js']:
                    all_resources['js'].append(full_url)
        
        # 3. Images
        for img in soup.find_all('img', src=True):
            src = img.get('src', '')
            if src and not src.startswith('data:'):
                full_url = urljoin(page_info['url'], src)
                if full_url not in all_resources['images']:
                    all_resources['images'].append(full_url)
        
        # 4. Background images in style attributes
        for element in soup.find_all(style=True):
            style = element.get('style', '')
            bg_urls = re.findall(r'url\(["\']?([^"\'()]+)["\']?\)', style)
            for url in bg_urls:
                if url and not url.startswith('data:'):
                    full_url = urljoin(page_info['url'], url)
                    if full_url not in all_resources['images']:
                        all_resources['images'].append(full_url)
        
        # 5. Source sets for responsive images
        for source in soup.find_all('source', srcset=True):
            srcset = source.get('srcset', '')
            for src in srcset.split(','):
                url = src.strip().split()[0] if src.strip() else ''
                if url and not url.startswith('data:'):
                    full_url = urljoin(page_info['url'], url)
                    if full_url not in all_resources['images']:
                        all_resources['images'].append(full_url)
        
        # 6. SVG files (inline and linked)
        for svg in soup.find_all('svg'):
            all_resources['inline_svgs'] += 1
        
        for img in soup.find_all('img', src=True):
            if img.get('src', '').endswith('.svg'):
                full_url = urljoin(page_info['url'], img.get('src'))
                if full_url not in all_resources['svg']:
                    all_resources['svg'].append(full_url)
        
        # 7. Font files (from CSS)
        inline_styles = '\n'.join([s.string for s in soup.find_all('style') if s.string])
        font_urls = re.findall(r'url\(["\']?([^"\'()]+\.(woff2?|ttf|otf|eot))["\']?\)', inline_styles)
        for font_url, _ in font_urls:
            if font_url and not font_url.startswith('data:'):
                full_url = urljoin(page_info['url'], font_url)
                if full_url not in all_resources['fonts']:
                    all_resources['fonts'].append(full_url)
        
        # 8. Links in link tags (preload, prefetch)
        for link in soup.find_all('link'):
            rel = link.get('rel', [])
            href = link.get('href', '')
            if href and 'preload' in rel or 'prefetch' in rel:
                full_url = urljoin(page_info['url'], href)
                if full_url not in all_resources['preloads']:
                    all_resources['preloads'].append(full_url)
        
        # 9. Iframes (videos, maps, etc.)
        for iframe in soup.find_all('iframe', src=True):
            src = iframe.get('src', '')
            if src:
                if src not in all_resources['iframes']:
                    all_resources['iframes'].append(src)
        
        # 10. Data attributes that might contain URLs
        for element in soup.find_all(attrs={'data-src': True}):
            data_src = element.get('data-src', '')
            if data_src and not data_src.startswith('data:'):
                full_url = urljoin(page_info['url'], data_src)
                if full_url not in all_resources['images']:
                    all_resources['images'].append(full_url)
        
        return True
        
    except Exception as e:
        print(f"  Error: {e}")
        return False

def main():
    create_dirs()
    
    all_resources = {
        'css': [],
        'js': [],
        'images': [],
        'fonts': [],
        'svg': [],
        'preloads': [],
        'iframes': [],
        'inline_svgs': 0,
    }
    
    # Scrape all pages
    for page_info in PAGES:
        scrape_page_resources(page_info, all_resources)
        time.sleep(0.3)
    
    # Remove duplicates and sort
    for key in ['css', 'js', 'images', 'fonts', 'svg', 'preloads', 'iframes']:
        all_resources[key] = sorted(list(set(all_resources[key])))
    
    # Save resource inventory
    with open(f"{OUTPUT_DIR}/resource_inventory.json", 'w') as f:
        json.dump(all_resources, f, indent=2)
    
    # Print summary
    print("\n" + "="*50)
    print("RESOURCE INVENTORY SUMMARY")
    print("="*50)
    print(f"CSS Files:      {len(all_resources['css'])}")
    print(f"JS Files:       {len(all_resources['js'])}")
    print(f"Images:         {len(all_resources['images'])}")
    print(f"Fonts:          {len(all_resources['fonts'])}")
    print(f"SVG Files:      {len(all_resources['svg'])}")
    print(f"Preload Links:  {len(all_resources['preloads'])}")
    print(f"Iframes:        {len(all_resources['iframes'])}")
    print(f"Inline SVGs:    {all_resources['inline_svgs']}")
    print("="*50)
    print(f"\nInventory saved to: {OUTPUT_DIR}/resource_inventory.json")

if __name__ == '__main__':
    main()
