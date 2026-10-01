import QuestCard from "./QuestCard";
import type { Quest, Status } from "../types";
import styles from "./QuestList.module.css";

interface QuestListProps {
  quests: Quest[];
  debugIndexKey: boolean;
  onRemove: (id: number) => void;
  onStatusChange: (id: number, status: Status) => void;
  onResetLocal: (id: number) => void;
}

function QuestList({ quests, debugIndexKey, onRemove, onStatusChange, onResetLocal }: QuestListProps) {
  if (quests.length === 0) {
    return <p className={styles.empty}>Квестов не найдено — попробуй другой фильтр.</p>;
  }

  return (
    <div className={styles.list}>
      {quests.map((quest, index) => (
        <QuestCard
          key={debugIndexKey ? index : `${quest.id}-${quest.resetToken}`}
          quest={quest}
          onRemove={onRemove}
          onStatusChange={onStatusChange}
          onResetLocal={onResetLocal}
        />
      ))}
    </div>
  );
}

export default QuestList;
