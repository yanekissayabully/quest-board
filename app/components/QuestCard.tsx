"use client";

import { useState } from "react";
import { STATUSES, STATUS_COLORS, DIFFICULTY_COLORS } from "../constants";
import type { Quest, Status } from "../types";
import styles from "./QuestCard.module.css";

interface QuestCardProps {
  quest: Quest;
  onRemove: (id: number) => void;
  onStatusChange: (id: number, status: Status) => void;
  onResetLocal: (id: number) => void;
}

function QuestCard({ quest, onRemove, onStatusChange, onResetLocal }: QuestCardProps) {
  console.log("render: QuestCard —", quest.title);

  const [expanded, setExpanded] = useState(false);
  const [xp, setXp] = useState(0);
  const [noteDraft, setNoteDraft] = useState("");

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span
          className={styles.difficulty}
          style={{ color: DIFFICULTY_COLORS[quest.difficulty] }}
        >
          {quest.difficulty}
        </span>
        <span className={styles.type}>{quest.type}</span>
      </div>

      <h3 className={styles.title}>{quest.title}</h3>

      <div className={styles.meta}>
        <span
          className={styles.status}
          style={{ color: STATUS_COLORS[quest.status] }}
        >
          ● {quest.status}
        </span>
        <span className={styles.reward}>{quest.reward.toLocaleString()} ₸</span>
      </div>

      <select
        className={styles.statusSelect}
        value={quest.status}
        onChange={(e) => onStatusChange(quest.id, e.target.value as Status)}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <div className={styles.xpRow}>
        <div className={styles.xpBar}>
          <div className={styles.xpFill} style={{ width: `${Math.min(xp, 100)}%` }} />
        </div>
        <span className={styles.xpLabel}>{xp} XP</span>
        <button className={styles.smallBtn} onClick={() => setXp((v) => v + 10)}>
          +10 XP
        </button>
      </div>

      <button className={styles.toggleBtn} onClick={() => setExpanded((v) => !v)}>
        {expanded ? "Свернуть" : "Подробнее"}
      </button>

      {expanded && (
        <div className={styles.details}>
          <textarea
            className={styles.notes}
            placeholder="Заметки по квесту (черновик, не сохраняется)..."
            value={noteDraft}
            onChange={(e) => setNoteDraft(e.target.value)}
          />
        </div>
      )}

      <div className={styles.actions}>
        <button className={styles.resetBtn} onClick={() => onResetLocal(quest.id)}>
          Abandon quest (сброс XP/заметок)
        </button>
        <button className={styles.removeBtn} onClick={() => onRemove(quest.id)}>
          Удалить
        </button>
      </div>
    </div>
  );
}

export default QuestCard;
