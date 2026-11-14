NAVI CS2 — АВТОМАТИЧНЕ ОНОВЛЕННЯ НОВИН
======================================

ЩО ЦЕ РОБИТЬ
- Сайт показує новини NAVI CS2 з файлу news.json.
- GitHub Actions щодня запускає scripts/update_news.py.
- Скрипт читає офіційну сторінку NAVI CS2:
  https://navi.gg/en/publications/game/cs2
- Якщо знайдено нові публікації, GitHub автоматично оновлює news.json.
- Також можна запустити оновлення вручну через GitHub Actions → Run workflow.

ВАЖЛИВО
Це неофіційний фан-концепт, не пов'язаний із NAVI. Новини беруться з відкритої
офіційної сторінки NAVI. Сайт не є офіційним ресурсом клубу.

ЯК ОПУБЛІКУВАТИ НА GITHUB PAGES
1. Увійди на https://github.com/ або створи безкоштовний акаунт.
2. Натисни + → New repository.
3. Назва: navi-cs2-fan-site. Вибери Public і натисни Create repository.
4. На сторінці репозиторію натисни Add file → Upload files.
5. Розпакуй ZIP на комп'ютері та перетягни ВСІ файли й папки з нього
   (включно з .github та scripts) у вікно GitHub.
   Якщо папку .github не видно у Провіднику, увімкни View → Show → Hidden items.
6. Унизу натисни Commit changes.
7. Відкрий Settings → Pages.
8. У Build and deployment вибери Deploy from a branch.
9. Branch: main, folder: / (root), натисни Save.
10. Зачекай 1–3 хвилини. GitHub покаже адресу твого сайту у Settings → Pages.
11. Відкрий вкладку Actions. Якщо GitHub попросить дозволити workflow, натисни
    Enable workflow. Далі перевір Update NAVI CS2 news → Run workflow.
12. Відкрий сайт за адресою GitHub Pages. Новини мають завантажуватися з news.json.

ЯК ПЕРЕВІРИТИ АВТООНОВЛЕННЯ
- Репозиторій → Actions → Update NAVI CS2 news.
- Запуск вручну: Run workflow.
- Якщо новини змінилися, workflow збереже новий news.json окремим commit.
- Якщо нових публікацій немає або NAVI змінили структуру сайту, файл не буде
  перезаписаний порожнім результатом; старі новини залишаться.

РОЗКЛАД
Автоматичний запуск: 10:17 UTC щодня (12:17 взимку / 13:17 влітку за Києвом).
GitHub Actions може запускати scheduled workflows із затримкою.

ФАЙЛИ
index.html — сторінка сайту
style.css — дизайн
script.js — показ новин і мобільне меню
news.json — дані новин, які оновлюються автоматично
scripts/update_news.py — збір новин з офіційної сторінки NAVI CS2
requirements.txt — Python-залежності
.github/workflows/update-news.yml — щоденний запуск GitHub Actions

ПРИМІТКА ПРО ДЖЕРЕЛО
Офіційна сторінка NAVI CS2 може змінити HTML-структуру або обмежити запити.
Якщо це станеться, GitHub Actions покаже помилку, а попередній news.json збережеться.
Цей механізм не гарантує, що кожен пост у соцмережах потрапить на сайт: він
відстежує публікації на офіційній сторінці NAVI CS2.
