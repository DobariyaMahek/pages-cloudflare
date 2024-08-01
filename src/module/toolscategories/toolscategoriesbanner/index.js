
import styles from "./toolscategoriesbanner.module.scss";
export default function Toolscategoriesbanner() {
  return (
    <div className={styles.toolscategoriesbanner}>
      <div className="container">
        <div className={styles.title}>
          <h3>
            AI <span>Tools</span> Categories
          </h3>
          <p>
            Streamline your search and find the best AI solutions to enhance
            your operations, improve customer experiences and drive growth.
          </p>
        </div>
      </div>
    </div>
  );
}
