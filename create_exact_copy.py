#!/usr/bin/env python3
"""
Create EXACT COPY of Leroux template - download ALL assets locally
"""

import os
import json
import requests
import time
import re
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

OUTPUT_DIR = "/home/z/my-project/public/leroux-exact"

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate',
    'Connection': 'keep-alive',
}

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
    {"id": "portfolio_standard", "name": "Portfolio Standard", "url": "https://leroux.qodeinteractive.com/portfolio/standard-list/"},
    {"id": "portfolio_gallery", "name": "Portfolio Gallery", "url": "https://leroux.qodeinteractive.com/portfolio/gallery-list/"},
    {"id": "blog_right_sidebar", "name": "Blog Right Sidebar", "url": "https://leroux.qodeinteractive.com/blog/right-sidebar/"},
    {"id": "blog_left_sidebar", "name": "Blog Left Sidebar", "url": "https://leroux.qodeinteractive.com/blog/left-sidebar/"},
    {"id": "blog_no_sidebar", "name": "Blog No Sidebar", "url": "https://leroux.qodeinteractive.com/blog/no-sidebar/"},
    {"id": "shop", "name": "Shop", "url": "https://leroux.qodeinteractive.com/shop/"},
    {"id": "product_single", "name": "Product Single", "url": "https://leroux.qodeinteractive.com/product/headphones/"},
]

def create_structure():
    """Create directory structure"""
    dirs = [
        OUTPUT_DIR,
        f"{OUTPUT_DIR}/css",
        f"{OUTPUT_DIR}/js",
        f"{OUTPUT_DIR}/images",
        f"{OUTPUT_DIR}/fonts",
        f"{OUTPUT_DIR}/pages",
        f"{OUTPUT_DIR}/pages/main_home",
    ]
    for d in dirs:
        os.makedirs(d, exist_ok=True)

# Global sets to track downloaded files
downloaded_files = {}

def get_local_path(url, file_type):
    """Convert URL to local file path"""
    global downloaded_files
    
    if url in downloaded_files:
        return downloaded_files[url]
    
    parsed = urlparse(url)
    path = parsed.path
    filename = os.path.basename(path)
    
    # Clean filename
    if '?' in filename:
        filename = filename.split('?')[0]
    
    # Add hash to prevent collisions
    url_hash = abs(hash(url)) % 10000
    
    if file_type == 'css':
        local_path = f"css/{url_hash}_{filename if filename else 'style.css'}"
    elif file_type == 'js':
        local_path = f"js/{url_hash}_{filename if filename else 'script.js'}"
    elif file_type == 'img':
        local_path = f"images/{url_hash}_{filename if filename else 'image.jpg'}"
    elif file_type == 'font':
        local_path = f"fonts/{url_hash}_{filename if filename else 'font.woff2'}"
    else:
        local_path = f"assets/{url_hash}_{filename}"
    
    downloaded_files[url] = local_path
    return local_path

def download_file(url, local_path):
    """Download a file from URL to local path"""
    full_path = os.path.join(OUTPUT_DIR, local_path)
    
    if os.path.exists(full_path):
        return True
    
    try:
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        response = requests.get(url, headers=HEADERS, timeout=30)
        if response.status_code == 200:
            with open(full_path, 'wb') as f:
                f.write(response.content)
            return True
    except Exception as e:
        print(f"    Failed: {url[:80]}... - {e}")
    return False

def process_html(html, base_url):
    """Process HTML and convert all URLs to local paths"""
    soup = BeautifulSoup(html, 'html.parser')
    
    # Process CSS links
    for link in soup.find_all('link', rel='stylesheet'):
        href = link.get('href', '')
        if href and not href.startswith('data:'):
            full_url = urljoin(base_url, href)
            local_path = get_local_path(full_url, 'css')
            download_file(full_url, local_path)
            link['href'] = local_path
    
    # Process script src
    for script in soup.find_all('script', src=True):
        src = script.get('src', '')
        if src and not src.startswith('data:'):
            full_url = urljoin(base_url, src)
            local_path = get_local_path(full_url, 'js')
            download_file(full_url, local_path)
            script['src'] = local_path
    
    # Process img src
    for img in soup.find_all('img', src=True):
        src = img.get('src', '')
        if src and not src.startswith('data:'):
            full_url = urljoin(base_url, src)
            local_path = get_local_path(full_url, 'img')
            download_file(full_url, local_path)
            img['src'] = local_path
    
    # Process img srcset
    for img in soup.find_all('img', srcset=True):
        srcset = img.get('srcset', '')
        new_srcset = []
        for src_part in srcset.split(','):
            parts = src_part.strip().split()
            if parts:
                src = parts[0]
                if not src.startswith('data:'):
                    full_url = urljoin(base_url, src)
                    local_path = get_local_path(full_url, 'img')
                    download_file(full_url, local_path)
                    parts[0] = local_path
                new_srcset.append(' '.join(parts))
        img['srcset'] = ', '.join(new_srcset)
    
    # Process source srcset
    for source in soup.find_all('source', srcset=True):
        srcset = source.get('srcset', '')
        new_srcset = []
        for src_part in srcset.split(','):
            parts = src_part.strip().split()
            if parts:
                src = parts[0]
                if not src.startswith('data:'):
                    full_url = urljoin(base_url, src)
                    local_path = get_local_path(full_url, 'img')
                    download_file(full_url, local_path)
                    parts[0] = local_path
                new_srcset.append(' '.join(parts))
        source['srcset'] = ', '.join(new_srcset)
    
    # Process background images in style
    for element in soup.find_all(style=True):
        style = element.get('style', '')
        urls = re.findall(r'url\(["\']?([^"\'()]+)["\']?\)', style)
        for url in urls:
            if not url.startswith('data:'):
                full_url = urljoin(base_url, url)
                local_path = get_local_path(full_url, 'img')
                download_file(full_url, local_path)
                style = style.replace(url, local_path)
        element['style'] = style
    
    # Process inline styles
    for style in soup.find_all('style'):
        if style.string:
            css = style.string
            urls = re.findall(r'url\(["\']?([^"\'()]+)["\']?\)', css)
            for url in urls:
                if not url.startswith('data:'):
                    full_url = urljoin(base_url, url)
                    # Check if it's a font
                    if any(ext in url.lower() for ext in ['.woff', '.woff2', '.ttf', '.otf', '.eot']):
                        local_path = get_local_path(full_url, 'font')
                    else:
                        local_path = get_local_path(full_url, 'img')
                    download_file(full_url, local_path)
                    css = css.replace(url, local_path)
            style.string = css
    
    # Process data-src attributes
    for element in soup.find_all(attrs={'data-src': True}):
        data_src = element.get('data-src', '')
        if data_src and not data_src.startswith('data:'):
            full_url = urljoin(base_url, data_src)
            local_path = get_local_path(full_url, 'img')
            download_file(full_url, local_path)
            element['data-src'] = local_path
    
    return str(soup)

def main():
    print("="*60)
    print("CREATING EXACT COPY OF LEROUX TEMPLATE")
    print("="*60)
    
    create_structure()
    
    total_pages = len(PAGES)
    total_css = 0
    total_js = 0
    total_img = 0
    
    for i, page in enumerate(PAGES):
        print(f"\n[{i+1}/{total_pages}] Processing: {page['name']}")
        
        try:
            response = requests.get(page['url'], headers=HEADERS, timeout=60)
            html = response.text
            
            # Process HTML and download all assets
            processed_html = process_html(html, page['url'])
            
            # Save processed HTML
            if page['id'] == 'main_home':
                output_path = f"{OUTPUT_DIR}/index.html"
            else:
                output_path = f"{OUTPUT_DIR}/pages/{page['id']}.html"
            
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(processed_html)
            
            print(f"  ✓ Saved: {output_path}")
            
        except Exception as e:
            print(f"  ✗ Error: {e}")
        
        time.sleep(0.3)
    
    # Count downloaded files
    css_count = len([f for f in downloaded_files.values() if f.startswith('css/')])
    js_count = len([f for f in downloaded_files.values() if f.startswith('js/')])
    img_count = len([f for f in downloaded_files.values() if f.startswith('images/')])
    font_count = len([f for f in downloaded_files.values() if f.startswith('fonts/')])
    
    # Save file mapping
    with open(f"{OUTPUT_DIR}/file_mapping.json", 'w') as f:
        json.dump(downloaded_files, f, indent=2)
    
    print("\n" + "="*60)
    print("DOWNLOAD COMPLETE!")
    print("="*60)
    print(f"Pages:      {total_pages}")
    print(f"CSS files:  {css_count}")
    print(f"JS files:   {js_count}")
    print(f"Images:     {img_count}")
    print(f"Fonts:      {font_count}")
    print("="*60)
    print(f"\nOutput: {OUTPUT_DIR}")

if __name__ == '__main__':
    main()
