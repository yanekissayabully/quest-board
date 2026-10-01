"use client";

import { STATUSES } from "../constants";
import type { Status } from "../types";
import styles from "./FilterBar.module.css";

interface FilterBarProps {
  filterStatus: Status | "Все";
  onFilterChange: (status: Status | "Все") => void;
  reversed: boolean;
  onToggleReverse: () => void;
  debugIndexKey: boolean;
  onToggleDebug: () => void;
  total: number;
  visibleCount: number;
}

function FilterBar({
  filterStatus,
  onFilterChange,
  reversed,
  onToggleReverse,
  debugIndexKey,
  onToggleDebug,
  total,
  visibleCount,
}: FilterBarProps) {
  const options: (Status | "Все")[] = ["Все", ...STATUSES];

  return (
    <div className={styles.bar}>
      <div className={styles.filters}>
        {options.map((opt) => (
          <button
            key={opt}
            className={
              opt === filterStatus ? `${styles.filterBtn} ${styles.active}` : styles.filterBtn
            }
            onClick={() => onFilterChange(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className={styles.controls}>
        <span className={styles.count}>
          Показано {visibleCount} из {total}
        </span>

        <button className={styles.actionBtn} onClick={onToggleReverse}>
          {reversed ? "↑ Обычный порядок" : "↓ Развернуть список"}
        </button>

        <label className={styles.debugToggle}>
          <input type="checkbox" checked={debugIndexKey} onChange={onToggleDebug} />
          🐛 key = index (демо бага)
        </label>
      </div>
    </div>
  );
}

export default FilterBar;
