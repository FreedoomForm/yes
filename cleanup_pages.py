#!/usr/bin/env python3
"""
Cleanup script for Century Intelligence website
Removes all UI elements not in the provided content
"""

import re
import os

# Content that should remain on each page
CONTENT_INDEX = """
Century Intelligence — международный консорциум, выступающий в роли
интеллектуального архитектора для государственного сектора и крупнейших
частных корпораций. Мы специализируемся на внедрении систем искусственного
интеллекта и высокотехнологичных энергетических решений.
Наше присутствие в Узбекистане продиктовано стремлением создать здесь региональный центр
технологического превосходства. Мы не просто продаем лицензии — мы выстраиваем
экосистемы, которые трансформируют экономику и обеспечивают национальную безопасность
данных.
Миссия 2030: Обеспечить бесшовную интеграцию когнитивных технологий во все уровни
государственного и промышленного управления, способствуя переходу к экономике знаний и
данных.

Ключевой актив Century Intelligence — это распределенная сеть экспертов высшей категории. Мы
объединили специалистов, имеющих опыт работы в крупнейших технологических корпорациях
США, Западной Европы и Восточной Азии.
Наши компетенции:
Инженеры данных (Big Data Architects): Проектирование систем обработки
петабайтных массивов информации.
Ученые-исследователи (AI Researchers): Разработка проприетарных алгоритмов
машинного обучения.
Эксперты по энергетике: Специалисты по интеграции Smart Grid и возобновляемых
источников энергии.
Аналитики информационной безопасности: Архитекторы систем защиты государственного уровня.

Такой подход позволяет нам осуществлять трансфер самых передовых мировых технологий,
адаптируя их под специфические нужды и правовую среду Узбекистана.
"""

CONTENT_SERVICES = """
3.1. Платформа ИИ-агентов
Мы разрабатываем интеллектуальные операционные среды, в которых ИИ-агенты выполняют
роль когнитивных ассистентов для руководителей и специалистов. Платформа позволяет
автоматизировать рутинные процессы сбора аналитики, подготовки отчетов и прогнозирования
сценариев развития рынков.
3.2. Мониторинг критической инфраструктуры
Система предиктивного обслуживания объектов государственной важности. Используя датчики
интернета вещей (IoT) и компьютерное зрение, ИИ в режиме реального времени оценивает
состояние инфраструктуры, выявляет риски аварий и оптимизирует графики ремонтов, экономя
миллиарды бюджетных средств.
3.3. Мониторинг информационной безопасности
Интеллектуальный SOC (Security Operations Center) нового поколения. В отличие от стандартных
антивирусных систем, наш ИИ обучается на моделях поведения злоумышленников и способен
нейтрализовать киберугрозу еще на этапе подготовки атаки (превентивная защита).
3.4. Дата-платформа и интеграция данных
Создание централизованных озер данных (Data Lakehouse) для министерств и крупных
холдингов. Мы решаем проблему разрозненности данных, обеспечивая единый «источник
истины» для всей организации.
3.5. MES / ERP / SCADA — адаптация и развитие
Глубокая кастомизация классических систем управления. Мы интегрируем модули
искусственного интеллекта непосредственно в производственные контуры, позволяя системе
самостоятельно корректировать рабочие процессы на основе входящих данных.
3.6. Вычислительные кластеры для ИИ
Проектирование и развертывание высокопроизводительных систем (High-Performance
Computing). Мы поставляем и настраиваем инфраструктуру, необходимую для работы тяжелых
нейросетевых моделей, обеспечивая при этом полную локализацию мощностей.
3.7. Стратегия и консалтинг
Разработка дорожных карт цифровизации. Мы помогаем организациям определить приоритетные
зоны внедрения ИИ, оцениваем экономический эффект и готовим персонал к работе в новой
цифровой среде.
3.8. Заказные НИОКР (R&D)
Наукоемкие разработки под нестандартные задачи. Если на рынке нет готового решения, наш
отдел R&D создаст его с нуля — от математической модели до промышленного прототипа.
3.9. Hardware-стратегия и энергообеспечение
Проектирование аппаратной базы и систем бесперебойного питания для ИИ. Мы создаем надежный физический фундамент, включая поставку оборудования и оптимизацию систем охлаждения, обеспечивая максимальную отказоустойчивость и энергоэффективность инфраструктуры заказчика.
"""

CONTENT_CONTACT = """
+998 90 911 88 11
"""

CONTENT_CLIENTS = """
UzGasTrade, UzMedImpex, Tourism Committee, Oʻzbekiston Respublikasi Ichki Ishlar Vazirligi, Centrum Air, Toshshaxartransxizmat, Neo Insurance, Klinikya, Zenkargo, Traxnyc, ServiceTrade
"""

def remove_sidebar_menu_items(content):
    """Remove sidebar-related menu items"""
    # Remove left/right/no sidebar menu items
    patterns = [
        r'<li class="menu-item[^"]*"><a href="#right-sidebar/"><span class="qodef-menu-item-text">[^<]*</span></a></li>',
        r'<li class="menu-item[^"]*"><a href="#left-sidebar/"><span class="qodef-menu-item-text">[^<]*</span></a></li>',
        r'<li class="menu-item[^"]*"><a href="#no-sidebar/"><span class="qodef-menu-item-text">[^<]*</span></a></li>',
        r'<li class="menu-item[^"]*menu-item-5665[^"]*">.*?</li>',
        r'<li class="menu-item[^"]*menu-item-5664[^"]*">.*?</li>',
        r'<li class="menu-item[^"]*menu-item-5663[^"]*">.*?</li>',
    ]
    for pattern in patterns:
        content = re.sub(pattern, '', content, flags=re.DOTALL)
    return content

def remove_social_links(content):
    """Remove LinkedIn and Facebook social media links"""
    # Remove social media widgets/links
    patterns = [
        r'<a[^>]*href="[^"]*linkedin[^"]*"[^>]*>.*?</a>',
        r'<a[^>]*href="[^"]*facebook[^"]*"[^>]*>.*?</a>',
        r'<a[^>]*class="[^"]*linkedin[^"]*"[^>]*>.*?</a>',
        r'<a[^>]*class="[^"]*facebook[^"]*"[^>]*>.*?</a>',
        r'<span[^>]*class="[^"]*social[^"]*linkedin[^"]*"[^>]*>.*?</span>',
        r'<span[^>]*class="[^"]*social[^"]*facebook[^"]*"[^>]*>.*?</span>',
        r'<div[^>]*class="[^"]*qodef-social[^"]*"[^>]*>.*?</div>',
        r'<span[^>]*class="[^"]*fab fa-linkedin[^"]*"[^>]*>.*?</span>',
        r'<span[^>]*class="[^"]*fab fa-facebook[^"]*"[^>]*>.*?</span>',
        r'<i[^>]*class="[^"]*fa-linkedin[^"]*"[^>]*>.*?</i>',
        r'<i[^>]*class="[^"]*fa-facebook[^"]*"[^>]*>.*?</i>',
    ]
    for pattern in patterns:
        content = re.sub(pattern, '', content, flags=re.DOTALL | re.IGNORECASE)
    return content

def remove_read_more_buttons(content):
    """Remove 'читать дальше' buttons"""
    patterns = [
        r'<a[^>]*class="[^"]*"[^>]*>читать дальше</a>',
        r'<a[^>]*class="[^"]*"[^>]*>Читать дальше</a>',
        r'<a[^>]*>читать дальше</a>',
        r'<a[^>]*>Читать дальше</a>',
        r'<button[^>]*>читать дальше</button>',
        r'<button[^>]*>Читать дальше</button>',
    ]
    for pattern in patterns:
        content = re.sub(pattern, '', content, flags=re.IGNORECASE)
    return content

def remove_twitter_references(content):
    """Remove Twitter references"""
    patterns = [
        r'<a[^>]*href="[^"]*twitter[^"]*"[^>]*>.*?</a>',
        r'<span[^>]*class="[^"]*twitter[^"]*"[^>]*>.*?</span>',
        r'<i[^>]*class="[^"]*fa-twitter[^"]*"[^>]*>.*?</i>',
    ]
    for pattern in patterns:
        content = re.sub(pattern, '', content, flags=re.DOTALL | re.IGNORECASE)
    return content

def clean_file(filepath):
    """Apply all cleanup operations to a file"""
    print(f"Cleaning: {filepath}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_size = len(content)
    
    # Apply all cleanup functions
    content = remove_sidebar_menu_items(content)
    content = remove_social_links(content)
    content = remove_read_more_buttons(content)
    content = remove_twitter_references(content)
    
    new_size = len(content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  Original: {original_size} bytes")
    print(f"  New: {new_size} bytes")
    print(f"  Removed: {original_size - new_size} bytes")

def main():
    base_path = "/home/z/my-project/public/leroux-exact"
    
    files_to_clean = [
        os.path.join(base_path, "index.html"),
        os.path.join(base_path, "pages", "our_services.html"),
        os.path.join(base_path, "pages", "contact_us.html"),
        os.path.join(base_path, "pages", "our_clients.html"),
    ]
    
    for filepath in files_to_clean:
        if os.path.exists(filepath):
            clean_file(filepath)
        else:
            print(f"File not found: {filepath}")
    
    print("\nCleanup complete!")

if __name__ == "__main__":
    main()
