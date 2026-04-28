#!/usr/bin/env python3
"""
Download all remaining pages
"""

import os
import requests
import time
import re
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import hashlib

OUTPUT_DIR = "/home/z/my-project/public/leroux-exact"

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
}

downloaded = {}

def get_hash(url):
    return hashlib.md5(url.encode()).hexdigest()[:8]

def download_asset(url, file_type):
    if url in downloaded:
        return downloaded[url]
    
    if url.startswith('data:'):
        return url
    
    parsed = url.split('?')[0]
    filename = os.path.basename(parsed) or 'file'
    url_hash = get_hash(url)
    local_name = f"{url_hash}_{filename}"
    
    if file_type == 'css':
        local_path = f"css/{local_name}"
    elif file_type == 'js':
        local_path = f"js/{local_name}"
    else:
        local_path = f"images/{local_name}"
    
    full_path = os.path.join(OUTPUT_DIR, local_path)
    
    if not os.path.exists(full_path):
        try:
            os.makedirs(os.path.dirname(full_path), exist_ok=True)
            resp = requests.get(url, headers=HEADERS, timeout=20)
            if resp.status_code == 200:
                with open(full_path, 'wb') as f:
                    f.write(resp.content)
        except:
            pass
    
    downloaded[url] = local_path
    return local_path

def process_page(url, output_file, page_name):
    print(f"Processing: {page_name}")
    
    try:
        resp = requests.get(url, headers=HEADERS, timeout=60)
        soup = BeautifulSoup(resp.text, 'html.parser')
        
        # CSS links
        for link in soup.find_all('link', rel='stylesheet'):
            href = link.get('href', '')
            if href and not href.startswith('data:'):
                full_url = urljoin(url, href)
                local = download_asset(full_url, 'css')
                link['href'] = local
        
        # Scripts
        for script in soup.find_all('script', src=True):
            src = script.get('src', '')
            if src and not src.startswith('data:'):
                full_url = urljoin(url, src)
                local = download_asset(full_url, 'js')
                script['src'] = local
        
        # Images
        for img in soup.find_all('img'):
            src = img.get('src', '')
            if src and not src.startswith('data:'):
                full_url = urljoin(url, src)
                local = download_asset(full_url, 'img')
                img['src'] = local
            
            srcset = img.get('srcset', '')
            if srcset:
                new_srcset = []
                for part in srcset.split(','):
                    p = part.strip().split()
                    if p and not p[0].startswith('data:'):
                        full_url = urljoin(url, p[0])
                        local = download_asset(full_url, 'img')
                        p[0] = local
                        new_srcset.append(' '.join(p))
                img['srcset'] = ', '.join(new_srcset)
        
        # Background images
        for el in soup.find_all(style=True):
            style = el.get('style', '')
            for match in re.finditer(r'url\(["\']?([^"\'()]+)["\']?\)', style):
                bg_url = match.group(1)
                if not bg_url.startswith('data:'):
                    full_url = urljoin(url, bg_url)
                    local = download_asset(full_url, 'img')
                    style = style.replace(bg_url, local)
            el['style'] = style
        
        # Save
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        print(f"  ✓ Saved")
        return True
        
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return False

def main():
    os.makedirs(f"{OUTPUT_DIR}/pages", exist_ok=True)
    
    pages = [
        ("Business Home", "https://leroux.qodeinteractive.com/business-home/", "business_home.html"),
        ("Seminar Home", "https://leroux.qodeinteractive.com/seminar-home/", "seminar_home.html"),
        ("App Showcase", "https://leroux.qodeinteractive.com/app-showcase/", "app_showcase.html"),
        ("Advisory Home", "https://leroux.qodeinteractive.com/advisory-home/", "advisory_home.html"),
        ("Interactive Banners", "https://leroux.qodeinteractive.com/interactive-banners/", "interactive_banners.html"),
        ("Business Strategy", "https://leroux.qodeinteractive.com/business-strategy/", "business_strategy.html"),
        ("Fullscreen Slider", "https://leroux.qodeinteractive.com/fullscreen-slider/", "fullscreen_slider.html"),
        ("Coming Soon", "https://leroux.qodeinteractive.com/coming-soon/", "coming_soon.html"),
        ("Landing", "https://leroux.qodeinteractive.com/landing/", "landing.html"),
        ("About Us", "https://leroux.qodeinteractive.com/about-us/", "about_us.html"),
        ("About Me", "https://leroux.qodeinteractive.com/about-me/", "about_me.html"),
        ("Our Services", "https://leroux.qodeinteractive.com/our-services/", "our_services.html"),
        ("Our Process", "https://leroux.qodeinteractive.com/our-process/", "our_process.html"),
        ("Our Clients", "https://leroux.qodeinteractive.com/our-clients/", "our_clients.html"),
        ("Pricing Plans", "https://leroux.qodeinteractive.com/pricing-plans/", "pricing_plans.html"),
        ("Contact Us", "https://leroux.qodeinteractive.com/contact-us/", "contact_us.html"),
        ("Get In Touch", "https://leroux.qodeinteractive.com/get-in-touch/", "get_in_touch.html"),
        ("Drop Us A Note", "https://leroux.qodeinteractive.com/drop-us-a-note/", "drop_us_a_note.html"),
        ("FAQ Page", "https://leroux.qodeinteractive.com/faq-page/", "faq_page.html"),
        ("Portfolio Standard", "https://leroux.qodeinteractive.com/portfolio/standard-list/", "portfolio_standard.html"),
        ("Portfolio Gallery", "https://leroux.qodeinteractive.com/portfolio/gallery-list/", "portfolio_gallery.html"),
        ("Blog Right Sidebar", "https://leroux.qodeinteractive.com/blog/right-sidebar/", "blog_right_sidebar.html"),
        ("Blog Left Sidebar", "https://leroux.qodeinteractive.com/blog/left-sidebar/", "blog_left_sidebar.html"),
        ("Blog No Sidebar", "https://leroux.qodeinteractive.com/blog/no-sidebar/", "blog_no_sidebar.html"),
        ("Shop", "https://leroux.qodeinteractive.com/shop/", "shop.html"),
        ("Product Single", "https://leroux.qodeinteractive.com/product/headphones/", "product_single.html"),
    ]
    
    print("Downloading remaining pages...")
    
    for name, url, filename in pages:
        output_file = f"{OUTPUT_DIR}/pages/{filename}"
        process_page(url, output_file, name)
        time.sleep(0.5)
    
    print("\nDone!")

if __name__ == '__main__':
    main()
