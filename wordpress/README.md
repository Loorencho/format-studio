# WordPress — headless CMS для «Студия Формат»

## Установка

1. Скопируйте `format-studio-cms` в `wp-content/plugins/`
2. Активируйте плагин **Format Studio CMS**
3. Редактируйте контент в меню **Format Studio**, **Услуги**, **Проекты**

## API

```
GET /wp-json/format-studio/v1/content
```

## Подключение React

```env
VITE_WP_API_URL=https://ваш-сайт.ru/wp-json
```

Перезапустите `npm run dev`. Без WordPress сайт работает на встроенных текстах.

Заявки с формы — по-прежнему в Node.js API (`/admin`).
