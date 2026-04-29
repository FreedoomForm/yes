const fs = require('fs');
const path = require('path');

const pagesDir = '/home/z/my-project/public/pages';

const formScript = `
    // Hide CF7 spinner permanently
    var cf7Style = document.createElement('style');
    cf7Style.innerHTML = '.wpcf7-spinner { display: none !important; } form.submitting .wpcf7-spinner { display: none !important; } .wpcf7-response-output { display: none !important; }';
    document.head.appendChild(cf7Style);

    // Contact form submission
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var name = document.getElementById('contact-name');
            var phone = document.getElementById('contact-phone');
            var message = document.getElementById('contact-message');
            var statusDiv = document.getElementById('contact-status');
            
            if (!name || !phone || !message || !statusDiv) return;
            
            name = name.value.trim();
            phone = phone.value.trim();
            message = message.value.trim();
            
            if (!name || !phone || !message) {
                statusDiv.style.display = 'block';
                statusDiv.style.color = '#e74c3c';
                statusDiv.innerHTML = 'Пожалуйста, заполните все поля';
                return;
            }
            
            var submitBtn = contactForm.querySelector('button[type="submit"]');
            var originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="qodef-m-text">Отправка...</span>';
            submitBtn.disabled = true;
            
            fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, phone: phone, message: message })
            })
            .then(function(response) { return response.json(); })
            .then(function(data) {
                statusDiv.style.display = 'block';
                if (data.success) {
                    statusDiv.style.color = '#27ae60';
                    statusDiv.innerHTML = 'Отправлено!';
                    document.getElementById('contact-name').value = '';
                    document.getElementById('contact-phone').value = '';
                    document.getElementById('contact-message').value = '';
                    setTimeout(function() { statusDiv.style.display = 'none'; }, 2000);
                } else {
                    statusDiv.style.color = '#e74c3c';
                    statusDiv.innerHTML = data.error || 'Ошибка';
                }
            })
            .catch(function() {
                statusDiv.style.display = 'block';
                statusDiv.style.color = '#e74c3c';
                statusDiv.innerHTML = 'Ошибка соединения';
            })
            .finally(function() {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    // Footer contact form submission
    var footerForm = document.getElementById('footer-contact-form');
    if (footerForm) {
        footerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var name = document.getElementById('footer-name');
            var phone = document.getElementById('footer-phone');
            var message = document.getElementById('footer-message');
            var statusDiv = document.getElementById('footer-status');
            
            if (!name || !phone || !message || !statusDiv) return;
            
            name = name.value.trim();
            phone = phone.value.trim();
            message = message.value.trim();
            
            if (!name || !phone || !message) {
                statusDiv.style.display = 'block';
                statusDiv.style.color = '#e74c3c';
                statusDiv.innerHTML = 'Пожалуйста, заполните все поля';
                return;
            }
            
            var submitBtn = footerForm.querySelector('button[type="submit"]');
            var originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="qodef-m-text">Отправка...</span>';
            submitBtn.disabled = true;
            
            fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, phone: phone, message: message })
            })
            .then(function(response) { return response.json(); })
            .then(function(data) {
                statusDiv.style.display = 'block';
                if (data.success) {
                    statusDiv.style.color = '#27ae60';
                    statusDiv.innerHTML = 'Отправлено!';
                    document.getElementById('footer-name').value = '';
                    document.getElementById('footer-phone').value = '';
                    document.getElementById('footer-message').value = '';
                    setTimeout(function() { statusDiv.style.display = 'none'; }, 2000);
                } else {
                    statusDiv.style.color = '#e74c3c';
                    statusDiv.innerHTML = data.error || 'Ошибка';
                }
            })
            .catch(function() {
                statusDiv.style.display = 'block';
                statusDiv.style.color = '#e74c3c';
                statusDiv.innerHTML = 'Ошибка соединения';
            })
            .finally(function() {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }
`;

const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

pages.forEach(page => {
    const filePath = path.join(pagesDir, page);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if already has our script
    if (content.includes("fetch('/api/contact'")) {
        console.log(`${page} already has script`);
        return;
    }
    
    // Find </body> and insert script before it
    const bodyEndIndex = content.lastIndexOf('</body>');
    if (bodyEndIndex > -1) {
        const newContent = content.slice(0, bodyEndIndex) + 
            '<script>' + formScript + '</script>\n' + 
            content.slice(bodyEndIndex);
        fs.writeFileSync(filePath, newContent);
        console.log(`Updated ${page}`);
    }
});

console.log('Done!');
