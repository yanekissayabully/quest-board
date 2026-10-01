# Quest Board

React/Next.js дашборд для практики rendering и state: добавление/удаление элементов,
смена статуса, собственный local state у каждой карточки, фильтрация, реверс списка,
намеренный сброс local state через keys.

Тема: рабочие проекты (боты, сайты, CRM, интеграции) в виде квестов — сложность, тип,
статус, награда.

**Live:** https://yanekissayabully.github.io/quest-board/

## Стек

- Next.js (App Router, `output: "export"` — статический экспорт)
- TypeScript (`.tsx`/`.ts`, строгая типизация пропсов и state)
- Чистый CSS (CSS Modules), без UI-библиотек
- Только `useState` — без Redux/Context/useEffect
- Деплой через GitHub Actions → GitHub Pages

## Структура

- `app/types.ts` — типы `Quest`, `Status`, `Difficulty`, `QuestType`
- `app/constants.ts` — списки статусов/сложностей/типов + цвета
- `app/components/Dashboard.tsx` — весь state верхнего уровня (список квестов, фильтр,
  реверс, debug-режим ключей)
- `app/components/AddQuestForm.tsx` — форма добавления, свой local state на поля
- `app/components/FilterBar.tsx` — фильтр по статусу, реверс, чекбокс debug-режима
- `app/components/QuestList.tsx` — рендер списка, пустое состояние
- `app/components/QuestCard.tsx` — своя local state на карточку: XP, заметки,
  развёрнуто/свёрнуто

## Фишка для защиты — демо бага с keys

Чекбокс **"🐛 key = index"** переключает стратегию `key` у карточек:

- `key={quest.id}` (по умолчанию) — local state каждой карточки корректно сохраняется
  при фильтрации/реверсе списка.
- `key={index}` (баг-режим) — после реверса позиция карточки сохраняет **старый** local
  state, но показывает **другие** данные — наглядно видно, почему React matching по
  позиции, а не по данным, ломает state.

## Запуск локально

```bash
npm install
npm run dev
```

Откроется на `http://localhost:3000/quest-board/` (basePath настроен под GitHub Pages).

## Сборка

```bash
npm run build
```

Статика собирается в `out/` — её публикует GitHub Actions на каждый пуш в `main`.
