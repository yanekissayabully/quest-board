export type Status = "Доступен" | "В процессе" | "Завершён" | "Провален";

export type Difficulty = "Лёгкий" | "Средний" | "Сложный" | "Легендарный";

export type QuestType = "Бот" | "Сайт" | "CRM" | "Интеграция";

export interface Quest {
  id: number;
  title: string;
  type: QuestType;
  difficulty: Difficulty;
  status: Status;
  reward: number;
  resetToken: number;
}

export type NewQuestInput = {
  title: string;
  type: QuestType;
  difficulty: Difficulty;
  reward: number;
};
