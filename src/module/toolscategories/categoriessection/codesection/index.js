import styles from "./codesection.module.scss";
import dynamic from "next/dynamic";
const Categoriescard = dynamic(() => import("../categoriescard"), {
  ssr: true,
});
import React from "react";
export default function Codesection() {
  return (
    <div>
      <div className={styles.codesectionAlignment}>
        <div className={styles.title}>
          <h5>
            <span>Code</span>
          </h5>
        </div>
        <div className={styles.grid}>
          {[...Array(6)]?.map((_, index) => {
            return (
              <React.Fragment key={index}>
                <Categoriescard />;
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
