import styles from "./bookmarkedbanner.module.scss";
import { usePathname } from "next/navigation";
export default function Bookmarkedbanner() {
  const pathname = usePathname();
  return (
    <div className={styles.bookmarkedbanner}>
      <div className="container">
        <div className={styles.title}>
          <h3>
            My <span>Bookmarked</span>{" "}
            {pathname === "/user/gpt-bookmark" ? "GPT" : "AI Tools "}{" "}
          </h3>
      
          <p>
            The AI tools you've saved as bookmarks can be deleted by clicking on
            the bookmark icon..
          </p>
        </div>
      </div>
    </div>
  );
}
