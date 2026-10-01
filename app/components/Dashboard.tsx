"use client";

import { useState } from "react";
import AddQuestForm from "./AddQuestForm";
import FilterBar from "./FilterBar";
import QuestList from "./QuestList";
import type { Quest, NewQuestInput, Status } from "../types";
import styles from "./Dashboard.module.css";

const initialQuests: Quest[] = [
  {
    id: 1,
    title: "Собрать Telegram-бота для кофейни",
    type: "Бот",
    difficulty: "Средний",
    status: "В процессе",
    reward: 80000,
    resetToken: 0,
  },
  {
    id: 2,
    title: "Лендинг для стоматологии",
    type: "Сайт",
    difficulty: "Лёгкий",
    status: "Доступен",
    reward: 60000,
    resetToken: 0,
  },
  {
    id: 3,
    title: "Настроить amoCRM под отдел продаж",
    type: "CRM",
    difficulty: "Сложный",
    status: "Доступен",
    reward: 150000,
    resetToken: 0,
  },
  {
    id: 4,
    title: "Интеграция сайта с 1С и складом",
    type: "Интеграция",
    difficulty: "Легендарный",
    status: "Завершён",
    reward: 300000,
    resetToken: 0,
  },
  {
    id: 5,
    title: "Бот-рассыльщик для рассылки акций",
    type: "Бот",
    difficulty: "Лёгкий",
    status: "Провален",
    reward: 40000,
    resetToken: 0,
  },
];

let nextId = initialQuests.length + 1;

function Dashboard() {
  console.log("render: Dashboard");

  const [quests, setQuests] = useState<Quest[]>(initialQuests);
  const [filterStatus, setFilterStatus] = useState<Status | "Все">("Все");
  const [reversed, setReversed] = useState(false);
  const [debugIndexKey, setDebugIndexKey] = useState(false);

  function addQuest(newQuest: NewQuestInput) {
    setQuests((prev) => [
      ...prev,
      { ...newQuest, id: nextId++, status: "Доступен", resetToken: 0 },
    ]);
  }

  function removeQuest(id: number) {
    setQuests((prev) => prev.filter((q) => q.id !== id));
  }

  function changeStatus(id: number, status: Status) {
    setQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status } : q))
    );
  }

  function resetQuestLocal(id: number) {
    setQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, resetToken: q.resetToken + 1 } : q))
    );
  }

  let visibleQuests = [...quests];
  if (filterStatus !== "Все") {
    visibleQuests = visibleQuests.filter((q) => q.status === filterStatus);
  }
  if (reversed) {
    visibleQuests.reverse();
  }

  return (
    <div className={styles.dashboard}>
      <AddQuestForm onAdd={addQuest} />

      <FilterBar
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        reversed={reversed}
        onToggleReverse={() => setReversed((r) => !r)}
        debugIndexKey={debugIndexKey}
        onToggleDebug={() => setDebugIndexKey((d) => !d)}
        total={quests.length}
        visibleCount={visibleQuests.length}
      />

      <QuestList
        quests={visibleQuests}
        debugIndexKey={debugIndexKey}
        onRemove={removeQuest}
        onStatusChange={changeStatus}
        onResetLocal={resetQuestLocal}
      />
    </div>
  );
}

export default Dashboard;
