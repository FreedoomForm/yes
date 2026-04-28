#!/usr/bin/env python3
"""
Download all resources from Leroux template
"""

import os
import json
import requests
import time
from urllib.parse import urlparse

OUTPUT_DIR = "/home/z/my-project/download/leroux_full_scrape"

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': '*/*',
}

def load_inventory():
    with open(f"{OUTPUT_DIR}/resource_inventory.json", 'r') as f:
        return json.load(f)

def download_file(url, output_path):
    """Download a file from URL"""
    try:
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        response = requests.get(url, headers=HEADERS, timeout=30)
        if response.status_code == 200:
            with open(output_path, 'wb') as f:
                f.write(response.content)
            return True
    except Exception as e:
        pass
    return False

def get_filename_from_url(url):
    """Extract filename from URL"""
    parsed = urlparse(url)
    path = parsed.path
    filename = os.path.basename(path)
    if not filename:
        filename = 'file'
    # Remove query parameters from filename
    if '?' in filename:
        filename = filename.split('?')[0]
    return filename

def main():
    inventory = load_inventory()
    
    results = {
        'css': {'total': 0, 'success': 0, 'failed': 0},
        'js': {'total': 0, 'success': 0, 'failed': 0},
        'images': {'total': 0, 'success': 0, 'failed': 0},
        'fonts': {'total': 0, 'success': 0, 'failed': 0},
    }
    
    # Download CSS files
    print("Downloading CSS files...")
    for i, url in enumerate(inventory['css'][:30]):  # Limit to 30 main CSS files
        filename = get_filename_from_url(url)
        # Add index to prevent collisions
        output_path = f"{OUTPUT_DIR}/css/{i:02d}_{filename}"
        results['css']['total'] += 1
        if download_file(url, output_path):
            results['css']['success'] += 1
        else:
            results['css']['failed'] += 1
        time.sleep(0.1)
    print(f"  CSS: {results['css']['success']}/{results['css']['total']} downloaded")
    
    # Download key JS files
    print("Downloading JS files...")
    key_js = [url for url in inventory['js'] if any(key in url for key in ['leroux-core', 'main.min.js', 'gsap', 'swiper', 'elementor'])]
    for i, url in enumerate(key_js[:20]):  # Limit to 20 key JS files
        filename = get_filename_from_url(url)
        output_path = f"{OUTPUT_DIR}/js/{i:02d}_{filename}"
        results['js']['total'] += 1
        if download_file(url, output_path):
            results['js']['success'] += 1
        else:
            results['js']['failed'] += 1
        time.sleep(0.1)
    print(f"  JS: {results['js']['success']}/{results['js']['total']} downloaded")
    
    # Download images
    print("Downloading images...")
    unique_images = list(set(inventory['images']))
    for i, url in enumerate(unique_images[:100]):  # Limit to 100 images
        filename = get_filename_from_url(url)
        output_path = f"{OUTPUT_DIR}/images/{filename}"
        results['images']['total'] += 1
        if download_file(url, output_path):
            results['images']['success'] += 1
        else:
            results['images']['failed'] += 1
        if i % 20 == 0:
            print(f"  Progress: {i}/{min(100, len(unique_images))}")
        time.sleep(0.05)
    print(f"  Images: {results['images']['success']}/{results['images']['total']} downloaded")
    
    # Save download summary
    with open(f"{OUTPUT_DIR}/download_summary.json", 'w') as f:
        json.dump(results, f, indent=2)
    
    print("\n" + "="*50)
    print("DOWNLOAD SUMMARY")
    print("="*50)
    print(f"CSS:    {results['css']['success']}/{results['css']['total']}")
    print(f"JS:     {results['js']['success']}/{results['js']['total']}")
    print(f"Images: {results['images']['success']}/{results['images']['total']}")
    print("="*50)
    print(f"\nFiles saved to: {OUTPUT_DIR}")

if __name__ == '__main__':
    main()
