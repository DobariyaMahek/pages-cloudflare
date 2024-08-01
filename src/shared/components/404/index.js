import styles from "./nodatafound.module.scss";
import Link from "next/link";
export default function NoDataFound() {

  return (
    <div className={styles.nodatafoundAlignment}>
      <h2>404</h2>
      <p>Oops! This Page Could Not Be Found</p>
      <span>
        Sorry but the page you are looking for dose not exist, have been removed, name changed or is temporarily unavailable.
      </span>
      <Link prefetch={false}     href={"/"}>
        <button aria-label="Explore Website">Go to Homepage</button>
      </Link>
    </div>
  );
}
