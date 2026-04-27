#!/usr/bin/env python3
"""
Fast exact copy creator - downloads assets and creates static HTML
"""

import os
import requests
import time
import re
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import hashlib

OUTPUT_DIR = "/home/z/my-project/public/leroux-exact"
BASE_URL = "https://leroux.qodeinteractive.com"

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': '*/*',
}

# Track downloaded files
downloaded = {}

def get_hash(url):
    return hashlib.md5(url.encode()).hexdigest()[:8]

def download_asset(url, file_type):
    """Download asset and return local path"""
    if url in downloaded:
        return downloaded[url]
    
    if url.startswith('data:'):
        return url
    
    # Create local filename
    parsed = urlparse(url)
    filename = os.path.basename(parsed.path)
    if '?' in filename:
        filename = filename.split('?')[0]
    if not filename:
        filename = 'file'
    
    url_hash = get_hash(url)
    local_name = f"{url_hash}_{filename}"
    
    if file_type == 'css':
        local_path = f"css/{local_name}"
    elif file_type == 'js':
        local_path = f"js/{local_name}"
    elif file_type == 'img':
        local_path = f"images/{local_name}"
    else:
        local_path = f"assets/{local_name}"
    
    full_path = os.path.join(OUTPUT_DIR, local_path)
    
    # Download if not exists
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

def process_page(url, output_file):
    """Process a single page"""
    print(f"Processing: {url}")
    
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
        
        # Background images in style
        for el in soup.find_all(style=True):
            style = el.get('style', '')
            for match in re.finditer(r'url\(["\']?([^"\'()]+)["\']?\)', style):
                bg_url = match.group(1)
                if not bg_url.startswith('data:'):
                    full_url = urljoin(url, bg_url)
                    local = download_asset(full_url, 'img')
                    style = style.replace(bg_url, local)
            el['style'] = style
        
        # Inline styles with fonts
        for style in soup.find_all('style'):
            if style.string:
                css = style.string
                for match in re.finditer(r'url\(["\']?([^"\'()]+)["\']?\)', css):
                    asset_url = match.group(1)
                    if not asset_url.startswith('data:'):
                        full_url = urljoin(url, asset_url)
                        if any(ext in asset_url.lower() for ext in ['.woff', '.ttf', '.eot']):
                            local = download_asset(full_url, 'css')
                        else:
                            local = download_asset(full_url, 'img')
                        css = css.replace(asset_url, local)
                style.string = css
        
        # Save HTML
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(str(soup))
        
        print(f"  ✓ Saved: {output_file}")
        return True
        
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return False

def main():
    # Create directories
    os.makedirs(f"{OUTPUT_DIR}/css", exist_ok=True)
    os.makedirs(f"{OUTPUT_DIR}/js", exist_ok=True)
    os.makedirs(f"{OUTPUT_DIR}/images", exist_ok=True)
    
    print("="*50)
    print("CREATING EXACT COPY OF LEROUX")
    print("="*50)
    
    # Main page first
    process_page("https://leroux.qodeinteractive.com/", f"{OUTPUT_DIR}/index.html")
    
    # Count assets
    css_count = len([f for f in downloaded.values() if f.startswith('css/')])
    js_count = len([f for f in downloaded.values() if f.startswith('js/')])
    img_count = len([f for f in downloaded.values() if f.startswith('images/')])
    
    print("\n" + "="*50)
    print(f"Main page downloaded!")
    print(f"CSS: {css_count}, JS: {js_count}, Images: {img_count}")
    print("="*50)

if __name__ == '__main__':
    main()
