# Деплой format-studio.ru (Beget)

## Схема доменов

| Домен | Назначение |
|-------|------------|
| https://format-studio.ru | React-сайт (клиенты) |
| https://cms.format-studio.ru | WordPress (контент для коллеги) |
| https://admin.format-studio.ru | API заявок + админ-панель |

## WordPress (cms)

1. Плагин `wordpress/format-studio-cms` → `wp-content/plugins/`
2. Активировать в wp-admin
3. Проверка: https://cms.format-studio.ru/wp-json/format-studio/v1/content

## Основной сайт

```bash
npm run build
```

Загрузить `dist/` в public_html format-studio.ru

## Админка заявок

https://admin.format-studio.ru/admin — Node.js на Beget

## Коллега

- Контент: https://cms.format-studio.ru/wp-admin
- Заявки: https://admin.format-studio.ru/admin
