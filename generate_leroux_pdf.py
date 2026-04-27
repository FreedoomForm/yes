#!/usr/bin/env python3
"""
Generate PDF catalog of all Leroux Business Consulting Template pages
"""

import os
import sys

# Setup paths
PDF_SKILL_DIR = "/home/z/my-project/skills/pdf"
sys.path.insert(0, os.path.join(PDF_SKILL_DIR, "scripts"))

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle,
    PageBreak, KeepTogether
)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily

# Register fonts
pdfmetrics.registerFont(TTFont('LiberationSerif', '/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf'))
pdfmetrics.registerFont(TTFont('LiberationSerif-Bold', '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf'))
pdfmetrics.registerFont(TTFont('NotoSerifSC', '/usr/share/fonts/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))

registerFontFamily('LiberationSerif', normal='LiberationSerif', bold='LiberationSerif-Bold')
registerFontFamily('NotoSerifSC', normal='NotoSerifSC', bold='NotoSerifSC')

# Colors
PRIMARY = colors.HexColor('#1a365d')
SECONDARY = colors.HexColor('#2c5282')
ACCENT = colors.HexColor('#3182ce')
TEXT_DARK = colors.HexColor('#1a202c')
TEXT_MUTED = colors.HexColor('#718096')
BG_LIGHT = colors.HexColor('#f7fafc')
BG_SURFACE = colors.HexColor('#edf2f7')

# Page setup
PAGE_WIDTH, PAGE_HEIGHT = A4
MARGIN = 1 * inch
CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN

# Image directory
IMG_DIR = "/home/z/my-project/download/leroux_templates"

# All pages data
PAGES = {
    "Homepage Templates": [
        {"num": "01", "name": "Main Home", "url": "https://leroux.qodeinteractive.com/", "desc": "Главная страница с полным набором секций: герой-баннер, услуги, команда, блог"},
        {"num": "02", "name": "Business Home", "url": "https://leroux.qodeinteractive.com/business-home/", "desc": "Бизнес-ориентированная главная с акцентом на услуги и статистику"},
        {"num": "03", "name": "Seminar Home", "url": "https://leroux.qodeinteractive.com/seminar-home/", "desc": "Главная для семинаров и мероприятий с расписанием"},
        {"num": "04", "name": "App Showcase", "url": "https://leroux.qodeinteractive.com/app-showcase/", "desc": "Демонстрация мобильного приложения с скриншотами"},
        {"num": "05", "name": "Advisory Home", "url": "https://leroux.qodeinteractive.com/advisory-home/", "desc": "Главная для консалтинговых и консультационных услуг"},
        {"num": "06", "name": "Interactive Banners", "url": "https://leroux.qodeinteractive.com/interactive-banners/", "desc": "Интерактивные баннеры с анимацией и hover-эффектами"},
        {"num": "07", "name": "Business Strategy", "url": "https://leroux.qodeinteractive.com/business-strategy/", "desc": "Стратегический план развития бизнеса"},
        {"num": "08", "name": "Fullscreen Slider", "url": "https://leroux.qodeinteractive.com/fullscreen-slider/", "desc": "Полноэкранный слайдер с навигацией"},
        {"num": "09", "name": "Coming Soon", "url": "https://leroux.qodeinteractive.com/coming-soon/", "desc": "Страница 'Скоро открытие' с таймером обратного отсчёта"},
        {"num": "10", "name": "Landing", "url": "https://leroux.qodeinteractive.com/landing/", "desc": "Посадочная страница со всеми демонстрациями шаблона"},
    ],
    "About Pages": [
        {"num": "11", "name": "About Us", "url": "https://leroux.qodeinteractive.com/about-us/", "desc": "Страница 'О компании' с командой и историей"},
        {"num": "12", "name": "About Me", "url": "https://leroux.qodeinteractive.com/about-me/", "desc": "Персональная страница специалиста/консультанта"},
    ],
    "Service Pages": [
        {"num": "13", "name": "Our Services", "url": "https://leroux.qodeinteractive.com/our-services/", "desc": "Каталог услуг с описаниями и иконками"},
        {"num": "14", "name": "Our Process", "url": "https://leroux.qodeinteractive.com/our-process/", "desc": "Описание рабочего процесса с этапами"},
        {"num": "15", "name": "Our Clients", "url": "https://leroux.qodeinteractive.com/our-clients/", "desc": "Список клиентов и партнёров с логотипами"},
        {"num": "16", "name": "Pricing Plans", "url": "https://leroux.qodeinteractive.com/pricing-plans/", "desc": "Таблица тарифных планов и цен"},
    ],
    "Contact Pages": [
        {"num": "17", "name": "Contact Us", "url": "https://leroux.qodeinteractive.com/contact-us/", "desc": "Страница контактов с формой и картой"},
        {"num": "18", "name": "Get In Touch", "url": "https://leroux.qodeinteractive.com/get-in-touch/", "desc": "Форма связи с контактной информацией"},
        {"num": "19", "name": "Drop Us A Note", "url": "https://leroux.qodeinteractive.com/drop-us-a-note/", "desc": "Простая форма обратной связи"},
    ],
    "Utility Pages": [
        {"num": "20", "name": "FAQ Page", "url": "https://leroux.qodeinteractive.com/faq-page/", "desc": "Страница часто задаваемых вопросов с аккордеоном"},
        {"num": "21", "name": "404 Error Page", "url": "https://leroux.qodeinteractive.com/404-error-page", "desc": "Страница ошибки 404 с навигацией"},
    ],
    "Portfolio Pages": [
        {"num": "22", "name": "Portfolio Standard List", "url": "https://leroux.qodeinteractive.com/portfolio/standard-list/", "desc": "Стандартный список портфолио проектов"},
        {"num": "23", "name": "Portfolio Gallery List", "url": "https://leroux.qodeinteractive.com/portfolio/gallery-list/", "desc": "Галерея проектов с фильтрацией"},
    ],
    "Blog Pages": [
        {"num": "24", "name": "Blog Right Sidebar", "url": "https://leroux.qodeinteractive.com/blog/right-sidebar/", "desc": "Блог с боковой панелью справа"},
        {"num": "25", "name": "Blog Left Sidebar", "url": "https://leroux.qodeinteractive.com/blog/left-sidebar/", "desc": "Блог с боковой панелью слева"},
        {"num": "26", "name": "Blog No Sidebar", "url": "https://leroux.qodeinteractive.com/blog/no-sidebar/", "desc": "Блог без боковой панели, полная ширина"},
    ],
    "Shop Pages": [
        {"num": "27", "name": "Shop Product List", "url": "https://leroux.qodeinteractive.com/shop/", "desc": "Каталог товаров интернет-магазина"},
        {"num": "28", "name": "Product Single", "url": "https://leroux.qodeinteractive.com/product/headphones/", "desc": "Страница отдельного товара с описанием"},
    ],
}

def create_styles():
    """Create document styles"""
    styles = getSampleStyleSheet()
    
    # Title style
    styles.add(ParagraphStyle(
        name='DocTitle',
        fontName='LiberationSerif-Bold',
        fontSize=28,
        leading=34,
        alignment=TA_CENTER,
        textColor=PRIMARY,
        spaceAfter=20
    ))
    
    # Subtitle style
    styles.add(ParagraphStyle(
        name='DocSubtitle',
        fontName='LiberationSerif',
        fontSize=14,
        leading=18,
        alignment=TA_CENTER,
        textColor=TEXT_MUTED,
        spaceAfter=30
    ))
    
    # Section header
    styles.add(ParagraphStyle(
        name='SectionHeader',
        fontName='LiberationSerif-Bold',
        fontSize=18,
        leading=22,
        alignment=TA_LEFT,
        textColor=PRIMARY,
        spaceBefore=20,
        spaceAfter=12
    ))
    
    # Page name
    styles.add(ParagraphStyle(
        name='PageName',
        fontName='LiberationSerif-Bold',
        fontSize=12,
        leading=15,
        alignment=TA_LEFT,
        textColor=TEXT_DARK,
        spaceBefore=6,
        spaceAfter=3
    ))
    
    # Page URL
    styles.add(ParagraphStyle(
        name='PageURL',
        fontName='DejaVuSans',
        fontSize=9,
        leading=11,
        alignment=TA_LEFT,
        textColor=ACCENT,
        spaceAfter=3
    ))
    
    # Page description
    styles.add(ParagraphStyle(
        name='PageDesc',
        fontName='LiberationSerif',
        fontSize=10,
        leading=13,
        alignment=TA_LEFT,
        textColor=TEXT_MUTED,
        spaceAfter=10
    ))
    
    return styles

def create_cover_page(story, styles):
    """Create cover page"""
    story.append(Spacer(1, 2*inch))
    
    story.append(Paragraph("Leroux", styles['DocTitle']))
    story.append(Paragraph("Business Consulting WordPress Theme", styles['DocSubtitle']))
    story.append(Spacer(1, 0.5*inch))
    
    # Info box
    info_data = [
        ["ThemeForest ID:", "45918998"],
        ["Developer:", "Qode Interactive"],
        ["Category:", "Business / Consulting / Corporate"],
        ["Total Pages:", "28"],
        ["Demo URL:", "leroux.qodeinteractive.com"],
    ]
    
    info_table = Table(info_data, colWidths=[2*inch, 4*inch])
    info_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (0, -1), 'LiberationSerif'),
        ('FONTNAME', (1, 0), (1, -1), 'LiberationSerif'),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('TEXTCOLOR', (0, 0), (0, -1), TEXT_MUTED),
        ('TEXTCOLOR', (1, 0), (1, -1), TEXT_DARK),
        ('ALIGN', (0, 0), (0, -1), 'RIGHT'),
        ('ALIGN', (1, 0), (1, -1), 'LEFT'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(info_table)
    
    story.append(Spacer(1, 1*inch))
    
    # Features list
    story.append(Paragraph("<b>Key Features:</b>", ParagraphStyle(
        name='FeatureHeader',
        fontName='LiberationSerif-Bold',
        fontSize=12,
        leading=16,
        textColor=PRIMARY,
        spaceAfter=10
    )))
    
    features = [
        "8 Homepage layouts",
        "50+ Custom shortcodes",
        "Elementor Page Builder compatible",
        "WooCommerce ready",
        "1-click demo import",
        "Responsive & SEO optimized",
        "Premium images included",
    ]
    
    for feat in features:
        story.append(Paragraph(f"• {feat}", ParagraphStyle(
            name='FeatureItem',
            fontName='LiberationSerif',
            fontSize=10,
            leading=14,
            textColor=TEXT_DARK,
            leftIndent=20
        )))
    
    story.append(PageBreak())

def add_page_entry(story, styles, page_info):
    """Add a page entry with screenshot"""
    img_path = os.path.join(IMG_DIR, f"{page_info['num']}_{page_info['name'].lower().replace(' ', '_')}.png")
    
    # Check if image exists
    if not os.path.exists(img_path):
        # Try alternative naming
        alt_names = [
            f"{page_info['num']}_{page_info['name'].lower().replace(' ', '_')}.png",
            f"{page_info['name'].lower().replace(' ', '_')}.png",
        ]
        for alt in alt_names:
            alt_path = os.path.join(IMG_DIR, alt)
            if os.path.exists(alt_path):
                img_path = alt_path
                break
    
    elements = []
    
    # Page number and name
    elements.append(Paragraph(
        f"<b>{page_info['num']}. {page_info['name']}</b>",
        styles['PageName']
    ))
    
    # URL
    elements.append(Paragraph(page_info['url'], styles['PageURL']))
    
    # Description
    elements.append(Paragraph(page_info['desc'], styles['PageDesc']))
    
    # Image
    if os.path.exists(img_path):
        try:
            # Calculate image size to fit page width
            img = Image(img_path)
            img_width = CONTENT_WIDTH
            img.hAlign = 'CENTER'
            img.drawWidth = img_width
            img.drawHeight = img_width * 0.6  # Approximate aspect ratio
            elements.append(img)
        except Exception as e:
            elements.append(Paragraph(f"[Image error: {e}]", styles['PageDesc']))
    else:
        elements.append(Paragraph(f"[Screenshot not found: {img_path}]", styles['PageDesc']))
    
    elements.append(Spacer(1, 15))
    
    return elements

def create_section(story, styles, section_name, pages):
    """Create a section with multiple pages"""
    story.append(Paragraph(section_name, styles['SectionHeader']))
    story.append(Spacer(1, 10))
    
    for page in pages:
        elements = add_page_entry(story, styles, page)
        story.extend(elements)

def main():
    """Generate the PDF catalog"""
    output_path = "/home/z/my-project/download/Leroux_Template_Catalog.pdf"
    
    # Create document
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN,
        bottomMargin=MARGIN
    )
    
    styles = create_styles()
    story = []
    
    # Cover page
    create_cover_page(story, styles)
    
    # Table of contents
    story.append(Paragraph("<b>Contents</b>", styles['SectionHeader']))
    story.append(Spacer(1, 10))
    
    toc_data = []
    page_num = 3
    for section_name, pages in PAGES.items():
        toc_data.append([section_name, f"{len(pages)} pages"])
    
    toc_table = Table(toc_data, colWidths=[4*inch, 2*inch])
    toc_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), 'LiberationSerif'),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('TEXTCOLOR', (0, 0), (0, -1), TEXT_DARK),
        ('TEXTCOLOR', (1, 0), (1, -1), TEXT_MUTED),
        ('ALIGN', (0, 0), (0, -1), 'LEFT'),
        ('ALIGN', (1, 0), (1, -1), 'RIGHT'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('LINEBELOW', (0, 0), (-1, -1), 0.5, BG_SURFACE),
    ]))
    story.append(toc_table)
    story.append(PageBreak())
    
    # Add all sections
    for section_name, pages in PAGES.items():
        create_section(story, styles, section_name, pages)
    
    # Build PDF
    doc.build(story)
    print(f"PDF created: {output_path}")
    return output_path

if __name__ == "__main__":
    main()
