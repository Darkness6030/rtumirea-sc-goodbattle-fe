# Good Battle — Frontend

## Команды

- `pnpm dev` — dev-сервер
- `pnpm build` — production-сборка (typecheck + vite build)
- `pnpm typecheck` — проверка типов
- `pnpm lint` — линтинг (ESLint)
- `pnpm format` — форматирование (Prettier)
- `pnpm dlx shadcn@latest add <name>` — добавить UI-компонент
- После написания кода вызывай `pnpm lint --fix` и `pnpm format` для автоформатирования

## Код-стайл

### Форматирование (Prettier)

- Без точек с запятой (`semi: false`)
- Одинарные кавычки (`singleQuote: true`)
- Trailing commas везде (`trailingComma: "all"`)
- Ширина строки — 80 символов
- Сортировка Tailwind-классов через `prettier-plugin-tailwindcss`

### Линтинг (ESLint)

- **perfectionist** — автосортировка импортов, пропсов, объектов в естественном порядке (a-z)
- **react-hooks** — правила хуков
- **react-refresh** — проверка совместимости с HMR (отключено для `src/routes/`)
- **typescript-eslint** — строгие TS-правила

### TypeScript

- Strict mode включён
- `noUnusedLocals`, `noUnusedParameters` — неиспользуемые переменные запрещены
- `verbatimModuleSyntax` — явные `type`-импорты обязательны
- Алиас `@/*` → `src/*`

### Соглашения

- **Компоненты** — именованные экспорты (`export { Button }`), не default
- **Роуты** — единственное исключение, используют `export const Route`
- **SVG** — импорт как React-компоненты через `?react` суффикс (`import Logo from '@/assets/logo.svg?react'`)
- **UI-компоненты** — добавлять через `pnpm dlx shadcn@latest add <name>`, не писать вручную
- **Стили** — только Tailwind-классы, избегать кастомного CSS
- **JSX-пропсы** — сортировка по алфавиту (enforced ESLint perfectionist)
- **Импорты** — сортировка по алфавиту, сначала внешние, потом `@/` (enforced ESLint perfectionist)

## Структура

- `src/routes/` — файловый роутинг TanStack Router (routeTree.gen.ts — автогенерация Vite-плагином при `pnpm dev`)
- `src/routes/_main.tsx` — pathless layout route (лого слева + Outlet справа), общий для `/`, `/login`, `/register`
- `src/components/ui/` — shadcn-компоненты + кастомные (Typography), barrel export через `index.ts`
- `src/lib/utils.ts` — утилита `cn()` для classNames
- Алиас `@/*` → `src/*`
- Мобильная версия — заглушка в `__root.tsx`, десктоп-only (breakpoint lg/1024px)
- `src/components/battle/` — компоненты баттла, состояние через `BattleContext` (`battle-context.tsx`)
- `src/lib/battle-mock.ts` — моковые данные и типы баттла (роль переключается константой `CURRENT_ROLE`)
