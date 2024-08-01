import styles from "./aishortvideos.module.scss";
import { useEffect } from "react";
import dynamic from "next/dynamic";
const Aishortvideoscard = dynamic(() => import("../aishortvideoscard"), {
  ssr: true,
});
export default function Aishortvideos() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <div className={styles.aishortvideosBanner}>
        <div className="container">
          <div className={styles.title}>
            <h1>AI Shorts Videos</h1>
            <p>
              The AI tools you've saved as bookmarks can be deleted by clicking
              on the bookmark icon..
            </p>
          </div>
        </div>
      </div>
      <Aishortvideoscard />
    </>
  );
}
