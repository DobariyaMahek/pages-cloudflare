import { useRouter } from "next/router";
import styles from "./messagePage.module.scss";
import { useEffect } from "react";
import Link from "next/link";
export default function MessagePage({ text, description }) {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className={styles.messagePage}>
      <h2>{text}</h2>
      <p>{description}</p>
      <Link prefetch={false}     href={"/"}>
        <button aria-label="Go to Homepage">Go to Homepage</button>
      </Link>
    </div>
  );
}
