import Dashboard from "./components/Dashboard";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        Quest <span>Board</span>
      </h1>
      <p className={styles.subtitle}>
        Мои рабочие квесты — боты, сайты, CRM и интеграции для клиентов.
      </p>
      <Dashboard />
    </div>
  );
}
