#!/usr/bin/env python3
"""
Customize Leroux templates for Century Intelligence client
"""

import os
import re
from bs4 import BeautifulSoup

OUTPUT_DIR = "/home/z/my-project/public/leroux-exact"

# Client content
CLIENT = {
    "name": "Century Intelligence",
    "tagline": "Интеллектуальный архитектор для государственного сектора",
    "phone": "+998 90 911 88 11",
    "email": "info@century.uz",
    "address": "International Business Centre, Tashkent, Uzbekistan",
    "website": "century.uz",
}

MAIN_PAGE_CONTENT = {
    "hero_title": "Интеллектуальный архитектор для государственного сектора",
    "hero_subtitle": "Международный консорциум Century Intelligence специализируется на внедрении систем искусственного интеллекта и высокотехнологичных энергетических решений.",
    "mission": "Миссия 2030: Обеспечить бесшовную интеграцию когнитивных технологий во все уровни государственного и промышленного управления.",
    "about": "Наше присутствие в Узбекистане продиктовано стремлением создать здесь региональный центр технологического превосходства. Мы не просто продаем лицензии — мы выстраиваем экосистемы, которые трансформируют экономику и обеспечивают национальную безопасность данных.",
}

SERVICES = [
    {
        "title": "Платформа ИИ-агентов",
        "description": "Мы разрабатываем интеллектуальные операционные среды, в которых ИИ-агенты выполняют роль когнитивных ассистентов для руководителей и специалистов. Платформа позволяет автоматизировать рутинные процессы сбора аналитики, подготовки отчетов и прогнозирования сценариев развития рынков.",
    },
    {
        "title": "Мониторинг критической инфраструктуры",
        "description": "Система предиктивного обслуживания объектов государственной важности. Используя датчики интернета вещей (IoT) и компьютерное зрение, ИИ в режиме реального времени оценивает состояние инфраструктуры, выявляет риски аварий и оптимизирует графики ремонтов.",
    },
    {
        "title": "Мониторинг информационной безопасности",
        "description": "Интеллектуальный SOC (Security Operations Center) нового поколения. ИИ обучается на моделях поведения злоумышленников и способен нейтрализовать киберугрозу еще на этапе подготовки атаки.",
    },
    {
        "title": "Дата-платформа и интеграция данных",
        "description": "Создание централизованных озер данных (Data Lakehouse) для министерств и крупных холдингов. Мы решаем проблему разрозненности данных, обеспечивая единый «источник истины» для всей организации.",
    },
    {
        "title": "MES / ERP / SCADA — адаптация и развитие",
        "description": "Глубокая кастомизация классических систем управления. Мы интегрируем модули искусственного интеллекта непосредственно в производственные контуры.",
    },
    {
        "title": "Вычислительные кластеры для ИИ",
        "description": "Проектирование и развертывание высокопроизводительных систем (High-Performance Computing). Мы поставляем и настраиваем инфраструктуру, обеспечивая полную локализацию мощностей.",
    },
    {
        "title": "Стратегия и консалтинг",
        "description": "Разработка дорожных карт цифровизации. Мы помогаем организациям определить приоритетные зоны внедрения ИИ и готовим персонал к работе в новой цифровой среде.",
    },
    {
        "title": "Заказные НИОКР (R&D)",
        "description": "Наукоемкие разработки под нестандартные задачи. Если на рынке нет готового решения, наш отдел R&D создаст его с нуля — от математической модели до промышленного прототипа.",
    },
    {
        "title": "Hardware-стратегия и энергообеспечение",
        "description": "Проектирование аппаратной базы и систем бесперебойного питания для ИИ. Мы создаем надежный физический фундамент, обеспечивая максимальную отказоустойчивость.",
    },
]

CLIENTS = [
    "UzGasTrade",
    "UzMedImpex", 
    "Tourism Committee",
    "Oʻzbekiston Respublikasi Ichki Ishlar Vazirligi",
    "Centrum Air",
    "Toshshaxartransxizmat",
    "Neo Insurance",
    "Klinikya",
    "Zenkargo",
    "Traxnyc",
    "ServiceTrade",
]

TEAM_COMPETENCIES = [
    "Инженеры данных (Big Data Architects): Проектирование систем обработки петабайтных массивов информации.",
    "Ученые-исследователи (AI Researchers): Разработка проприетарных алгоритмов машинного обучения.",
    "Эксперты по энергетике: Специалисты по интеграции Smart Grid и возобновляемых источников энергии.",
    "Аналитики информационной безопасности: Архитекторы систем защиты государственного уровня.",
]

def modify_html_file(filepath, modifications):
    """Apply text modifications to HTML file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            html = f.read()
        
        for old, new in modifications:
            html = html.replace(old, new)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        
        return True
    except Exception as e:
        print(f"Error modifying {filepath}: {e}")
        return False

def customize_main_page():
    """Customize main page (index.html)"""
    print("Customizing Main Page...")
    
    filepath = f"{OUTPUT_DIR}/index.html"
    
    modifications = [
        # Company name replacements
        ("Leroux", "Century Intelligence"),
        ("leroux", "century"),
        ("Leroux – Business Consulting", "Century Intelligence — ИИ Решения"),
        ("Business Consulting", "Century Intelligence"),
        ("For all your business endeavors", "Интеллектуальный архитектор будущего"),
        
        # Hero content
        ("From strategy to delivery, we are here to make sure your business succeeds", 
         "Интеллектуальный архитектор для государственного сектора и крупнейших корпораций"),
        
        ("We help our clients realize their business ideas and achieve great results",
         "Мы специализируемся на внедрении систем искусственного интеллекта и высокотехнологичных энергетических решений"),
        
        ("The best solution for your business",
         "Миссия 2030: Цифровая трансформация"),
        
        ("Connect with your clients using a variety of elements that let you tell your story",
         "Обеспечить бесшовную интеграцию когнитивных технологий во все уровни управления"),
        
        ("Refresh your brand and pave the way for new business goals and ventures",
         "Создание регионального центра технологического превосходства в Узбекистане"),
        
        ("Unique & new business tips for our clients",
         "Платформа ИИ-агентов"),
        
        ("The best way to boost your potential",
         "Мониторинг инфраструктуры"),
        
        # Contact info
        ("leroux@example.com", CLIENT["email"]),
        ("+0 123 4567 8999", CLIENT["phone"]),
        ("Old Westbury 256, New York 11201, United States", CLIENT["address"]),
        
        # Footer
        ("Make your idea into reality with Leroux", 
         "Century Intelligence — технологии для государственного сектора"),
        ("Professional & modern, a theme designed to help your business stand out from the rest.",
         "Международный консорциум, выступающий в роли интеллектуального архитектора."),
    ]
    
    # Logo replacement
    modifications.append((
        'logo-main.png',
        'century_intelligence_logo.png'
    ))
    
    modify_html_file(filepath, modifications)
    print("  ✓ Main Page updated")

def customize_services_page():
    """Customize services page"""
    print("Customizing Services Page...")
    
    filepath = f"{OUTPUT_DIR}/pages/our_services.html"
    
    modifications = [
        ("Leroux", "Century Intelligence"),
        ("Our services and more", "Наши услуги"),
        ("Our Services", "Наши услуги"),
        ("Work organization", "Платформа ИИ-агентов"),
        ("Customer support", "Мониторинг инфраструктуры"),
        ("Digital marketing", "Кибербезопасность"),
        ("Web solution", "Дата-платформа"),
        ("Market research", "MES / ERP / SCADA"),
        ("Creative process", "Вычислительные кластеры"),
        ("Innovation space", "Стратегия и консалтинг"),
        ("Development", "Заказные НИОКР"),
        ("UI/UX Design", "Hardware и энергообеспечение"),
        ("Trust the process & grow your business", "Технологии для цифровой трансформации"),
        ("Find the best plan for your needs", "Готовы начать?"),
    ]
    
    modify_html_file(filepath, modifications)
    print("  ✓ Services Page updated")

def customize_contact_page():
    """Customize contact page"""
    print("Customizing Contact Page...")
    
    filepath = f"{OUTPUT_DIR}/pages/contact_us.html"
    
    modifications = [
        ("Leroux", "Century Intelligence"),
        ("Contact Us", "Связаться с нами"),
        ("Get in touch or visit us", "Свяжитесь с нами"),
        ("leroux@example.com", CLIENT["email"]),
        ("+0 123 4567 8999", CLIENT["phone"]),
        ("Old Westbury 256, New York 11201, United States", CLIENT["address"]),
        ("Send us a message", "Отправить сообщение"),
        ("Send Message", "Отправить"),
    ]
    
    modify_html_file(filepath, modifications)
    print("  ✓ Contact Page updated")

def customize_clients_page():
    """Customize clients page"""
    print("Customizing Clients Page...")
    
    filepath = f"{OUTPUT_DIR}/pages/our_clients.html"
    
    modifications = [
        ("Leroux", "Century Intelligence"),
        ("Our Clients", "Наши клиенты"),
        ("Trusted by leading companies worldwide", "Нам доверяют ведущие организации Узбекистана"),
    ]
    
    modify_html_file(filepath, modifications)
    print("  ✓ Clients Page updated")

def customize_all_pages():
    """Apply common modifications to all pages"""
    print("\nApplying common modifications to all pages...")
    
    all_files = [f"{OUTPUT_DIR}/index.html"]
    pages_dir = f"{OUTPUT_DIR}/pages"
    
    if os.path.exists(pages_dir):
        for filename in os.listdir(pages_dir):
            if filename.endswith('.html'):
                all_files.append(f"{pages_dir}/{filename}")
    
    common_modifications = [
        # Company identity
        ("Leroux", "Century Intelligence"),
        ("leroux.qodeinteractive.com", "century.uz"),
        
        # Contact info in all pages
        ("leroux@example.com", CLIENT["email"]),
        ("+0 123 4567 8999", CLIENT["phone"]),
        ("[email protected]", CLIENT["email"]),
        
        # Logo
        ('logo-main.png', 'century_intelligence_logo.png'),
        ('logo-footer.png', 'century_intelligence_logo.png'),
        ('logo-dark-skin.png', 'century_intelligence_logo.png'),
    ]
    
    for filepath in all_files:
        modify_html_file(filepath, common_modifications)
    
    print(f"  ✓ Updated {len(all_files)} files")

def main():
    print("="*60)
    print("CUSTOMIZING LEROUX FOR CENTURY INTELLIGENCE")
    print("="*60)
    
    customize_main_page()
    customize_services_page()
    customize_contact_page()
    customize_clients_page()
    customize_all_pages()
    
    print("\n" + "="*60)
    print("CUSTOMIZATION COMPLETE!")
    print("="*60)
    print(f"\nCompany: {CLIENT['name']}")
    print(f"Phone: {CLIENT['phone']}")
    print(f"Email: {CLIENT['email']}")
    print(f"Services: {len(SERVICES)}")
    print(f"Clients: {len(CLIENTS)}")

if __name__ == '__main__':
    main()
