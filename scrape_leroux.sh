#!/bin/bash
# Leroux Template Scraper
# Extracts all pages from Leroux Business Consulting Theme

OUTPUT_DIR="/home/z/my-project/download/leroux_templates"
mkdir -p "$OUTPUT_DIR"

# Array of all pages to scrape
declare -A PAGES
PAGES["main_home"]="https://leroux.qodeinteractive.com/"
PAGES["business_home"]="https://leroux.qodeinteractive.com/business-home/"
PAGES["seminar_home"]="https://leroux.qodeinteractive.com/seminar-home/"
PAGES["app_showcase"]="https://leroux.qodeinteractive.com/app-showcase/"
PAGES["advisory_home"]="https://leroux.qodeinteractive.com/advisory-home/"
PAGES["interactive_banners"]="https://leroux.qodeinteractive.com/interactive-banners/"
PAGES["business_strategy"]="https://leroux.qodeinteractive.com/business-strategy/"
PAGES["fullscreen_slider"]="https://leroux.qodeinteractive.com/fullscreen-slider/"
PAGES["coming_soon"]="https://leroux.qodeinteractive.com/coming-soon/"
PAGES["landing"]="https://leroux.qodeinteractive.com/landing/"
PAGES["about_us"]="https://leroux.qodeinteractive.com/about-us/"
PAGES["about_me"]="https://leroux.qodeinteractive.com/about-me/"
PAGES["our_services"]="https://leroux.qodeinteractive.com/our-services/"
PAGES["our_process"]="https://leroux.qodeinteractive.com/our-process/"
PAGES["our_clients"]="https://leroux.qodeinteractive.com/our-clients/"
PAGES["pricing_plans"]="https://leroux.qodeinteractive.com/pricing-plans/"
PAGES["contact_us"]="https://leroux.qodeinteractive.com/contact-us/"
PAGES["get_in_touch"]="https://leroux.qodeinteractive.com/get-in-touch/"
PAGES["drop_us_a_note"]="https://leroux.qodeinteractive.com/drop-us-a-note/"
PAGES["faq_page"]="https://leroux.qodeinteractive.com/faq-page/"
PAGES["error_404"]="https://leroux.qodeinteractive.com/404-error-page"
PAGES["portfolio_standard"]="https://leroux.qodeinteractive.com/portfolio/standard-list/"
PAGES["portfolio_gallery"]="https://leroux.qodeinteractive.com/portfolio/gallery-list/"
PAGES["blog_right_sidebar"]="https://leroux.qodeinteractive.com/blog/right-sidebar/"
PAGES["blog_left_sidebar"]="https://leroux.qodeinteractive.com/blog/left-sidebar/"
PAGES["blog_no_sidebar"]="https://leroux.qodeinteractive.com/blog/no-sidebar/"
PAGES["shop"]="https://leroux.qodeinteractive.com/shop/"
PAGES["product_single"]="https://leroux.qodeinteractive.com/product/headphones/"

echo "=== Leroux Template Scraper ==="
echo "Output directory: $OUTPUT_DIR"
echo ""

# Create summary file
SUMMARY_FILE="$OUTPUT_DIR/pages_summary.md"
echo "# Leroux Business Consulting Template - All Pages" > "$SUMMARY_FILE"
echo "" >> "$SUMMARY_FILE"
echo "Total pages: ${#PAGES[@]}" >> "$SUMMARY_FILE"
echo "" >> "$SUMMARY_FILE"

count=0
total=${#PAGES[@]}

for name in "${!PAGES[@]}"; do
    url="${PAGES[$name]}"
    count=$((count + 1))
    
    echo "[$count/$total] Processing: $name"
    echo "  URL: $url"
    
    # Open page
    agent-browser open "$url" --timeout 30000 > /dev/null 2>&1
    sleep 2
    agent-browser wait --load networkidle --timeout 30000 > /dev/null 2>&1
    sleep 1
    
    # Take screenshot
    screenshot_path="$OUTPUT_DIR/${name}.png"
    agent-browser screenshot --full "$screenshot_path" > /dev/null 2>&1
    
    if [ -f "$screenshot_path" ]; then
        echo "  ✓ Screenshot saved: ${name}.png"
        echo "- [$name]($url) - [Screenshot](./${name}.png)" >> "$SUMMARY_FILE"
    else
        echo "  ✗ Failed to save screenshot"
        echo "- [$name]($url) - Screenshot failed" >> "$SUMMARY_FILE"
    fi
    
    echo "" >> "$SUMMARY_FILE"
done

agent-browser close > /dev/null 2>&1

echo ""
echo "=== Scraping Complete ==="
echo "Output directory: $OUTPUT_DIR"
echo "Summary file: $SUMMARY_FILE"
echo "Total screenshots saved: $(ls -1 "$OUTPUT_DIR"/*.png 2>/dev/null | wc -l)"
