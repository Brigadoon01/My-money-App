import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import { useAuthContext } from "./../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";

import styles from "./Home.module.css";

export default function Home() {
  const { user } = useAuthContext();
  const { documents, error } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Transactions</h1>
          {error && <p>{error}</p>}
          {documents && <TransactionList transactions={documents} />}
        </div>
        <div className={styles.sidebar}>
          <TransactionForm uid={user.uid} />
        </div>
      </div>
    </>
  );
}
