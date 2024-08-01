import styles from "./audiosection.module.scss";
import dynamic from "next/dynamic";
const Categoriescard = dynamic(() => import("../categoriescard"), {
  ssr: true,
});
import React from "react";
export default function Audiosection() {
  return (
    <div className={styles.audiosectionAlignment}>
      <div className={styles.title}>
        <h5>
          <span>Audio</span>
        </h5>
      </div>
      <div className={styles.grid}>
        {[...Array(5)]?.map((_, index) => {
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
