#!/usr/bin/env python3
"""
Leroux Business Consulting Template Scraper
Extracts all pages and templates from the Leroux theme
"""

import json
import subprocess
import time
import os

# All discovered pages from Leroux template
PAGES = {
    "home_pages": [
        {"name": "Main Home", "url": "https://leroux.qodeinteractive.com/"},
        {"name": "Business Home", "url": "https://leroux.qodeinteractive.com/business-home/"},
        {"name": "Seminar Home", "url": "https://leroux.qodeinteractive.com/seminar-home/"},
        {"name": "App Showcase", "url": "https://leroux.qodeinteractive.com/app-showcase/"},
        {"name": "Advisory Home", "url": "https://leroux.qodeinteractive.com/advisory-home/"},
        {"name": "Interactive Banners", "url": "https://leroux.qodeinteractive.com/interactive-banners/"},
        {"name": "Business Strategy", "url": "https://leroux.qodeinteractive.com/business-strategy/"},
        {"name": "Fullscreen Slider", "url": "https://leroux.qodeinteractive.com/fullscreen-slider/"},
        {"name": "Coming Soon", "url": "https://leroux.qodeinteractive.com/coming-soon/"},
        {"name": "Landing", "url": "https://leroux.qodeinteractive.com/landing/"},
    ],
    "about_pages": [
        {"name": "About Us", "url": "https://leroux.qodeinteractive.com/about-us/"},
        {"name": "About Me", "url": "https://leroux.qodeinteractive.com/about-me/"},
    ],
    "service_pages": [
        {"name": "Our Services", "url": "https://leroux.qodeinteractive.com/our-services/"},
        {"name": "Our Process", "url": "https://leroux.qodeinteractive.com/our-process/"},
        {"name": "Our Clients", "url": "https://leroux.qodeinteractive.com/our-clients/"},
        {"name": "Pricing Plans", "url": "https://leroux.qodeinteractive.com/pricing-plans/"},
    ],
    "contact_pages": [
        {"name": "Contact Us", "url": "https://leroux.qodeinteractive.com/contact-us/"},
        {"name": "Get In Touch", "url": "https://leroux.qodeinteractive.com/get-in-touch/"},
        {"name": "Drop Us A Note", "url": "https://leroux.qodeinteractive.com/drop-us-a-note/"},
    ],
    "utility_pages": [
        {"name": "FAQ Page", "url": "https://leroux.qodeinteractive.com/faq-page/"},
        {"name": "404 Error Page", "url": "https://leroux.qodeinteractive.com/404-error-page"},
    ],
    "portfolio_pages": [
        {"name": "Portfolio Standard List", "url": "https://leroux.qodeinteractive.com/portfolio/standard-list/"},
        {"name": "Portfolio Gallery List", "url": "https://leroux.qodeinteractive.com/portfolio/gallery-list/"},
    ],
    "blog_pages": [
        {"name": "Blog Right Sidebar", "url": "https://leroux.qodeinteractive.com/blog/right-sidebar/"},
        {"name": "Blog Left Sidebar", "url": "https://leroux.qodeinteractive.com/blog/left-sidebar/"},
        {"name": "Blog No Sidebar", "url": "https://leroux.qodeinteractive.com/blog/no-sidebar/"},
    ],
    "shop_pages": [
        {"name": "Shop Product List", "url": "https://leroux.qodeinteractive.com/shop/"},
        {"name": "Shop Product Single", "url": "https://leroux.qodeinteractive.com/product/headphones/"},
    ],
}

def run_browser_command(cmd, timeout=60000):
    """Run agent-browser command and return output"""
    try:
        result = subprocess.run(
            cmd,
            shell=True,
            capture_output=True,
            text=True,
            timeout=timeout/1000
        )
        return result.stdout, result.stderr, result.returncode
    except subprocess.TimeoutExpired:
        return "", "Timeout", 1

def open_page(url):
    """Open a page in the browser"""
    cmd = f'agent-browser open "{url}" --timeout 30000'
    stdout, stderr, code = run_browser_command(cmd)
    return code == 0

def wait_for_page():
    """Wait for page to load"""
    cmd = 'agent-browser wait --load networkidle --timeout 30000'
    stdout, stderr, code = run_browser_command(cmd)
    return code == 0

def get_page_html():
    """Get page HTML content"""
    cmd = 'agent-browser eval "document.documentElement.outerHTML"'
    stdout, stderr, code = run_browser_command(cmd, timeout=30000)
    if code == 0 and stdout:
        return stdout.strip()
    return None

def take_screenshot(output_path):
    """Take a screenshot of the current page"""
    cmd = f'agent-browser screenshot --full "{output_path}"'
    stdout, stderr, code = run_browser_command(cmd, timeout=60000)
    return code == 0

def close_browser():
    """Close the browser"""
    cmd = 'agent-browser close'
    run_browser_command(cmd)

def scrape_page(page_info, output_dir):
    """Scrape a single page"""
    name = page_info["name"]
    url = page_info["url"]
    
    safe_name = name.lower().replace(" ", "_").replace("/", "_")
    
    print(f"Scraping: {name} - {url}")
    
    result = {
        "name": name,
        "url": url,
        "html": None,
        "screenshot": None,
        "status": "failed"
    }
    
    try:
        # Open page
        if not open_page(url):
            print(f"  Failed to open page: {url}")
            return result
        
        # Wait for load
        time.sleep(2)
        wait_for_page()
        time.sleep(2)
        
        # Get HTML
        html = get_page_html()
        if html:
            result["html"] = html
            # Save HTML
            html_path = os.path.join(output_dir, f"{safe_name}.html")
            with open(html_path, "w", encoding="utf-8") as f:
                f.write(html)
            print(f"  Saved HTML: {html_path}")
        
        # Take screenshot
        screenshot_path = os.path.join(output_dir, f"{safe_name}.png")
        if take_screenshot(screenshot_path):
            result["screenshot"] = screenshot_path
            print(f"  Saved screenshot: {screenshot_path}")
        
        result["status"] = "success"
        
    except Exception as e:
        print(f"  Error: {e}")
        result["error"] = str(e)
    
    return result

def main():
    output_dir = "/home/z/my-project/download/leroux_templates"
    os.makedirs(output_dir, exist_ok=True)
    
    all_results = {}
    
    try:
        for category, pages in PAGES.items():
            print(f"\n=== Processing {category} ===")
            all_results[category] = []
            
            for page in pages:
                result = scrape_page(page, output_dir)
                all_results[category].append(result)
                time.sleep(1)  # Small delay between pages
    
    finally:
        close_browser()
    
    # Save results summary
    summary_path = os.path.join(output_dir, "scraping_results.json")
    with open(summary_path, "w", encoding="utf-8") as f:
        json.dump(all_results, f, indent=2, ensure_ascii=False)
    
    print(f"\n=== Scraping Complete ===")
    print(f"Output directory: {output_dir}")
    
    # Print summary
    total = 0
    success = 0
    for category, results in all_results.items():
        for r in results:
            total += 1
            if r["status"] == "success":
                success += 1
    
    print(f"Total pages: {total}")
    print(f"Successfully scraped: {success}")
    print(f"Failed: {total - success}")

if __name__ == "__main__":
    main()
