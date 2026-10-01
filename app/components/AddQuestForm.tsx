"use client";

import { useState, type FormEvent } from "react";
import { TYPES, DIFFICULTIES } from "../constants";
import type { QuestType, Difficulty, NewQuestInput } from "../types";
import styles from "./AddQuestForm.module.css";

interface AddQuestFormProps {
  onAdd: (quest: NewQuestInput) => void;
}

function AddQuestForm({ onAdd }: AddQuestFormProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<QuestType>(TYPES[0]);
  const [difficulty, setDifficulty] = useState<Difficulty>(DIFFICULTIES[0]);
  const [reward, setReward] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      type,
      difficulty,
      reward: Number(reward) || 0,
    });

    setTitle("");
    setType(TYPES[0]);
    setDifficulty(DIFFICULTIES[0]);
    setReward("");
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.titleInput}
        type="text"
        placeholder="Новый квест, например: Бот для доставки"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value as QuestType)}>
        {TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value as Difficulty)}
      >
        {DIFFICULTIES.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <input
        className={styles.rewardInput}
        type="number"
        placeholder="Награда, ₸"
        value={reward}
        onChange={(e) => setReward(e.target.value)}
      />

      <button className={styles.submitBtn} type="submit">
        + Добавить квест
      </button>
    </form>
  );
}

export default AddQuestForm;
