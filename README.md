# react-ecosistem

Учебный production-проект на React: сборка приложения по **Feature-Sliced Design** с полным
обвесом — роутинг, стор, интернационализация, темы, тесты и визуальная регрессия.

Репозиторий сделан как практика архитектуры и инструментов, а не как продукт.

## Стек

`React 18` · `TypeScript` · `Redux Toolkit` · `React Router 6` · `i18next` · `PrimeReact` ·
`Emotion` / `styled-components` · `axios`

Сборка настроена дважды: основная на **Webpack**, альтернативная на **Vite** — чтобы сравнить
конфигурации и скорость на одном и том же коде.

## Архитектура

Слои FSD: `app` · `pages` · `widgets` · `features` · `entities` · `shared`.

- **entities** — `User`, `Fields`, `CheckboxTree`, `AppVersionModal`, `ChangeRoleModal`,
  `SettingsSelectRoleAndLanguage`
- **features** — `AuthByUser`, `ThemeSwitcher`, `SettingsModal`, `SearchRole`, `SearchFavorite`,
  `FilterItems`

## Запуск

```bash
npm run i          # установка (--force: часть пакетов конфликтует по peer-зависимостям)
npm run dev        # webpack-dev-server на :9797
npm run start:vite # то же самое через Vite
```

Сборка: `npm run build:dev` / `npm run build:prod`.

## Качество

```bash
npm run lint:ts        # ESLint, с :fix — автоправка
npm run lint:css       # Stylelint по SCSS
npm run test:unit      # Jest
npm run storybook      # Storybook на :6006
npm run test:ui:report # визуальная регрессия по стори + HTML-отчёт
```

Хуки pre-commit через husky.
