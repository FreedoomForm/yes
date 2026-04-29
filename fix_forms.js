const fs = require('fs');
const path = require('path');

const pagesDir = '/home/z/my-project/public/pages';

const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

pages.forEach(page => {
    const filePath = path.join(pagesDir, page);
    let content = fs.readFileSync(filePath, 'utf-8');
    let modified = false;
    
    // Fix footer form - add id to form
    if (content.includes('class="wpcf7-form init demo"') && !content.includes('id="footer-contact-form"')) {
        // Find form in footer (qodef-newsletter area)
        content = content.replace(
            /<form action="[^"]*" aria-label="[^"]*" class="wpcf7-form init demo" data-status="init" method="post"/g,
            '<form id="footer-contact-form" action="/" aria-label="Contact form" class="wpcf7-form init demo" data-status="init" method="post"'
        );
        modified = true;
    }
    
    // Fix email field -> phone field in footer
    if (content.includes('name="your-email"') && content.includes('placeholder="Your e-mail"')) {
        content = content.replace(
            /name="your-email" placeholder="Your e-mail"[^>]*type="email"/g,
            'name="your-phone" placeholder="Номер телефона" type="tel"'
        );
        modified = true;
    }
    
    // Add id to phone field
    if (content.includes('name="your-phone"') && !content.includes('id="footer-phone"')) {
        content = content.replace(
            /name="your-phone" placeholder="Номер телефона"/g,
            'name="your-phone" id="footer-phone" placeholder="Номер телефона"'
        );
        modified = true;
    }
    
    // Add footer-status div before </form> if not exists
    if (content.includes('id="footer-contact-form"') && !content.includes('id="footer-status"')) {
        content = content.replace(
            /(<button[^>]*type="submit"[^>]*>.*?<\/button>)(<\/div><div aria-hidden="true" class="wpcf7-response-output")/gs,
            '$1<div id="footer-status" style="margin-top: 10px; display: none;"></div>$2'
        );
        modified = true;
    }
    
    // Fix link to home page
    content = content.replace(/href="\/"/g, 'href="/home.html"');
    content = content.replace(/href="https:\/\/century\.uz\/"/g, 'href="/home.html"');
    
    if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`Fixed: ${page}`);
    } else {
        console.log(`No changes: ${page}`);
    }
});

console.log('Done!');
