import type { Status, Difficulty, QuestType } from "./types";

export const STATUSES: Status[] = ["Доступен", "В процессе", "Завершён", "Провален"];

export const DIFFICULTIES: Difficulty[] = ["Лёгкий", "Средний", "Сложный", "Легендарный"];

export const TYPES: QuestType[] = ["Бот", "Сайт", "CRM", "Интеграция"];

export const STATUS_COLORS: Record<Status, string> = {
  "Доступен": "var(--status-available)",
  "В процессе": "var(--status-progress)",
  "Завершён": "var(--status-done)",
  "Провален": "var(--status-failed)",
};

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  "Лёгкий": "var(--diff-easy)",
  "Средний": "var(--diff-medium)",
  "Сложный": "var(--diff-hard)",
  "Легендарный": "var(--diff-legendary)",
};
