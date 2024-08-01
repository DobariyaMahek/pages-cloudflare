
import styles from "./viewAll.module.scss";
import RightIconLg from "@/assets/icons/righticonlg";
export default function ViewAll() {
  return (
    <div className={styles.viewAllAlignment}>
      <span>View All</span>
      <RightIconLg />
    </div>
  );
}
