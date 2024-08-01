import styles from "./othersection.module.scss";
import dynamic from "next/dynamic";
const Categoriescard = dynamic(() => import("../categoriescard"), {
  ssr: true,
});
import React from "react";
export default function Othersection() {
  return (
    <div className={styles.othersectionAlignment}>
      <div className={styles.title}>
        <h5>
          <span>Other</span>
        </h5>
      </div>
      <div className={styles.grid}>
        {[...Array(6)]?.map((_, index) => {
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
