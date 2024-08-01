import styles from "./videosection.module.scss";
import dynamic from "next/dynamic";
const Categoriescard = dynamic(() => import("../categoriescard"), {
  ssr: true,
});
import React from "react";
export default function Videosection() {
  return (
    <div className={styles.videosectionAlignment}>
      <div className={styles.title}>
        <h5>
          <span>Video</span>
        </h5>
      </div>
      <div className={styles.grid}>
        {[...Array(3)]?.map((_, index) => {
          return (
            <React.Fragment key={index}>
              <Categoriescard key={index} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
